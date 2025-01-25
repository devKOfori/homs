import { Box, Button, Container, Flex,Heading, HStack } from '@chakra-ui/react'
import React from 'react'
import { Category } from './RoomCategoriesList';
import { FaEye, FaPlus } from "react-icons/fa";
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
  } from "./ui/dialog"
import CustomDialogHeader from './CustomDialogHeader';
import CreateRecordDialog from './CreateRecordDialog';

interface Props {
    heading: string;
    setIsAddNewButtonClicked: ()=>void;
    setShowCategoryForm: ()=>void;
    isAddNewButtonClicked: boolean;
    showCategoryForm: boolean;
    setUpdatedCategory: Category | null;
}

const ActionPageHeader = (
    { 
        heading, 
        isAddNewButtonClicked, 
        setShowCategoryForm, 
        showCategoryForm,
        setUpdatedCategory
    }: Props) => {
    const handleClicked = ()=>{
        setUpdatedCategory(null);
        setShowCategoryForm(prev=>!prev)
        console.log(isAddNewButtonClicked)
    }
    const dialogTrigger = (
        <Button px='10px' 
                bg='#473647'
                color='white'
                rounded='5px'
                p='20px'
                _hover={
                    {
                        transform: 'scale(1.05) translateY(-2px)',
                        transition: 'transform 0.3s ease-out',
                    }
                }
                >
                    {`Add New ${heading}`} <FaPlus />
                </Button>
    )
  return (
    // <Flex justifyContent='space-between' alignItems='center' my={3}>
    //     <Heading color='#473647'>{heading}</Heading>
    //     <CreateRecordDialog table='roomtype' />
        
    // </Flex>
    <HStack justify='space-between'>
        <Heading color='#473647'>{heading}</Heading>
        <CreateRecordDialog table='roomtype' dialogTrigger={dialogTrigger} />
    </HStack>
  )
}

export default ActionPageHeader
