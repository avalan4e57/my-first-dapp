import {
  FC,
  PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from "react";
import Web3 from "web3";
import EnableEthereumBtn from "../containers/EnableEthereumBtn";

type Web3ContextType = { web3?: Web3 | null };

export const web3Context = createContext<Web3ContextType>({ web3: null });

const Web3ContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const initWeb3 = () => {
    const web3Instance = new Web3(Web3.givenProvider);
    setWeb3(web3Instance);
  };

  useEffect(() => {
    const initIfMetamaskIsConnected = async () => {
      try {
        const accounts = await window.ethereum.request<string[]>({
          method: "eth_accounts",
        });
        if (accounts?.length) {
          initWeb3();
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (!web3) {
      void initIfMetamaskIsConnected();
    }
  }, [web3]);

  if (!web3) {
    return <EnableEthereumBtn setWeb3={setWeb3} />;
  }

  return (
    <web3Context.Provider value={{ web3 }}>{children}</web3Context.Provider>
  );
};

export default Web3ContextProvider;
