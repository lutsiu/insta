import { HiOutlineEnvelope } from "react-icons/hi2";
import { useSelector } from "react-redux";
import { ReduxState } from "../../../redux/stateInterface";
import Form from "./Form";
import { useState } from "react";
interface Props {
  setSignUpStep: React.Dispatch<React.SetStateAction<number>>;
}
export default function ConfirmEmail(props: Props) {
  const { setSignUpStep } = props;
  const { user } = useSelector((state: ReduxState) => state.user);
  const [codeWasResend, setCodeWasResend] = useState(false);
  const [errorResponse, setErrorResponse] = useState("");
  
  async function resendCode() {
    if (codeWasResend) return;
    try {
      if (!user) return;
      const body = JSON.stringify({ _id: user._id });
      const res = await fetch("http://localhost:4000/auth/resend-code", {
        method: "POST",
        body,
        headers: { "Content-Type": "application/json" },
      });
      const responseString = (await res.json()) as string;
      if (res.status === 409 || res.status === 404) {
        setErrorResponse(responseString);
      }
      if (res.status === 200) {
        setCodeWasResend(true);
        setTimeout(() => {
          setCodeWasResend(false);
        }, 5000);
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="w-full sm:w-[35rem] sm:border-[.1px] border-white flex flex-col items-center pt-[2.5rem] pb-[2.5rem] text-center">
      <div>
        <HiOutlineEnvelope className="w-[7.5rem] h-[7.5rem]" />
      </div>
      <p className="mt-[1rem] text-xl">Enter Confirmation Code</p>
      <div className="w-[70%] sm:w-[85%] flex flex-col items-center">
        <div className="mt-[1.5rem] text-xl">
          <p >Enter confirmation code we sent to </p>
          <p>
            {user?.email}{" "}
            <span className="text-purple-500 cursor-pointer" onClick={resendCode}>Resend code.</span>
          </p>
        </div>
        <Form
          setSignUpStep={setSignUpStep}
          codeWasResend={codeWasResend}
          errorResponse={errorResponse}
          setErrorResponse={setErrorResponse}
        />

        <p className="mt-[2rem]">Some boring-ass description</p>
      </div>
    </div>
  );
}
