import { useEffect, useState } from "react";
import { Category } from "./RoomCategoriesList";
import {
  DialogBody,
  DialogContent,
  DialogRoot,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { FaPen } from "react-icons/fa";
import CustomDialogHeader from "./CustomDialogHeader";
import RoomCategoriesForm from "./RoomCategoriesForm";
import { Field } from "./ui/field";
import { Input, Text } from "@chakra-ui/react";
import AmenitiesLoad from "./AmenitiesLoad";
import {
  RoomSetupContextProps,
  useRoomSetup,
} from "../contexts/RoomSetupProvider";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import roomService from "../services/room-service";
import RecordDeleteDialog from "./RecordDeleteDialog";
import RecordEditDialog from "./RecordEditDialog";

interface Props {
  roomCategory: Category;
}

const RoomCategoryEditDialog = ({ roomCategory }: Props) => {
  const [open, setOpen] = useState(false);
  const [categoryAmenities, setCategoryAmenities] = useState<string[]>(
    roomCategory.amenities || []
  );
  const [error, setError] = useState<string>("");

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
      setOpen(false);
    });
    request.catch((error) => {
      setError(error.message);
      console.log(error.message);
    });
  };

  return (
    <>
      {/* <DialogRoot
        size="lg"
        placement="center"
        open={open}
        onOpenChange={(e) => setOpen(e.open)}
      > */}
        {/* <DialogTrigger>
          <Button
            size="xs"
            _hover={{
              transform: "scale(1.2) translateY(-2px)",
              transition: "transform 0.3s ease-out",
              bg: "#DDDCDD",
              border: "1px solid #473647",
            }}
          >
            <FaPen color="#473647" />
          </Button>
        </DialogTrigger>
        <DialogContent bg="white" color="#473647" p="20px 40px">
          <CustomDialogHeader heading={`Update Category: ${roomCategory.id}`} />
          <DialogBody> */}
            {/* <div>
              {error && <Text color="red">{error}</Text>} */}
              {/* <form method="post" onSubmit={handleSubmit(onSubmit)}>
                <Field label="Category" mb="10px">
                  <Input type="text" {...register("name")} />
                  {errors.name && (
                    <Text color="red">{errors.name.message}</Text>
                  )}
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
              </form> */}
              <RecordEditDialog>
                <RoomCategoriesForm roomCategory={roomCategory} />
              </RecordEditDialog>
            {/* </div>
          </DialogBody>
        </DialogContent>
      </DialogRoot> */}
    </>
  );
};

export default RoomCategoryEditDialog;
