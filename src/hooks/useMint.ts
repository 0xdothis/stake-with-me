import React from "react";
import { publicClient, tokenData } from "@/config/config";
import { useAccount, useWriteContract } from "wagmi";
import { formatEther, parseEther, type SimulateContractErrorType } from "viem";
import { toast } from "sonner";

function useMint() {
  const [myBalance, setMyBalance] = React.useState<number | undefined>(
    undefined,
  );
  const { address: account } = useAccount();
  const { writeContractAsync } = useWriteContract();

  const mint = React.useCallback(
    async (amount: string) => {
      if (typeof Number(amount) !== "number" || Number(amount) <= 0) {
        toast.error(`You can't mint 0 token`);
        return;
      }

      try {
        const { request } = await publicClient.simulateContract({
          address: tokenData.tokenAddress,
          abi: tokenData.tokenABI,
          functionName: "mint",
          args: [account, parseEther(amount)],
          account,
        });

        const txHash = await writeContractAsync(request);
        const result = await publicClient.waitForTransactionReceipt({
          hash: txHash,
        });

        if (result.status === "success") {
          setMyBalance(Number(amount));
          toast.success(
            `You have successfully minted ${amount} of ${Number(amount) > 1 ? "tokens" : "token"}`,
          );
          window.location.reload();
        }
      } catch (err) {
        const error = err as SimulateContractErrorType;
        toast.error(`${error.name} : Something went wrong`);
      }
    },
    [account, writeContractAsync],
  );

  React.useEffect(
    function () {
      if (!publicClient || !account) return;
      (async () => {
        const balance = await publicClient.readContract({
          address: tokenData.tokenAddress,
          abi: tokenData.tokenABI,
          functionName: "balanceOf",
          args: [account],
          account,
        });
        setMyBalance(Number(formatEther(balance as bigint)));
      })();
    },
    [account, myBalance],
  );

  return { mint, myBalance };
}

export default useMint;
