import { Client } from 'pg'
import cookie from 'cookie'
import axios from 'axios'

const GUILD_ID = process.env.DISCORD_GUILD_ID
const BOT_TOKEN = process.env.DISCORD_BOT_TOKEN
const ADMIN_ROLE = '1412140340273741956'

async function getMe(token) {
    // Fetch user + roles exactly as you already do in /api/auth/me
    const { data: user } = await axios.get('https://discord.com/api/users/@me', {
        headers: { Authorization: `Bearer ${token}` }
    })
    // fetch guild member to check roles
    const member = await axios.get(
        `https://discord.com/api/v10/guilds/${GUILD_ID}/members/${user.id}`,
        { headers: { Authorization: `Bot ${BOT_TOKEN}` } }
    ).then(r => r.data)
    const isAdmin = member.roles.includes(ADMIN_ROLE)
    return { ...user, isAdmin }
}

export default async function handler(req, res) {
    // 1) auth
    const cookies = cookie.parse(req.headers.cookie || '')
    const token = cookies.token
    if (!token) return res.status(401).json({ error: 'Not logged in' })

    let me
    try {
        me = await getMe(token)
    } catch (err) {
        return res.status(403).json({ error: 'Could not verify user' })
    }
    if (!me.isAdmin) return res.status(403).json({ error: 'Forbidden' })

    // 2) connect to Postgres
    const db = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }
    })
    await db.connect()

    if (req.method === 'GET') {
        const { rows } = await db.query('SELECT * FROM positions ORDER BY created_at DESC')
        await db.end()
        return res.status(200).json(rows)
    }

    if (req.method === 'POST') {
        // e.g. in /api/admin/positions.js

        const { title, subtitle, description, createdBy} = req.body

        const text = `
        INSERT INTO positions
        (title, subtitle, description, createdBy)
        VALUES
        ($1, $2, $3, $4)
        RETURNING *
        `
        const vals = [title, subtitle, description, createdBy || null]
        const { rows } = await db.query(text, vals)
        await db.end()
        return res.status(201).json(rows[0])
    }

    res.setHeader('Allow', ['GET', 'POST'])
    return res.status(405).end(`Method ${req.method} not allowed`)
}
