function Balance({ balance }: { balance: number }) {
  return (
    <div className="">
      <div className="font-mono text-lg flex justify-center items-center">
        <h1 className="font-bold bg-purple-600 text-white p-4 rounded-md">
          Token Balance: <span>{balance}</span>
        </h1>
      </div>
    </div>
  );
}
export default Balance;
