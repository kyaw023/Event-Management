import FormComponent from "./Form.component";

interface FormValues {
  location: string;
  limit: number;
  platform: string;
}

interface FormErrors {
  location?: string;
  limit?: string;
  platform?: string;
}

interface FormTouched {
  location?: boolean;
  limit?: boolean;
  platform?: boolean;
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
const FormPageThreeComponent: React.FC<Props> = ({
  values,
  handleBlur,
  handleChange,
  errors = {},
  touched = {},
}) => {
  return (
    <div className="grid grid-cols-2 gap-4 max-w-xl mx-auto">
      <FormComponent
        value={values.location}
        handleBlur={handleBlur}
        handleChange={handleChange}
        type="text"
        name="location"
        label="Location"
        placeholder="Enter location"
        error={errors.location}
        touched={touched.location}
      />

      <FormComponent
        value={values.platform}
        handleBlur={handleBlur}
        handleChange={handleChange}
        type="text"
        name="platform"
        label="Platform"
        placeholder="Enter platform"
        error={errors.platform}
        touched={touched.platform}
      />

      <FormComponent
        value={values.limit}
        handleBlur={handleBlur}
        handleChange={handleChange}
        type="number"
        name="limit"
        label="Limit"
        placeholder="Enter Limit Person"
        error={errors.limit}
        touched={touched.limit}
      />
    </div>
  );
};

export default FormPageThreeComponent;
