import { Box, FormGroup, Input, Stack, TextField } from "@mui/material";
import { FC } from "react";
import { useForm, Controller } from "react-hook-form";
import Web3 from "web3";

type FormPayload = {
  toAddress: string;
  ammountInEth: string;
};

type Props = {
  web3: Web3 | undefined;
};

const SendEtherForm: FC<Props> = ({ web3 }) => {
  const { handleSubmit, control } = useForm<FormPayload>({
    defaultValues: {
      ammountInEth: "0",
      toAddress: "",
    },
  });
  const sendEth = async ({ toAddress, ammountInEth }: FormPayload) => {
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
  return (
    <>
      <h1>Send ETH from the connected wallet</h1>
      <form onSubmit={handleSubmit(sendEth)}>
        <FormGroup style={{ width: 500 }}>
          <Stack spacing={2}>
            <Controller
              name="toAddress"
              control={control}
              render={({ field }) => (
                <TextField {...field} label="To" variant="outlined" />
              )}
            />
            <Controller
              name="ammountInEth"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Ammount in ETH"
                  variant="outlined"
                />
              )}
            />
          </Stack>
        </FormGroup>
        <input type="submit" style={{ marginTop: 20 }} />
      </form>
    </>
  );
};

export default SendEtherForm;
