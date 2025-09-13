import { ConnectKitButton } from "connectkit";
import { Link } from "react-router-dom";
function Nav() {
  return (
    <nav className="flex justify-between">
      <Link to="/">
        <h1 className="text-3xl font-mono font-extrabold">StakeEasy</h1>
      </Link>
      <ul className="flex items-center gap-8 text-[1.25rem] font-bold">
        <li className="hover:text-gray-600">
          <Link to="/stake">Stake</Link>
        </li>
        <li className="hover:text-gray-600">
          <Link to="/withdraw">Withdraw</Link>
        </li>

        <li className="hover:text-gray-600">
          <Link to="/positions">Positions</Link>
        </li>

        <li className="hover:text-gray-600">
          <Link to="/claim">Claim Reward</Link>
        </li>
      </ul>

      <ConnectKitButton />
    </nav>
  );
}

export default Nav;
