import { FC, useContext } from "react";
import SendEtherForm from "./SendEtherForm";
import { web3Context } from "../contexts/Web3Context";
import AccountDetails from "./AccountDetails";

const Main: FC = () => {
  const { web3 } = useContext(web3Context);
  if (!web3) {
    return null;
  }
  return (
    <>
      <AccountDetails />
      <SendEtherForm />
    </>
  );
};

export default Main;
