import { useEffect, useState } from "react";
import { HStack, Input, NativeSelect } from "@chakra-ui/react";
import { Field } from "./ui/field";
import { useFormContext } from "react-hook-form";
import { useRoomSetup } from "../contexts/RoomSetupProvider";
import { NativeSelectField, NativeSelectRoot } from "./ui/native-select";
import DisplayAvailableRooms from "./DisplayAvailableRooms";
import { useCheckInContext } from "../contexts/CheckInContext";
import roomService from "../services/room-service";

const CheckinFormReservationDetails = () => {
  const { roomTypes, roomCategories } = useRoomSetup();
  console.log("Room Types:", roomTypes);
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();
  const { setSelectedRoom, activeRate, setActiveRate } = useCheckInContext();

  console.log("errors:", errors);

  const roomType = watch("room_type");
  const roomCategory = watch("room_category");

  useEffect(() => {
    const params = {
      roomType: roomType,
      roomCategory: roomCategory,
    };
    const { request, cancel } = roomService.getActiveRate(params);
    request
      .then((response) => {
        setActiveRate(response.data.rate);
      })
      .catch((error) => {
        console.error("Error fetching room rates:", error);
      });
    // Reset the selected room when room type or category changes
    setSelectedRoom(null);
    return () => cancel();
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
          {errors.room_category && (
            <span style={{ color: "red" }}>{errors.room_category.message}</span>
          )}
        </NativeSelectRoot>
      </Field>
      <Field label="Select Room Number" mb="10px">
        {/* <Input
          type="text"
          placeholder="Room Number"
          px="10px"
          {...register("room_number")}
        /> */}
        <DisplayAvailableRooms
          roomType={roomType}
          roomCategory={roomCategory}
        />
      </Field>
      <Field label="Check In Date">
        <Input
          type="date"
          placeholder="Check In Date"
          px="10px"
          {...register("check_in_date")}
        />
        {errors.check_in_date && (
          <span style={{ color: "red" }}>{errors.check_in_date.message}</span>
        )}
      </Field>
      <Field label="Check Out Date">
        <Input
          type="date"
          placeholder="Check Out Date"
          px="10px"
          {...register("check_out_date")}
        />
        {errors.check_out_date && (
          <span style={{ color: "red" }}>{errors.check_out_date.message}</span>
        )}
      </Field>
      <Field label="Number of Guests">
        <Input
          type="text"
          placeholder="Number of Older Guests"
          px="10px"
          {...register("number_of_guests")}
        />
        {errors.number_of_guests && (
          <span style={{ color: "red" }}>
            {errors.number_of_guests.message}
          </span>
        )}
      </Field>
      <Field label="Number of Children">
        <Input
          type="text"
          placeholder="Number of Children"
          px="10px"
          {...register("number_of_children_guests")}
        />
        {errors.number_of_children_guests && (
          <span style={{ color: "red" }}>
            {errors.number_of_children_guests.message}
          </span>
        )}
      </Field>
      <Field label="Cost Per Night">
        <Input
          type="number"
          step="0.01"
          placeholder="Cost Per Night"
          px="10px"
          value={activeRate || ""}
          {...register("cost_per_night")}
          disabled
        />
        {errors.cost_per_night && (
          <span style={{ color: "red" }}>{errors.cost_per_night.message}</span>
        )}
      </Field>
      <Field label="Total Cost">
        <Input
          type="text"
          placeholder="Total Cost"
          px="10px"
          {...register("total_cost")}
          disabled
        />
        {errors.total_cost && (
          <span style={{ color: "red" }}>{errors.total_cost.message}</span>
        )}
      </Field>
    </>
  );
};

export default CheckinFormReservationDetails;
