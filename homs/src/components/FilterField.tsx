import { Box, Input } from "@chakra-ui/react";
import React from "react";
import { Field } from "./ui/field";

interface Props {
  type: string;
  placeholder?: string;
  value?: any;
  onChange?: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => void;
  fieldLabel?: string;
}

const FilterField = ({
  type,
  placeholder,
  value,
  onChange,
  fieldLabel,
}: Props) => {
  switch (type) {
    case "text":
      return (
        <Box>
          <Field label={fieldLabel} />
          <Input
            placeholder={placeholder}
            type="text"
            p="5px"
            value={value}
            onChange={onChange}
          />
        </Box>
      );
    case "date":
      return (
        <Box>
          <Field label={fieldLabel} />
          <Input
            placeholder={placeholder}
            type="date"
            p="5px"
            value={value}
            onChange={onChange}
          />
        </Box>
      );
    default:
      break;
  }
};

export default FilterField;
