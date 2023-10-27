import { createContext, useEffect, useState } from 'react';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { getHttpV4Endpoint } from '@orbs-network/ton-access';

import './App.css';
import { Connect } from './Connect';
import { Deposit } from './Deposit';
import { Address, OpenedContract } from 'ton-core';
import { TonClient4 } from 'ton';
import { JettonMaster } from './tact/JettonMaster';
import { OrderlyAmm } from './tact/OrderlyAmm';

export const TonClientCtx = createContext<TonClient4 | undefined>(undefined);
export const JettonMasterCtx = createContext<OpenedContract<JettonMaster> | undefined>(undefined);
export const AmmCtx = createContext<OpenedContract<OrderlyAmm> | undefined>(undefined);

function App() {
  const [client, setClient] = useState<TonClient4 | undefined>();
  const [jettonMaster, setJettonMaster] = useState<OpenedContract<JettonMaster> | undefined>();
  const [amm, setAmm] = useState<OpenedContract<OrderlyAmm> | undefined>();

  useEffect(() => {
    async function fetchEndpoint() {
      const endpoint = await getHttpV4Endpoint({
        network: 'testnet',
      });
      const client = new TonClient4({ endpoint });
      setClient(client);

      const jettonMasterContract = client.open(
        JettonMaster.fromAddress(Address.parseFriendly(import.meta.env.VITE_JETTON_MASTER_ADDRESS!).address),
      );
      setJettonMaster(jettonMasterContract);

      const ammContract = client.open(
        OrderlyAmm.fromAddress(Address.parseFriendly(import.meta.env.VITE_AMM_ADDRESS!).address),
      );
      setAmm(ammContract);
    }
    fetchEndpoint();
  }, []);

  return (
    <TonClientCtx.Provider value={client}>
      <JettonMasterCtx.Provider value={jettonMaster}>
        <AmmCtx.Provider value={amm}>
          <TonConnectUIProvider manifestUrl="http://localhost:5173/tonconnect-manifest.json">
            <h1>Ton Test TWA</h1>
            <Connect />
            <Deposit />
          </TonConnectUIProvider>
        </AmmCtx.Provider>
      </JettonMasterCtx.Provider>
    </TonClientCtx.Provider>
  );
}

export default App;
