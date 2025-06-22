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
  setDialogOpened?: (value: boolean) => void;
  roomCategory: Category | null;
}

const RoomCategoriesForm = ({ setDialogOpened, roomCategory }: Props) => {
  const [categoryAmenities, setCategoryAmenities] = useState<string[]>([]);
  const [error, setError] = useState<string>("");

  // useEffect(() => {
  //   if (roomCategory) {
  //     setCategoryAmenities(roomCategory.amenities || []);
  //   }
  // }, [roomCategory]);

  const { updateRoomCategories, amenities } =
    useRoomSetup<RoomSetupContextProps>();
  const schema = z.object({
    name: z.string().nonempty({ message: "Category is required" }),
    roomArea: z
      .coerce
      .number()
      .min(0, { message: "Room area must be a positive number" })
      .optional(),
    description: z.string().optional(),
  });

  type RoomCategoryInput = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RoomCategoryInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: roomCategory?.name,
      roomArea: roomCategory?.room_area || 0,
      description: roomCategory?.description || "",
    },
  });

  const onSubmit = (data: RoomCategoryInput) => {
    // data.amenities = categoryAmenities;
    const payload: Category = {
      name: data.name,
      room_area: data.roomArea,
      description: data.description,
    }
    let request;
    let action: string;
    if (roomCategory) {
      request = roomService.updateRoomCategory(roomCategory.id ?? "", payload);
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
          <Input type="text" {...register("name")} px="10px" />
          {errors.name && <Text color="red">{errors.name.message}</Text>}
        </Field>
        <Field label="Area" mb="10px">
          <Input type="number" step="0.1" {...register("roomArea")} px="10px" />
          {errors.roomArea && (
            <Text color="red">{errors.roomArea.message}</Text>
          )}
        </Field>
        <Field label="Description" mb="10px">
          <Input type="text" {...register("description")} px="10px" />
          {errors.description && (
            <Text color="red">{errors.description.message}</Text>
          )}
        </Field>
        {/* <Field label="Amenities" mb="10px">
          <AmenitiesLoad
            selectedAmenities={categoryAmenities}
            setSelectedAmenities={setCategoryAmenities}
          />
        </Field> */}
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
