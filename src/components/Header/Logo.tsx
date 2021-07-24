import { Text, Link } from '@chakra-ui/react';

export function Logo() {
  return(
    <Link href="/">
    <Text
      fontSize="3xl"
      fontWeight="bold"
      letterSpacing="tight"
      w="64"
      color="blue.500"
    >
      mercado
      <Text as="span"
        color="green.500"
      >
        Brasil
      </Text>
    </Text>
    </Link>
  )
}