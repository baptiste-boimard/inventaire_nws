import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box } from '@chakra-ui/react'
import {
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
} from '@chakra-ui/react'
import { PhoneIcon, AddIcon, WarningIcon, SmallAddIcon } from '@chakra-ui/icons'

function NavBar () {
  return (
    <Accordion>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box as="span" flex='1' textAlign='left' fontSize='0.8em'>
              Liste du matériel
            </Box>
          </AccordionButton>
        </h2>
      </AccordionItem>

      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box as="span" flex='1' textAlign='left' fontSize='0.8em'>
              Liste des étudiants
            </Box>
          </AccordionButton>
        </h2>
      </AccordionItem>

      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box as="span" flex='1' textAlign='left' fontSize='0.8em'>
              Liste des emprunts
            </Box>
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4} >
        <List spacing={3} display='flex' flexDirection='column' alignContent='flex-start' p='0px'>
          <ListItem textAlign='left' fontSize='0.7em'>
            <ListIcon as={SmallAddIcon} color='white' />
            En cours
          </ListItem>
          <ListItem textAlign='left' fontSize='0.7em'>
            <ListIcon as={SmallAddIcon} color='white' />
            Délai cours
          </ListItem>
          <ListItem textAlign='left' fontSize='0.7em'>
            <ListIcon as={SmallAddIcon} color='white' />
            Cloturés
          </ListItem>
        </List>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}

export default NavBar;