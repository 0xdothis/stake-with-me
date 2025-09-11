import React from "react";
import { contractData, publicClient } from "@/config/config";
import { useAccount, useWriteContract } from "wagmi";
import { getAddress, parseEther } from "viem";
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

        console.log(request);

        writeContract(request);
      } catch (error) {
        toast.error("Amounts needs to be greater than 0");
      }
    },
    [account, writeContract],
  );
}

export default useStake;
