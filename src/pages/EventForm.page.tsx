import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import { ContainerComponent, FormPageTwoComponent } from "../components";
import { Link } from "react-router-dom";
import { FormData } from "../types/event.types";
import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Button } from "@nextui-org/react";
import FormPageOneComponet from "../components/FormPageOne.component";

const EventFormPage = () => {
  const initialValues: FormData = {
    title: "",
    description: "",
    image: "",
    start_date: "",
    end_date: "",
    org_name: "",
    org_email: "",
    org_phone: "",
    org_logo: null,
    category_id: 0,
    limit: null,
    location: "",
    platform: "",
  };

  const [currentPage, setCurrentPage] = useState<number>(1);

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    image: Yup.mixed().required("Image is required"),
    category_id: Yup.number()
      .required("Category is required")
      .min(1, "Category ID must be greater than 0"),
    location: Yup.string().required("Location is required"),
    platform: Yup.string().required("Platform is required"),
  });

  console.log(currentPage);

  // Handle form submit
  const handleSubmit = (values: FormData) => {
    console.log(values); // You can send the form data to an API or another function
  };

  return (
    <ContainerComponent>
      <div>
        <Breadcrumbs>
          <BreadcrumbItem>
            <Link to={"/"}>Home</Link>
          </BreadcrumbItem>
          <BreadcrumbItem>Create Event</BreadcrumbItem>
        </Breadcrumbs>
        <h1 className=" my-3 text-xl font-semibold">Event Form Page</h1>
      </div>
      <div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, handleBlur, errors, touched }) => (
            <Form>
              <div>
                <Form>
                  {currentPage === 1 && (
                    <FormPageOneComponet
                      values={values}
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
                    />
                  )}
                </Form>
              </div>
              <div className=" flex items-center justify-center my-4 space-x-3">
                {currentPage > 1 && (
                  <Button
                    variant="bordered"
                    onClick={() => setCurrentPage(currentPage - 1)}
                  >
                    Previous
                  </Button>
                )}
                {currentPage < 3 ? (
                  <Button onClick={() => setCurrentPage(currentPage + 1)}>
                    Next
                  </Button>
                ) : (
                  <Button type="submit">Submit</Button>
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
