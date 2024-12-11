import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

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
    maxAge: 60 * 60, // 1 hour
  },
  cookies: {
    sessionToken: {
      name: `clinicspots.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true,
      },
    },
    callbackUrl: {
      name: `clinicspots.callback-url`,
      options: {
        sameSite: 'lax',
        path: '/',
        secure: true,
      },
    },
    csrfToken: {
      name: `clinicspots.csrf-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true,
      },
    },
  },
  jwt: {
    maxAge: 60 * 60, // 1 hour
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
          // Call your authentication API
          const response = await fetch('https://vcall.aairavx.com/api/auth/login', { // Use your API URL here
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Basic ' + Buffer.from(`${credentials?.email}:${credentials?.password}`).toString('base64'),
            },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }), // Send the credentials in the body as expected by your API
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
          return null; // Return null if authentication fails
        } catch (error) {
          console.log('Error during authentication:', error);
          return null; // Return null if the API call fails
        }
      },
    }),
  ],
  pages: {
    signIn: '/login', // Custom sign-in page
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.accessToken = user.accessToken;
      }
      return token; // Return token containing user info
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.accessToken = token.accessToken;
      }
      return session; // Return session with user info
    },
  },
});

export { handler as GET, handler as POST };
