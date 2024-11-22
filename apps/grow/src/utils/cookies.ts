import { decode } from 'next-auth/jwt';
import { cookies } from 'next/headers';

interface SessionUser {
  name: string;
  email: string;
  id: string;
  accessToken: string;
}

export const getSessionUser = async (): Promise<SessionUser | undefined> => {
  const cookieStore = await cookies();
  const token = cookieStore.get('next-auth.session-token')?.value;
  if (!token) return undefined;
  const decoded = await decode({
    token,
    secret: process.env.NEXTAUTH_SECRET!,
  });
  if (
    !decoded ||
    !('id' in decoded) ||
    !('accessToken' in decoded) ||
    !('name' in decoded) ||
    !('email' in decoded)
  )
    return undefined;
  return {
    id: decoded.id as string,
    accessToken: decoded.accessToken as string,
    name: decoded.name as string,
    email: decoded.email as string,
  };
};
