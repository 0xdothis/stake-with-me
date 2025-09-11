/*eslint-disable @typescript-eslint/no-unused-vars*/
import React from "react";
import { contractData, publicClient } from "@/config/config";
import { useAccount, useWriteContract } from "wagmi";
import { parseAbiItem, parseEther } from "viem";
import { toast } from "sonner";

function useWithdraw() {
  const { address: account } = useAccount();

  const { writeContract } = useWriteContract();

  const withdraw = React.useCallback(
    async (amount: string) => {
      try {
        const { request } = await publicClient.simulateContract({
          address: contractData.contractAddress,
          abi: contractData.contractABI,
          functionName: "withdraw",
          args: [parseEther(amount)],
          account,
        });

        console.log(request);

        writeContract(request);
      } catch (err) {
        toast.error("You can't withdraw amount of 0");
      }
    },
    [account, writeContract],
  );

  React.useEffect(function () {
    const unwatch = publicClient.watchEvent({
      address: contractData.contractAddress as `0x${string}`,
      event: parseAbiItem(
        "event Withdrawn(address indexed user, uint256 amount, uint256 timestamp, uint256 newTotalStaked, uint256 currentRewardRate, uint256 rewardsAccrued)",
      ),
      onLogs: (logs) => console.log(logs),
    });

    return () => unwatch();
  }, []);

  return withdraw;
}

export default useWithdraw;
