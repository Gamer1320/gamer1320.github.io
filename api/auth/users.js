import axios from 'axios';
import cookie from 'cookie';
import { Client } from 'pg';

const ADMIN_ROLE_ID = '1394363077260218378';

export default async function handler(req, res) {
	// 1) Pull our HTTP‑only Discord OAuth token out of the cookie
	const cookies = cookie.parse(req.headers.cookie || '');
	const token = cookies.token;
	if (!token) {
		return res.status(401).json({ error: 'Not logged in' });
	}

	// 2) Fetch /users/@me
	let discordUser;
	try {
		const { data } = await axios.get('https://discord.com/api/users/@me', {
			headers: { Authorization: `Bearer ${token}` },
		});
		discordUser = data;
	} catch (err) {
		return res.status(401).json({ error: 'Invalid Discord token' });
	}

	// 3) Fetch guild member to inspect roles
	let member;
	try {
		const { data } = await axios.get(
			`https://discord.com/api/v10/guilds/${process.env.DISCORD_GUILD_ID}/members/${discordUser.id}`,
			{ headers: { Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}` } }
		);
		member = data;
	} catch (err) {
		// 404 means “not in guild”
		return res.status(403).json({ error: 'You are not a member of the guild' });
	}

	// 4) Enforce that they must have the Admin role
	if (!member.roles.includes(ADMIN_ROLE_ID)) {
		return res.status(403).json({ error: 'You do not have permission' });
	}

	// 5) Only now do we hit the database and return the table
	const db = new Client({
		connectionString: process.env.DATABASE_URL,
		ssl: { rejectUnauthorized: false },
	});
	await db.connect();

	const { rows } = await db.query(`
		SELECT id, username, first_seen, last_seen, top_role, is_admin, ip
		FROM logged_users
		ORDER BY first_seen
	`);

	await db.end();

	return res.status(200).json(rows);
}
