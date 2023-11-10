import { NavLink } from 'react-router-dom';

// == IMPORT CHAKRA UI ==
import { 
  Accordion,
  AccordionItem,
  AccordionButton,
  Box,
} from '@chakra-ui/react'

function NavBar () {
  return (
    <Accordion>
      <AccordionItem>
          <NavLink to={'/inventory'}>
            <h2>
              <AccordionButton>
                <Box as="span" flex='1' textAlign='left' fontSize='0.8em'>
                  Liste du matériel
                </Box>
              </AccordionButton>
            </h2>
          </NavLink>
      </AccordionItem>

      <AccordionItem>
        <NavLink to={'/study'}>
          <h2>
            <AccordionButton>
              <Box as="span" flex='1' textAlign='left' fontSize='0.8em'>
                Liste des étudiants
              </Box>
            </AccordionButton>
          </h2>
        </NavLink>
      </AccordionItem>

      <AccordionItem>
        <NavLink to={'/loan'}>
          <h2>
            <AccordionButton>
              <Box as="span" flex='1' textAlign='left' fontSize='0.8em'>
                Liste des emprunts
              </Box>
            </AccordionButton>
          </h2>
        </NavLink>
      </AccordionItem>
    </Accordion>
  );
}

export default NavBar;