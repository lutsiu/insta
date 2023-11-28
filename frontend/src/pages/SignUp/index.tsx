import { useState } from "react";
import SignUpForm from "../../components/Authorization/SignUpForm";
import { Link } from "react-router-dom";
import AddBirthday from "../../components/Authorization/AddBirthday";
export default function SignUpPage() {
  const [signUpStep, setSignUpStep] = useState(0);
 
  return (
    <main className="pt-[1.5rem]">
      <div className="flex flex-col items-center">
        {signUpStep === 0 && <SignUpForm setSignUpStep={setSignUpStep} />}
        {signUpStep === 1 && <AddBirthday/>}
        <div className="w-full sm:w-[35rem] sm:border-[.1px] border-white flex flex-col items-center mt-[1rem] py-[2rem] text-lg">
          <p>
            Have an account?{" "}
            <Link to="/" className="text-purple-400">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
