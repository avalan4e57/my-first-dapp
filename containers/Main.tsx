import { FC, useEffect, useState } from "react";
import Web3 from "web3";
import SendEtherForm from "./SendEtherForm";

type Props = {
  web3: Web3 | undefined;
};

const Main: FC<Props> = ({ web3 }) => {
  const [balance, setBalance] = useState<string>();

  const sendEth = async ({
    toAddress,
    ammountInEth,
  }: {
    toAddress: string;
    ammountInEth: string;
  }) => {
    if (web3) {
      const [account, ..._] = await web3.eth.getAccounts();
      const txHash = await web3?.eth.sendTransaction({
        from: account,
        to: toAddress,
        value: web3.utils.toWei(ammountInEth, "ether"),
      });
      console.log("txHash", txHash);
    }
  };

  useEffect(() => {
    if (typeof web3 !== "undefined") {
      const getTotalBalance = async () => {
        const [account, ..._] = await web3.eth.getAccounts();
        const balanceValue = await web3.eth.getBalance(account);
        const balanceInEth = web3.utils.fromWei(balanceValue, "ether");
        const readableBalanceInEth = parseFloat(balanceInEth).toFixed(4);
        console.log("balanceInEth", parseFloat(balanceInEth).toFixed(4));
        setBalance(readableBalanceInEth);
      };
      void getTotalBalance();
    }
  });
  if (!web3) {
    return null;
  }
  return (
    <>
      <h1>Main Component</h1>
      <p>Balance: {balance || "Loading..."}</p>
      <SendEtherForm web3={web3} />
    </>
  );
};

export default Main;
