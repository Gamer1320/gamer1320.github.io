
# Qatar Virtual

- Fixed LCP (problem with react-lucide import)
- Added discord login suport/logout 
- Uses discord bot for user roles
- Made my own QAV logo.svg
- Working on the Fleet page 


## Deployment

To deploy server located in ``index.js`` run 
```bash
node server/index.js
```
in terminal (should run on `localhost:4000`)

To deploy site  run
```bash
npm run dev
```
in terminal (should open in `localhost:5173`)

Make sure to replace the filler of `.env` before launching

```env
DISCORD_CLIENT_ID=1397289846120251492
DISCORD_CLIENT_SECRET=${DISCORD_CLIENT_SECRET}
DISCORD_REDIRECT_URI=http://localhost:5173/api/auth/discord/callback
DISCORD_GUILD_ID=1362621728781631640
DISCORD_BOT_TOKEN=${DISCORD_BOT_TOKEN}
```