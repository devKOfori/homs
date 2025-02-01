import { useEffect, useState } from "react";
import { Field } from "./ui/field";
import { Button, Input, Text } from "@chakra-ui/react";
import AmenitiesLoad from "./AmenitiesLoad";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import roomService from "../services/room-service";
import {
  RoomSetupContextProps,
  useRoomSetup,
} from "../contexts/RoomSetupProvider";
import { Category } from "./RoomCategoriesList";

interface Props {
  setDialogOpened: (value: boolean) => void;
  roomCategory: Category | null;
}

const RoomCategoriesForm = ({ setDialogOpened, roomCategory }: Props) => {
  const [categoryAmenities, setCategoryAmenities] = useState<string[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (roomCategory) {
      setCategoryAmenities(roomCategory.amenities || []);
    }
  }, [roomCategory]);

  const { updateRoomCategories, amenities } =
    useRoomSetup<RoomSetupContextProps>();
  const schema = z.object({
    name: z.string().nonempty({ message: "Category is required" }),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: roomCategory?.name,
    },
  });

  const onSubmit = (data: Category) => {
    data.amenities = categoryAmenities;
    let request;
    let action: string;
    if (roomCategory) {
      data.id = roomCategory.id;
      request = roomService.updateRoomCategory(data);
      action = "edit";
    } else {
      request = roomService.createRoomCategory(data);
      action = "create";
    }
    request.then((response) => {
      updateRoomCategories(response.data, (action = action));
      setDialogOpened(false);
    });
    request.catch((error) => {
      setError(error.message);
    });
  };
  return (
    <>
      {error && <Text color="red">{error}</Text>}
      <form method="post" onSubmit={handleSubmit(onSubmit)}>
        <Field label="Category" mb="10px">
          <Input type="text" {...register("name")} />
          {errors.name && <Text color="red">{errors.name.message}</Text>}
        </Field>
        <Field label="Amenities" mb="10px">
          <AmenitiesLoad
            amenities={amenities}
            selectedAmenities={categoryAmenities}
            setSelectedAmenities={setCategoryAmenities}
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
    </>
  );
};

export default RoomCategoriesForm;
