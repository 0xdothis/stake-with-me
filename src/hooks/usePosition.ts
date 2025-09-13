import React from "react";
import { contractData, publicClient } from "@/config/config";
import { toast } from "sonner";
import { formatEther } from "viem";
import type { InitialDataProp } from "@/vite-env";

//import { useWriteContract } from "wagmi";

function usePosition() {
  const [initalData, setInitialData] = React.useState<InitialDataProp | null>(
    null,
  );

  React.useEffect(function () {
    (async () => {
      const totalStaked = await publicClient.readContract({
        address: contractData.contractAddress as `0x${string}`,
        abi: contractData.contractABI,
        functionName: "totalStaked",
      });

      const currentRewardRate = await publicClient.readContract({
        address: contractData.contractAddress as `0x${string}`,
        abi: contractData.contractABI,
        functionName: "currentRewardRate",
      });

      const minLockDuration = await publicClient.readContract({
        address: contractData.contractAddress as `0x${string}`,
        abi: contractData.contractABI,
        functionName: "minLockDuration",
      });

      const initialApr = await publicClient.readContract({
        address: contractData.contractAddress as `0x${string}`,
        abi: contractData.contractABI,
        functionName: "initialApr",
      });

      if (
        !initialApr ||
        !totalStaked ||
        !currentRewardRate ||
        !minLockDuration
      ) {
        toast.error("Your data is loading");
      }

      setInitialData({
        totalStaked: Number(formatEther(totalStaked)),
        initialApr: Number(initialApr),
        currentRewardRate: Number(currentRewardRate),

        minLockDuration: Number(minLockDuration) / (24 * 3600),
      });
    })();
  }, []);

  return initalData;
}

export default usePosition;
