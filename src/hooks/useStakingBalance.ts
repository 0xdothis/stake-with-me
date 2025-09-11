/*eslint-disable @typescript-eslint/no-unused-vars*/

import React from "react";
import { contractData, publicClient } from "@/config/config";
import { useAccount } from "wagmi";
import {
  formatEther,
  parseAbi,
  parseAbiItem,
  type WatchEventOnLogsFn,
} from "viem";
import type { UserDetailsProp, StakedEventProp } from "@/vite-env";

function useStakingBalance() {
  const [userDetails, setUserDetails] = React.useState<UserDetailsProp>();
  const { address: account } = useAccount();

  React.useEffect(
    function () {
      (async () => {
        if (!publicClient) return;

        const request = await publicClient.readContract({
          address: contractData.contractAddress as `0x${string}`,
          abi: contractData.contractABI,
          functionName: "getUserDetails",
          args: [account as `0x${string}`],
        });

        const {
          stakedAmount,
          lastStakeTimeStamp,
          pendingRewards,
          canWithdraw,
          timeUntilUnlock,
        } = request as unknown as UserDetailsProp;

        setUserDetails({
          stakedAmount: Number(formatEther(BigInt(stakedAmount))),
          lastStakeTimeStamp,
          pendingRewards: Number(
            parseFloat(formatEther(BigInt(pendingRewards))).toFixed(4),
          ),
          canWithdraw,
          timeUntilUnlock,
        });
      })();

      const abiType = parseAbiItem(
        "event Staked(address indexed user, uint256 amount, uint256 timestamp, uint256 newTotalStaked, uint256 currentRewardRate)",
      );

      const onStaked: WatchEventOnLogsFn<typeof abiType> = async (stake) => {
        const pendingReward = await publicClient.readContract({
          address: contractData.contractAddress as `0x${string}`,
          abi: contractData.contractABI,
          functionName: "getPendingRewards",
          args: [account as `0x${string}`],
        });

        const stakedEventArgs = stake.find(
          (data) => data.eventName === "Staked",
        );

        const rewardEventArgs = stake.find(
          (data) => data.eventName !== "Staked",
        );

        if (!stakedEventArgs) return;
        if (!rewardEventArgs) return;

        const { timestamp, newTotalStaked, amount } =
          stakedEventArgs.args as StakedEventProp;

        if (!timestamp || !newTotalStaked || !amount) return;

        console.log("", newTotalStaked);

        console.log("Staked Data", stakedEventArgs.args);

        setUserDetails((prev) => {
          if (!prev) return;
          return {
            ...prev,
            stakedAmount: Number(formatEther(BigInt(newTotalStaked))),
            lastStakeTimeStamp: Number(timestamp),
            pendingRewards: Number(
              parseFloat(formatEther(pendingReward as bigint)).toFixed(4),
            ),
            amount: Number(formatEther(BigInt(amount))),
          };
        });
      };

      const unwatch = publicClient.watchEvent({
        address: contractData.contractAddress,
        events: parseAbi([
          "event Staked(address indexed user, uint256 amount, uint256 timestamp, uint256 newTotalStaked, uint256 currentRewardRate)",
          "event RewardRateUpdated(uint256 oldRate, uint256 newRate, uint256 timestamp, uint256 totalStaked)",
        ]).filter((abi) => abi.type === "event"),

        onLogs: onStaked,
      });

      return () => unwatch();
    },
    [account],
  );

  return { ...userDetails };
}

export default useStakingBalance;
