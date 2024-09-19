import FormComponent from "./Form.component";

interface FormValues {
  start_date: string;
  end_date: string;
  org_name: string;
  org_email: string;
  org_phone: string;
}

interface FormErrors {
  start_date?: string;
  end_date?: string;
  org_name?: string;
  org_email?: string;
  org_phone?: string;
}

interface FormTouched {
  start_date?: boolean;
  end_date?: boolean;
  org_name?: boolean;
  org_email?: boolean;
  org_phone?: boolean;
}

interface Props {
  values: FormValues;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur:
    | (React.FocusEventHandler<HTMLInputElement> &
        ((e: React.FocusEvent<Element, Element>) => void))
    | undefined;
  errors?: FormErrors;
  touched?: FormTouched;
}
const FormPageTwoComponent: React.FC<Props> = ({
  values,
  handleBlur,
  handleChange,
  errors = {},
  touched = {},
}) => {
  return (
    <div className="grid grid-cols-2 gap-4 max-w-xl mx-auto">
      <FormComponent
        value={values.start_date}
        handleBlur={handleBlur}
        handleChange={handleChange}
        type="date"
        name="start_date"
        label="Start Date"
        placeholder="Enter start date"
        error={errors.start_date}
        touched={touched.start_date}
      />

      <FormComponent
        value={values.end_date}
        handleBlur={handleBlur}
        handleChange={handleChange}
        type="text"
        name="description"
        label="Description"
        placeholder="Enter description"
        error={errors.end_date}
        touched={touched.end_date}
      />

      <FormComponent
        value={values.org_email}
        handleBlur={handleBlur}
        handleChange={handleChange}
        type="email"
        name="org_email"
        label="Org Email"
        placeholder="Enter org email"
        error={errors.org_email}
        touched={touched.org_email}
      />

      <FormComponent
        value={values.org_name}
        handleBlur={handleBlur}
        handleChange={handleChange}
        type="text"
        name="org_name"
        label="Org Name"
        placeholder="Enter org name"
        error={errors.org_name}
        touched={touched.org_name}
      />
      <FormComponent
        value={values.org_phone}
        handleBlur={handleBlur}
        handleChange={handleChange}
        type="text"
        name="org_phone"
        label="Org Phone"
        placeholder="Enter org phone"
        error={errors.org_phone}
        touched={touched.org_phone}
      />
    </div>
  );
};

export default FormPageTwoComponent;
