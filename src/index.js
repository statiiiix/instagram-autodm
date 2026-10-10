// Instagram comment-to-DM bot: when someone comments a keyword on a post,
// send them a private reply (DM) with the message configured for that post.
import ADMIN_HTML from "./admin.html";
import FAVICON_SVG from "./favicon.svg";

// 180×180 PNG of favicon.svg with square corners (iOS rounds home-screen icons itself).
const APPLE_TOUCH_ICON = "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";

const GRAPH = "https://graph.instagram.com/v26.0";
const SESSION_DAYS = 30;
const TOKEN_REFRESH_DAYS = 7;
const MAX_MESSAGE = 1000;
const MAX_PUBLIC_REPLY = 300;

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, "") || "/";
    try {
      if (path === "/webhook") {
        if (request.method === "GET") return verifyWebhook(url, env);
        if (request.method === "POST") return receiveWebhook(request, env, ctx);
        return new Response("Method not allowed", { status: 405 });
      }
      if (path === "/") return Response.redirect(`${url.origin}/admin`, 302);
      if (path === "/privacy") return htmlResponse(privacyPage(env));
      if (path === "/data-deletion") return htmlResponse(deletionPage(env));
      if (path === "/admin") return htmlResponse(ADMIN_HTML);
      if (path === "/favicon.svg" || path === "/favicon.ico") return iconResponse(FAVICON_SVG, "image/svg+xml");
      if (path === "/apple-touch-icon.png") return iconResponse(Uint8Array.from(atob(APPLE_TOUCH_ICON), (c) => c.charCodeAt(0)), "image/png");
      if (path.startsWith("/admin/api/")) {
        return await adminApi(request, env, path.slice("/admin/api/".length));
      }
      return new Response("Not found", { status: 404 });
    } catch (err) {
      console.error(err);
      return json({ error: err.message || "Internal error" }, err.status || 500);
    }
  },

  async scheduled(_event, env, ctx) {
    ctx.waitUntil(maintenance(env));
  },
};

// ---------------------------------------------------------------- webhook

function verifyWebhook(url, env) {
  const mode = url.searchParams.get("hub.mode");
  const token = url.searchParams.get("hub.verify_token");
  const challenge = url.searchParams.get("hub.challenge") ?? "";
  if (mode === "subscribe" && env.VERIFY_TOKEN && token === env.VERIFY_TOKEN) {
    return new Response(challenge, { status: 200 });
  }
  return new Response("Forbidden", { status: 403 });
}

async function receiveWebhook(request, env, ctx) {
  const raw = await request.text();
  const signature = request.headers.get("x-hub-signature-256") || "";
  if (!(await validSignature(raw, signature, env.APP_SECRET))) {
    console.warn("Rejected webhook with invalid signature");
    return new Response("Invalid signature", { status: 401 });
  }
  let body;
  try {
    body = JSON.parse(raw);
  } catch {
    return new Response("Bad JSON", { status: 400 });
  }
  // Answer Meta immediately; do the work after the response is sent.
  ctx.waitUntil(
    handleEvents(body, env).catch((err) =>
      logActivity(env, "error", `Webhook handling failed: ${err.message}`)
    )
  );
  return new Response("OK");
}

async function validSignature(raw, header, secret) {
  if (!secret || !header.startsWith("sha256=")) return false;
  const expected = await hmacHex(secret, raw);
  const given = header.slice("sha256=".length);
  return timingSafeEqualStr(expected, given);
}

async function handleEvents(body, env) {
  if (body.object !== "instagram") return;
  for (const entry of body.entry ?? []) {
    for (const change of entry.changes ?? []) {
      if (change.field === "comments") await handleComment(String(entry.id), change.value, env);
    }
    for (const event of entry.messaging ?? []) {
      await handleMessage(String(entry.id), event, env);
    }
  }
}

async function handleComment(accountId, comment, env) {
  const commentId = comment?.id;
  const mediaId = comment?.media?.id;
  const from = comment?.from;
  const text = comment?.text ?? "";
  if (!commentId || !mediaId || !from?.id) return;

  // Ignore the account's own comments, including the bot's public replies.
  const ownId = await getSetting(env, "ig_user_id");
  if (from.id === accountId || from.id === ownId) return;

  const rule = await findRule(env, mediaId, text);
  if (!rule) return;

  const claimed = await env.DB.prepare(
    "INSERT OR IGNORE INTO sent (media_id, user_id, rule_id, comment_id, created_at) VALUES (?, ?, ?, ?, ?)"
  )
    .bind(mediaId, from.id, rule.id, commentId, Date.now())
    .run();
  if (!claimed.meta.changes) return; // this person already got this rule's DM on this post

  const who = from.username ? `@${from.username}` : `user ${from.id}`;
  // Followers skip the button. Unknown (Instagram can't tell us yet) is treated as "not yet".
  const alreadyFollows = rule.require_follow ? (await checkFollows(env, from.id)) === true : false;
  try {
    if (rule.require_follow && !alreadyFollows) {
      await sendGate(env, accountId, { comment_id: commentId }, rule, mediaId, rule.gate_message || DEFAULT_GATE_MESSAGE);
      await env.DB.prepare(
        "INSERT OR REPLACE INTO pending (user_id, rule_id, media_id, username, created_at) VALUES (?, ?, ?, ?, ?)"
      )
        .bind(from.id, rule.id, mediaId, from.username ?? null, Date.now())
        .run();
    } else {
      await sendMessage(env, accountId, { comment_id: commentId }, { text: rule.message });
    }
  } catch (err) {
    // Release the claim so a later comment from this person can try again.
    await env.DB.prepare("DELETE FROM sent WHERE media_id = ? AND user_id = ? AND rule_id = ?")
      .bind(mediaId, from.id, rule.id)
      .run();
    await logActivity(env, "error", `Could not DM ${who}: ${err.message}`, mediaId);
    return;
  }

  let note = "";
  if (rule.public_reply) {
    try {
      await graph(env, "POST", `/${commentId}/replies`, { params: { message: rule.public_reply } });
    } catch (err) {
      note = ` (public reply failed: ${err.message})`;
    }
  }
  const what = !rule.require_follow ? "DM sent to" : alreadyFollows ? "Already follows you, DM sent to" : "Follow check sent to";
  await logActivity(env, "info", `${what} ${who} for comment "${truncate(text, 80)}"${note}`, mediaId);
}

// ---------------------------------------------------------------- follow gate
//
// A follow-gated rule first DMs a "follow me, then tap the button" message. Tapping the
// button (or replying anything) opens the conversation, which lets us ask Instagram
// whether this person follows the account, and send the link if they do.

const DEFAULT_GATE_MESSAGE = "Follow me first, then tap the button below and I'll send you the link 👇";
const DEFAULT_BUTTON_LABEL = "I followed ✅";
const DEFAULT_NOT_FOLLOWING = "Looks like you're not following yet 👀 Follow me, then tap the button again.";

// true / false from Instagram, or null when it won't say (e.g. the person never messaged us).
async function checkFollows(env, userId) {
  try {
    const profile = await graph(env, "GET", `/${userId}`, { params: { fields: "is_user_follow_business" } });
    return typeof profile.is_user_follow_business === "boolean" ? profile.is_user_follow_business : null;
  } catch (err) {
    console.log(`Follow lookup unavailable for ${userId}: ${err.message}`);
    return null;
  }
}

async function sendGate(env, accountId, recipient, rule, mediaId, text) {
  const label = truncate(rule.button_label || DEFAULT_BUTTON_LABEL, 20);
  const payload = `gate:${rule.id}:${mediaId}`;
  try {
    await sendMessage(env, accountId, recipient, {
      text,
      quick_replies: [{ content_type: "text", title: label, payload }],
    });
  } catch (err) {
    // Some message types reject buttons; fall back to plain text and accept a typed reply.
    console.warn("Quick reply rejected, sending text gate instead:", err.message);
    await sendMessage(env, accountId, recipient, { text: `${text}\n\n(Reply "done" once you've followed.)` });
  }
}

async function handleMessage(accountId, event, env) {
  const senderId = event?.sender?.id;
  if (!senderId || senderId === accountId || event.message?.is_echo) return;
  const ownId = await getSetting(env, "ig_user_id");
  if (senderId === ownId) return;

  // Which gate is this about? The button carries it; a typed reply uses the latest pending gate.
  const payload = event.message?.quick_reply?.payload || event.postback?.payload || "";
  let gate = null;
  const m = payload.match(/^gate:(\d+):(.+)$/);
  if (m) {
    gate = await env.DB.prepare("SELECT * FROM pending WHERE user_id = ? AND rule_id = ? AND media_id = ?")
      .bind(senderId, Number(m[1]), m[2])
      .first();
  } else if (event.message?.text) {
    gate = await env.DB.prepare("SELECT * FROM pending WHERE user_id = ? ORDER BY created_at DESC LIMIT 1")
      .bind(senderId)
      .first();
  }
  if (!gate) return;

  const rule = await env.DB.prepare("SELECT * FROM rules WHERE id = ?").bind(gate.rule_id).first();
  if (!rule) {
    await env.DB.prepare("DELETE FROM pending WHERE user_id = ? AND rule_id = ?").bind(senderId, gate.rule_id).run();
    return;
  }

  const who = gate.username ? `@${gate.username}` : `user ${senderId}`;
  const followStatus = await checkFollows(env, senderId);
  if (followStatus === null) {
    await logActivity(env, "error", `Could not check whether ${who} follows you`, gate.media_id);
    return;
  }
  const follows = followStatus;

  try {
    if (follows) {
      await sendMessage(env, accountId, { id: senderId }, { text: rule.message });
      await env.DB.prepare("DELETE FROM pending WHERE user_id = ? AND rule_id = ? AND media_id = ?")
        .bind(senderId, gate.rule_id, gate.media_id)
        .run();
      await logActivity(env, "info", `${who} follows you, link sent`, gate.media_id);
    } else {
      await sendGate(env, accountId, { id: senderId }, rule, gate.media_id, rule.not_following_message || DEFAULT_NOT_FOLLOWING);
      await logActivity(env, "info", `${who} isn't following yet, asked them to follow`, gate.media_id);
    }
  } catch (err) {
    await logActivity(env, "error", `Could not message ${who}: ${err.message}`, gate.media_id);
  }
}

async function sendMessage(env, accountId, recipient, message) {
  await graph(env, "POST", `/${accountId}/messages`, { body: { recipient, message } });
}

async function findRule(env, mediaId, text) {
  const comment = normalize(text);
  if (!comment.trim()) return null;
  // Rules attached to this post are checked before "all posts" rules; newest first.
  const { results } = await env.DB.prepare(
    `SELECT r.*, CASE WHEN rm.media_id IS NULL THEN 1 ELSE 0 END AS is_global
       FROM rules r
       LEFT JOIN rule_media rm ON rm.rule_id = r.id AND rm.media_id = ?
      WHERE r.enabled = 1 AND (rm.media_id IS NOT NULL OR r.all_media = 1)
      ORDER BY is_global ASC, r.id DESC`
  )
    .bind(mediaId)
    .all();
  return results.find((rule) => keywordMatches(comment, JSON.parse(rule.keywords))) ?? null;
}

// Lowercase and turn punctuation/emoji into spaces, so "Link!!" and "link 🙏" both match "LINK".
function normalize(s) {
  const words = String(s).normalize("NFKC").toLowerCase().replace(/[^\p{L}\p{M}\p{N}]+/gu, " ").trim();
  return ` ${words} `;
}

function keywordMatches(normalizedComment, keywords) {
  return keywords.some((keyword) => {
    const k = normalize(keyword).trim();
    return k && normalizedComment.includes(` ${k} `);
  });
}

// ---------------------------------------------------------------- Instagram API

async function graph(env, method, path, { params = {}, body } = {}) {
  const url = new URL(GRAPH + path);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
  url.searchParams.set("access_token", await getToken(env));
  const res = await fetch(url, {
    method,
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || data.error) {
    throw new Error(data.error?.message || `Instagram API returned HTTP ${res.status}`);
  }
  return data;
}

// The token from `wrangler secret put IG_ACCESS_TOKEN` is the starting point; refreshed
// copies live in D1. Putting a new secret overrides any refreshed copy of an older one.
async function getToken(env) {
  if (!env.IG_ACCESS_TOKEN) throw new Error("No Instagram access token configured (IG_ACCESS_TOKEN)");
  const source = await fingerprint(env.IG_ACCESS_TOKEN);
  const [stored, storedSource] = await Promise.all([
    getSetting(env, "access_token"),
    getSetting(env, "token_source"),
  ]);
  return stored && storedSource === source ? stored : env.IG_ACCESS_TOKEN;
}

async function refreshToken(env) {
  const current = await getToken(env);
  const res = await fetch(
    `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${encodeURIComponent(current)}`
  );
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.access_token) {
    throw new Error(data.error?.message || `Token refresh failed with HTTP ${res.status}`);
  }
  await setSettings(env, {
    access_token: data.access_token,
    token_source: await fingerprint(env.IG_ACCESS_TOKEN),
    token_refreshed_at: String(Date.now()),
    token_expires_at: String(Date.now() + (data.expires_in ?? 0) * 1000),
  });
}

async function loadAccount(env) {
  const me = await graph(env, "GET", "/me", { params: { fields: "user_id,username,profile_picture_url" } });
  await setSettings(env, { ig_user_id: String(me.user_id), ig_username: me.username ?? "" });
  return me;
}

async function maintenance(env) {
  try {
    const last = Number(await getSetting(env, "token_refreshed_at")) || 0;
    if (Date.now() - last > TOKEN_REFRESH_DAYS * 86400e3) {
      await refreshToken(env);
      await logActivity(env, "info", "Instagram access token refreshed");
    }
  } catch (err) {
    await logActivity(env, "error", `Token refresh failed: ${err.message}`);
  }
  try {
    await loadAccount(env);
  } catch (err) {
    console.error("Could not load account", err);
  }
  const now = Date.now();
  await env.DB.batch([
    env.DB.prepare("DELETE FROM sent WHERE created_at < ?").bind(now - 180 * 86400e3),
    env.DB.prepare("DELETE FROM activity WHERE ts < ?").bind(now - 30 * 86400e3),
    env.DB.prepare("DELETE FROM pending WHERE created_at < ?").bind(now - 30 * 86400e3),
  ]);
}

// ---------------------------------------------------------------- admin API

async function adminApi(request, env, route) {
  const method = request.method;

  if (route === "login" && method === "POST") {
    if (!env.ADMIN_PASSWORD) return json({ error: "ADMIN_PASSWORD is not set" }, 500);
    const { password } = await readJson(request);
    if (typeof password !== "string" || !timingSafeEqualStr(password, env.ADMIN_PASSWORD)) {
      await new Promise((r) => setTimeout(r, 800));
      return json({ error: "Wrong password" }, 401);
    }
    const expires = Date.now() + SESSION_DAYS * 86400e3;
    const session = `${expires}.${await hmacHex(env.ADMIN_PASSWORD, `session:${expires}`)}`;
    return json({ ok: true }, 200, {
      "Set-Cookie": `session=${session}; HttpOnly; Secure; SameSite=Strict; Path=/admin; Max-Age=${SESSION_DAYS * 86400}`,
    });
  }
  if (route === "logout" && method === "POST") {
    return json({ ok: true }, 200, {
      "Set-Cookie": "session=; HttpOnly; Secure; SameSite=Strict; Path=/admin; Max-Age=0",
    });
  }

  if (!(await validSession(request, env))) return json({ error: "Not logged in" }, 401);

  if (route === "status" && method === "GET") {
    let account = null;
    let accountError = null;
    try {
      account = await loadAccount(env);
    } catch (err) {
      accountError = err.message;
    }
    const counts = await env.DB.prepare(
      `SELECT (SELECT COUNT(*) FROM rules WHERE enabled = 1) AS active_rules,
              (SELECT COUNT(*) FROM sent WHERE created_at > ?) AS sent_7d`
    )
      .bind(Date.now() - 7 * 86400e3)
      .first();
    return json({
      account: account && { id: String(account.user_id), username: account.username, picture: account.profile_picture_url },
      accountError,
      tokenExpiresAt: Number(await getSetting(env, "token_expires_at")) || null,
      ...counts,
    });
  }

  if (route === "media" && method === "GET") {
    const after = new URL(request.url).searchParams.get("after");
    const params = {
      fields: "id,caption,media_type,media_product_type,thumbnail_url,media_url,permalink,timestamp",
      limit: "30",
    };
    if (after) params.after = after;
    const data = await graph(env, "GET", "/me/media", { params });
    return json({ items: data.data ?? [], next: data.paging?.next ? data.paging.cursors?.after : null });
  }

  if (route === "rules" && method === "GET") return json({ rules: await listRules(env) });

  if (route === "rules" && method === "POST") {
    const body = await readJson(request);
    const inputs = Array.isArray(body.rules) ? body.rules : [body];
    const ids = [];
    for (const input of inputs) ids.push(await saveRule(env, null, validateRule(input)));
    return json({ ok: true, ids });
  }

  const ruleMatch = route.match(/^rules\/(\d+)$/);
  if (ruleMatch && method === "PUT") {
    const id = Number(ruleMatch[1]);
    await requireRule(env, id);
    await saveRule(env, id, validateRule(await readJson(request)));
    return json({ ok: true });
  }
  if (ruleMatch && method === "DELETE") {
    const id = Number(ruleMatch[1]);
    await env.DB.batch([
      env.DB.prepare("DELETE FROM rule_media WHERE rule_id = ?").bind(id),
      env.DB.prepare("DELETE FROM rules WHERE id = ?").bind(id),
    ]);
    return json({ ok: true });
  }

  if (route === "activity" && method === "GET") {
    const { results } = await env.DB.prepare("SELECT * FROM activity ORDER BY id DESC LIMIT 100").all();
    return json({ activity: results });
  }

  if (route === "test" && method === "POST") {
    const { media_id, text } = await readJson(request);
    const rule = await findRule(env, String(media_id ?? ""), String(text ?? ""));
    return json({ rule: rule && {
      id: rule.id, keywords: JSON.parse(rule.keywords), message: rule.message, public_reply: rule.public_reply,
      all_media: !!rule.all_media, require_follow: !!rule.require_follow,
      gate_message: rule.gate_message || DEFAULT_GATE_MESSAGE,
    } });
  }

  return json({ error: "Not found" }, 404);
}

function validateRule(input) {
  const keywords = (Array.isArray(input.keywords) ? input.keywords : String(input.keywords ?? "").split(","))
    .map((k) => String(k).trim())
    .filter(Boolean);
  const message = String(input.message ?? "").trim();
  const publicReply = String(input.public_reply ?? "").trim();
  const allMedia = !!input.all_media;
  const media = (Array.isArray(input.media) ? input.media : [])
    .filter((m) => m && m.id)
    .map((m) => ({ id: String(m.id), caption: truncate(m.caption ?? "", 200), permalink: m.permalink ?? null }));

  if (!keywords.length) throw httpError(400, "Add at least one keyword");
  if (!message) throw httpError(400, "The DM message is empty");
  if (message.length > MAX_MESSAGE) throw httpError(400, `The DM message is longer than ${MAX_MESSAGE} characters`);
  if (publicReply.length > MAX_PUBLIC_REPLY) throw httpError(400, `The public reply is longer than ${MAX_PUBLIC_REPLY} characters`);
  if (!allMedia && !media.length) throw httpError(400, "Pick at least one post, or apply the rule to all posts");
  const requireFollow = !!input.require_follow;
  const gateMessage = String(input.gate_message ?? "").trim();
  const notFollowingMessage = String(input.not_following_message ?? "").trim();
  const buttonLabel = String(input.button_label ?? "").trim();
  if (gateMessage.length > MAX_MESSAGE || notFollowingMessage.length > MAX_MESSAGE) {
    throw httpError(400, `Follow messages must be under ${MAX_MESSAGE} characters`);
  }
  if (buttonLabel.length > 20) throw httpError(400, "The button label can be at most 20 characters");
  return {
    keywords, message, publicReply, allMedia, media, enabled: input.enabled !== false,
    requireFollow, gateMessage, notFollowingMessage, buttonLabel,
  };
}

async function saveRule(env, id, r) {
  const now = Date.now();
  const fields = [
    JSON.stringify(r.keywords), r.message, r.publicReply || null, r.allMedia ? 1 : 0, r.enabled ? 1 : 0,
    r.requireFollow ? 1 : 0, r.gateMessage || null, r.notFollowingMessage || null, r.buttonLabel || null,
  ];
  if (id == null) {
    const row = await env.DB.prepare(
      `INSERT INTO rules (keywords, message, public_reply, all_media, enabled,
                          require_follow, gate_message, not_following_message, button_label, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING id`
    )
      .bind(...fields, now, now)
      .first();
    id = row.id;
  } else {
    await env.DB.prepare(
      `UPDATE rules SET keywords = ?, message = ?, public_reply = ?, all_media = ?, enabled = ?,
                        require_follow = ?, gate_message = ?, not_following_message = ?, button_label = ?, updated_at = ?
        WHERE id = ?`
    )
      .bind(...fields, now, id)
      .run();
  }
  const statements = [env.DB.prepare("DELETE FROM rule_media WHERE rule_id = ?").bind(id)];
  if (!r.allMedia) {
    for (const m of r.media) {
      statements.push(
        env.DB.prepare("INSERT INTO rule_media (rule_id, media_id, caption, permalink) VALUES (?, ?, ?, ?)").bind(
          id,
          m.id,
          m.caption,
          m.permalink
        )
      );
    }
  }
  await env.DB.batch(statements);
  return id;
}

async function requireRule(env, id) {
  const row = await env.DB.prepare("SELECT id FROM rules WHERE id = ?").bind(id).first();
  if (!row) throw httpError(404, "Rule not found");
}

async function listRules(env) {
  const [{ results: rules }, { results: media }, { results: counts }] = await env.DB.batch([
    env.DB.prepare("SELECT * FROM rules ORDER BY id DESC"),
    env.DB.prepare("SELECT * FROM rule_media"),
    env.DB.prepare("SELECT rule_id, COUNT(*) AS n FROM sent GROUP BY rule_id"),
  ]);
  const sentByRule = Object.fromEntries(counts.map((c) => [c.rule_id, c.n]));
  return rules.map((r) => ({
    id: r.id,
    keywords: JSON.parse(r.keywords),
    message: r.message,
    public_reply: r.public_reply,
    all_media: !!r.all_media,
    enabled: !!r.enabled,
    require_follow: !!r.require_follow,
    gate_message: r.gate_message,
    not_following_message: r.not_following_message,
    button_label: r.button_label,
    sent: sentByRule[r.id] ?? 0,
    media: media.filter((m) => m.rule_id === r.id).map((m) => ({ id: m.media_id, caption: m.caption, permalink: m.permalink })),
  }));
}

async function validSession(request, env) {
  if (!env.ADMIN_PASSWORD) return false;
  const cookie = request.headers.get("cookie") || "";
  const match = cookie.match(/(?:^|;\s*)session=([^;]+)/);
  if (!match) return false;
  const [expires, sig] = match[1].split(".");
  if (!expires || !sig || Number(expires) < Date.now()) return false;
  return timingSafeEqualStr(sig, await hmacHex(env.ADMIN_PASSWORD, `session:${expires}`));
}

// ---------------------------------------------------------------- storage helpers

async function getSetting(env, key) {
  const row = await env.DB.prepare("SELECT value FROM settings WHERE key = ?").bind(key).first();
  return row?.value ?? null;
}

async function setSettings(env, values) {
  await env.DB.batch(
    Object.entries(values).map(([k, v]) =>
      env.DB.prepare(
        "INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value"
      ).bind(k, v)
    )
  );
}

async function logActivity(env, level, text, mediaId = null) {
  await env.DB.prepare("INSERT INTO activity (ts, level, media_id, text) VALUES (?, ?, ?, ?)")
    .bind(Date.now(), level, mediaId, text)
    .run();
}

// ---------------------------------------------------------------- utilities

async function hmacHex(secret, message) {
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(message));
  return [...new Uint8Array(sig)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function fingerprint(value) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return [...new Uint8Array(digest)].slice(0, 8).map((b) => b.toString(16).padStart(2, "0")).join("");
}

function timingSafeEqualStr(a, b) {
  const ea = new TextEncoder().encode(a);
  const eb = new TextEncoder().encode(b);
  if (ea.byteLength !== eb.byteLength) return false;
  return crypto.subtle.timingSafeEqual(ea, eb);
}

function truncate(s, n) {
  s = String(s);
  return s.length > n ? `${s.slice(0, n - 1)}…` : s;
}

function httpError(status, message) {
  return Object.assign(new Error(message), { status });
}

async function readJson(request) {
  try {
    return await request.json();
  } catch {
    throw httpError(400, "Invalid JSON body");
  }
}

function json(data, status = 200, headers = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store", ...headers },
  });
}

function htmlResponse(body) {
  return new Response(body, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Frame-Options": "DENY",
      "Referrer-Policy": "no-referrer",
    },
  });
}

function iconResponse(body, type) {
  return new Response(body, { headers: { "Content-Type": type, "Cache-Control": "public, max-age=604800" } });
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
}

function legalPage(title, bodyHtml) {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title><link rel="icon" href="/favicon.svg" type="image/svg+xml"><link rel="apple-touch-icon" href="/apple-touch-icon.png"><link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&display=swap" rel="stylesheet">
<style>body{font:16px/1.65 "Geist",ui-sans-serif,system-ui,sans-serif;max-width:680px;margin:72px auto;padding:0 20px;color:#0a0a0a;background:#fff;-webkit-font-smoothing:antialiased}
h1{font-size:2rem;font-weight:500;letter-spacing:-.04em;line-height:1.1;padding-bottom:20px;border-bottom:1px solid #0a0a0a}h2{font-size:1rem;font-weight:600;letter-spacing:-.01em;margin-top:2em}p,li{color:#3a3a3a}a{color:#0a0a0a;text-underline-offset:3px}</style></head>
<body>${bodyHtml}</body></html>`;
}

function privacyPage(env) {
  const name = escapeHtml(env.ACCOUNT_NAME || "this Instagram account");
  const email = escapeHtml(env.CONTACT_EMAIL || "");
  return legalPage(
    "Privacy Policy",
    `<h1>Privacy Policy</h1>
<p>This service is an automated assistant operated by <strong>${name}</strong> on Instagram. When you comment a keyword on one of our posts, it sends you a direct message with the link or information you asked for.</p>
<h2>What we process</h2>
<p>When you comment on our posts, Instagram sends us your Instagram user ID, username, the comment text and the post it was made on. We use this only to decide whether to send you the requested message.</p>
<h2>What we store</h2>
<p>If we send you a message, we keep your Instagram user ID, the comment ID and the post ID for up to 180 days so you do not receive the same message twice, plus a short activity log for up to 30 days. We do not store your messages, profile or any other data.</p>
<h2>Sharing</h2>
<p>We do not sell or share your data with anyone. Data is processed on Cloudflare's infrastructure, which hosts this service.</p>
<h2>Your rights and deletion</h2>
<p>You can ask us to delete any data about you at any time. See our <a href="/data-deletion">data deletion instructions</a>.</p>
<h2>Contact</h2>
<p>${email ? `Email: <a href="mailto:${email}">${email}</a>` : `Send a direct message to ${name} on Instagram.`}</p>`
  );
}

function deletionPage(env) {
  const name = escapeHtml(env.ACCOUNT_NAME || "this Instagram account");
  const email = escapeHtml(env.CONTACT_EMAIL || "");
  return legalPage(
    "Data Deletion",
    `<h1>Data Deletion Instructions</h1>
<p>To delete the data this service holds about you (your Instagram user ID and the IDs of comments that triggered a message):</p>
<ol>
<li>${email ? `Email <a href="mailto:${email}">${email}</a>` : `Send a direct message to ${name} on Instagram`} with the subject "Data deletion" and your Instagram username.</li>
<li>We delete your data within 30 days and confirm by reply.</li>
</ol>
<p>Data is also deleted automatically after 180 days.</p>`
  );
}
