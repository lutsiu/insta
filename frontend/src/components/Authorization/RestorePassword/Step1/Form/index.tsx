import styles from "../styles.module.scss";
import AuthorizationButton from "../../../../Buttons/Authorization";
import { useFormik } from "formik";
import * as yup from "yup";
import { useEffect, useState } from "react";
export default function Form() {
  const [initialDisability, setInitialDisability] = useState(true);
  const [buttonIsDisabled, setButtonIsDisabled] = useState(false);
  const [errorResponse, setErrorResponse] = useState("");
  const [linkWasSend, setLinkWasSend] = useState(false);
  const initialValues = {
    email: "",
  };

  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Enter valid email address")
      .required("Email is a required field"),
  });

  const onSubmit = async (values: { email: string }) => {
    try {
      const body = JSON.stringify(values);
      const res = await fetch(
        "http://localhost:4000/auth/send-restore-password-link",
        {
          method: "POST",
          body,
          headers: { "Content-Type": "application/json" },
        }
      );
      const responseString = await res.json() as string;
      if (res.status === 404 || res.status === 500) {
        setErrorResponse(responseString);
      }
      if (res.status === 200) {
        setErrorResponse("");
        setLinkWasSend(prev => !prev);
        
      }
    } catch (err) {
      console.log(err);
    }
  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  useEffect(() => {
    if (formik.values.email) {
      setInitialDisability(false);
    }
    if (formik.errors.email) {
      setButtonIsDisabled(true);
    }
    if (!formik.errors.email) {
      setButtonIsDisabled(false);
    }
    if (linkWasSend) {
      setButtonIsDisabled(true);
    }
  }, [formik.errors.email, formik.values.email, linkWasSend]);
  return (
    <form
      className="w-full flex flex-col gap-[1rem] mt-[1.5rem]"
      onSubmit={formik.handleSubmit}
    >
      <div>
        {(formik.errors.email && formik.touched.email) ||
          (errorResponse.length > 0 && (
            <p className="mb-[1rem] text-pink-500 text-lg">
              {errorResponse.length > 0
                ? "Account with this email wasn't found"
                : formik.errors.email}
            </p>
          ))}
        {linkWasSend && (
          <p className="mb-[1rem] text-green-500 text-lg">
            {"Check your email, the link was send"}
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
      <AuthorizationButton
        type="submit"
        content="Send login link"
        initialDisability={initialDisability}
        buttonIsDisabled={buttonIsDisabled}
      />
    </form>
  );
}
