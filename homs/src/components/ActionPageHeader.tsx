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
import './ActionPageHeader.css';


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
                bg='#747474'
                color='white'
                rounded='25px'
                p='10px'
                size='xs'
                fontSize='xs'
                _hover={
                    {
                        transform: 'scale(1.05) translateY(-2px)',
                        transition: 'transform 0.3s ease-out',
                    }
                }
                >
                    {`Add ${heading}`} <FaPlus />
                </Button>
    )
  return (
    // <Flex justifyContent='space-between' alignItems='center' my={3}>
    //     <Heading color='#473647'>{heading}</Heading>
    //     <CreateRecordDialog table='roomtype' />
        
    // </Flex>
        <Flex justify='space-between' align='center' wrap='wrap'>
            
                <Heading fontWeight={300}>{`${
                    heading.endsWith('y') ? heading.slice(0, -1) + 'ies' : heading + 's'
                }`}</Heading>
                <CreateRecordDialog table='roomtype' dialogTrigger={dialogTrigger} />
            
        </Flex>
  )
}

export default ActionPageHeader
