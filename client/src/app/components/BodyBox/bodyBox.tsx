import NavBar from "../NavBar/navBar";
import ContentBox from "../ContentBox/ContentBox";

import { Box } from "@chakra-ui/react";

function BodyBox () {
  return (
    <Box display='flex' flexDirection={"row"}  w='100%' minHeight='100vh' color='white'>
      <Box
        display='flex'
        flexDirection={"row"}
        bg='#A569BD'
        w='15%'
        p={4}
        color='white'
        pt={40}
      >
        <NavBar />
      </Box>
      <Box display='flex' flexDirection={"row"} bg='white' w='70%' p={0} color='black'>
        <ContentBox />
      </Box>
      <Box bg='white' w='15%' p={4}>
      </Box>
    </Box>
  );
}

export default BodyBox;