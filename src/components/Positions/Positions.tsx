//import { AppWindowIcon, CodeIcon } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import ConnectWallet from "../ConnectWallet";
import { useAccount } from "wagmi";
import useStakingBalance from "@/hooks/useStakingBalance";
import Spinner from "../Spinner";

function Positions() {
  const { address } = useAccount();

  const { stakedAmount, timeUntilUnlock, lastStakeTimeStamp, pendingRewards } =
    useStakingBalance();

  const timeUnlock = Math.round(Number(timeUntilUnlock!) / (24 * 3600));
  const lastStake = new Date(Number(lastStakeTimeStamp) * 1000);

  if (!address) return <ConnectWallet />;

  if (stakedAmount === undefined) return <Spinner />;

  return (
    <div className="flex w-full max-w-lg flex-col gap-6">
      <h1 className="font-bold font-mono text-4xl text-center mb-6">
        Users Statistics
      </h1>
      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">Staked Token</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center items-center">
            <Label
              htmlFor="tabs-demo-name"
              className="text-md font-bold text-center text-5xl"
            >
              {stakedAmount}
            </Label>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              Time Until Unlocks
            </CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center items-center">
            <Label
              htmlFor="tabs-demo-name"
              className="text-md font-bold text-center text-5xl"
            >
              {timeUnlock} Days
            </Label>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">Last Staked</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center items-center">
            <Label
              htmlFor="tabs-demo-name"
              className="text-md font-bold text-center text-3xl"
            >
              {lastStake.toLocaleDateString()}
            </Label>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              Pending Rewards
            </CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center items-center">
            <Label
              htmlFor="tabs-demo-name"
              className="text-md font-bold text-center text-4xl"
            >
              {pendingRewards}
            </Label>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Positions;
