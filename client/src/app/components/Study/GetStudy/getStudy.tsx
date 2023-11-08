import { useAppDispatch, useAppSelector } from '../../../hooks';
import { useEffect } from 'react';

// == IMPORT CHAKRA UI ==
import { Box, Center, Flex, Text} from '@chakra-ui/react'
import { Table, Thead, Tbody, Tr, Th, TableContainer} from '@chakra-ui/react'

// == IMPORT COMPONENTS ==
import GetStudyItems from '../GetStudyItems/getStudyItems';

// == IMPORT ACTION ==
import { getStudy } from '../../../slices/studySlice';


function GetStudy () {
  const dispatch = useAppDispatch();
  
  
  useEffect(() => {
    console.log(dataStudy);
    dispatch(getStudy());
  }, [dispatch]);
  
  // == CALL STORE ==
  const { dataStudy } = useAppSelector(state => state.studyReducer);

  return (
    <Flex 
      color='black'
      direction={'column'}
      mb={12} border='1px solid'
      borderColor='gray'
      borderRadius="30px"
    >
      <Center bg='white'>
        <Text fontWeight={'bold'}>Liste des étudiants</Text>
      </Center>
      <Box bg='white'>
        <TableContainer>
          <Table
            variant='striped'
            colorScheme='gray'
            size={'lg'}
            fontSize={13}
          >
            <Thead>
              <Tr color={'black'}>
                <Th p={2} width={'20%'}>Prénom</Th>
                <Th p={2} width={'20%'}>Nom</Th>
                <Th p={2} pl={8} width={'40%'}>Email</Th>
                <Th p={2} width={'10%'}>Editer</Th>
                <Th p={2} width={'10%'}>Supprimer</Th>
              </Tr>
            </Thead>
            <Tbody>
              {dataStudy.map((studyItems) => <GetStudyItems key={studyItems.study_id} {...studyItems} />) as any}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Flex>
  );
}

export default GetStudy;