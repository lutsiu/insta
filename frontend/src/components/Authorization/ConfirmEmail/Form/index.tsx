import { useFormik } from "formik";
import * as yup from "yup";
import { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import AuthorizationButton from "../../../Buttons/Authorization";
import { useSelector } from "react-redux";
import { ReduxState } from "../../../../redux/stateInterface";
import {useNavigate} from 'react-router-dom';
interface Props {
  setSignUpStep: React.Dispatch<React.SetStateAction<number>>;
  codeWasResend: boolean;
  errorResponse: string;
  setErrorResponse: React.Dispatch<React.SetStateAction<string>>;
}
export default function Form(props: Props) {
  const { user } = useSelector((state: ReduxState) => state.user);
  const {
    setSignUpStep,
    codeWasResend,

    errorResponse,
    setErrorResponse,
  } = props;
  const [initialDisability, setInitialDisability] = useState(true);
  const [buttonIsDisabled, setButtonIsDisabled] = useState(true);
  const navigate = useNavigate();
  const initialValues = {
    confirmationCode: "",
  };

  const validationSchema = yup.object({
    confirmationCode: yup
      .string()
      .required("Confirmation code is a required field")
      .length(6, "Confirmation code is 6 numbers long"),
  });

  const onSubmit = async (values: { confirmationCode: string }) => {
    try {
      if (!user) return;
      const body = JSON.stringify({
        confirmationCode: values.confirmationCode,
        _id: user._id,
      });
      const res = await fetch(
        `http://localhost:4000/auth/check-confirmation-code`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body,
        }
      );
      const responseString = (await res.json()) as string;
      if (res.status === 409 || res.status === 404 || res.status === 400) {
        setErrorResponse(responseString);
      }
      if (res.status === 201) {
        setErrorResponse("");
        setSignUpStep(3);
        setTimeout(() => {
            navigate('/')
        }, 500);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  useEffect(() => {
    if (formik.values.confirmationCode) {
      setInitialDisability(false);
    }
    if (formik.errors.confirmationCode) {
      setButtonIsDisabled(true);
    }
    if (!formik.errors.confirmationCode) {
      setButtonIsDisabled(false);
    }
  }, [formik.values.confirmationCode, formik.errors.confirmationCode]);
  return (
    <>
      <form
        className="w-[85%] flex flex-col gap-[1rem] mt-[2.5rem]"
        onSubmit={formik.handleSubmit}
      >
        <div>
          {formik.errors.confirmationCode &&
            formik.touched.confirmationCode && (
              <p className="mb-[1rem] text-pink-500 text-lg">
                {formik.errors.confirmationCode}
              </p>
            )}
          {codeWasResend && (
            <p className="text-center text-xl mb-[1.5rem]">Your code was resend</p>
          )}
          <input
            type="text"
            className={`${styles.input} w-full outline-none text-xl border-[1px] bg-gray-100 py-[.7rem]  rounded-md px-[.7rem]`}
            style={{
              borderColor:
                formik.errors.confirmationCode && formik.touched.confirmationCode
                  ? "rgb(219 39 119)"
                  : "",
            }}
            placeholder="Confirmation Code"
            name="confirmationCode"
            value={formik.values.confirmationCode}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
        </div>
        <AuthorizationButton
          type="submit"
          content="Next"
          initialDisability={initialDisability}
          buttonIsDisabled={buttonIsDisabled}
        />
      </form>
      <p className="mt-[1.5rem] text-xl text-purple-500 font-medium hover:text-purple-600 cursor-pointer">
        Go Back
      </p>
      {errorResponse.length > 0 && (
        <p className="mt-[1.5rem] text-xl text-pink-600 font-medium">
          {errorResponse}
        </p>
      )}
    </>
  );
}
