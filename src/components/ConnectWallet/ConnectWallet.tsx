import { ConnectKitButton } from "connectkit";

function ConnectWallet() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold font-mono ">
        Please Connect Your Wallet
      </h1>
      <ConnectKitButton />
    </div>
  );
}

export default ConnectWallet;
