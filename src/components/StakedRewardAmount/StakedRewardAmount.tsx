function StakedRewardAmount({
  stakedAmount,
  pendingRewards,
}: {
  stakedAmount: number;
  pendingRewards: number;
}) {
  return (
    <div className="">
      <div className="font-mono text-lg flex justify-center items-center">
        <h1 className="font-bold bg-purple-600 text-white p-4 rounded-s-md">
          Amount Staked: <span>{stakedAmount}</span>
        </h1>
        <h1 className="font-bold p-4 bg-purple-300 text-purple-700 rounded-e-md">
          Pending Reward: <span>{pendingRewards}</span>
        </h1>
      </div>
    </div>
  );
}
export default StakedRewardAmount;
