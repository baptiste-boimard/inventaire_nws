import NavBar from "../NavBar/navBar";
import ContentBox from "../ContentBox/ContentBox";

import { Box } from "@chakra-ui/react";

function BodyBox () {
  return (
    <Box display='flex' flexDirection={"row"}  w='100%' h='100vh' color='white'>
      <Box display='flex' flexDirection={"row"} bg='#A569BD ' w='20%' p={4} color='white'>
        <NavBar />
      </Box>
      <Box display='flex' flexDirection={"row"} bg='white' w='80%' p={4} color='black'>
        <ContentBox />
    </Box>
    </Box>
  );
}

export default BodyBox;