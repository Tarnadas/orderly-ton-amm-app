import { CHAIN, useTonAddress, useTonConnectUI } from '@tonconnect/ui-react';
import { Address, beginCell, fromNano, toNano } from 'ton-core';

import { useCallback, useContext, useEffect, useState } from 'react';
import { AmmCtx, JettonMasterCtx, TonClientCtx } from './App';
import { OrderlyAmmDeposit, storeWithdrawAll } from './tact/OrderlyAmmDeposit';
import { storeTokenTransfer } from './tact/JettonMaster';
import { JettonWallet } from './tact/JettonWallet';

export const Deposit = () => {
  const tonAddress = useTonAddress(false);
  const [tonConnectUI] = useTonConnectUI();
  const client = useContext(TonClientCtx);
  const jettonMaster = useContext(JettonMasterCtx);
  const amm = useContext(AmmCtx);
  const [jettonWalletBalance, setJettonWalletBalance] = useState<string | undefined>();
  const [jettonDepositBalance, setJettonDepositBalance] = useState<string | undefined>();

  const updateJettonBalance = useCallback(async () => {
    if (!amm || !jettonMaster || !client) return;
    const jettonAddress = await jettonMaster.getGetWalletAddress(Address.parseRaw(tonAddress));
    const jettonWallet = client.open(JettonWallet.fromAddress(jettonAddress));
    const walletData = await jettonWallet.getGetWalletData();
    setJettonWalletBalance(fromNano(walletData.balance));

    const ammJettonAddress = await jettonMaster.getGetWalletAddress(
      Address.parseFriendly(import.meta.env.VITE_AMM_ADDRESS!).address,
    );
    const depositAddress = await amm.getGetDepositAddress(Address.parseRaw(tonAddress), ammJettonAddress);
    const depositContract = client.open(OrderlyAmmDeposit.fromAddress(depositAddress));
    const depositData = await depositContract.getGetDepositData();
    setJettonDepositBalance(fromNano(depositData.balance));
  }, [amm, jettonMaster, tonAddress, client]);
  useEffect(() => {
    updateJettonBalance();
  }, [updateJettonBalance]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem', marginTop: '2rem' }}>
      <div>Jettons in wallet: {jettonWalletBalance ?? '0'}</div>
      <div>Jettons deposited: {jettonDepositBalance ?? '0'}</div>
      <button
        onClick={async () => {
          if (!jettonMaster) return;
          const jettonAddress = await jettonMaster.getGetWalletAddress(Address.parseRaw(tonAddress));
          const body = beginCell()
            .store(
              storeTokenTransfer({
                $$type: 'TokenTransfer',
                queryId: 0n,
                amount: toNano('1'),
                destination: Address.parseFriendly(import.meta.env.VITE_AMM_ADDRESS).address,
                response_destination: Address.parseRaw(tonAddress),
                custom_payload: null,
                forward_ton_amount: toNano('0.6'),
                forward_payload: beginCell().storeUint(0, 8).endCell(),
              }),
            )
            .endCell();

          const res = await tonConnectUI.sendTransaction({
            network: CHAIN.TESTNET,
            messages: [
              {
                address: jettonAddress.toRawString(),
                amount: toNano('1').toString(),
                payload: body.toBoc().toString('base64'),
              },
            ],
            validUntil: Math.floor(Date.now() / 1000) + 360,
          });
          console.log('res', res);

          // const endpoint = await getHttpEndpoint({
          //   network: 'testnet',
          // });
          // const client2 = new TonClient({ endpoint });
          // const txs = await client2.getTransactions(Address.parseRaw(tonAddress), {limit: 5});

          // // const bfr = Buffer.from(res.boc, 'base64');
          // // console.log('bfr', bfr)
          // // const slice = Cell.fromBoc(bfr)[0].beginParse();
          // // console.log('slice', slice)
          // const tx = loadTransaction(slice);
          // // console.log('tx', tx)
          // // const txs = await client.getAccountTransactionsParsed(Address.parseRaw(tonAddress), undefined as any, undefined as any);
          // console.log('txs', txs)

          // TODO
          setTimeout(() => {
            updateJettonBalance();
          }, 10_000);
        }}
      >
        Deposit 1 Jetton
      </button>
      <button
        onClick={async () => {
          if (!jettonMaster || !amm) return;
          const ammJettonAddress = await jettonMaster.getGetWalletAddress(
            Address.parseFriendly(import.meta.env.VITE_AMM_ADDRESS!).address,
          );
          const depositAddress = await amm.getGetDepositAddress(Address.parseRaw(tonAddress), ammJettonAddress);
          const body = beginCell()
            .store(
              storeWithdrawAll({
                $$type: 'WithdrawAll',
                queryId: 0n,
              }),
            )
            .endCell();

          const res = await tonConnectUI.sendTransaction({
            network: CHAIN.TESTNET,
            messages: [
              {
                address: depositAddress.toRawString(),
                amount: toNano('1').toString(),
                payload: body.toBoc().toString('base64'),
              },
            ],
            validUntil: Math.floor(Date.now() / 1000) + 360,
          });
          console.log('res', res);

          // TODO
          setTimeout(() => {
            updateJettonBalance();
          }, 10_000);
        }}
      >
        Withdraw all
      </button>
    </div>
  );
};
