import { useEffect, useState } from "react";
import SignUpForm from "../../components/Authorization/SignUpForm";
import { Link } from "react-router-dom";
import AddBirthday from "../../components/Authorization/AddBirthday";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/user";
import { ReduxState } from "../../redux/stateInterface";
export default function SignUpPage() {
  const [signUpStep, setSignUpStep] = useState(0);
  const dispatch = useDispatch();
  const { user } = useSelector((state: ReduxState) => state.user);

  useEffect(() => {
    async function deleteUserData(e: BeforeUnloadEvent) {
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
          const res = await fetch(
            `http://localhost:4000/auth/delete-user-data/lutsiu`,
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
    window.addEventListener("beforeunload", deleteUserData);
  }, [dispatch, user]);

  return (
    <main className="pt-[1.5rem]">
      <div className="flex flex-col items-center">
        {signUpStep === 0 && <SignUpForm setSignUpStep={setSignUpStep} />}
        {signUpStep === 1 && <AddBirthday setSignUpStep={setSignUpStep} />}
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
