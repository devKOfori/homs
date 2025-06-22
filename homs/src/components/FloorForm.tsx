import { Button, Input } from "@chakra-ui/react";
import { Field } from "./ui/field";
import { useRoomSetup } from "../contexts/RoomSetupProvider";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import roomService from "../services/room-service";

interface Props {
  hotelFloor: any;
  setDialogOpened?: (value: boolean) => void;
}

const FloorForm = ({ hotelFloor, setDialogOpened }: Props) => {
  const { floors, setFloors, updateFloors } = useRoomSetup();

  const schema = z.object({
    name: z.string().nonempty("Floor name is required"),
  });

  type FloorInput = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: hotelFloor ? hotelFloor.name : "",
    },
  });

  const onSubmit = (data: FloorInput) => {
    let request = null;
    let action = null;
    if (hotelFloor) {
      request = roomService.updateFloor(hotelFloor.id, data);
      action = "edit";
    } else {
      request = roomService.createFloor(data);
      action = "create";
    }
    request.then((response) => {
      updateFloors(response.data, (action = action));
      setDialogOpened(false);
    });
    request.catch((error) => {
      console.log(error);
    });
  };

  return (
    <form method="post" onSubmit={handleSubmit(onSubmit)}>
      <Field label="Name" mb="10px">
        <Input type="text" {...register("name")} px="10px" required />
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

export default FloorForm;
