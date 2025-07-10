import Link from "next/link";
import Button from "../ButtonComponent/Button";
function Navbar() {
  return (
    <>
      <div className="px-4 py-3 border-b-orange-500 border-b-2 w-full">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1">
            <img src="/0.png" alt="" className="h-10" />
            <Link href={"/"} key={"home-route"}>
              <p className="font-semibold text-md lg:text-lg cursor-pointer hover:text-orange-500">
                <span className="transition-colors">Judge</span>
                <span className="text-orange-500">Not0</span>
              </p>
            </Link>
          </div>
          <div>
            <ul className="flex items-center gap-4">
              <li>
                <Link href={"/"} key={"home"}>
                  <p className="hover:text-orange-500 transition-colors">
                    Home
                  </p>
                </Link>
              </li>
              <li>
                <Link href={"/"} key={"home"}>
                  <p className="hover:text-orange-500 transition-colors">
                    My Submissions
                  </p>
                </Link>
              </li>
              <li>
                <Link href={"/"} key={"home"}>
                  <p className="hover:text-orange-500 transition-colors">
                    Leaderboard
                  </p>
                </Link>
              </li>
              <li>
                <Link href={"/setter-panel"}>
                  <p className="hover:text-orange-500 transition-colors">
                    Setters Panel
                  </p>
                </Link>
              </li>
              <li>
                <Link href="/login" key={"login-btn"}>
                  <Button name={"Login"} />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
