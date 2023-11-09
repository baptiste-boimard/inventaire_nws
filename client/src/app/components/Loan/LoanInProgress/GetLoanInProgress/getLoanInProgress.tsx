import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { useEffect } from 'react';

// == IMPORT CHAKRA UI ==
import { Box, Center, Flex, Text} from '@chakra-ui/react'
import { Table, Thead, Tbody, Tr, Th, TableContainer} from '@chakra-ui/react'

// == IMPORT COMPONENTS ==
import GetLoanInProgressItems from '../GetLoanInProgress/GetLoanInProgressItems/getLoanInProgressItems';

// == IMPORT ACTION ==
import { getLoan } from '../../../../slices/loanSlice';


function GetLoanInProgress () {
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(getLoan());
  }, [dispatch]);
  
  // == CALL STORE ==
  const { dataLoan } = useAppSelector(state => state.loanReducer);

  return (
    <Flex 
      color='black'
      direction={'column'}
      mb={12} border='1px solid'
      borderColor='gray'
      borderRadius="30px"
    >
      <Center bg='white'>
        <Text fontWeight={'bold'}>Liste des prêts</Text>
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
                <Th p={2} width={'30%'}>Matériel</Th>
                <Th p={2} width={'10%'}>Etudiant</Th>
                <Th p={2} pl={8} width={'40%'}>Quantité</Th>
                <Th p={2} width={'10%'}>Editer</Th>
                <Th p={2} width={'10%'}>Supprimer</Th>
              </Tr>
            </Thead>
            <Tbody>
              {dataLoan.map((loanItem) => <GetLoanInProgressItems key={loanItem.loan_id} {...loanItem} />) as any}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Flex>
  );
}

export default GetLoanInProgress;