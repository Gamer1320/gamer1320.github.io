// File: /api/positions.js

import { Client } from 'pg'

export default async function handler(req, res) {
  // Only allow GET
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).end('Method Not Allowed')
  }

  const db = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  })

  try {
    await db.connect()

    // Pull every position, newest first
    const { rows } = await db.query(`
      SELECT
        id,
        title,
        subtitle,
        description   AS about,
        created_at
      FROM positions
      ORDER BY created_at DESC
    `)

    // rows: [ { id, title, positionType, about, created_at }, … ]
    // You can choose to rename or split out any fields here.
    // If you eventually break description into multiple Markdown fields
    // (role, responsibilities, requirements) you would extend this query
    // or store them as separate columns.

    return res.status(200).json(rows)
  } catch (err) {
    console.error('⚠️ /api/positions error', err)
    return res.status(500).json({ error: 'Failed to fetch positions' })
  } finally {
    await db.end()
  }
}
