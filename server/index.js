import express from 'express';
import session from 'express-session';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const {
    DISCORD_CLIENT_ID,
    DISCORD_CLIENT_SECRET,
    DISCORD_REDIRECT_URI,
} = process.env;

const app = express();
const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
const DISCORD_GUILD_ID = process.env.DISCORD_GUILD_ID;

console.log('BOT_TOKEN loaded?', !!DISCORD_BOT_TOKEN);
console.log('GUILD_ID loaded?', DISCORD_GUILD_ID);

app.use(session({
    secret: 'qatar-air-virtual-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,      // set to true in production under HTTPS
        sameSite: 'lax',    // allow the browser to send it on your logout POST
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000
    }
}));


// Redirect user to Discord’s OAuth2 authorize page
app.get('/api/auth/discord', (req, res) => {
    const params = new URLSearchParams({
        client_id: DISCORD_CLIENT_ID,
        redirect_uri: DISCORD_REDIRECT_URI,
        response_type: 'code',
        scope: 'identify'
    });
    res.redirect(`https://discord.com/api/oauth2/authorize?${params}`);
});

// Handle Discord’s callback and exchange code for a token
app.get('/api/auth/discord/callback', async (req, res) => {
    const code = req.query.code;
    if (!code) return res.status(400).send('No code provided');

    // Exchange code → access token
    const data = new URLSearchParams({
        client_id: DISCORD_CLIENT_ID,
        client_secret: DISCORD_CLIENT_SECRET,
        grant_type: 'authorization_code',
        code,
        redirect_uri: DISCORD_REDIRECT_URI,
        scope: 'identify'
    });

    const tokenResp = await axios.post(
        'https://discord.com/api/oauth2/token',
        data.toString(),
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );

    const { access_token } = tokenResp.data;

    // Fetch user info
    const userResp = await axios.get('https://discord.com/api/users/@me', {
        headers: { Authorization: `Bearer ${access_token}` }
    });

    // Save to session
    req.session.user = userResp.data;

    // Redirect back home
    res.redirect('/');
});
app.get('/api/positions', (req, res) => {
    res.json([
        {
            "id": 5,
            "title": "Head of Flight Operations",
            "subtitle": "Subsidiary of COO",
            "about": "# **Role Information**\n\nThe Head of Flight Operations is responsible for managing all core flight-related activities within the virtual airline. This includes overseeing route schedules, flight logging, pilot flight standards, and ensuring overall operational realism. They act as the central figure for maintaining the smooth day-to-day flow of virtual flight operations, while also working closely with pilots, staff, and technical teams to ensure the flight experience remains consistent, professional, and immersive.\n\n# **Responsibilities**\n\n- Monitor flight logs daily and ensure accuracy in submitted Flight logs\n- Oversee pilot activity, flight hour progression, and roster engagement\n- Ensure all bots related to Flight Ops. are running smoothly\n- Assist pilots with route planning, documentation, or logging issues\n- Maintain and update route databases as needed\n- Review logged flights for realism and adherence to SOPs\n- Coordinate with the technical team for flight system adjustments or fixes\n- Promote flight activity through challenges or internal campaigns\n- Ensure operational standards reflect realism and professionalism\n- Work with the COO to align flight ops with organizational goals\n- Support onboarding pilots with operational guidance and FAQs\n- Identify and address gaps in operational efficiency\n- Provide regular updates on operations to executive staff\n- Collaborate with other departments to enhance overall flight experience\n\n# **Basic Requirements**\n\n\n- Strong understanding of flight simulation and virtual airline ops\n\n\n- High activity and initiative\n\n\n- Good organizational and communication skills\n\n\n- Familiarity with PIREP systems and flight logging tools\n\n\n\n",
            "created_at": "2025-07-26T10:15:41.111Z"
        }
    ]);
});

app.get('/api/auth/me', async (req, res) => {
    const u = req.session.user;
    if (!u) {
        return res.status(401).json({ error: 'Not logged in' });
    }

    // Pick only the safe fields
    const safeUser = {
        id: u.id,
        username: u.username,
        global_name: u.global_name,
        avatar: u.avatar,
        locale: u.locale,
        verified: u.verified,
    };

    try {
        const memberResp = await axios.get(
            `https://discord.com/api/v10/guilds/${DISCORD_GUILD_ID}/members/${u.id}`,
            { headers: { Authorization: `Bot ${DISCORD_BOT_TOKEN}` } }
        );
        const rolesResp = await axios.get(
            `https://discord.com/api/v10/guilds/${DISCORD_GUILD_ID}/roles`,
            { headers: { Authorization: `Bot ${DISCORD_BOT_TOKEN}` } }
        );

        const member = memberResp.data;
        const allRoles = rolesResp.data;
        
        const top = allRoles
            .filter(r => member.roles.includes(r.id))
            .sort((a, b) => b.position - a.position)[0];

        safeUser.topRole = top?.name ?? null;
        safeUser.isAdmin = member.roles.includes("1351943924628983901");
    } catch (e) {
        // if 404 (not in server) or any other error, just set null
        safeUser.topRole = null;
    }
    
    return res.json(safeUser);
});

app.post('/api/auth/logout', (req, res) => {
    // destroy the session in the store
    req.session.destroy(err => {
        if (err) {
            console.error('❌ logout error:', err);
            return res.status(500).json({ error: 'Logout failed' });
        }
        // clear the browser cookie
        res.clearCookie('connect.sid', { path: '/' });
        // tell the client we’re done
        res.json({ ok: true });
    });
});

app.listen(4000, () => console.log('Auth server listening on :4000'));