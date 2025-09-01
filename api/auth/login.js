import axios from 'axios'
import cookie from 'cookie'
import { Client } from 'pg'

export default async function handler(req, res) {
  try {
    // 1) Pull the Discord OAuth token from the HTTP-only cookie
    const cookies = cookie.parse(req.headers.cookie || '')
    const token = cookies.token
    if (!token) {
      return res.status(401).json({ error: 'Not logged in' })
    }

    // 2) Fetch basic user info from Discord
    const { data: user } = await axios.get(
      'https://discord.com/api/users/@me',
      { headers: { Authorization: `Bearer ${token}` } }
    )
    const { id, username } = user

    // 3) Fetch guild‐member & guild roles so we can compute topRole & isAdmin
    let topRole = null
    let isAdmin = false

    try {
      const [memberResp, rolesResp] = await Promise.all([
        axios.get(
          `https://discord.com/api/v10/guilds/${process.env.DISCORD_GUILD_ID}/members/${id}`,
          { headers: { Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}` }, timeout: 5000 }
        ),
        axios.get(
          `https://discord.com/api/v10/guilds/${process.env.DISCORD_GUILD_ID}/roles`,
          { headers: { Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}` }, timeout: 5000 }
        ),
      ])

      const member = memberResp.data
      const roles = rolesResp.data

      // find highest‐position role name
      topRole = roles
        .filter(r => member.roles.includes(r.id))
        .sort((a, b) => b.position - a.position)[0]?.name
        || null

      // example: treat a specific role‐ID as “Admin”
      isAdmin = member.roles.includes('1412140340273741956')
    } catch (err) {
      // if they’re simply not in the guild, we’ll get a 404
      if (err.response?.status !== 404) {
        console.warn('⚠️ Could not fetch member/roles:', err.response?.data || err.message)
      }
      // leave topRole = null, isAdmin = false
    }

    // 4) Grab caller’s IP (X‑Forwarded‑For or remoteAddress fallback)
    const ip = Array.isArray(req.headers['x-forwarded-for']) ? req.headers['x-forwarded-for'][0] : (req.headers['x-forwarded-for'] ?? req.socket.remoteAddress)

    // 5) Connect to Postgres & upsert
    const db = new Client({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }
    })
    await db.connect()

    const text = `
      INSERT INTO logged_users
        (id, username, first_seen, last_seen, top_role, is_admin, ip)
      VALUES
        ($1, $2, NOW(), NOW(), $3, $4, $5)
      ON CONFLICT (id) DO UPDATE
      SET
        last_seen = NOW(),
        username  = $2,
        top_role  = $3,
        is_admin  = $4,
        ip        = $5
    `
    const values = [id, username, topRole, isAdmin, ip]
    await db.query(text, values)
    await db.end()

    return res.status(200).json({ success: true })
  } catch (err) {
    console.error('🔴 login trace error ', err)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}
