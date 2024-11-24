import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { API } from '../../../../config';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      accessToken?: string;
    };
  }

  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    accessToken?: string;
  }

  interface JWT {
    accessToken?: string;
  }
}

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60, // 60 seconds = 1 minute
  },
  jwt: {
    maxAge: 60 * 60,
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          // Make API call to your authentication endpoint
          const response = await fetch(`${API.login}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization:
                'Basic ' +
                Buffer.from(
                  credentials?.email + ':' + credentials?.password
                ).toString('base64'),
            },
            // body: JSON.stringify({
            //   username: credentials?.email,
            //   password: credentials?.password,
            // }),
          });

          const user = await response.json();

          if (response.ok && user) {
            const { data } = user || {};
            return {
              id: data?._id,
              email: data?.email,
              name: data?.name,
              accessToken: data?.access_token,
            };
          }
          return null;
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({
      session,
      token,
    }: {
      session: any;
      token: any & { id: string; accessToken?: string };
    }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.accessToken = token.accessToken;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
