import { useAppDispatch, useAppSelector } from '../../../hooks';
import { useEffect } from 'react';

// == IMPORT CHAKRA UI ==
import { Box, Center, Flex, Text} from '@chakra-ui/react'
import { Table, Thead, Tbody, Tr, Th, TableContainer} from '@chakra-ui/react'

// == IMPORT COMPONENTS ==
import GetLoanItems from '../GetLoanItems/getLoanItems';

// == IMPORT ACTION ==
import { getLoan } from '../../../slices/loanSlice';


function GetLoan () {
  const dispatch = useAppDispatch();
  
  // == CALL STORE ==
  const { dataLoan } = useAppSelector(state => state.loanReducer);

  useEffect(() => {
    dispatch(getLoan());
  }, [dispatch]);

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
              <Tr color={'black'} h={20}>
                <Th p={2} width={'20%'}>Matériel</Th>
                <Th p={2} width={'20%'}>Etudiant</Th>
                <Th p={2} width={'10%'}>Quantité</Th>
                <Th p={2} width={'15%'} textAlign={'center'}>{`Date`} <br /> {'d\'emprunt'}</Th>
                <Th p={2} width={'15%'} textAlign={'center'}>{`Date`} <br /> {'de rendu'}</Th>
                <Th p={2} width={'10%'}>Relancer</Th>
                <Th p={2} width={'10%'}>Clôturer</Th>
              </Tr>
            </Thead>
            <Tbody>
              {dataLoan.map((loanItem) => <GetLoanItems key={loanItem.loan_id} {...loanItem} />) as any}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Flex>
  );
}

export default GetLoan;