import {
  ContainerComponent,
  FormComponent,
  LoadingComponent,
} from "../../components";
import RegisterImage from "../../assets/register.png";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Button } from "@nextui-org/button";
import { Link, useNavigate } from "react-router-dom";

import toast from "react-hot-toast";
import { useRegisterMutation } from "../../store/endpoints/authEndpoints";
import { APIErrorType, FormValueType } from "../../types/auth.types";
import { useEffect } from "react";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";

const RegisterPage = () => {
  //   initial value
  const initialValue: FormValueType = {
    name: "",
    email: "",
    phone: "",
    password: "",
  };

  //   form validation
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    name: Yup.string().required("Name is required"),
    phone: Yup.string()
      .required("Phone number is required")
      .max(12, "Invalid phone number"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const navigate = useNavigate();

  const [registerFun, { data, isSuccess }] = useRegisterMutation();

  useEffect(() => {
    if (data && isSuccess) {
      toast.success(data?.message);
      navigate("/login");
    }
  }, [data, isSuccess, navigate]);

  const handleSubmit = async (values: FormValueType): Promise<void> => {
    try {
      await registerFun(values).unwrap();
    } catch (err) {
      const apiError = err as APIErrorType;
      if (apiError.data?.errors) {
        if (apiError.data?.errors) {
          apiError.data.errors.email &&
            toast.error(apiError.data.errors.email[0]);
          apiError.data.errors.phone &&
            toast.error(apiError.data.errors.phone[0]);
        }
      }
    }
  };

  return (
    <ContainerComponent>
      <div className=" max-w-3xl mx-auto">
        <Breadcrumbs className=" my-10">
          <BreadcrumbItem>
            <Link to={"/"}>Home</Link>
          </BreadcrumbItem>
          <BreadcrumbItem>Register</BreadcrumbItem>
        </Breadcrumbs>
        <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center border border-l-slate-100 p-5 rounded-lg">
          <div className=" hidden md:block">
            <img
              width={600}
              height={600}
              src={RegisterImage}
              alt="Register visual"
              loading="lazy"
            />
          </div>

          <div className=" w-full">
            <div className="mb-3 text-center">
              <h1 className=" text-xl font-bold text-primary">
                Welcome To Gatherly
              </h1>
              <p className=" text-xs text-slate-500">
                Please Register your account
              </p>
            </div>
            <Formik
              initialValues={initialValue}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({
                values,
                handleBlur,
                handleChange,
                isSubmitting,
                errors,
                touched,
              }) => (
                <Form className=" space-y-3">
                  <FormComponent
                    value={values.email}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    type="email"
                    name="email"
                    label="Email"
                    placeholder="Enter your email"
                    error={errors.email}
                    touched={touched.email}
                  />
                  <FormComponent
                    value={values.name}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    type="text"
                    name="name"
                    label="Name"
                    placeholder="Enter your name"
                    error={errors.name}
                    touched={touched.name}
                  />
                  <FormComponent
                    value={values.phone}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    type="text"
                    name="phone"
                    label="Phone"
                    placeholder="Enter your phone number"
                    error={errors.phone}
                    touched={touched.phone}
                  />

                  <FormComponent
                    value={values.password}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    type="password"
                    name="password"
                    label="Password"
                    placeholder="Enter your password"
                    error={errors.password}
                    touched={touched.password}
                  />
                  <Button
                    disabled={isSubmitting}
                    radius="sm"
                    className=" w-full"
                    color="primary"
                    type="submit"
                  >
                    {isSubmitting ? <LoadingComponent /> : "Register"}
                  </Button>
                </Form>
              )}
            </Formik>
            <div className=" mt-3 text-center">
              <p className=" text-xs text-slate-500">
                Already have an account?{" "}
                <Link to={"/login"} className=" text-primary">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </ContainerComponent>
  );
};

export default RegisterPage;
