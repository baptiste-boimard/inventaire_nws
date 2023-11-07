import GetStudy from "./GetStudy/getStudy";
import PostStudy from "./PostStudy/postStudy";

// IMPORT CHAKRA UI ==
import { Box } from '@chakra-ui/react';


function Study () {
  return(
    <Box
      bg='white'
      w='100%'
      maxH='100%'
      p={4}
    >
      <GetStudy />
      <PostStudy />
    </Box>
  );
}

export default Study;