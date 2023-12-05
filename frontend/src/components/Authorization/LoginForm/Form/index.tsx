import styles from "./styles.module.scss";
import { useFormik } from "formik";
import * as yup from "yup";
import { useState, useEffect } from "react";
import AuthorizationButton from "../../../Buttons/Authorization";
import { IUser } from "../../../../interfaces/models";
import { useDispatch } from "react-redux";
import { login } from "../../../../redux/user";
import { useNavigate } from "react-router-dom";
export default function Form() {
  // state
  const [initialDisability, setInitialDisability] = useState(true);
  const [buttonIsDisabled, setButtonIsDisabled] = useState(true);
  const [credentialWereWrong, setCredentialsWereWrong] = useState(false);
  // state to set values of password and username right after credentials
  //error in order to set credentials back to false, if one of this values will be changed
  const [
    userNameValueAfterCredentialsError,
    setUserNameValueAfterCredentialsError,
  ] = useState("");
  const [
    passwordValueAfterCredentialsError,
    setPasswordValueAfterCredentialsError,
  ] = useState("");
  // redux and router-dom
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // formik and yup
  const initialValues = {
    userNameOrEmail: "",
    password: "",
  };

  const validationSchema = yup.object({
    userNameOrEmail: yup
      .string()
      .test(
        "is-email-or-username",
        "Enter a valid email or username",
        function (value) {
          const isEmail = yup.string().email().isValidSync(value);
          const isUsername = yup.string().max(40).isValidSync(value);
          return isEmail || isUsername;
        }
      )
      .required("User name or email are required"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password has to be at least 8 characters long"),
  });

  const onSubmit = async (values: {
    userNameOrEmail: string;
    password: string;
  }) => {
    try {
      const body = JSON.stringify(values);
      const res = await fetch("http://localhost:4000/auth/login", {
        body,
        headers: { "Content-type": "application/json" },
        method: "POST",
      });
      const responseData = (await res.json()) as string | IUser;
      if (res.status === 404) {
        setCredentialsWereWrong(true);
        setUserNameValueAfterCredentialsError(values.userNameOrEmail);
        setPasswordValueAfterCredentialsError(values.password);
      }
      if (res.status === 500) {
        console.log("Server error");
      }
      if (res.status === 200) {
        setCredentialsWereWrong(false);
        dispatch(login({ user: responseData as IUser }));
        navigate("/home");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  useEffect(() => {
    if (formik.touched.password || formik.touched.userNameOrEmail) {
      setInitialDisability(false);
    }
    if (!formik.errors.password && !formik.errors.userNameOrEmail) {
      setButtonIsDisabled(false);
    }
    if (formik.errors.password || formik.errors.userNameOrEmail) {
      setButtonIsDisabled(true);
    }
    if (
      credentialWereWrong &&
      (passwordValueAfterCredentialsError !== formik.values.password ||
        userNameValueAfterCredentialsError !== formik.values.userNameOrEmail)
    ) {
      setCredentialsWereWrong(false);
    }
  }, [
    formik,
    credentialWereWrong,
    passwordValueAfterCredentialsError,
    userNameValueAfterCredentialsError,
  ]);

  console.log(formik.errors);
  return (
    <form
      className="w-full flex flex-col gap-[1rem]"
      onSubmit={formik.handleSubmit}
    >
      <div className="text-black">
        {formik.errors.userNameOrEmail && formik.touched.userNameOrEmail && (
          <p className="mb-[1rem] text-pink-500 text-lg">
            {formik.errors.userNameOrEmail}
          </p>
        )}
        {credentialWereWrong && (
          <p className="mb-[1rem] text-pink-500 text-lg">
            {"Credentials you've entered were wrong"}
          </p>
        )}
        <input
          type="text"
          className={`${styles.input} w-full outline-none border-[1px] text-xl bg-gray-100 py-[.7rem]  rounded-md px-[.7rem]`}
          style={{
            borderColor:
              formik.errors.userNameOrEmail && formik.touched.userNameOrEmail
                ? "rgb(219 39 119)"
                : "",
          }}
          placeholder="Username or email"
          name="userNameOrEmail"
          value={formik.values.userNameOrEmail}
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
          className={`${styles.input} w-full outline-none border-[1px] text-xl bg-gray-100 py-[.7rem] rounded-md px-[.7rem]`}
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
      <AuthorizationButton
        type="submit"
        content="Log in"
        initialDisability={initialDisability}
        buttonIsDisabled={buttonIsDisabled}
      />
    </form>
  );
}
