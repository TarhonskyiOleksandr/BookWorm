'use server';
import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type Session = {
  user: {
    name: string;
    email: string;
  };
  accessToken: string;
  refreshToken: string;
};

const secretKey = new TextEncoder().encode(process.env.SESSION_SECRET_KEY!);
const cookie = {
  options: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
  },
  name: 'session',
  duration: 7 * 24 * 60 * 60 * 1000,
};

export async function encrypt(payload: Session) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1week')
    .sign(secretKey);
}

export async function decrypt(session: string) {
  try {
    const { payload } = await jwtVerify(session, secretKey, {
      algorithms: ['HS256']
    });
    return payload as Session;
  } catch(err) {
    console.error(err);
    return;
  }
}

export async function createSession(payload: Session) {
  const expires = new Date(Date.now() + cookie.duration);

  const encryptedSession = await encrypt(payload);
  (await cookies())
    .set(
      'session',
      encryptedSession,
      {
        ...cookie.options,
        expires
      }
    );
}

export async function getSession() {
  const cookie = (await cookies()).get("session")?.value;
  if (!cookie) return null;

  try {
    const { payload } = await jwtVerify(cookie, secretKey, { algorithms: ["HS256"] });

    return payload as Session;
  } catch (err) {
    console.error("Failed to verify the session", err);
    // redirect('/sign-in');
  }
}

export async function verifySession() {
  const session = await getSession();
  if (!session?.user?.email) redirect('/sign-in');
  return session;
}

export async function deleteSession() {
  (await cookies()).delete('session');
}

export async function updateTokens({
  accessToken,
  refreshToken,
}: {
  accessToken: string;
  refreshToken: string;
}) {
  const cookie = (await cookies()).get("session")?.value;
  if (!cookie) return null;

  const { payload } = await jwtVerify<Session>(
    cookie,
    secretKey
  );

  if (!payload) throw new Error("Session not found");

  const newPayload: Session = {
    user: {
      ...payload.user,
    },
    accessToken,
    refreshToken,
  };

  await createSession(newPayload);
}
