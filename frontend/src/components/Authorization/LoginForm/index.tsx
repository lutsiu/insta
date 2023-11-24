import { Link } from "react-router-dom";
import Form from "./Form";
import Or from "../Or";
export default function LoginForm() {
  return (
    <div className="w-full sm:w-[35rem] sm:border-[.1px] border-white flex flex-col items-center pt-[4.5rem] pb-[2.5rem] ">
      <h1 className="text-5xl">LutsiuGram</h1>
      <div className="w-[65%] sm:w-[75%] mt-[5rem] sm:px-0">
        <Form />
        <div className="flex gap-[1.3rem] items-center mt-[1.8rem]">
          <Or/>
        </div>
  
        <Link className="text-center block text-md  text-indigo-300 mt-[1.5rem]" to="/restore-password">Forgot password?</Link>
      </div>
      <div className="text-md px-[2rem] sm:px-[5rem] text-center mt-[2rem]">Unlike instagram, here won't be any boring-ass description</div>
    </div>
  );
}
