/*eslint-disable @typescript-eslint/no-unused-vars*/

import React from "react";
import { contractData, publicClient } from "@/config/config";
import { useAccount, useWriteContract } from "wagmi";
import { formatEther, parseAbiItem, type WatchEventOnLogsFn } from "viem";
import type { EmergencyWithdraw, EmergencyWithdrawnEvent } from "@/vite-env";
import { toast } from "sonner";

function useEmergencyWithdraw() {
  const [emergencyWithdrawData, setEmergencyWithdrawData] =
    React.useState<EmergencyWithdraw | null>(null);

  const { address: account } = useAccount();

  const { writeContract } = useWriteContract();

  const emergencyWithdraw = React.useCallback(async () => {
    const { request } = await publicClient.simulateContract({
      address: contractData.contractAddress,
      abi: contractData.contractABI,
      functionName: "emergencyWithdraw",
      account,
    });

    if (!request) {
      toast("Something went wrong try again");
    }

    writeContract(request);
  }, [account, writeContract]);

  const withdrawType = parseAbiItem(
    "event EmergencyWithdrawn( address indexed user, uint256 amount, uint256 penalty, uint256 timestamp, uint256 newTotalStaked)",
  );

  React.useEffect(function () {
    const onEmergencyWithdraw: WatchEventOnLogsFn<typeof withdrawType> = async (
      data,
    ) => {
      if (!data) {
        toast.error("Something went wrong");
      }

      const { amount, newTotalStaked, timestamp, penalty } = data[0]
        .args as EmergencyWithdrawnEvent;

      setEmergencyWithdrawData({
        amount: Number(formatEther(BigInt(amount))),
        newTotalStaked: Number(formatEther(newTotalStaked)),
        timestamp: Number(timestamp),
        penalty: Number(formatEther(BigInt(penalty))),
      });
    };

    const unwatch = publicClient.watchEvent({
      address: contractData.contractAddress as `0x${string}`,
      event: parseAbiItem(
        "event EmergencyWithdrawn( address indexed user, uint256 amount, uint256 penalty, uint256 timestamp, uint256 newTotalStaked)",
      ),
      onLogs: onEmergencyWithdraw,
    });

    return () => unwatch();
  }, []);

  return { emergencyWithdraw, emergencyWithdrawData };
}

export default useEmergencyWithdraw;
