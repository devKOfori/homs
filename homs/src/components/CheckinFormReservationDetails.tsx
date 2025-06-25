import { useEffect } from "react";
import { HStack, Input, NativeSelect } from "@chakra-ui/react";
import { Field } from "./ui/field";
import { useFormContext } from "react-hook-form";
import { useRoomSetup } from "../contexts/RoomSetupProvider";
import { NativeSelectField, NativeSelectRoot } from "./ui/native-select";
import DisplayAvailableRooms from "./DisplayAvailableRooms";
import { useCheckInContext } from "../contexts/CheckInContext";

const CheckinFormReservationDetails = () => {
  const { roomTypes, roomCategories } = useRoomSetup();
  const { register, watch } = useFormContext();
  const { setSelectedRoom } = useCheckInContext();

  const roomType = watch("room_type");
  const roomCategory = watch("room_category");

  useEffect(() => {
    // Reset the selected room when room type or category changes
    setSelectedRoom(null);
  }, [roomType, roomCategory]);

  return (
    <>
      <Field label="Room Type" mb="10px">
        <NativeSelectRoot>
          <NativeSelectField
            px="10px"
            placeholder="Select Room Type"
            {...register("room_type")}
          >
            {roomTypes.map((roomType) => (
              <option key={roomType.id} value={roomType.name}>
                {roomType.name}
              </option>
            ))}
          </NativeSelectField>
        </NativeSelectRoot>
      </Field>
      <Field label="Room Category" mb="10px">
        <NativeSelectRoot>
          <NativeSelectField
            px="10px"
            placeholder="Select Room Category"
            {...register("room_category")}
          >
            {roomCategories.map((roomCategory) => (
              <option key={roomCategory.id} value={roomCategory.name}>
                {roomCategory.name}
              </option>
            ))}
          </NativeSelectField>
        </NativeSelectRoot>
      </Field>
      <Field label="Select Room Number" mb="10px">
        {/* <Input
          type="text"
          placeholder="Room Number"
          px="10px"
          {...register("room_number")}
        /> */}
        <DisplayAvailableRooms roomType={roomType} roomCategory={roomCategory} />
      </Field>
      <Field label="Check In Date">
        <Input
          type="date"
          placeholder="Check In Date"
          px="10px"
          {...register("check_in_date")}
        />
      </Field>
      <Field label="Check Out Date">
        <Input
          type="date"
          placeholder="Check Out Date"
          px="10px"
          {...register("check_out_date")}
        />
      </Field>
      <Field label="Number of Guests">
        <Input
          type="text"
          placeholder="Number of Older Guests"
          px="10px"
          {...register("number_of_guests")}
        />
      </Field>
      <Field label="Number of Children">
        <Input
          type="text"
          placeholder="Number of Children"
          px="10px"
          {...register("number_of_children_guests")}
        />
      </Field>
      <Field label="Cost Per Night">
        <Input
          type="text"
          placeholder="Cost Per Night"
          px="10px"
          {...register("cost_per_night")}
          disabled
        />
      </Field>
      <Field label="Total Cost">
        <Input
          type="text"
          placeholder="Total Cost"
          px="10px"
          {...register("total_cost")}
          disabled
        />
      </Field>
    </>
  );
};

export default CheckinFormReservationDetails;
