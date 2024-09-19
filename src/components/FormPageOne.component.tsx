import { Input } from "@nextui-org/react";
import FormComponent from "./Form.component";

// Define the shape of `values`, `errors`, and `touched`
interface FormValues {
  title: string;
  description: string;
  image: File  | null;
  category_id: number | string;
}

interface FormErrors {
  title?: string;
  description?: string;
  image?: string;
  category_id?: string;
}

interface FormTouched {
  title?: boolean;
  description?: boolean;
  image?: boolean;
  category_id?: boolean;
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
  setFieldValue: (field: string, value: any) => void;
}
// Handle the file input change separately

const FormPageOneComponet: React.FC<Props> = ({
  values,
  handleBlur,
  handleChange,
  errors = {},
  touched = {},
  setFieldValue,
}: Props) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files
      ? event.currentTarget.files[0]
      : null;
    setFieldValue("image", file);
  };
  return (
    <div className="grid grid-cols-2 gap-4 max-w-xl mx-auto">
      <FormComponent
        value={values.title}
        handleBlur={handleBlur}
        handleChange={handleChange}
        type="text"
        name="title"
        label="Title"
        placeholder="Enter title"
        error={errors.title}
        touched={touched.title}
      />

      <FormComponent
        value={values.description}
        handleBlur={handleBlur}
        handleChange={handleChange}
        type="text"
        name="description"
        label="Description"
        placeholder="Enter description"
        error={errors.description}
        touched={touched.description}
      />

      <div>
        <Input type="file" onChange={handleFileChange} name="image" />
      </div>

      <FormComponent
        value={values.category_id}
        handleBlur={handleBlur}
        handleChange={handleChange}
        type="number"
        name="category_id"
        label="Category ID"
        placeholder="Enter category id"
        error={errors.category_id}
        touched={touched.category_id}
      />
    </div>
  );
};

export default FormPageOneComponet;
