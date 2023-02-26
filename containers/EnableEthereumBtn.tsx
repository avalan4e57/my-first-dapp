import { FC } from "react";
import Web3 from "web3";
import { connectWallet } from "../utils/connectWallet";

type Props = {
  setWeb3: (web3: Web3) => void;
};

const EnableEthereumBtn: FC<Props> = ({ setWeb3 }) => {
  const enableEthereum = async () => {
    const web3 = await connectWallet();
    if (web3) {
      setWeb3(web3);
    } else {
      console.error("No web3 instance");
    }
  };
  return <button onClick={enableEthereum}>Enable Ethereum</button>;
};

export default EnableEthereumBtn;
