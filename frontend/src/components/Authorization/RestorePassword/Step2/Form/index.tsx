import styles from "../../Step1/styles.module.scss";
import AuthorizationButton from "../../../../Buttons/Authorization";
import { useFormik } from "formik";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
export default function Form() {
  // get queries
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const token = queryParams.get("token");
  const id = queryParams.get("id");

  // state
  const [initialDisability, setInitialDisability] = useState(true);
  const [buttonIsDisabled, setButtonIsDisabled] = useState(false);
  const [responseError, setResponseError] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const [passwordWasChanged, setPasswordWasChanged] = useState(false);

  //  router-dom
  const navigate = useNavigate();

  // formik
  const initialValues = {
    password: "",
    passwordAgain: "",
  };

  const validationSchema = yup.object({
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters long")
      .required("Password is a required field"),
    passwordAgain: yup
      .string()
      .min(8, "Password must be at least 8 characters long")
      .required("And you need to repeat password too"),
  });

  const onSubmit = async (values: {
    password: string;
    passwordAgain: string;
  }): Promise<void> => {
    try {
      const body = JSON.stringify({
        password: values.password,
        id,
        resetToken: token,
      });
      const res = await fetch("http://localhost:4000/auth/change-password", {
        method: "PUT",
        body,
        headers: { "Content-Type": "application/json" },
      });
      const responseString = (await res.json()) as string;
      if (res.status === 404 || res.status === 500) {
        setResponseError(responseString);
      }
      if (res.status === 200) {
        setPasswordWasChanged(true);
        setTimeout(() => {
          navigate("/");
        }, 3000);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  // change state depending of errors, values, etc
  useEffect(() => {
    const formikErrors = formik.errors.password || formik.errors.passwordAgain;
    const noErrros = !formik.errors.password && !formik.errors.passwordAgain;

    if (formik.values.password || formik.values.passwordAgain) {
      setInitialDisability(false);
    }
    if (formikErrors) {
      setButtonIsDisabled(true);
    }
    if (noErrros) {
      setButtonIsDisabled(false);
    }
    if (formik.values.password !== formik.values.passwordAgain) {
      setButtonIsDisabled(true);
      setPasswordsMatch(false);
    }
    if (formik.values.password === formik.values.passwordAgain && noErrros) {
      setPasswordsMatch(true);
      setButtonIsDisabled(false);
    }
  }, [
    formik.errors.password,
    formik.values.password,
    formik.errors.passwordAgain,
    formik.values.passwordAgain,
  ]);

  return (
    <form
      className="w-full flex flex-col gap-[1rem] mt-[1.5rem]"
      onSubmit={formik.handleSubmit}
    >
      <div>
        {formik.errors.password && formik.touched.password && (
          <p className="mb-[1rem] text-pink-500 text-lg">
            {formik.errors.password}
          </p>
        )}
        {(formik.touched.password &&
          formik.touched.passwordAgain &&
          !passwordsMatch) ||
          (responseError.length > 0 && (
            <p className="mb-[1rem] text-pink-500 text-lg">
              {responseError.length > 0
                ? responseError
                : "Passwords you've provived don't match"}
            </p>
          ))}
        {passwordWasChanged && (
          <p className="mb-[1rem] text-green-500 text-lg">
            You password was successfully changed. You'll be redirected in a
            while
          </p>
        )}
        <input
          type="password"
          className={`${styles.input} w-full outline-none text-xl border-[1px] bg-gray-100 py-[.7rem]  rounded-md px-[.7rem]`}
          style={{
            borderColor:
              formik.errors.password && formik.touched.password
                ? "rgb(219 39 119)"
                : "",
          }}
          placeholder="New Password"
          name="password"
          value={formik.values.password}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
      </div>

      <div>
        {formik.errors.passwordAgain && formik.touched.passwordAgain && (
          <p className="mb-[1rem] text-pink-500 text-lg">
            {formik.errors.passwordAgain}
          </p>
        )}
        <input
          type="password"
          className={`${styles.input} w-full outline-none text-xl border-[1px] bg-gray-100 py-[.7rem]  rounded-md px-[.7rem]`}
          style={{
            borderColor:
              formik.errors.passwordAgain && formik.touched.passwordAgain
                ? "rgb(219 39 119)"
                : "",
          }}
          placeholder="New password, again"
          name="passwordAgain"
          value={formik.values.passwordAgain}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
      </div>

      <AuthorizationButton
        type="submit"
        content="Reset password"
        initialDisability={initialDisability}
        buttonIsDisabled={buttonIsDisabled}
      />
    </form>
  );
}
