import { useEffect, useState } from "react";
import SignUpForm from "../../components/Authorization/SignUpForm";
import { Link } from "react-router-dom";
import AddBirthday from "../../components/Authorization/AddBirthday";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/user";
import { ReduxState } from "../../redux/stateInterface";
import ConfirmEmail from "../../components/Authorization/ConfirmEmail";
export default function SignUpPage() {
  const [signUpStep, setSignUpStep] = useState(0);
  const dispatch = useDispatch();
  const { user } = useSelector((state: ReduxState) => state.user);
  console.log(signUpStep)
  useEffect(() => {
    if (signUpStep === 3) return;
    async function deleteUserData(e: BeforeUnloadEvent) {
      if (signUpStep === 3) return;

      e.preventDefault();

      try {
        /* 
          if user refreshes page or smth like that, 
          all his data that was saved in redux and,
          if he passed date step, database data will be deleted
        */
        if (!user) return;
        const { userName, dateOfBirth } = user;

        if (dateOfBirth && dateOfBirth.length > 0) {
          await fetch(
            `http://localhost:4000/auth/delete-user-data/${userName}`,
            {
              method: "DELETE",
              headers: { "Content-Type": "application/json" },
            }
          );
        }
        dispatch(logout());
      } catch (err) {
        console.log(err);
      }
    }
    if (signUpStep !== 3) {
      window.addEventListener("beforeunload", deleteUserData);
    }
    return () => {
      window.removeEventListener("beforeunload", deleteUserData);
    };
  }, [dispatch, user, signUpStep]);

  return (
    <main className="pt-[1.5rem]">
      <div className="flex flex-col items-center">
        {signUpStep === 0 && <SignUpForm setSignUpStep={setSignUpStep} />}
        {signUpStep === 1 && <AddBirthday setSignUpStep={setSignUpStep} />}
        {signUpStep === 2 && <ConfirmEmail setSignUpStep={setSignUpStep}/>}
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
