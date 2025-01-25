import { CanceledError } from 'axios';
import React, { useEffect, useState } from 'react'
import roomService from '../services/room-service';
import { Box, Card, Flex, Heading, Table, HStack, VStack } from '@chakra-ui/react';
import { Button } from './ui/button';
import { FaEye, FaPen, FaTrash } from 'react-icons/fa';
import ActionIcons from './ActionIcons';

export interface RoomType{
    id: string;
    name: string;
    amenities: string[] | null;
    bedTypes: string[] | null;
    view: string | null;
    areaInMeters: number;
    areaInFeet: number;
    maxGuests: number;
    rate: number;
}

interface Props {
    data: RoomType[];
    heading: string;
    setShowRoomTypeForm: (value: boolean)=>void;
    isEditButtonClicked: boolean;
    setIsEditButtonClicked: (value: boolean)=>void;
    setUpdatedRoomType: (roomType: RoomType | null)=>void;
    roomType: RoomType | null;
    setRoomRoomTypes: (value: RoomType[])=>void;
}

const RoomTypeList = (
    { 
        data, 
        heading,
        setShowRoomTypeForm, 
        setIsEditButtonClicked,
        setUpdatedRoomType, 
        roomType,
        setRoomRoomTypes
    }: Props
) => {


  return (
    <>
        {
            <Flex my='50px' gap='30px' wrap='wrap'>
                {data.map((roomType)=> (
                    <Box border='1px solid #473647' py='20px' px='45px' rounded='30px' shadow='xs' key={roomType.id} color='#473647'
                    _hover={{
                        transform: 'scale(1.01)',
                        transition: 'transform 0.1s ease-out',
                    }}>
                        <VStack>
                        <Heading>{roomType.name}</Heading>
                        <ActionIcons roomtype={roomType} />
                        </VStack>

                    </Box>
                    )
                )}
            </Flex>
        }
    </>
  )
}

export default RoomTypeList
