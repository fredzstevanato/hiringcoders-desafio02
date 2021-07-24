import { Text, Flex, Icon } from '@chakra-ui/react'
import { Logo } from './Logo';
import { Search } from './Search';
import { MdPhoneAndroid } from 'react-icons/md'
import { SubHeader } from './SubHeader';

import { Profile } from './Profile';

export function Header() {
  return(
    <>
      <Flex
        as="header"
        w="100%"
        maxW={1480}
        h="20"
        mx="auto"
        mt="4"
        px="6"
        align="center"
      >
        <Logo />
        <Search />
        <Text
          fontSize="20"
          ml="10"
        >
          <Icon as={MdPhoneAndroid} fontSize="40" />
          Baixar o app do Mercado Brasil 
        </Text>
        <Profile />
      </Flex>
      <SubHeader />
    </>
  )
}