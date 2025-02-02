import { Button, Input } from "@chakra-ui/react";
import { Field } from "./ui/field";
import { useRoomSetup } from "../contexts/RoomSetupProvider";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import roomService from "../services/room-service";
import { Amenity } from "./AmenityList";
import { useState } from "react";

interface Props {
  amenity: Amenity | null;
  setDialogOpened: (value: boolean) => void;
}

const AmenityForm = ({ amenity, setDialogOpened }: Props) => {
  const [error, setError] = useState<string>("");
  const { amenities, setAmenities, updateAmenities } = useRoomSetup();

  const schema = z.object({
    name: z.string().nonempty("Amenity name is required"),
  });

  type AmenityInput = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: amenity ? amenity.name : "",
    },
  });

  const onSubmit = (data: AmenityInput) => {
    let request = null;
    let action = null;
    if (amenity) {
      request = roomService.updateAmenity(amenity.id, data);
      action = "edit";
    } else {
      request = roomService.createAmenity(data);
      action = "create";
    }
    request.then((response) => {
      updateAmenities(response.data, action);
      setDialogOpened(false);
    });
    request.catch((error) => {
      setError(error.response.data.detail);
      console.log(error);
    });
  };
  return (
    <form method="post" onSubmit={handleSubmit(onSubmit)}>
      <Field label="Name" mb="10px">
        <Input type="text" {...register("name")} px="10px" required />
        {errors.name && <span>{errors.name.message}</span>}
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

export default AmenityForm;
