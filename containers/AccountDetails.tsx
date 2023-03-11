import { FC, useContext, useEffect, useState } from "react";
import { web3Context } from "../contexts/Web3Context";
import getAccount, { formatAccountToReadable } from "../utils/account";
import { getReadableBalanceInEther } from "../utils/getTotalBalance";
import { IconButton, Tooltip } from "@mui/material";
import { ContentCopy } from "@mui/icons-material";

const AccountDetails: FC = () => {
  const { web3 } = useContext(web3Context);

  const [balance, setBalance] = useState<string>();
  const [address, setAddress] = useState<string>("");

  const copyToclipboard = () => {
    navigator.clipboard.writeText(address);
  };

  useEffect(() => {
    if (web3) {
      const getBalance = async () => {
        const totalBalance = await getReadableBalanceInEther(web3);
        if (totalBalance) {
          setBalance(totalBalance);
        }
      };
      getBalance();

      const getAddress = async () => {
        const accountAddress = await getAccount(web3);
        if (accountAddress) {
          setAddress(accountAddress);
        }
      };
      getAddress();
    }
  }, [web3]);

  return (
    <>
      <p>
        <strong>Account Details</strong>
      </p>

      <p>
        Address: {formatAccountToReadable(address)}
        <Tooltip title="Copy to clipboard">
          <IconButton onClick={copyToclipboard}>
            <ContentCopy fontSize="small" />
          </IconButton>
        </Tooltip>
      </p>
      <p>Balance: {balance} ETH</p>
    </>
  );
};

export default AccountDetails;
