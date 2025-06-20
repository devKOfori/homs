import React from 'react'
import { DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { RiPencilLine } from "react-icons/ri";


const CustomDialogTrigger = () => {
  return (
    <DialogTrigger>
      <Button
        size="xs"
        _hover={{
          bg: "var(--hairline-background-faint)",
        }}
      >
        <RiPencilLine color="var(--logo-color)" />
      </Button>
    </DialogTrigger>
  );
}

export default CustomDialogTrigger
