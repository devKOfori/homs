import React, { useState } from "react";
import { BedType } from "./BedTypeList";
import { useRoomSetup } from "../contexts/RoomSetupProvider";
import { z } from "zod";
import { Field } from "./ui/field";
import { Input } from "@chakra-ui/react";
import { Button } from "./ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import roomService from "../services/room-service";

interface Props {
  bedType?: BedType;
  setDialogOpened?: (value: boolean) => void;
}

const BedTypeForm = ({ bedType, setDialogOpened }: Props) => {
  const [error, setError] = useState<string>("");
  const { bedTypes, setBedTypes, updateBedTypes } = useRoomSetup();

  const schema = z.object({
    name: z.string().nonempty("Bed type name is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: bedType ? bedType.name : "",
    },
  });

    const onSubmit = (data: any) => {
        let request = null;
        let action = null;
        if (bedType) {
        request = roomService.updateBedType(bedType.id, data);
        action = "edit";
        } else {
        request = roomService.createBedType(data);
        action = "create";
        }
        request.then((response) => {
        updateBedTypes(response.data, action);
        setDialogOpened(false);
        });
        request.catch((error) => {
        console.log(error);
        });
    };


  return (
    <form method="post" onSubmit={handleSubmit(onSubmit)}>
      <Field label="Name" mb="10px" required>
        <Input type="text" {...register("name")} px="10px" required />
        {errors.name && <span>{errors.name.message}</span>}
      </Field>
      <Field label="Description" mb="10px">
        <Input
          type="text"
          {...register("description")}
          placeholder="Optional description"
          px="10px"
        />
      </Field>
      <Button
        bg="var(--header-bg)"
        p="10px 20px"
        mt="10px"
        type="submit"
        color="white"
      >
        Save
      </Button>
    </form>
  );
};

export default BedTypeForm;
