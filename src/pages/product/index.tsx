import { useEffect, useState } from "react";
import { Product, useProducts } from "../../context/useProduct";
import { Box, Button, Checkbox, Flex, Heading, Icon, Link, Table, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { RiAddLine } from "react-icons/ri";
import { Header } from "../../components/Header";

export function ProductTable() {
  const [ productAll, setProductAll ] = useState<Product[]>([]);
  const { loadProducts } = useProducts();

  useEffect(() => {
    async function loadStorageData() {
      const productsStoraged = await loadProducts();

      setProductAll(productsStoraged);
    }
    loadStorageData()
  }, [loadProducts])

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">

        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Produtos
            </Heading>

            <Link href="/productscreate">
              <Button
                as="a"
                size="sm"
                fontSize="sm"
                colorScheme="pink"
                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
              >
                Criar novo
              </Button>
            </Link>
          </Flex>

            <>
              <Table colorScheme="whiteAlpha">
                <Thead>
                  <Tr>
                    <Th px={["4", "4", "6"]} color="gray.300" width="8">
                      <Checkbox colorScheme="pink" />
                    </Th>
                    <Th>Nome</Th>
                    <Th>Estoque</Th>
                    <Th>Unidade</Th>
                    <Th>Preço</Th>
                    <Th>Ações</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {productAll.map(product => {
                    return (
                      <Tr key={product.id}>
                        <Td px={["4", "4", "6"]}>
                          <Checkbox colorScheme="pink" />
                        </Td>
                        <Td>
                          <Text fontSize="sm" color="gray.300">{product.name}</Text>
                        </Td>
                        <Td>
                          <Text fontSize="sm" color="gray.300">{product.quantity}</Text>
                        </Td>
                        <Td>
                          <Text fontSize="sm" color="gray.300">{product.unity}</Text>
                        </Td>
                        <Td>
                          <Text fontSize="sm" color="gray.300">{product.price}</Text>
                        </Td>
                        <Td>
                          <Button fontSize="3xl" color="green.500">+</Button>
                          <Button fontSize="3xl" ml="2" color="red.500">-</Button>
                        </Td>
                      </Tr>
                    )
                  })}
                </Tbody>
              </Table>
            </>
        </Box>
      </Flex>
    </Box>
  );
}