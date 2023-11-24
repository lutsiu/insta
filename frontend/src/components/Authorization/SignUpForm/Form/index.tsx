import styles from "./styles.module.scss";
import { useFormik } from "formik";
import * as yup from "yup";
import { useState, useEffect } from "react";
import AuthorizationButton from "../../../Buttons/Authorization";
import { ValidationError400, ValidationError409 } from "./errorInterfaces";
export default function Form() {
  const [initialDisability, setInitialDisability] = useState(true);
  const [buttonIsDisabled, setButtonIsDisabled] = useState(true);
  const initialValues = {
    email: "",
    userName: "",
    fullName: "",
    password: "",
  };

  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Enter valid email address")
      .required("Email is a required field"),
    userName: yup
      .string()
      .required("Username is a required field")
      .max(40, "Username can't be longer than 40 characters")
      .min(2, "Username must contain at least 2 characters"),
    fullName: yup
      .string()
      .required("Full name is a required field")
      .max(50, "Full name can't be longer than 50 characters")
      .min(2, "Full name must contain at least 2 characters"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must contain at least 8 characters"),
  });

  const onSubmit = async (values: {
    email: string;
    userName: string;
    fullName: string;
    password: string;
  }) => {
    try {
      const body = JSON.stringify(values);
      const res = await fetch("http://localhost:4000/auth/sign-up/step-1", {
        headers: { "Content-Type": "application/json" },
        body,
        method: "POST",
      });
      const data = (await res.json()) as
        | ValidationError409
        | ValidationError400
        | string;
      if (res.status === 400) {
        const { errors } = data as ValidationError400;
        errors.forEach((err) => {
          console.log(err);
          formik.setFieldError(err.path, err.msg);
        });
      }
      if (res.status === 409) {
        const { errorField, message } = data as ValidationError409;
        formik.setFieldError(errorField, message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  useEffect(() => {
    if (
      formik.touched.password ||
      formik.touched.email ||
      formik.touched.userName ||
      formik.touched.fullName
    ) {
      setInitialDisability(false);
    }
    if (
      !formik.errors.password &&
      !formik.errors.email &&
      !formik.errors.fullName &&
      !formik.errors.userName
    ) {
      setButtonIsDisabled(false);
    }
    if (
      formik.errors.password ||
      formik.errors.email ||
      formik.errors.userName ||
      formik.errors.fullName
    ) {
      setButtonIsDisabled(true);
    }
  }, [formik]);

  console.log(formik.errors);

  return (
    <form
      className="w-full flex flex-col gap-[1rem] mt-[2rem]"
      onSubmit={formik.handleSubmit}
    >
      <div>
        {formik.errors.email && formik.touched.email && (
          <p className="mb-[1rem] text-pink-500 text-lg">
            {formik.errors.email}
          </p>
        )}
        <input
          type="text"
          className={`${styles.input} w-full outline-none text-xl border-[1px] bg-gray-100 py-[.7rem]  rounded-md px-[.7rem]`}
          style={{
            borderColor:
              formik.errors.email && formik.touched.email
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
        {formik.errors.userName && formik.touched.userName && (
          <p className="mb-[1rem] text-pink-500 text-lg">
            {formik.errors.userName}
          </p>
        )}
        <input
          type="text"
          className={`${styles.input} w-full outline-none text-xl border-[1px] bg-gray-100 py-[.7rem]  rounded-md px-[.7rem]`}
          style={{
            borderColor:
              formik.errors.userName && formik.touched.userName
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
