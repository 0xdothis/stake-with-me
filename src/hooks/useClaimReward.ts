/*eslint-disable @typescript-eslint/no-unused-vars*/

import React from "react";
import { contractData, publicClient } from "@/config/config";
import { useAccount, useWriteContract } from "wagmi";
import { toast } from "sonner";
import { formatEther, parseAbiItem, type WatchEventOnLogsFn } from "viem";
import type { RewardsClaimed, RewardsClaimedEvent } from "@/vite-env";

function useClaimReward() {
  const [claimed, setClaimed] = React.useState<RewardsClaimed | null>(null);
  const { address: account } = useAccount();

  const { writeContract } = useWriteContract();

  const claimRewards = React.useCallback(async () => {
    try {
      const { request } = await publicClient.simulateContract({
        address: contractData.contractAddress,
        abi: contractData.contractABI,
        functionName: "claimRewards",
        account,
      });

      writeContract(request);
    } catch (error) {
      toast.error("Something went wrong");
    }
  }, [account, writeContract]);

  const rewardType = parseAbiItem(
    "event RewardsClaimed(address indexed user, uint256 amount, uint256 timestamp, uint256 newPendingRewards, uint256 totalStaked)",
  );

  React.useEffect(function () {
    const onClaimRewards: WatchEventOnLogsFn<typeof rewardType> = async (
      data,
    ) => {
      if (!data) {
        toast.error("Something went wrong");
      }

      const { amount, newPendingRewards, timestamp, totalStaked } = data[0]
        .args as RewardsClaimedEvent;

      console.log(data);

      setClaimed({
        amount: Number(formatEther(BigInt(amount))),
        newPendingRewards: Number(formatEther(newPendingRewards)),
        timestamp: Number(formatEther(BigInt(timestamp))),
        totalStaked: Number(formatEther(BigInt(totalStaked))),
      });
    };

    const unwatch = publicClient.watchEvent({
      address: contractData.contractAddress as `0x${string}`,
      event: parseAbiItem(
        "event RewardsClaimed(address indexed user, uint256 amount, uint256 timestamp, uint256 newPendingRewards, uint256 totalStaked)",
      ),
      onLogs: onClaimRewards,
    });

    return () => unwatch();
  }, []);

  return { claimRewards, claimed };
}

export default useClaimReward;
