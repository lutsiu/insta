import { FaBirthdayCake } from "react-icons/fa";
import { useState } from "react";
import DateSelector from "./DateSelector";
import AuthorizationButton from "../../Buttons/Authorization";
export default function AddBirthday() {
  const [buttonIsDisabled, setButtonIsDisabled] = useState(true);

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
          <DateSelector setButtonIsDisabled={setButtonIsDisabled} />
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
            content="Next"
            initialDisability={false}
            buttonIsDisabled={buttonIsDisabled}
          />
          <p className="mt-[1.5rem] text-xl text-purple-500 font-medium hover:text-purple-600 cursor-pointer">
            Go Back
          </p>
        </div>
      </div>
      <div className="text-center mt-[3rem] px-[6rem]">
        Some boring-ass description of some laws blah blah blah
      </div>
    </div>
  );
}
