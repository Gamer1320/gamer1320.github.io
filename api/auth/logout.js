
import cookie from 'cookie';

export default function handler(req, res) {
  // clear the 'token' cookie
  res.setHeader('Set-Cookie', cookie.serialize('token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    sameSite: 'lax',
    expires: new Date(0),       // in the past
  }));
  res.status(200).json({ ok: true });
}
