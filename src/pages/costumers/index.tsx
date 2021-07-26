import { useEffect, useState } from "react";
import { useCostumer, Costumer } from "../../context/useCostumers";
import { Avatar, Box, Button, Checkbox, Flex, Heading, Icon, Link, Table, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { RiAddLine, RiDeleteBinLine, RiEditFill } from "react-icons/ri";
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

  console.log(costumersAll)

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">

        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Produtos
            </Heading>

            <Link href="/costumer/create" passHref>
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
                  {costumersAll.map(costumers => {
                    return (
                      <Tr key={costumers.id}>
                        <Td px={["4", "4", "6"]}>
                          <Checkbox colorScheme="pink" />
                        </Td>
                        <Td>
                          <Text fontSize="sm" color="gray.300">{costumers.name}</Text>
                        </Td>
                        <Td>
                          <Text fontSize="sm" color="gray.300">{costumers.address}</Text>
                        </Td>
                        <Td>
                          <Text fontSize="sm" color="gray.300">{costumers.email}</Text>
                        </Td>
                        <Td>
                          <Avatar size="md" name={costumers.name} src={costumers.avatar} />
                        </Td>
                        <Td>
                          <Button RightIcon={<Icon as ={RiDeleteBinLine} color="whiteAlpha.700" fontSize={30} />} />
                          <Button RightIcon={<Icon as ={RiEditFill} color="whiteAlpha.700" fontSize={30} />} />
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