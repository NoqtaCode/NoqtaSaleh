const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7;

function signingSecret() {
  return process.env.ADMIN_SESSION_SECRET || process.env.SANITY_API_TOKEN || "";
}

async function importSigningKey() {
  const secret = signingSecret();
  if (!secret) return null;
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

function toHex(bytes: ArrayBuffer) {
  return Array.from(new Uint8Array(bytes), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function fromHex(value: string) {
  if (!/^[\da-f]{64}$/i.test(value)) return null;
  return Uint8Array.from(value.match(/.{2}/g) || [], (byte) => Number.parseInt(byte, 16));
}

export async function createAdminSessionToken() {
  const key = await importSigningKey();
  if (!key) return null;
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS;
  const payload = `admin:${expiresAt}`;
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
  return `${expiresAt}.${toHex(signature)}`;
}

export async function verifyAdminSessionToken(token?: string) {
  if (!token) return false;
  const [expiresText, signatureText, extra] = token.split(".");
  const expiresAt = Number(expiresText);
  const signature = fromHex(signatureText || "");
  if (extra || !Number.isSafeInteger(expiresAt) || expiresAt <= Math.floor(Date.now() / 1000) || !signature) return false;

  const key = await importSigningKey();
  if (!key) return false;
  return crypto.subtle.verify("HMAC", key, signature, new TextEncoder().encode(`admin:${expiresAt}`));
}
