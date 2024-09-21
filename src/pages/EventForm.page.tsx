import { BreadcrumbItem, Breadcrumbs, image } from "@nextui-org/react";
import {
  ContainerComponent,
  FormPageThreeComponent,
  FormPageTwoComponent,
  LoadingComponent,
} from "../components";
import { Link, useNavigate, useParams } from "react-router-dom";
import { EventFormData } from "../types/event.types";
import { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Button } from "@nextui-org/react";
import FormPageOneComponent from "../components/FormPageOne.component";
import {
  useCreateEvenetMutation,
  useGetSingleEventQuery,
  useUpdateMyEventMutation,
} from "../store/endpoints/eventEndpoints";
import toast from "react-hot-toast";

const EventFormPage = () => {
  const { id } = useParams();
  const eventId = Number(id);

  const [createEvent] = useCreateEvenetMutation();
  const [updateEvent] = useUpdateMyEventMutation();

  const navigate = useNavigate();

  const { data } = useGetSingleEventQuery(eventId);
  const event = (data?.event || {}) as EventFormData;

  const [initialValues, setInitialValues] = useState<EventFormData>({
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
  });

  useEffect(() => {
    if (data?.event) {
      setInitialValues({
        title: event.title || "",
        description: event.description || "",
        image: event.image || null,
        start_date: event.start_date || "",
        end_date: event.end_date || "",
        org_name: event.org_name || "",
        org_email: event.org_email || "",
        org_phone: event.org_phone || "",
        org_logo: event.org_logo || null,
        category_id: event.category_id || 0,
        limit: event.limit || 0,
        location: event.location || "",
        platform: event.platform || "",
      });
    }
  }, [data]);

  const [currentPage, setCurrentPage] = useState<number>(1);

  // Separate validation schemas for each page
  const validationSchemas = [
    Yup.object({
      title: Yup.string().required("Title is required"),
      description: Yup.string().required("Description is required"),
      image: Yup.mixed()
        .required("Image is required")
        .test("fileType", "Unsupported File Format", (value: any) => {
          return (
            value &&
            (value.type === "image/jpeg" ||
              value.type === "image/png" ||
              value.type === "image/gif")
          );
        }),
      category_id: Yup.number()
        .required("Category is required")
        .min(1, "Category ID must be greater than 0"),
    }),
    Yup.object({
      start_date: Yup.string().required("Start Date is required"),
      end_date: Yup.string().required("End Date is required"),
      org_name: Yup.string().required("Organization Name is required"),
      org_email: Yup.string()
        .email("Invalid email")
        .required("Email is required"),
      org_phone: Yup.string().required("Phone is required"),
    }),
    Yup.object({
      location: Yup.string().required("Location is required"),
      platform: Yup.string().required("Platform is required"),
      limit: Yup.number().required("Limit is required"),
    }),
  ];

  // Function to handle page change after validation
  const handlePageChange = (validateForm: Function, setErrors: Function) => {
    validateForm().then((errors: any) => {
      console.log(errors);
      if (Object.keys(errors).length === 0) {
        setCurrentPage((prev) => prev + 1);
      } else {
        setErrors(errors); // Show validation errors
      }
    });
  };

  // Handle form submit
  const handleSubmit = async (values: EventFormData) => {
    try {
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        if (value instanceof File) {
          console.log(value);
          // If it's a file, append it directly
          formData.append(key, value);
        } else {
          // Otherwise, convert it to a string
          formData.append(key, value.toString());
        }
      });

      console.log(values);

      let result;

      if (id) {
        result = await updateEvent({ id: eventId, data: values }).unwrap();
      } else {
        result = await createEvent(formData).unwrap();
      }

      // If successful, navigate and show toast
      if (result) {
        if (id) {
          toast.success("Event update successfully");
        } else {
          toast.success("Event create successfully");
        }
        setCurrentPage(1);
        navigate("/"); // Navigate to home page or desired location
      }
      // Handle success (e.g., show a success message or redirect)
    } catch (err) {
      console.error("Failed to create event:", err);
      toast.error("Failed to create event. Please try again.");
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

        <h1 className=" my-3 text-xl font-semibold">
          {id ? "Event Edit Form" : "Event Create Form "}
        </h1>
      </div>
      <div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchemas[currentPage - 1]}
          onSubmit={handleSubmit}
          enableReinitialize={true}
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
                <FormPageOneComponent
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
                    onClick={() => handlePageChange(validateForm, setErrors)}
                  >
                    Next
                  </Button>
                ) : (
                  <Button type="submit">
                    {isSubmitting ? (
                      <LoadingComponent />
                    ) : (
                      `${id ? "Update Event" : "Create Event"}`
                    )}
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
