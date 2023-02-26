import Web3 from "web3";

export async function connectWallet() {
  if (window.ethereum) {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const web3 = new Web3(Web3.givenProvider);
      return web3;
    } catch (error) {
      console.error(error);
      return null;
    }
  } else {
    console.error("Metamask not found");
    return null;
  }
}
