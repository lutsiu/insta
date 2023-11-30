import styles from "../../Step1/styles.module.scss";
import AuthorizationButton from "../../../../Buttons/Authorization";
import { useFormik } from "formik";
import * as yup from "yup";
import { useEffect, useState } from "react";
export default function Form() {
  const [initialDisability, setInitialDisability] = useState(true);
  const [buttonIsDisabled, setButtonIsDisabled] = useState(false);

  const initialValues = {
    password: "",
    passwordAgain: "",
  };

  const validationSchema = yup.object({
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters long")
      .required("Email is a required field"),
    passwordAgain: yup
      .string()
      .min(8, "Password must be at least 8 characters long")
      .required("Email is a required field"),
  });

  const onSubmit = (values: { password: string; passwordAgain: string }) => {};

  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  useEffect(() => {
    if (formik.values.password || formik.values.passwordAgain) {
      setInitialDisability(false);
    }
    if (formik.errors.password || formik.errors.passwordAgain) {
      setButtonIsDisabled(true);
    }
    if (!formik.errors.password && !formik.errors.passwordAgain) {
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
          type="passwordAgain"
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
