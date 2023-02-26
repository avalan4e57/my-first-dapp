import Web3 from "web3";

export default async function getAccount(web3: Web3): Promise<string> {
  const [account, ..._] = await web3.eth.getAccounts();
  return account;
}

export const formatAccountToReadable = (account: string): string => {
  return account.slice(0, 6) + "..." + account.slice(-4);
};

export async function getReadableAccount(web3: Web3): Promise<string> {
  const account = await getAccount(web3);
  return account.slice(0, 6) + "..." + account.slice(-4);
}
