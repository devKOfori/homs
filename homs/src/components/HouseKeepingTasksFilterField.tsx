import { Input, NativeSelect } from "@chakra-ui/react";
import React from "react";

interface Props {
  tblField: string;
  value?: any;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
  ) => void ;
  options?: any;
}

const HouseKeepingTasksFilterField = ({ tblField, value, onChange, options }: Props) => {
  switch (tblField) {
    case "room":
      return (
        <Input placeholder="Room #" p="5px" value={value} onChange={onChange} />
      );
    case "staff":
      return (
        <Input
          placeholder="Staff Name"
          p="5px"
          value={value}
          onChange={onChange}
        />
      );
    case "assignedOn":
      return <Input type="date" p="5px" value={value} onChange={onChange} />;
    case "shift":
      return (
        <NativeSelect.Root size="sm" width="240px">
          <NativeSelect.Field
            placeholder="Select option"
            value={value}
            onChange={
              onChange
            }
          >
            <option key='default' value=''>{`Select ${tblField}`}</option>
            {
                options && options.map((option: any) => (
                    <option key={option.id} value={option.name}>
                        {option.name}
                    </option>
                ))
            }
          </NativeSelect.Field>
          <NativeSelect.Indicator />
        </NativeSelect.Root>
      );
  }
};
export default HouseKeepingTasksFilterField;
