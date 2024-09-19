import {
  ContainerComponent,
  FormComponent,
  LoadingComponent,
} from "../../components";
import loginImage from "../../assets/login.svg";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Button } from "@nextui-org/button";
import { Link, useNavigate } from "react-router-dom";
import { LoginRequest } from "../../types/auth.types";
import { useLoginMutation } from "../../store/endpoints/authEndpoints";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import {
  loginFailure,
  loginStart,
  loginSuccess,
} from "../../store/slice/auth/auth.slice";

const LoginPage: React.FC = () => {
  const [loginFun] = useLoginMutation();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  //   initial value
  const initialValue: LoginRequest = {
    email: "",
    password: "",
  };

  //   form validation
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  // login handler for server side and client side
  const handleSubmit = async (values: LoginRequest): Promise<void> => {
    dispatch(loginStart());
    try {
      const response = await loginFun(values).unwrap();
      dispatch(loginSuccess({ user: response.user, token: response.token }));
      navigate("/");
      toast.success("Login successful");
    } catch (error: any) {
      dispatch(loginFailure("Login failed: " + error.message));
      toast.error("Login failed: Wrong Password or Email");
    }
  };
  return (
    <ContainerComponent>
      <div className=" max-w-3xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center mt-20 border border-l-slate-100 p-5 rounded-lg">
          <div className="hidden md:block">
            <img width={600} height={600} src={loginImage} alt="" />
          </div>

          <div className=" w-full">
            <div className="mb-3 text-center">
              <h1 className=" text-xl font-bold text-primary">Gatherly</h1>
              <p className=" text-xs text-slate-500">
                Please Login your account
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
                errors,
                touched,
                isSubmitting,
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
                    radius="sm"
                    className=" w-full"
                    color="primary"
                    type="submit"
                  >
                    {isSubmitting ? <LoadingComponent /> : "Login"}
                  </Button>
                </Form>
              )}
            </Formik>
            <div className=" mt-3 text-center">
              <p className=" text-xs text-slate-500">
                Don't have an account?{" "}
                <Link to={"/register"} className=" text-primary">
                  Register
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </ContainerComponent>
  );
};

export default LoginPage;
