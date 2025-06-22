import React, { useState } from "react";
import { Field } from "./ui/field";
import { Input, Text } from "@chakra-ui/react";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { HotelView } from "./HotelViewList";
import roomService from "../services/room-service";
import { useRoomSetup } from "../contexts/RoomSetupProvider";

interface Props {
    hotelView: HotelView | null;
    setDialogOpened?: (value: boolean) => void;
    }

const HotelViewForm = ({ hotelView, setDialogOpened }: Props) => {
    const [error, setError] = useState<string>("");

    const { hotelViews, setHotelViews, updateHotelViews } = useRoomSetup();

    const schema = z.object({
        name: z.string().nonempty("Hotel View name is required"),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            name: hotelView?.name,
        },
    });

    type HotelViewInput = z.infer<typeof schema>;

    const onSubmit = (data: HotelViewInput) => {
        let request = null;
        let action: string = "";
        if (hotelView) {
            request = roomService.updateHotelView(hotelView.id, data);
            action = "edit";
        } else {
            request = roomService.createHotelView(data);
            action = "create";
        }
        request.then((response) => {
            updateHotelViews(response.data, (action = action));
            setDialogOpened(false);
        });
        request.catch((error) => {
            console.log(error);
        });
    };

  return (
        <>
      {error && <Text color="red">{errors.name?.message}</Text>}
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
    </>
    );
};

export default HotelViewForm;