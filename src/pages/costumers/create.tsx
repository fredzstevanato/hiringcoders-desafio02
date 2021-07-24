import { Flex, Box, Heading, Divider, VStack, SimpleGrid, HStack, Button, Text, Select, Checkbox } from "@chakra-ui/react"
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation } from "react-query";

import { Header } from "../../components/Header";
import { Input } from '../../components/Form/Input'
import { useCostumer } from "../../context/useCostumers";

import { queryClient } from "../../services/queryClient";


type CreateCostumerFormData = {
  name: string;
  address: string;
  email: string;
  avatar: string;
}

export function CreateCostumer() {
  const { createCostumers } = useCostumer();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  const createdCostumer = useMutation(async (costumer: CreateCostumerFormData) => {
      const createdCostumer = createCostumers({
        name: costumer.name,
        address: costumer.address,
        email: costumer.email,
        avatar: costumer.avatar,
      })
      console.log(createCostumers)
      return createdCostumer;

  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('costumer')
    }
  });


  const handleCreateCostumer: SubmitHandler<CreateCostumerFormData> = async (values) => {
    await createdCostumer.mutateAsync(values);
  }

  return (
    <Box>
      <Header />

      <Flex width="100%" my="6" maxW={1480} marginX="auto" px="6">
        <Box
          as="form"
          flex="1"
          borderRadius={8}
          bg="gray.800"
          padding={["6", "8"]}
          onSubmit={handleSubmit(handleCreateCostumer)}
        >
          <Heading size="lg" fontWeight="normal">Cadastrar Clientes</Heading>

          <Divider my="6" borderColor="gray.700" />

          <VStack spacing="8">
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input
                name="name"
                label="Nome completo"
                {...register('name')}
                error={errors.name}
              />
              <Input
                name="description"
                label="Endereço"
                {...register('address')}
                error={errors.address}
              />s
            </SimpleGrid>
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input
                name="email"
                label="email"
                {...register('email')}
                error={errors.email}
              />
              <Input
                name="avatar"
                label="avatar"
                {...register('avatar')}
                error={errors.avatar}
              />
            </SimpleGrid>
          </VStack>

          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
                <Button as="a" colorScheme="whiteAlpha">Cancelar</Button>
              <Button
                type="submit"
                colorScheme="pink"
                isLoading={isSubmitting}
              >
                Salvar
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  )
}