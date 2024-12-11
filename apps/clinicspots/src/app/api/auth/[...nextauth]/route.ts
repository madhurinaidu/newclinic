import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 60 * 60, // 1 hour session
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Phone Number", type: "text" }, // Email is used here as phone number
        password: { label: "OTP", type: "password" }, // OTP is used as password
      },
      async authorize(credentials) {
        try {
          const response = await fetch("https://vcall.aairavx.com/api/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              phone: credentials?.email, // Here, email is the phone number
              password: credentials?.password, // Password is the OTP
            }),
          });

          const data = await response.json();

          // Check if response is ok and contains user info
          if (response.ok && data) {
            return {
              id: data.user.id,
              name: data.user.name,
              phone: data.user.phone, // or email, depending on the data you return from backend
              accessToken: data.accessToken,
            };
          }

          return null; // If the login fails, return null
        } catch (error) {
          console.error("Error during authentication:", error);
          return null; // Return null in case of failure
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.accessToken = user.accessToken; // Store the access token
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.accessToken = token.accessToken; // Add the access token to the session
      }
      return session;
    },
  },
  pages: {
    signIn: "/login", // Custom sign-in page
  },
});

export { handler as GET, handler as POST };
