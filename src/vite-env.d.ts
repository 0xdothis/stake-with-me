/// <reference types="vite/client" />

import type { Address } from "viem";

type UserDetailsProp = {
  stakedAmount: number;
  lastStakeTimeStamp: number;
  timeUntilUnlock: number;
  pendingRewards: number;
  canWithdraw: boolean;
  rewardDebt?: number;
  amount?: number;
};

type StakedEventProp = {
  amount: bigint;
  currentRewardRate: bigint;
  newTotalStaked: bigint;
  timestamp: bigint;
  user: `0x${string}`;
};

type EmergencyWithdrawnEvent = {
  user: Address;
  amount: bigint;
  penalty: bigint;
  timestamp: bigint;
  newTotalStaked: bigint;
};

type AppStateProp = UserDetailsProp | EmergencyWithdraw | InitialDataProp;

type EmergencyWithdraw = {
  amount: number;
  penalty: number;
  timestamp: number;
  newTotalStaked: number;
  canWithdraw?: boolean;
};

type RewardsClaimedEvent = {
  user: Address;
  amount: bigint;
  timestamp: bigint;
  newPendingRewards: bigint;
  totalStaked: bigint;
};

type RewardsClaimed = {
  amount: number;
  timestamp: number;
  newPendingRewards: number;
  totalStaked: number;
};

type InitialDataProp = {
  totalStaked: number;
  currentRewardRate: number;
  minLockDuration: number;
  initialApr: number;
  canWithdraw?: boolean;
};
