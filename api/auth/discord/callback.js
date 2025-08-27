// server/api/auth/discord/callback.js

import axios from 'axios'
import cookie from 'cookie'

export default async function handler(req, res) {
  try {
    // 1) Grab the code from the query
    const code = req.query.code
    if (!code) {
      return res.status(400).send('Missing code')
    }

    // 2) Exchange for an access_token
    const params = new URLSearchParams({
      client_id:     process.env.DISCORD_CLIENT_ID,
      client_secret: process.env.DISCORD_CLIENT_SECRET,
      grant_type:    'authorization_code',
      code,
      redirect_uri:  process.env.DISCORD_REDIRECT_URI,
      scope:         'identify'
    })

    const tokenResp = await axios.post(
      'https://discord.com/api/oauth2/token',
      params.toString(),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    )

    const accessToken = tokenResp.data.access_token
    if (!accessToken) {
      throw new Error('No access_token in Discord response')
    }

    // 3) Serialize & set the token cookie (7 days)
    const serialized = cookie.serialize('token', accessToken, {
      httpOnly:  true,
      secure:    process.env.NODE_ENV === 'production',
      sameSite:  'lax',
      path:      '/',
      maxAge:    7 * 24 * 60 * 60,  // one week
    })
    res.setHeader('Set-Cookie', serialized)

    // 4) Call your mark-login endpoint so it can record this user
    //    We build an absolute URL with the incoming origin or host
    const origin = req.headers.origin || `https://${req.headers.host}`
    await fetch(
      new URL('/api/auth/login', origin).toString(),
      {
        method:  'POST',
        headers: { cookie: serialized }
      }
    )

    // 5) Finally redirect back to your app
    res.writeHead(302, { Location: '/' })
    res.end()

  } catch (err) {
    console.error('🔥 /api/auth/discord/callback error:', err)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
