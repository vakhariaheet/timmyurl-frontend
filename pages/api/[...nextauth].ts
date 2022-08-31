import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth, { NextAuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
const options: NextAuthOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '',
			clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET || '',
		}),
	],
};

export default NextAuth(options);
