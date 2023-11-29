import { FaBirthdayCake } from "react-icons/fa";
import { useState } from "react";
import DateSelector from "./DateSelector";
import AuthorizationButton from "../../Buttons/Authorization";
import { useDispatch, useSelector } from "react-redux";
import { ReduxState } from "../../../redux/stateInterface";
import {
  getCurrentDay,
  getCurrentMonth,
  getCurrentYear,
} from "./utils/getDates";
import { ValidationError400 } from "../SignUpForm/Form/errorInterfaces";
import { setId, setDateOfBirth } from "../../../redux/user";
import { months } from "./data";
interface Props {
  setSignUpStep: React.Dispatch<React.SetStateAction<number>>;
}
export default function AddBirthday(props: Props) {
  const { setSignUpStep } = props;
  const [buttonIsDisabled, setButtonIsDisabled] = useState(true);
  const [responseErrors, setResponseErros] = useState(false);
  const { user } = useSelector((state: ReduxState) => state.user);
  const [dayOfBirth, setDayOfBirth] = useState<number>(getCurrentDay);
  const [monthOfBirth, setMonthOfBirth] = useState<string>(getCurrentMonth);
  const [yearOfBirth, setYearOfBirth] = useState<string>(getCurrentYear);
  const dispatch = useDispatch();
  function handleChangeSignUpStep(goFurther: boolean) {
    goFurther
      ? setSignUpStep((prev) => prev + 1)
      : setSignUpStep((prev) => prev - 1);
  }

  
  async function sendDataToServer() {
    
    if (!user) return;
    try {
      const { password, email, userName, fullName } = user;
    
      const dateOfBirth = new Date(
        +yearOfBirth,
        months.indexOf(monthOfBirth),
        dayOfBirth 
      ).toISOString();
      const body = JSON.stringify({
        email,
        password,
        userName,
        fullName,
        dateOfBirth,
      });

      const res = await fetch("http://localhost:4000/auth/sign-up-step-1", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
      });
      const data = (await res.json()) as string | ValidationError400;
      if (res.status === 400) {
        // it's impossible, since i check all data in sign up form , but still
        setResponseErros(true);
      }
      if (res.status === 201) {
        setResponseErros(false);
        dispatch(setId(data as string));
        dispatch(setDateOfBirth(dateOfBirth));
        
        handleChangeSignUpStep(true);
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="w-full sm:w-[35rem] sm:border-[.1px] border-white flex flex-col items-center pt-[2.5rem] pb-[2.5rem] ">
      <div className="w-[85%] flex flex-col items-center ">
        <div>
          <FaBirthdayCake
            className="w-[7.5rem] h-[7.5rem] mb-[2.5rem] ml-[1.5rem]"
            style={{ transform: "rotate(-14deg)" }}
          />
          <p className="text-xl">Add your Birthday</p>
        </div>
        <div className="mt-[2rem] text-center px-[2rem]">
          <p className="text-xl ">
            We need this data in order to use it agains you.
          </p>
          <p className="text-purple-400 text-xl">
            Why do i need to provide my birthday?
          </p>
        </div>
        <div className="mt-[1.3rem]">
          <DateSelector
            setButtonIsDisabled={setButtonIsDisabled}
            day={{ dayOfBirth, setDayOfBirth }}
            month={{ monthOfBirth, setMonthOfBirth }}
            year={{ yearOfBirth, setYearOfBirth }}
          />
        </div>
      </div>
      <div className="w-[75%] mx-auto text-center mt-[1rem]">
        <p>
          You need to enter the date you were born and you must have at least 14
          years, since we hate super-young-ass users
        </p>
        <p className="mt-[1.5rem]">
          Use your own birthday, don't even try to con
        </p>
        <div className="w-[85%] mx-auto sm:w-full mt-[2rem]">
          <AuthorizationButton
            type="button"
            content="Next"
            initialDisability={false}
            buttonIsDisabled={buttonIsDisabled}
            onClick={sendDataToServer}
          />
          <p
            onClick={handleChangeSignUpStep.bind(null, false)}
            className="mt-[1.5rem] text-xl text-purple-500 font-medium hover:text-purple-600 cursor-pointer"
          >
            Go Back
          </p>
        </div>
      </div>
      {responseErrors && (
        <p>Server errors occured, you're not able to sign up for a while.</p>
      )}
      <div className="text-center mt-[3rem] px-[6rem]">
        Some boring-ass description of some laws blah blah blah
      </div>
    </div>
  );
}
