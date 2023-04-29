import 'focus-visible';
import '../styles/tailwind.css';
import { StateContext, TempServicesInfoContext } from '../context/stateContext';
import { useState, useContext, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { SessionProvider } from 'next-auth/react';
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from '@web3modal/ethereum';
import { Web3Modal } from '@web3modal/react';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { goerli, mainnet } from 'wagmi/chains';

if (!process.env.NEXT_PUBLIC_WALLET_CONNECT_ID) {
  throw new Error('You need to provide NEXT_PUBLIC_PROJECT_ID env variable');
}
const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_ID;

// 2. Configure wagmi client
const chains = [goerli, mainnet];

const { provider } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 2, chains }),
  provider,
});

// 3. Configure modal ethereum client
const ethereumClient = new EthereumClient(wagmiClient, chains);

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const [ready, setReady] = useState(false);

  const stateContext = useContext(StateContext);
  const [masterState, setMasterState] = useState(stateContext.masterState);

  const tempServicesContext = useContext(TempServicesInfoContext);
  const [tempServicesInfo, setTempServicesInfo] = useState(
    tempServicesContext.tempServicesInfo
  );

  useEffect(() => {
    setReady(true);
  }, []);

  return (
    <>
      {ready ? (
        <StateContext.Provider value={{ masterState, setMasterState }}>
          <TempServicesInfoContext.Provider
            value={{ tempServicesInfo, setTempServicesInfo }}
          >
            <SessionProvider session={session}>
              <WagmiConfig client={wagmiClient}>
                <Component {...pageProps} />
              </WagmiConfig>
            </SessionProvider>
          </TempServicesInfoContext.Provider>
          <Toaster />
        </StateContext.Provider>
      ) : null}

      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  );
}
