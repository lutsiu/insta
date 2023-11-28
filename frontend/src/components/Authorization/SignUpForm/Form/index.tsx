import styles from "./styles.module.scss";
import AuthorizationButton from "../../../Buttons/Authorization";
import useGetFormik from "./useGetFormik";

interface Props {
  setSignUpStep: React.Dispatch<React.SetStateAction<number>>;
}
export default function FormStep1(props: Props) {
  const { setSignUpStep } = props;

  // logic for sign up step 1 is inside useGetFormik hook
  const {
    formik,
    initialDisability,
    buttonIsDisabled,
    userNameIsUsed,
    emailIsUsed,
  } = useGetFormik(setSignUpStep);

  return (
    <form
      className="w-full flex flex-col gap-[1rem] mt-[2rem]"
      onSubmit={formik.handleSubmit}
    >
      <div>
        {(formik.errors.email || emailIsUsed) && formik.touched.email && (
          <p className="mb-[1rem] text-pink-500 text-lg">
            {emailIsUsed
              ? "Another account is using the same email"
              : formik.errors.email}
          </p>
        )}
        <input
          type="text"
          className={`${styles.input} w-full outline-none text-xl border-[1px] bg-gray-100 py-[.7rem]  rounded-md px-[.7rem]`}
          style={{
            borderColor:
              (formik.errors.email || emailIsUsed) && formik.touched.email
                ? "rgb(219 39 119)"
                : "",
          }}
          placeholder="Email"
          name="email"
          value={formik.values.email}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
      </div>
      <div>
        {formik.errors.fullName && formik.touched.fullName && (
          <p className="mb-[1rem] text-pink-500 text-lg">
            {formik.errors.fullName}
          </p>
        )}
        <input
          type="text"
          className={`${styles.input} w-full outline-none text-xl border-[1px] bg-gray-100 py-[.7rem]  rounded-md px-[.7rem]`}
          style={{
            borderColor:
              formik.errors.fullName && formik.touched.fullName
                ? "rgb(219 39 119)"
                : "",
          }}
          placeholder="Full Name"
          name="fullName"
          value={formik.values.fullName}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
      </div>
      <div>
        {(formik.errors.userName || userNameIsUsed) && formik.touched.userName && (
          <p className="mb-[1rem] text-pink-500 text-lg">
            {userNameIsUsed ? "Another account is using the same username" : formik.errors.userName}
          </p>
        )}
        <input
          type="text"
          className={`${styles.input} w-full outline-none text-xl border-[1px] bg-gray-100 py-[.7rem]  rounded-md px-[.7rem]`}
          style={{
            borderColor:
            (formik.errors.userName || userNameIsUsed) && formik.touched.userName
                ? "rgb(219 39 119)"
                : "",
          }}
          placeholder="Username"
          name="userName"
          value={formik.values.userName}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
      </div>

      <div>
        {formik.errors.password && formik.touched.password && (
          <p className="mb-[1rem] text-pink-500 text-lg">
            {formik.errors.password}
          </p>
        )}
        <input
          type="password"
          className={`${styles.input} w-full outline-none text-xl border-[1px] bg-gray-100 py-[.7rem] rounded-md px-[.7rem]`}
          style={{
            borderColor:
              formik.errors.password && formik.touched.password
                ? "rgb(219 39 119)"
                : "",
          }}
          placeholder="Password"
          name="password"
          value={formik.values.password}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
      </div>
      <div className="">
        <div className="text-center">
          People who use our service will certainly sell information about you.
        </div>
        <div className="text-center mt-[1rem]">
          By signing up, you agree to be our slave to the end of your days.
          Learn how we collect, use and sell you data
        </div>
      </div>
      <AuthorizationButton
        content="Sign up"
        initialDisability={initialDisability}
        buttonIsDisabled={buttonIsDisabled}
      />
    </form>
  );
}
