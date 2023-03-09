import 'focus-visible';
import '../styles/tailwind.css';
import { StateContext } from '../context/stateContext';
import { useState, useContext } from 'react';
import { Toaster } from 'react-hot-toast';
import { SessionProvider } from 'next-auth/react';
import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from '@web3modal/ethereum';
import { Web3Modal } from '@web3modal/react';
import { WagmiConfig, createClient, configureChains, mainnet } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { goerli } from 'wagmi/chains';

const chains = [mainnet, goerli];
const { provider, webSocketProvider } = configureChains(chains, [
  publicProvider(),
]);

const wagmiClient = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
  connectors: modalConnectors({
    projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_ID,
    version: '2',
    appName: 'Web3Pal',
    chains,
  }),
});

const ethereumClient = new EthereumClient(wagmiClient, chains);

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
          <WagmiConfig client={wagmiClient}>
            <Component {...pageProps} />
          </WagmiConfig>
        </SessionProvider>
        <Toaster />
      </StateContext.Provider>

      <Web3Modal
        projectId={process.env.NEXT_PUBLIC_WALLET_CONNECT_ID}
        ethereumClient={ethereumClient}
        themeColor="purple"
      />
    </>
  );
}
