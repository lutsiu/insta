import { useFormik } from "formik";
import * as yup from "yup";
import { ValidationError400, ValidationError409 } from "./errorInterfaces";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setId } from "../../../../redux/user";

export default function useGetFormik(setSignUpStep: React.Dispatch<React.SetStateAction<number>>) {
  const [initialDisability, setInitialDisability] = useState(true);
  const [buttonIsDisabled, setButtonIsDisabled] = useState(true);
  const dispatch = useDispatch();
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
      if (res.status === 201) {
        const userId = data as string;
        console.log('done')
        dispatch(setId(userId));
        setSignUpStep(prev => prev+ 1);
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
  return {formik, initialDisability, buttonIsDisabled}
}