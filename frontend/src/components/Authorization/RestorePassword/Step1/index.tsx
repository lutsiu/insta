import { HiOutlineLockClosed } from "react-icons/hi2";
import Form from "./Form";
import Or from "../../Or";
import { Link } from "react-router-dom";

export default function RestorePasswordStep1() {
  return (
    <div className="w-full sm:w-[35rem] sm:border-[.1px] border-white flex flex-col items-center pb-[2.5rem] pt-[2rem] relative">
      <div className="rounded-full border-[.2rem] border-white p-[1.5rem]">
        <HiOutlineLockClosed className="w-[6.5rem] h-[6.5rem]" />
      </div>
      <p className="mt-[1.5rem] text-xl">Trouble logging in?</p>
      <div className="w-[70%] sm:w-[80%] mt-[1rem]">
        <p className="text-center text-lg">
          Oki doki, we can manage it. Enter your email and we'll send you a link
          to get back to your account.
        </p>
        <Form />
        <div className="mt-[3rem]">
          <Or />
        </div>
      </div>
      <Link to="/sign-up" className="mt-[1.5rem] text-xl mb-[8rem]">Create new account</Link>
      <Link to="/" className="absolute bottom-0 w-[70%] sm:w-full block text-center bg-neutral-900 text-white py-[1rem] text-xl cursor-pointer">Back to login</Link>
    </div>
  );
}
