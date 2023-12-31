import { useFormik } from "formik";
import * as yup from "yup";
import { ValidationError409 } from "./errorInterfaces";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  signUpStep1
} from "../../../../redux/user";
import {ReduxState} from '../../../../redux/stateInterface';
export default function useGetFormik(
  setSignUpStep: React.Dispatch<React.SetStateAction<number>>
) {
  const [initialDisability, setInitialDisability] = useState(true);
  const [buttonIsDisabled, setButtonIsDisabled] = useState(true);
  const [emailIsUsed, setEmailIsUsed] = useState(false);
  const [userNameIsUsed, setUserNameIsUsed] = useState(false);
  const dispatch = useDispatch();
  const {user} = useSelector((state: ReduxState) => state.user);
  const initialValues = {
    email: user?.email ? user.email: "",
    userName: user?.userName ? user.userName : "",
    fullName: user?.fullName ? user.fullName : "",
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

  const onSubmit = (values: {
    email: string;
    userName: string;
    fullName: string;
    password: string;
  }) => {
    dispatch(signUpStep1(values));
    setSignUpStep((prev) => prev + 1);
  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  useEffect(() => {
    async function checkEmailUniqueness() {
      try {
        const body = JSON.stringify({
          email: formik.values.email.trim(),
        });

        const res = await fetch(
          "http://localhost:4000/auth/check-email-uniqueness",
          {
            body,
            method: "POST",
            headers: { "Content-Type": "application/json" },
          }
        );
        const data = (await res.json()) as string | ValidationError409;
        if (res.status === 409) {
          const { errorField, message } = data as ValidationError409;
          formik.setFieldError(errorField, message);
          setEmailIsUsed(true);
        } else {
          setEmailIsUsed(false);
        }

      } catch (err) {
        console.log(err);
      }
    }
    checkEmailUniqueness();
  }, [formik.values.email]);

  useEffect(() => {
    async function checkUsernnameUniqueness() {
      try {
        const body = JSON.stringify({
          userName: formik.values.userName.toLowerCase().trim(),
        });

        const res = await fetch(
          "http://localhost:4000/auth/check-username-uniqueness",
          {
            body,
            method: "POST",
            headers: { "Content-Type": "application/json" },
          }
        );
        const data = (await res.json()) as string | ValidationError409;
        if (res.status === 409) {
          const { errorField, message } = data as ValidationError409;
          formik.setFieldError(errorField, message);
          setUserNameIsUsed(true);
        } else {
          setUserNameIsUsed(false);
        }

      } catch (err) {
        console.log(err);
      }
    }
    checkUsernnameUniqueness();
  }, [formik.values.userName]);

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
      !formik.errors.userName &&
      !userNameIsUsed &&
      !emailIsUsed
    ) {
      setButtonIsDisabled(false);
    }
    if (
      formik.errors.password ||
      formik.errors.email ||
      formik.errors.userName ||
      formik.errors.fullName ||
      userNameIsUsed ||
      emailIsUsed
    ) {
      setButtonIsDisabled(true);
    }
  }, [formik]);
  return {
    formik,
    initialDisability,
    buttonIsDisabled,
    userNameIsUsed,
    emailIsUsed,
  };
}
