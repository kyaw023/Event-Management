import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ContainerComponent,
  FormComponent,
  LoadingComponent,
} from "../components";
import { BreadcrumbItem, Breadcrumbs, Button, Image } from "@nextui-org/react";

import { Form, Formik } from "formik";
import * as Yup from "yup";
import EventRegisterImage from "../assets/Connected world-cuate (1).png";
import { useGetRegisterEventMutation } from "../store/endpoints/eventEndpoints";
import toast from "react-hot-toast";
import { ValidationErrorResponse } from "../types/event.types";

const EventRegisterPage = () => {
  const { id } = useParams<{ id: string }>();

  const eventId = Number(id);

  const [registerEvent, { isSuccess }] = useGetRegisterEventMutation();

  const navigate = useNavigate();

  type InitialValuesTypes = {
    name: string;
    email: string;
    phone: string;
    dob: string;
  };

  const initialValues: InitialValuesTypes = {
    name: "",
    email: "",
    phone: "",
    dob: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string()
      .matches(/^[0-9]{9,11}$/, "Phone number is not valid")
      .required("Phone is required"),
    dob: Yup.string().required("Date of Birth is required"),
  });

  const handleRegister = async (values: InitialValuesTypes) => {
    try {
      const response = await registerEvent({
        id: eventId,
        registrationData: values,
      }).unwrap();

      // Handle response

      // Example: Redirect to success page

      if (isSuccess) {
        navigate("/");
        toast.success(`Registration successful:${response.message}`);
      }
    } catch (error: any) {
      const validationError = error as ValidationErrorResponse;

      if (validationError?.status === 422 && validationError.data?.errors) {
        // Handle specific validation errors
        const { errors, message } = validationError.data;

        // Handle email validation errors
        if (errors.email) {
          toast.error(`Email error: ${errors.email.join(", ")}`);
        }

        // Handle phone validation errors
        if (errors.phone) {
          toast.error(`Phone error:${errors.phone.join(", ")}`);
        }

        // Handle any other validation errors
        toast.error(`Validation failed:${message}`);
      } else {
        // Handle any other type of error (e.g., network issues, unknown errors)
        toast.error(`An unknown error occurred: ${error}`);
      }
    }
  };

  
  return (
    <ContainerComponent>
      <div className=" mt-10">
        <Breadcrumbs>
          <BreadcrumbItem>
            <Link to={"/"}>Home</Link>
          </BreadcrumbItem>
          <BreadcrumbItem>Event Register</BreadcrumbItem>
        </Breadcrumbs>
        <h1
          className=" my-3 text-xl font-semibold
        "
        >
          Event Register
        </h1>
        <div className=" flex items-center justify-center gap-5">
          <div className=" w-[600px] border border-slate-200 p-8 rounded-xl">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleRegister}
            >
              {({
                values,
                handleBlur,
                handleChange,
                errors,
                touched,
                isSubmitting,
              }) => (
                <Form className="grid grid-cols-2 gap-3">
                  <FormComponent
                    value={values.name}
                    name="name"
                    label="Name"
                    type="text"
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    error={errors.name}
                    placeholder=""
                    touched={touched.name}
                  />

                  <FormComponent
                    value={values.email}
                    name="email"
                    label="Email"
                    type="text"
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    error={errors.email}
                    placeholder="example@gmail.com"
                    touched={touched.email}
                  />

                  <FormComponent
                    value={values.phone}
                    name="phone"
                    label="Phone"
                    type="text"
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    error={errors.phone}
                    placeholder="09********"
                    touched={touched.phone}
                  />

                  <FormComponent
                    value={values.dob}
                    name="dob"
                    label="Date of Birth"
                    type="date"
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    error={errors.dob}
                    placeholder=""
                    touched={touched.dob}
                  />

                  <div className=" space-x-3">
                    <Button variant="bordered" radius="sm" color="primary">
                      Cancel
                    </Button>
                    <Button
                      disabled={isSubmitting}
                      type="submit"
                      radius="sm"
                      color="primary"
                    >
                      {isSubmitting ? <LoadingComponent /> : "Register"}
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>

          <div>
            <Image
              height={300}
              alt="NextUI hero Image"
              src={EventRegisterImage}
            />
          </div>
        </div>
      </div>
    </ContainerComponent>
  );
};

export default EventRegisterPage;
