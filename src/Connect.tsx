import { TonConnectButton, useTonAddress, useTonWallet } from '@tonconnect/ui-react';
import { useContext, useEffect, useState } from 'react';
import { TonClientCtx } from './App';
import { fromNano } from 'ton-core';
import { WalletContractV4 } from 'ton';

const formatter = Intl.NumberFormat('en-US', {
  maximumSignificantDigits: 5,
  maximumFractionDigits: 3,
  notation: 'compact',
  compactDisplay: 'short',
});

export const Connect = () => {
  const wallet = useTonWallet();
  const tonAddress = useTonAddress(false);
  const [balance, setBalance] = useState<string | undefined>();
  const client = useContext(TonClientCtx);

  useEffect(() => {
    async function fetchBalance() {
      if (!tonAddress || !client || !wallet) return;
      const walletContract = client.open(
        WalletContractV4.create({
          workchain: 0,
          publicKey: Buffer.from(wallet.account.publicKey!, 'hex'),
        }),
      );
      const newBalance = await walletContract.getBalance();
      setBalance(formatter.format(Number(fromNano(newBalance))));
    }
    fetchBalance();
  }, [tonAddress, client, wallet]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
      <TonConnectButton />
      {wallet && (
        <>
          <span>Wallet: {wallet.device.appName}</span>
          <span>Balance: {balance}</span>
        </>
      )}
    </div>
  );
};
