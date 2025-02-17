import React, { useEffect, useState } from "react";
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { HStack, IconButton, Input, Textarea } from "@chakra-ui/react";
import { FaEdit } from "react-icons/fa";
import { Tooltip } from "./ui/tooltip";
import { Field } from "./ui/field";
import hotelService from "../services/hotel-service";
import { AssignedShift } from "../pages/MyShifts";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import dayjs from "dayjs";

export type ShiftNote = {
  id?: string;
  note_date: string;
  note: string;
  assigned_shift: string;
};

interface Props {
  assignedShift: AssignedShift;
}

const ShiftNoteDialog = ({ assignedShift }: Props) => {
  // console.log(assignedShift.id);
  const [error, setError] = useState<string>("");
  const [shiftNote, setShiftNote] = useState<ShiftNote>({
    id: "",
    note_date: "",
    note: "",
    assigned_shift: assignedShift?.id || "",
  });
  const [open, setOpen] = useState(false);
  //   console.log(shiftNote);
  useEffect(() => {
    if (assignedShift) {
      const { request, cancel } = hotelService.getShiftNote(assignedShift.id);
      request.then((res) => {
        if (
          res.data.length > 0 &&
          res.data[0].assigned_shift === assignedShift.id
        ) {
          console.log(res.data);
          setShiftNote(res.data[0]);
          reset(res.data[0]);
        }
      });
      request.catch((err) => {
        setError(err.message);
        console.log(err);
      });
      return () => cancel();
    }
    return;
  }, [assignedShift]);

  const schema = z.object({
    note_date: z.string(),
    note: z.string().nonempty("Note is required"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      note_date: shiftNote.note_date,
      note: shiftNote.note,
    },
  });


  type ShiftNoteInput = z.infer<typeof schema>;

  const onSubmit = (data: ShiftNoteInput) => {
    console.log(data);
    let request;
    const payload: ShiftNote = {
      note_date: data.note_date,
      note: data.note,
      assigned_shift: assignedShift.id,
    };
    if (shiftNote.id) {
      console.log("updating shift note");
      request = hotelService.updateShiftNote(shiftNote.id, payload);
    } else {
      console.log("adding shift note");
      request = hotelService.addShiftNote(payload);
    }
    request.then((res) => {
      setShiftNote(res.data);
      setOpen(false);
    });
    request.catch((err) => {
      setError(err.message);
      console.log(err);
    });
  };

  return (
    <DialogRoot
      size="lg"
      placement="center"
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
    >
      <Tooltip content="Shift Notes">
        <DialogTrigger asChild>
          <Button fontSize='10px'px='2.5px' _hover={{border: '1px solid black', bg: 'var(--header-bg)', color: 'white'}}>
            {/* <FaEdit /> */}
            Edit Note
          </Button>
        </DialogTrigger>
      </Tooltip>
      <DialogContent bg="white" p="20px 40px">
        <DialogHeader mb="20px">
          <DialogTitle>Shift Note</DialogTitle>
        </DialogHeader>
        <DialogBody pb="20px">
          <form method="post" onSubmit={handleSubmit(onSubmit)}>
            <Field label="Date" mb="20px">
              <Input type="date" px="10px" {...register("note_date")} />
            </Field>
            <Field label="Note" mb="20px">
              <Textarea
                px="10px"
                placeholder="Enter shift note here"
                {...register("note")}
              />
            </Field>
            <HStack mt="20px">
              <Button
                bg="var(--header-bg)"
                px="20px"
                color="white"
                type="submit"
              >
                Save
              </Button>
              <DialogActionTrigger asChild>
                <Button bg="red.500" px="20px" color="white">
                  Cancel
                </Button>
              </DialogActionTrigger>
            </HStack>
          </form>
        </DialogBody>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};

export default ShiftNoteDialog;
