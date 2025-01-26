import { Flex, HStack, Icon, IconButton, Table, Text } from '@chakra-ui/react';
import React from 'react'
import { Tooltip } from './ui/tooltip';
import { BsTools } from 'react-icons/bs';
import { MdEdit } from 'react-icons/md';
import { BiTrash } from 'react-icons/bi';
import { FaEye } from 'react-icons/fa';
import { Button } from './ui/button';

interface Props {
    columnHeaders: string[];
    data: any[];
    heading: string;
    table: string;
}

const DataTable = ({ columnHeaders, data, heading, table }: Props) => {
  return (
    <>
    <Table.Root mt='50px' mb='20px' size='sm' interactive>
        <Table.Header>
            <Table.Row>
                {columnHeaders.map((header)=>(
                    <Table.ColumnHeader bg='var(--darkened-bg-2)' color='black' p='10px'>{header}</Table.ColumnHeader>
                ))}
            </Table.Row>
        </Table.Header>
        <Table.Body>
            {data.map((category)=>(
                <Table.Row key={category.id} bg='white'>
                    <Table.Cell px='30px' py='5px'>{category.name}</Table.Cell>
                    <Table.Cell px='30px' py='5px'>
                        <Flex justifyContent={'flex-end'} w={'100%'}>
                            <Tooltip content={`View ${heading}`}>
                            <Button 
                            size={'xs'} 
                            onClick={()=>console.log('icon clicked')} 
                            _hover={
                                {
                                    transform: 'scale(1.1)',
                                    border: '1px solid var(--darkened-bg-2)',
                                    bg: 'var(--darkened-bg)'
                                }
                            }
                            >
                                <FaEye />
                            </Button>
                            </Tooltip>
                            <Tooltip content='Edit Category'>
                            <IconButton 
                            size={'xs'} 
                            _hover={
                                {
                                    transform: 'scale(1.05)',
                                    transition: 'transform 0.3s ease-out',
                                    border: '1px solid var(--darkened-bg-2)',
                                    bg: 'var(--darkened-bg)'
                                }
                            }
                            >
                                <MdEdit />
                            </IconButton>
                            </Tooltip>
                            <Tooltip content='Delete Category'>
                            <IconButton 
                            size={'xs'} 
                            _hover={
                                {
                                    transform: 'scale(1.1)',
                                    border: '1px solid var(--darkened-bg-2)',
                                    bg: 'var(--darkened-bg)'
                                }
                            }
                            >
                                <BiTrash />
                            </IconButton>
                            </Tooltip>
                        </Flex>
                    </Table.Cell>
                </Table.Row>
            ))}
        </Table.Body>
    </Table.Root>
    <HStack>
        <Text>{data.length}</Text>
        <Text>
            {
                heading.endsWith('y')?`${heading.slice(0, -1)}ies`:''
            }
        </Text>
    </HStack>
    </>
    )
}

export default DataTable
