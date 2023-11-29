import { HiOutlineEnvelope } from "react-icons/hi2";
import { useSelector } from "react-redux";
import { ReduxState } from "../../../redux/stateInterface";
import Form from "./Form";
interface Props {
  setSignUpStep: React.Dispatch<React.SetStateAction<number>>
}
export default function ConfirmEmail(props: Props) {
  const {setSignUpStep} = props;
  const { user } = useSelector((state: ReduxState) => state.user);
  return (
    <div className="w-full sm:w-[35rem] sm:border-[.1px] border-white flex flex-col items-center pt-[2.5rem] pb-[2.5rem] text-center">
      <div>
        <HiOutlineEnvelope className="w-[7.5rem] h-[7.5rem]" />
      </div>
      <p className="mt-[1rem] text-xl">Enter Confirmation Code</p>
      <div className="w-[70%] sm:w-[85%] flex flex-col items-center">
        <div className="mt-[1.5rem] text-xl">
          <p>Enter confirmation code we sent to </p>
          <p>{"exampleemail@gmail.com"} <span className="text-purple-500 cursor-pointer">Resend code.</span></p>
        </div>
        <Form setSignUpStep={setSignUpStep}/>
    
        <p className="mt-[2rem]">Some boring-ass description</p>
      </div>
    </div>
  );
}
