import { Link } from "react-router-dom";
import LoginForm from "../../components/Authorization/LoginForm";

export default function LoginPage() {
  return (
    <main className=" pt-[4rem]">
      <div className="flex flex-col items-center">
        <LoginForm />
        <div className="w-full sm:w-[35rem] sm:border-[.1px] border-white flex flex-col items-center mt-[1rem] py-[2rem] text-lg">
          <p>
            Don't have an account? <Link to="/sign-up" className="text-purple-400">Sign up</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
