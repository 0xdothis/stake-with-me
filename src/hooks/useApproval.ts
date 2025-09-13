import React from "react";
import { contractData, publicClient, tokenData } from "@/config/config";
import { useAccount, useWriteContract } from "wagmi";
import { parseEther, type SimulateContractErrorType } from "viem";
import { toast } from "sonner";

function useApproval() {
  const { address: account } = useAccount();
  const { writeContractAsync } = useWriteContract();

  return React.useCallback(
    async (amount: string) => {
      if (typeof Number(amount) !== "number" || Number(amount) <= 0) {
        toast.error(`You need to approve more than 0 token`);
        return;
      }

      try {
        const { request } = await publicClient.simulateContract({
          address: tokenData.tokenAddress,
          abi: tokenData.tokenABI,
          functionName: "approve",
          args: [contractData.contractAddress, parseEther(amount)],
          account,
        });

        const txHash = await writeContractAsync(request);
        const result = await publicClient.waitForTransactionReceipt({
          hash: txHash,
        });

        if (result.status === "success") {
          toast.success(
            `Approval of ${amount} ${Number(amount) > 1 ? "tokens" : "token"} successful`,
          );
        }
      } catch (err) {
        const error = err as SimulateContractErrorType;
        toast.error(`${error.name} : You need to stake more tokens`);
      }
    },
    [account, writeContractAsync],
  );
}

export default useApproval;
