import { useEffect, useState } from "react";
import { useCostumer, Costumer } from "../../context/useCostumers";
import { Avatar, Box, Button, Checkbox, Flex, Heading, Icon, Link, Table, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { RiAddLine } from "react-icons/ri";
import { Header } from "../../components/Header";



export function CostumersTable() {
  const [ costumersAll, setCostumersAll ] = useState<Costumer[]>([]);
  const { loadCostumers } = useCostumer();

  useEffect(() => {
    async function loadStorageData() {
      const costumersStoraged = await loadCostumers();

      setCostumersAll(costumersStoraged);
    }
    loadStorageData()
  }, [loadCostumers])

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">

        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Produtos
            </Heading>

            <Link href="/costumerscreate">
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
                    <Th>Endereço</Th>
                    <Th>E-mail</Th>
                    <Th>Avatar</Th>
                    <Th>Ações</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {costumersAll.map(costumer => {
                    return (
                      <Tr key={costumer.id}>
                        <Td px={["4", "4", "6"]}>
                          <Checkbox colorScheme="pink" />
                        </Td>
                        <Td>
                          <Text fontSize="sm" color="gray.300">{costumer.name}</Text>
                        </Td>
                        <Td>
                          <Text fontSize="sm" color="gray.300">{costumer.address}</Text>
                        </Td>
                        <Td>
                          <Text fontSize="sm" color="gray.300">{costumer.email}</Text>
                        </Td>
                        <Td>
                          <Avatar size="md" name={costumer.name} src={costumer.avatar} />
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