import React from "react";
import { contractData, publicClient } from "@/config/config";
import { useAccount, useWriteContract } from "wagmi";
import { getAddress, parseEther, type SimulateContractErrorType } from "viem";
import { toast } from "sonner";

function useStake() {
  const { address: account } = useAccount();

  const { writeContractAsync } = useWriteContract();

  return React.useCallback(
    async (amount: string) => {
      if (typeof Number(amount) !== "number" || Number(amount) <= 0) {
        toast.error(`You need to stake more than 0 token`);
        return;
      }

      try {
        const { request } = await publicClient.simulateContract({
          address: getAddress(contractData.contractAddress),
          abi: contractData.contractABI,
          functionName: "stake",
          args: [parseEther(amount)],
          account,
        });

        const txHash = await writeContractAsync(request);

        const result = await publicClient.waitForTransactionReceipt({
          hash: txHash,
        });

        if (result.status === "success") {
          toast.success(
            `You have successfully staked ${amount} ${Number(amount) > 1 ? "tokens" : "token"}`,
          );
        }
      } catch (err) {
        const error = err as SimulateContractErrorType;

        toast.error(`${error.name} : You need to approve more tokens to stake`);
      }
    },
    [account, writeContractAsync],
  );
}

export default useStake;
