import {
  Alert,
  AlertTitle,
  Box,
  Button,
  FormGroup,
  LinearProgress,
  Stack,
  TextField,
} from "@mui/material";
import { FC, useContext, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { web3Context } from "../contexts/Web3Context";
import styled from "@emotion/styled";
import { TransactionReceipt } from "web3-eth";

const ContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  padding: 72px 0px 5rem;
  -webkit-box-align: center;
  align-items: center;
`;
const FormContainerStyled = styled.main`
  position: relative;
  border-radius: 16px;
  border: 1px solid rgb(27, 34, 54);
  padding: 8px;
`;

const SubmitButton = styled(Button)`
  background-color: rgb(76, 130, 251);
  font-size: 20px;
  font-weight: 600;
  padding: 16px;
  color: rgb(245, 246, 252);
  width: 100%;
  margin-top: 20px;
  &:hover {
    background-color: rgb(51, 113, 250);
  }
`;

type FormPayload = {
  toAddress: string;
  ammountInEth: string;
};

const SendEtherForm: FC = () => {
  const { web3 } = useContext(web3Context);

  const [error, setError] = useState<string | null>(null);
  const [txReciept, setTxReciept] = useState<TransactionReceipt | null>(null);
  const [loading, setLoading] = useState(false);

  const { handleSubmit, control } = useForm<FormPayload>({
    defaultValues: {
      ammountInEth: "0",
      toAddress: "",
    },
  });
  const sendEth = async ({ toAddress, ammountInEth }: FormPayload) => {
    setError(null);
    setTxReciept(null);
    setLoading(true);
    if (web3) {
      try {
        const [account, ..._] = await web3.eth.getAccounts();
        const txHash = await web3?.eth.sendTransaction({
          from: account,
          to: toAddress,
          value: web3.utils.toWei(ammountInEth, "ether"),
        });
        console.log("txHash", txHash);
        setTxReciept(txHash);
      } catch (error) {
        console.error(error);
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <ContainerStyled>
      <FormContainerStyled>
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
          <SubmitButton variant="outlined" type="submit" disabled={loading}>
            Submit
          </SubmitButton>
        </form>
      </FormContainerStyled>
      {loading && (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      )}
      {txReciept && (
        <Alert severity="success">
          <AlertTitle>Successful Transaction</AlertTitle>
          <a
            href={`https://goerli.etherscan.io/tx/${txReciept.transactionHash}`}
            target="_blank"
            rel="noreferrer"
          >
            {txReciept.transactionHash}
          </a>
        </Alert>
      )}
      {error && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
      )}
    </ContainerStyled>
  );
};

export default SendEtherForm;
