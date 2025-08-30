// api/auth/me.js
import axios from 'axios';
import cookie from 'cookie';

export default async function handler(req, res) {
  // 1) pull token from cookie
  const cookies = cookie.parse(req.headers.cookie || '');
  const accessToken = cookies.token;
  if (!accessToken) {
    return res.status(401).json({ error: 'Not logged in' });
  }

  // 2) hit Discord /users/@me
  let user;
  try {
    const userResp = await axios.get('https://discord.com/api/users/@me', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    user = userResp.data;
  } catch (err) {
    // Axios error w/ a response
    if (err.response) {
      const status = err.response.status;
      // Invalid / expired token
      if (status === 400 || status === 401 || status === 403) {
        return res.status(401).json({ error: 'Not logged in' });
      }
      // Discord is borked
      console.error('Discord /@me upstream error:', err.response.data);
      return res.status(502).json({ error: 'Upstream service error' });
    }
    // Totally unexpected
    console.error('Unexpected /api/auth/me error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }

  // 3) fetch guild member & roles…
  let topRole = null;
  let isAdmin = false;
  try {
    const [memberResp, rolesResp] = await Promise.all([
      axios.get(
        `https://discord.com/api/v10/guilds/${process.env.DISCORD_GUILD_ID}/members/${user.id}`,
        { headers: { Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}` } }
      ),
      axios.get(
        `https://discord.com/api/v10/guilds/${process.env.DISCORD_GUILD_ID}/roles`,
        { headers: { Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}` } }
      ),
    ]);

    const member = memberResp.data;
    const roles  = rolesResp.data;
    topRole = roles
      .filter(r => member.roles.includes(r.id))
      .sort((a,b) => b.position - a.position)[0]?.name || null;
    isAdmin = member.roles.includes('1351943924628983901');
  } catch (err) {
    if (err.response && err.response.status !== 404) {
      console.warn('Could not fetch member/roles:', err.response.data || err.message);
    }
    // else 404 means “not in guild” → leave topRole/isAdmin falsey
  }

  // 4) finally, return minimal shape
  return res.status(200).json({
    id:       user.id,
    username: user.username,
    avatar:   user.avatar,
    topRole,
    isAdmin
  });
}
