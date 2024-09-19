import { Input } from "@nextui-org/react";
import { ErrorMessage } from "formik";

interface Props {
  value: string | number | undefined;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur:
    | (React.FocusEventHandler<HTMLInputElement> &
        ((e: React.FocusEvent<Element, Element>) => void))
    | undefined;

  name: string;
  label: string;
  placeholder: string;
  type: string;
  error?: string | undefined;
  touched?: boolean;
}

const FormComponent = ({
  value,
  handleChange,
  handleBlur,
  name,
  label,
  placeholder,
  type,
  error,
  touched,
}: Props) => {
  const valueAsString = value !== undefined ? value.toString() : "";

  return (
    <div>
      <Input
        value={valueAsString}
        onChange={handleChange}
        onBlur={handleBlur}
        name={name}
        size="sm"
        type={type}
        label={label}
        placeholder={placeholder}
        aria-invalid={!!error && touched}
        aria-describedby={`${name}-error`}
      />
      <ErrorMessage
        className="text-red-600 text-xs mt-1"
        component="p"
        id={`${name}-error`}
        name={name}
      />
    </div>
  );
};

export default FormComponent;
