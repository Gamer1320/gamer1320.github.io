// api/admin/positions/id.js
import { Client } from 'pg'
import cookie from 'cookie'
import axios from 'axios'

const GUILD_ID = process.env.DISCORD_GUILD_ID
const BOT_TOKEN = process.env.DISCORD_BOT_TOKEN
const ADMIN_ROLE = '1363476071982563428'

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

    // 2) get position ID from URL
    const { id } = req.query
    if (!id || isNaN(parseInt(id))) {
        return res.status(400).json({ error: 'Invalid position ID' })
    }

    // 3) connect to Postgres
    const db = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }
    })
    await db.connect()

    try {
        if (req.method === 'DELETE') {
            const { rows } = await db.query('DELETE FROM positions WHERE id = $1 RETURNING *', [id])
            if (rows.length === 0) {
                return res.status(404).json({ error: 'Position not found' })
            }
            return res.status(200).json({ message: 'Position deleted successfully', deleted: rows[0] })
        }

        if (req.method === 'PUT') {
            const { title, subtitle, description, createdby } = req.body

            const text = `
                UPDATE positions 
                SET title = $1, subtitle = $2, description = $3, createdBy = $4, updated_at = CURRENT_TIMESTAMP
                WHERE id = $5
                RETURNING *
            `
            const vals = [title, subtitle, description, createdby, id]
            const { rows } = await db.query(text, vals)

            if (rows.length === 0) {
                return res.status(404).json({ error: 'Position not found' })
            }
            return res.status(200).json(rows[0])
        }

        res.setHeader('Allow', ['DELETE', 'PUT'])
        return res.status(405).end(`Method ${req.method} not allowed`)

    } catch (error) {
        console.error('Database error:', error)
        return res.status(500).json({ error: 'Internal server error' })
    } finally {
        await db.end()
    }
}