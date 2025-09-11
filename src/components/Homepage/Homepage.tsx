import usePosition from "@/hooks/usePosition";
import Spinner from "../Spinner";
import { Button } from "../ui/button";
import { useAccount } from "wagmi";

function Homepage() {
  const data = usePosition();
  const { isConnected } = useAccount();

  if (data === null) {
    return <Spinner />;
  }
  const { totalStaked, initialApr, currentRewardRate, minLockDuration } = data;
  return (
    <div className="container absolute mx-auto top-[100px] left-0 right-0 h-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
        <div className="content-center">
          <h1 className="text-[2.5rem] font-bold items-center justify-center uppercase mb-4">
            Welcome to{" "}
            <span className="bg-purple-900 text-white p-2">Stake Easy</span>{" "}
            dApp
          </h1>

          <p className="text-2xl font-medium tracking-wide">
            Discover the future of decentralized finance with our cutting-edge
            staking platform, built to empower you with seamless, secure, and
            rewarding opportunities on the blockchain.
          </p>
          <div>
            <Button
              disabled={!isConnected}
              onClick={() => {
                window.location.assign("/stake");
              }}
              className="text-2xl bg-purple-900 text-white font-bold py-6 px-8 mt-6 rounded hover:bg-purple-800"
            >
              {!isConnected ? "Please Connect Wallet" : "Test Dapp"}
            </Button>
          </div>
        </div>

        <div className="content-center">
          <div className="grid gap-4 grid-cols-2 place-content-stretch place-items-stretch">
            <div className="bg-blue-500 p-4 text-white">
              <span className="font-bold">Total Amount Staked</span>
              <h3 className="text-4xl font-extrabold ">{totalStaked}</h3>
            </div>
            <div className="bg-teal-500 p-4 text-white">
              <span className="font-bold">APR</span>
              <h3 className="text-4xl font-extrabold ">
                {Number(initialApr)}%
              </h3>
            </div>
            <div className="bg-indigo-700 p-4 text-white">
              <span className="font-bold">Reward Rate</span>
              <h3 className="text-4xl font-extrabold ">{currentRewardRate}%</h3>
            </div>
            <div className="bg-cyan-500 p-4 text-white">
              <span className="font-bold">Lock Period</span>
              <h3 className="text-4xl font-extrabold ">
                {minLockDuration} days
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
