import { Flex, Link, Menu, MenuButton, MenuList, MenuItem, Button, Box } from "@chakra-ui/react";
import { CgChevronDown  } from 'react-icons/cg'

export function SubHeader() {
  return(
  <Flex
    direction="row"
    w="100%"
    maxW={1480}
    h="20"
    mx="auto"
    mt="4"
    px="6"
    alignContent="space-between"
  >
    <Menu>
      {({ isOpen }) => (
        <Box>
          <MenuButton 
            mr="50" 
            bg="gray.500" 
            isActive={isOpen} 
            as={Button} 
            rightIcon={<CgChevronDown />}
          >
            Categorias
          </MenuButton>
          <MenuList>
            <MenuItem>Veiculos</MenuItem>
            <MenuItem>Tecnologia</MenuItem>
            <MenuItem>Casa e Moveis</MenuItem>
            <MenuItem>Ferramentas</MenuItem>
            <MenuItem>Saude</MenuItem>
            <MenuItem>Moda</MenuItem>
          </MenuList>
        </Box>
      )}
    </Menu>
    <Flex fontSize="xl">
        <Link ml="300" href="/costumers-create">Crie sua conta</Link>
        <Link ml="6" href="/products-create">Vender um produto</Link>
        <Link ml="560">Contato</Link>
    </Flex>
  </Flex>
  )
}