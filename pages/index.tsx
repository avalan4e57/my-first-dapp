import { useEffect, useState } from "react";
import Web3 from "web3";
import Main from "../containers/Main";

export default function Home() {
  const [web3, setWeb3] = useState<Web3>();
  const initWeb3 = () => {
    const web3Instance = new Web3(Web3.givenProvider);
    setWeb3(web3Instance);
  };
  const enableEthereum = async () => {
    // @ts-expect-error
    await ethereum.request({ method: "eth_requestAccounts" });
    initWeb3();
  };
  useEffect(() => {
    const initIfMetamaskIsConnected = async () => {
      // @ts-expect-error
      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts?.length) {
        initWeb3();
      }
    };

    if (!web3) {
      void initIfMetamaskIsConnected();
    }
  }, [web3]);
  return (
    <>
      {!web3 && <button onClick={enableEthereum}>Enable Ethereum</button>}
      <Main web3={web3} />
    </>
  );
}
