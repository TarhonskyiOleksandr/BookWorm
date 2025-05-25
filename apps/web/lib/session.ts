'use server';
import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type Session = {
  user: {
    name: string;
    email: string;
  };
  // accessToken: string;
  // refreshToken: string;
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
    redirect('/sign-in');
  }
}

export async function createSession(payload: Session) {
  const expires = new Date(Date.now() + cookie.duration);

  const encryptedSession = await encrypt(payload);
  (await cookies()).set('session', encryptedSession, { ...cookie.options, expires });
}

export async function getSession() {
  const cookie = (await cookies()).get('session')?.value;
  if (!cookie) return;

  return await decrypt(cookie);
}

export async function verifySession() {
  const session = await getSession();
  if (!session?.user?.email) redirect('/sign-in');
}

export async function deleteSession() {}
