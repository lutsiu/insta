import styles from "./styles.module.scss";
import { useFormik } from "formik";
import * as yup from "yup";
import { useState, useEffect } from "react";
import AuthorizationButton from "../../../Buttons/Authorization";
export default function Form() {
  const [initialDisability, setInitialDisability] = useState(true);
  const [buttonIsDisabled, setButtonIsDisabled] = useState(true);

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
      .required("Email or user name are required"),
    password: yup.string().required("Password is required").min(8),
  });

  const onSubmit = (values: { userNameOrEmail: string; password: string }) => {
    console.log("login");
    return;
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
  }, [formik]);

  return (
    <form
      className="w-full flex flex-col gap-[1rem]"
      onSubmit={formik.handleSubmit}
    >
      <div className="text-black">
        <input
          type="text"
          className={`${styles.input} w-full outline-none border-[1px] text-xl bg-gray-100 py-[.7rem]  rounded-md px-[.7rem]`}
          style={{borderColor: formik.errors.userNameOrEmail && formik.touched.userNameOrEmail ? 'rgb(219 39 119)' : ''}}
          placeholder="Username or email"
          name="userNameOrEmail"
          value={formik.values.userNameOrEmail}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
      </div>
      <div>
        <input
          type="password"
          className={`${styles.input} w-full outline-none border-[1px] text-xl bg-gray-100 py-[.7rem] rounded-md px-[.7rem]`}
          style={{borderColor: formik.errors.password && formik.touched.password ? 'rgb(219 39 119)' : ''}}
          placeholder="Password"
          name="password"
          value={formik.values.password}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
      </div>
      <AuthorizationButton
        content="Log in"
        initialDisability={initialDisability}
        buttonIsDisabled={buttonIsDisabled}
      />
    </form>
  );
}
