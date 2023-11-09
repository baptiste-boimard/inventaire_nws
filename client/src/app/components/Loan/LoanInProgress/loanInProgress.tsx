
// == IMPORT COMPONENTS ==
import PostLoan from '../PostLoan/postLoan';
import GetLoanInProgress from './GetLoanInProgress/getLoanInProgress';

// IMPORT CHAKRA UI ==
import { Box } from '@chakra-ui/react';

function LoanInProgress () {
  return (
      <Box
        bg='white'
        w='100%'
        maxH='100%'
        p={4}
      >
        <GetLoanInProgress />
        <PostLoan />
      </Box>
  );
}

export default LoanInProgress;