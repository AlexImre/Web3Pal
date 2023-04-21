import Head from 'next/head';
import Link from 'next/link';

import { AuthLayout } from '@/components/AuthLayout';
import { TextField } from '@/components/Fields';
import GoogleLogin from '@/components/Authentication/GoogleLogin';

import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import { getProviders, signIn } from 'next-auth/react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]';
import EmailLogin from '@/components/Authentication/EmailLogin';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (session) {
    return { redirect: { destination: '/dashboard' } };
  }

  const providers = await getProviders();
  return {
    props: { providers: providers ?? [] },
  };
}

export default function SignIn({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Head>
        <title>Sign In - Web3Pal</title>
        <meta
          name="google-signin-client_id"
          content="436169773174-dtov4661oe82pgn2q1oudl2d9jkgud4c.apps.googleusercontent.com"
        />
      </Head>
      <AuthLayout>
        <div className="flex flex-col">
          <Link href="/" aria-label="Home">
            <div className="text-xl font-bold">
              Web3<span className="text-indigo-600">Pal</span>
            </div>
            {/* <Logo className="h-10 w-auto" /> */}
          </Link>
          <div className="mt-10">
            <h2 className="text-lg font-semibold text-gray-900">
              Sign in to your account
            </h2>
          </div>
        </div>
        <form action="#" className="mt-10 grid grid-cols-1 gap-y-2">
          {/* <TextField
            label=""
            id="email"
            name="email"
            type="email"
            autoComplete="email"
          />
          <div onClick={() => signIn('email')}>
            <EmailLogin />
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">Or</span>
            </div>
          </div> */}
          <GoogleLogin />
        </form>
      </AuthLayout>
    </>
  );
}
