import Web3 from "web3";

export default async function getTotalBalance(
  web3: Web3
): Promise<string | null> {
  try {
    const [account, ..._] = await web3.eth.getAccounts();
    console.log("account", account);
    const balanceValue = await web3.eth.getBalance(account);
    return balanceValue;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getReadableBalanceInEther(web3: Web3) {
  try {
    const totalBalance = await getTotalBalance(web3);
    if (!totalBalance) return null;
    const balanceInEther = web3.utils.fromWei(totalBalance, "ether");
    return parseFloat(balanceInEther).toFixed(4);
  } catch (error) {
    console.error(error);
    return null;
  }
}
