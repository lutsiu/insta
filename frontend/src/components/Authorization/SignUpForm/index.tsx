import Or from "../Or";
import Form from "./Form";

export default function SignUpForm() {

  return (
    <div className="w-full sm:w-[35rem] sm:border-[.1px] border-white flex flex-col items-center pt-[4.5rem] pb-[2.5rem] ">
      <h1 className="text-5xl">LutsiuGram</h1>
      <h3 className="mt-[4rem] text-xl text-center font-medium px-[4rem]">Sign up to watch cats videos and read funny racist comments.</h3>
      <div className="w-[65%] sm:w-[75%] mt-[1.5rem] sm:px-0">
        <Or/>
        <Form/>
      </div>
        <div className="text-center mt-[4rem] px-[6rem]">Some boring-ass description of some laws blah blah blah</div>
    </div>
  )
}