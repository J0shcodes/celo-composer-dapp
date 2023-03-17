import "../styles/globals.css";
import type { AppProps } from "next/app";
import { CeloProvider, Alfajores } from "@celo/react-celo";
import "@celo/react-celo/lib/styles.css";

import Layout from "../components/Layout";

function App({ Component, pageProps }: AppProps) {
  return (
    <CeloProvider
      dapp
      defaultNetwork={Alfajores.name}
      connectModal={{
        title: <span>Connect your Wallet</span>,
        providersOptions: { searchable: true },
      }}
    >
      <Component {...pageProps} />
    </CeloProvider>
  );
}

export default App;
