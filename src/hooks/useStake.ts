/*eslint-disable @typescript-eslint/no-unused-vars*/
import React from "react";
import { contractData, publicClient } from "@/config/config";
import { useAccount, useWriteContract } from "wagmi";
import { getAddress, parseEther, type SimulateContractErrorType } from "viem";
import { toast } from "sonner";

function useStake() {
  const { address: account } = useAccount();

  const { writeContract } = useWriteContract();

  return React.useCallback(
    async (amount: string) => {
      try {
        const { request } = await publicClient.simulateContract({
          address: getAddress(contractData.contractAddress),
          abi: contractData.contractABI,
          functionName: "stake",
          args: [parseEther(amount)],
          account,
        });

        writeContract(request);
      } catch (err) {
        const error = err as SimulateContractErrorType;

        toast.error(`${error.name} : You need to approve more tokens to stake`);
      }
    },
    [account, writeContract],
  );
}

export default useStake;
