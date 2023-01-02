import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Textarea,
} from "@chakra-ui/react";
import React, { InputHTMLAttributes } from "react";
import { useField } from "formik";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
  textarea?: boolean;
};

export const InputField: React.FC<InputFieldProps> = ({
  label,
  textarea,
  size: _,
  ...props
}) => {
  let InputOrTextarea = Input;
  if (textarea) {
    InputOrTextarea = Textarea as any;
  }
  const [field, { error }] = useField(props);

  return (
    <FormControl isInvalid={!!error}>
      <FormLabel color="white" htmlFor={field.name}>
        {label}
      </FormLabel>
      <InputOrTextarea
        _focus={{
          color: "white",
          borderColor: "green",
          outline: "none",
        }}
        color="gray"
        borderColor="secondary"
        borderWidth="2px"
        {...field}
        {...props}
        id={field.name}
      />
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};
