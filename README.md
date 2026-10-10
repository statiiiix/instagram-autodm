# instagram-autodm

A free, self-hosted Instagram comment-to-DM bot. Someone comments a keyword on your post and gets a DM with the link you set for that post, optionally only if they follow you.

- Runs on Cloudflare Workers + D1 (free plan), so it costs $0/month and runs 24/7
- Uses Meta's official Instagram API (Instagram Login)
- Optional follow gate: the link is only sent to followers
- Password-protected dashboard, built for your phone: pick posts, set a keyword and link, save
- Public `/privacy` and `/data-deletion` pages, as Meta requires

## Guide

Copy the prompt below into an AI agent that can run terminal commands (Claude Code works well) and it will build and deploy your own copy step by step. You type every password and secret yourself; the prompt never asks you to paste one into the chat.

````markdown
# Build me a free ManyChat-style Instagram comment-to-DM bot

You're an AI agent helping me build my own Instagram bot: when someone comments a keyword on my post, they get a DM with the link I set for that post, optionally only if they follow me. It must cost $0/month (Cloudflare Workers + D1 free plan, Meta's API is free), run 24/7 without my computer, and be managed from a password-protected dashboard on my phone. I'm not a developer, so give me short, numbered steps whenever I need to do something.

## Rules

- Use the terminal for code and deploys. If you can control my browser (Claude in Chrome, Playwright, computer use), handle the Meta and Cloudflare navigation and fill in non-secret fields. If you can't, guide me click by click.
- **I type every password, security code and secret myself.** Never ask me to paste one into the chat. For secrets, start `npx wrangler secret put NAME` and I'll paste into that prompt.
- **I click anything that accepts terms, grants roles or publishes.** Tell me what it does first. I also create my own accounts.
- Take a fresh screenshot before every click. Meta's pages shift while loading, so click by element reference when you can.
- If more than one browser or Chrome profile is connected, ask me which one to use.

## What I need (confirm before deploying)

An Instagram **Professional** account (Creator or Business); a Facebook login (used only to own the app, no Page needed); a free Cloudflare account; Node.js 18+; and a second Instagram account for testing.

## Build it

A Cloudflare Worker (`src/index.js`), a dashboard page (`src/admin.html`), a D1 database, and `wrangler.jsonc` with a daily cron. Secrets: `IG_ACCESS_TOKEN`, `APP_SECRET`, `VERIFY_TOKEN`, `ADMIN_PASSWORD`. Store everything in D1, not KV: KV's free plan only allows about 1,000 writes a day.

**Instagram API (Instagram Login), base `https://graph.instagram.com/vXX.X`.** Use the version shown in the app's Webhooks panel and pass `access_token` as a query parameter.
- `GET /webhook`: return `hub.challenge` if `hub.verify_token` matches, otherwise 403.
- `POST /webhook`: check `X-Hub-Signature-256` (HMAC-SHA256 of the raw body with `APP_SECRET`) and return 401 if it fails. Return 200 at once and do the work in `ctx.waitUntil`.
  - Comments arrive in `entry[].changes[]` (`field: "comments"`, with `value.id`, `text`, `from.id/username`, `media.id`). `entry.id` is my account.
  - Button taps and replies arrive in `entry[].messaging[]`. Ignore `is_echo`.
- DM a commenter: `POST /{my-id}/messages` with `{"recipient":{"comment_id":…},"message":{…}}`. Only one of these is allowed per comment. After they reply or tap a button, use `{"recipient":{"id":…}}`.
- Optional public reply: `POST /{comment-id}/replies?message=…`
- My posts: `GET /me/media?fields=id,caption,media_type,thumbnail_url,media_url,permalink,timestamp`
- Follow check: `GET /{user-id}?fields=is_user_follow_business`. Instagram may refuse until the person has messaged me.
- Token refresh (tokens last ~60 days): `GET /refresh_access_token?grant_type=ig_refresh_token`. Do it weekly from the cron, store the result in D1, and let a newly set secret take over again.

**Behaviour**
- Ignore my own comments.
- Match keywords loosely: ignore case, punctuation and emoji, and work with any language.
- A rule set on the specific post beats an "all posts" rule.
- Each person gets a rule's DM once per post. Record it before sending, and remove the record if the send fails.
- **Follow gate:** first run the follow check. If they follow, send the link immediately. If not, or if Instagram won't say, DM a "follow me, then tap" message with a quick-reply button (`payload: gate:<rule>:<post>`). On a tap, or any reply, check again and send the link, or the not-following message with the button again.
- Log every send and error to an activity table.

**Dashboard (`/admin`, password + signed HttpOnly cookie, phone-first)**
- Shows my posts with thumbnails.
- Tick several posts and create one rule for all of them; or quick-fill a keyword and link on many posts and save them all at once.
- Rule settings: keywords, DM, optional public reply, "Only send to followers", all posts.
- Tabs: Rules, Activity, and a Test tab that sends nothing.
- Escape all captions and messages.

**Public pages Meta requires:** `/privacy` and `/data-deletion` (what's stored, how long it's kept, and my contact email).

## Deploy (Cloudflare)

1. `npx wrangler login`. Warn me to click **Allow within about 2 minutes**, or it times out with "localhost refused to connect"; if so, just rerun it.
2. `npx wrangler d1 create`, apply the schema with `--remote`, then `npx wrangler deploy`.
3. Generate the verify token yourself (`openssl rand -hex 24`), save it to a gitignored file, and set it as the `VERIFY_TOKEN` secret.
4. I set `ADMIN_PASSWORD` in an interactive prompt. Remind me to write it down, because it can't be shown again.

## Meta app (developers.facebook.com/apps)

1. If I'm not a developer yet, I register myself. **Create App**: a name without "Instagram", "IG", "Facebook" or "Meta"; the use case is **only** "Manage messaging & content on Instagram" (switch the filter to *All* to find it); choose "don't connect a business portfolio"; I click the final **Create app**.
2. Customize the use case → **API setup with Instagram login**. The sections are collapsed, so expand each one first.
   - **Add all required permissions.**
   - **App roles → Add People → Instagram Tester → my username** (I click this). I accept the invite at instagram.com/accounts/manage_access → Tester invites.
   - **Add account.** I log in to Instagram in the popup.
3. I copy the **Instagram app secret** (top of that page, "Show") into `wrangler secret put APP_SECRET`.
4. **Webhooks**: you fill in the Callback URL (`https://<worker>/webhook`). Copy the verify token to my clipboard. Chrome tends to autofill an email into that box, so tell me to clear it and paste. I click **Verify and save**. Make sure **comments** and **messages** are subscribed.
5. I click **Generate token** and paste it into `wrangler secret put IG_ACCESS_TOKEN`. Then switch the account's webhook toggle to **On**.
6. **App settings → Basic**: privacy URL, data-deletion URL, category "Business and pages", **Save**. Then **Publish**: webhooks only arrive when the app is published. No App Review is needed for my own account. I click it.

## Test and finish

Log in to the dashboard and confirm my posts load. Create a rule. Comment from my second account while you watch `npx wrangler tail`. Then test the follow gate both as a follower and as a non-follower. If a DM doesn't arrive, check the activity log first.

You're done when real comments trigger DMs, the follow gate works both ways, no secret appears in any file or chat, and you've given me a two-line "new reel → tick the post → keyword + link → Save" guide.
````
