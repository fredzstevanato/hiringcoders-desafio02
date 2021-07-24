import { Flex, Image, Text, Box } from "@chakra-ui/react"

interface Product {
  name: string;
  price: number;
  photo: string;
}

export function ProductBox({ name, price, photo}: Product) {
  return(
    <Flex
      direction="column"
      marginLeft={10}
      boxShadow= "2xl"
      _hover={{
        bg: 'green.300'
      }}
    >
      <Image 
        src={photo} 
        width={200} 
      />
      <Box 
        background="whiteAlpha.900" 
        width={ 200 } 
        marginTop={0.5}
        pl={3}
      >
        <Text
          fontSize="2em" 
          color={"gray.900"}
        >
          R$ {price}
        </Text>
        <Box>
          <Text 
            fontSize="2rem" 
            color={"gray.700"}
          >
            {name}
          </Text>
        </Box>
      </Box>
    </Flex>
  )
}