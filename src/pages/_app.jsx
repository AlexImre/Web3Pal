import 'focus-visible';
import '../styles/tailwind.css';
import { StateContext } from '../context/stateContext';
import { useState, useContext } from 'react';
import { Toaster } from 'react-hot-toast';
import { SessionProvider } from 'next-auth/react';
import Script from 'next/script';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const stateContext = useContext(StateContext);
  const [masterState, setMasterState] = useState(stateContext.masterState);

  return (
    <>
      <StateContext.Provider value={{ masterState, setMasterState }}>
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
        <Toaster />
      </StateContext.Provider>
    </>
  );
}
