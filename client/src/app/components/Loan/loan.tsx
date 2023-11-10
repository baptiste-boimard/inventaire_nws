
// == IMPORT COMPONENTS ==
import PostLoan from './PostLoan/postLoan';
import GetLoan from './GetLoan/getLoan';

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
        <GetLoan />
        <PostLoan />
      </Box>
  );
}

export default LoanInProgress;