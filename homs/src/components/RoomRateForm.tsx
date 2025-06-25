import React from "react";
import { Field } from "./ui/field";
import { Input, Text } from "@chakra-ui/react";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RoomRate } from "./RoomRateList";
import dayjs from "dayjs";
import roomService from "../services/room-service";
import { useRoomSetup } from "../contexts/RoomSetupProvider";
import { NativeSelectField, NativeSelectRoot } from "./ui/native-select";

interface Props {
  roomrate?: RoomRate;
  setDialogOpened?: (value: boolean) => void;
}

const RoomRateForm = ({ roomrate, setDialogOpened }: Props) => {
  const [error, setError] = React.useState<string>("");
  const schema = z.object({
    roomType: z.string().nonempty("Room Type is required"),
    roomCategory: z.string(),
    startDate: z.string().nonempty("Start Date is required"),
    endDate: z.string().nonempty("End Date is required"),
    price: z.coerce.number().min(0, "Price must be a positive number"),
    discount: z.coerce.number().min(0, "Discount must be a positive number"),
  });

  type RoomRateInput = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RoomRateInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      roomType: roomrate ? roomrate.roomType : "",
      roomCategory: roomrate ? roomrate.roomCategory : "",
      startDate: roomrate
        ? dayjs(roomrate.startDate).format("YYYY-MM-DD")
        : dayjs().toISOString().split("T")[0],
      endDate: roomrate ? dayjs(roomrate.endDate).format("YYYY-MM-DD") : "",
      price: 0,
      discount: 0,
    },
  });

  const { updateRoomRates, roomTypes, roomCategories } = useRoomSetup();

  const onSubmit = (data: RoomRateInput) => {
    let request = null;
    let action = "";
    const payload = {
      room_type: data.roomType,
      room_category: data.roomCategory,
      start_date: data.startDate,
      end_date: data.endDate,
      price: data.price,
      discount: data.discount,
    };
    if (roomrate) {
      request = roomService.updateRoomRate(roomrate.id ?? "", payload);
      action = "edit";
    } else {
      request = roomService.createRoomRate(payload);
      action = "create";
    }
    request
      .then((response) => {
        updateRoomRates(response.data, action);
        setDialogOpened?.(false);
      })
      .catch((error) => {
        console.error(error);
        setError("An error occurred while saving the room rate.");
      });
  };

  return (
    <>
      {error && <Text color="red">{error}</Text>}
      <form method="post" onSubmit={handleSubmit(onSubmit)}>
        <Field label="Room Type" mb="20px" required>
          <NativeSelectRoot>
            <NativeSelectField px="10px" {...register("roomType")}>
              <option value="">Select Room Category</option>
              {roomTypes.map((roomType) => (
                <option key={roomType.id} value={roomType.name}>
                  {roomType.name}
                </option>
              ))}
            </NativeSelectField>
          </NativeSelectRoot>
        </Field>
        <Field label="Category" mb="20px">
          <NativeSelectRoot>
            <NativeSelectField px="10px" {...register("roomCategory")}>
              <option value="">Select Room Category</option>
              {roomCategories.map((roomCategory) => (
                <option key={roomCategory.id} value={roomCategory.name}>
                  {roomCategory.name}
                </option>
              ))}
            </NativeSelectField>
          </NativeSelectRoot>
        </Field>
        <Field label="Start Date" mb="10px">
          <Input type="date" {...register("startDate")} px="10px" />
          {errors.startDate && (
            <Text color="red">{errors.startDate.message}</Text>
          )}
        </Field>
        <Field label="End Date" mb="10px">
          <Input type="date" {...register("endDate")} px="10px" />
          {errors.endDate && <Text color="red">{errors.endDate.message}</Text>}
        </Field>
        <Field label="Price" mb="10px">
          <Input type="number" step="0.1" {...register("price")} px="10px" />
          {errors.price && <Text color="red">{errors.price.message}</Text>}
        </Field>
        <Field label="Discount (%)" mb="10px">
          <Input type="number" step="0.1" {...register("discount")} px="10px" />
          {errors.discount && (
            <Text color="red">{errors.discount.message}</Text>
          )}
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

export default RoomRateForm;
