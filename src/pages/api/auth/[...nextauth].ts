import NextAuth from 'next-auth';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from '../../../lib/mongodb';
import GoogleProvider from "next-auth/providers/google";

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  theme: {
    colorScheme: 'light',
    brandColor: '3F51B5',
  },
  pages: {
    signIn: '/auth/signin',
  }
  
//   callbacks: {
//     async redirect() {
//         return '/create'
//     },
//     async session({session, user}) {
//         session.user.id = user.id
//         return session
//     }
// }
}

export default NextAuth(authOptions);
