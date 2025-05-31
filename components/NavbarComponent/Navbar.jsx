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
              <p className="font-semibold text-md lg:text-lg cursor-pointer">
                <span className="hover:text-orange-500 transition-colors">
                  Judge
                </span>
                <span className="text-orange-500">Not0</span>
              </p>
            </Link>
          </div>
          <Link href="/login" key={"login-btn"}>
          <Button name={"Login"}/>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Navbar;
