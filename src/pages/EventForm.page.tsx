import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import {
  ContainerComponent,
  FormPageThreeComponent,
  FormPageTwoComponent,
  LoadingComponent,
} from "../components";
import { Link, useNavigate } from "react-router-dom";
import { EventFormData } from "../types/event.types";
import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Button } from "@nextui-org/react";
import FormPageOneComponet from "../components/FormPageOne.component";
import { useCreateEvenetMutation } from "../store/endpoints/eventEndpoints";
import toast from "react-hot-toast";

const EventFormPage = () => {
  const initialValues: EventFormData = {
    title: "",
    description: "",
    image: null,
    start_date: "",
    end_date: "",
    org_name: "",
    org_email: "",
    org_phone: "",
    org_logo: null,
    category_id: 0,
    limit: 0,
    location: "",
    platform: "",
  };

  const [currentPage, setCurrentPage] = useState<number>(1);

  // Separate validation schemas for each page
  const validationSchemas = [
    Yup.object({
      title: Yup.string().required("Title is required"),
      description: Yup.string().required("Description is required"),
      image: Yup.mixed().required("Image is required"),
    }),
    Yup.object({
      category_id: Yup.number()
        .required("Category is required")
        .min(1, "Category ID must be greater than 0"),
      location: Yup.string().required("Location is required"),
      platform: Yup.string().required("Platform is required"),
    }),
    Yup.object({
      org_name: Yup.string().required("Organization Name is required"),
      org_email: Yup.string()
        .email("Invalid email")
        .required("Email is required"),
      org_phone: Yup.string().required("Phone is required"),
    }),
  ];

  // Handle page validation before proceeding to the next page
  // const handleNextPage = async (
  //   validateForm: Function,
  //   setErrors: Function
  // ) => {
  //   const errors = await validateForm();
  //   console.log()
  //   if (Object.keys(errors).length === 0) {
  //     setCurrentPage(currentPage + 1);
  //   } else {
  //     // Set errors only for the current page
  //     const currentPageErrors = Object.keys(errors).reduce<{
  //       [key: string]: string;
  //     }>((acc, key) => {
  //       if (key.startsWith(`page${currentPage}`)) {
  //         acc[key] = errors[key];
  //       }
  //       return acc;
  //     }, {});
  //     setErrors(currentPageErrors);
  //   }
  // };

  console.log("CurrentPage", currentPage);

  const [createEvent, { isSuccess, data }] = useCreateEvenetMutation();

  console.log(data);

  const navigate = useNavigate();

  // Handle form submit
  const handleSubmit = async (values: EventFormData) => {
    console.log(values);
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      if (values.image) formData.append("image", values.image); // File upload
      formData.append("start_date", values.start_date);
      formData.append("end_date", values.end_date);
      formData.append("org_name", values.org_name);
      formData.append("org_email", values.org_email);
      formData.append("org_phone", values.org_phone);
      if (values.org_logo) formData.append("org_logo", values.org_logo); // File upload
      formData.append("category_id", values.category_id.toString());
      formData.append("limit", values.limit.toString());
      formData.append("location", values.location);
      formData.append("platform", values.platform);
      await createEvent(formData).unwrap();

      if (isSuccess) {
        toast.success("Event created successfully");
        setCurrentPage(1);
        navigate("/");
      }
      // Handle success (e.g., show a success message or redirect)
    } catch (err) {
      // Handle error
      console.error("Failed to create event:", err);
    }
  };

  return (
    <ContainerComponent>
      <div>
        <Breadcrumbs>
          <BreadcrumbItem>
            <Link to={"/"}>Home</Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            {currentPage === 1
              ? "Event Details"
              : currentPage === 2
              ? "Category & Platform"
              : "Organization Info"}
          </BreadcrumbItem>
        </Breadcrumbs>

        <h1 className=" my-3 text-xl font-semibold">Event Form Page</h1>
      </div>
      <div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchemas[currentPage - 1]}
          onSubmit={handleSubmit}
        >
          {({
            values,
            handleChange,
            handleBlur,
            errors,
            touched,
            setFieldValue,
            isSubmitting,
            validateForm,
            setErrors,
          }) => (
            <Form>
              {currentPage === 1 && (
                <FormPageOneComponet
                  values={values}
                  setFieldValue={setFieldValue}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                />
              )}
              {currentPage === 2 && (
                <FormPageTwoComponent
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                />
              )}
              {currentPage === 3 && (
                <FormPageThreeComponent
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                />
              )}

              <div className=" flex items-center justify-center my-4 space-x-3">
                {currentPage > 1 && (
                  <Button
                    type="button"
                    variant="bordered"
                    onClick={() => setCurrentPage(currentPage - 1)}
                  >
                    Previous
                  </Button>
                )}
                {currentPage < 3 ? (
                  <Button
                    type="button"
                    color="primary"
                    size="md"
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                  >
                    Next
                  </Button>
                ) : (
                  <Button type="submit">
                    {isSubmitting ? <LoadingComponent /> : "Create Event"}
                  </Button>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </ContainerComponent>
  );
};

export default EventFormPage;
