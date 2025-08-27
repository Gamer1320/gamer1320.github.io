// api/auth/discord.js

export default async function handler (req, res) {
  const { DISCORD_CLIENT_ID, DISCORD_REDIRECT_URI } = process.env
  if (!DISCORD_CLIENT_ID || !DISCORD_REDIRECT_URI) {
    return res
      .status(500)
      .json({ error: 'Missing DISCORD_CLIENT_ID or DISCORD_REDIRECT_URI' })
  }

  const params = new URLSearchParams({
    client_id: DISCORD_CLIENT_ID,
    redirect_uri: DISCORD_REDIRECT_URI,
    response_type: 'code',
    scope: 'identify',
  })

  // Redirect straight to Discord
  res.writeHead(302, {
    Location: `https://discord.com/api/oauth2/authorize?${params.toString()}`,
  })
  res.end()
}
