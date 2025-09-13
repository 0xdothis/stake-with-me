/*eslint-disable @typescript-eslint/no-unused-vars*/

import React from "react";
import { contractData, publicClient } from "@/config/config";
import { useAccount, useWriteContract } from "wagmi";
import { toast } from "sonner";
import {
  formatEther,
  parseAbiItem,
  type ReadContractErrorType,
  type SimulateContractErrorType,
  type WatchEventOnLogsFn,
} from "viem";
import type { RewardsClaimed, RewardsClaimedEvent } from "@/vite-env";
import useStakingBalance from "./useStakingBalance";

function useClaimReward() {
  const [claimed, setClaimed] = React.useState<RewardsClaimed | null>(null);
  const { address: account } = useAccount();

  const { pendingRewards } = useStakingBalance();

  const { writeContractAsync } = useWriteContract();

  const claimRewards = React.useCallback(async () => {
    try {
      const { request } = await publicClient.simulateContract({
        address: contractData.contractAddress,
        abi: contractData.contractABI,
        functionName: "claimRewards",
        account,
      });

      const txHash = await writeContractAsync(request);

      const receipt = await publicClient.waitForTransactionReceipt({
        hash: txHash,
      });

      if (receipt.status === "success") {
        toast.success(`You've successfully claimed your rewards`);
      }
    } catch (err) {
      const error = err as SimulateContractErrorType;
      toast.error(`${error.name}: You can only claim when reward as accrued`);
    }
  }, [account, writeContractAsync]);

  const rewardType = parseAbiItem(
    "event RewardsClaimed(address indexed user, uint256 amount, uint256 timestamp, uint256 newPendingRewards, uint256 totalStaked)",
  );

  React.useEffect(
    function () {
      if (!publicClient || !account) return;
      (async () => {
        try {
          const newReward = await publicClient.readContract({
            address: contractData.contractAddress as `0x${string}`,
            abi: contractData.contractABI,
            functionName: "getPendingRewards",
            args: [account as `0x${string}`],
          });

          setClaimed((prev) => {
            if (!prev) return null;

            return {
              ...prev,
              newPendingrewards: Number(newReward),
            };
          });
        } catch (err) {
          const error = err as ReadContractErrorType;
          toast.error(`${error.name}: Something went wrong`);
        }
      })();

      const onClaimRewards: WatchEventOnLogsFn<typeof rewardType> = async (
        data,
      ) => {
        if (!data) {
          toast.error("Something went wrong");
        }

        const { amount, newPendingRewards, timestamp, totalStaked } = data[0]
          .args as RewardsClaimedEvent;

        setClaimed({
          amount: Number(formatEther(BigInt(amount))),
          newPendingRewards: Number(formatEther(newPendingRewards)),
          timestamp: Number(timestamp),
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
    },
    [account, pendingRewards],
  );

  return { claimRewards, ...claimed };
}

export default useClaimReward;
