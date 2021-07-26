import { Flex, Box, Link, Heading, Divider, VStack, SimpleGrid, HStack, Button, Text, Select, Checkbox, Icon } from "@chakra-ui/react"
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation } from "react-query";

import { Header } from "../../components/Header";
import { Input } from '../../components/Form/Input'
import { useProducts } from "../../context/useProduct";

import { queryClient } from "../../services/queryClient";
import { RiFileListFill } from "react-icons/ri";


type CreateProductFormData = {
  name: string;
  description: string;
  quantity: number;
  price: number;
  shipping?: {
    isFree?: boolean;
    cost?: number;
  };
  photo?: string;
  category: string;
  unity: string;
}

export function CreateProduct() {
  const { createProduct } = useProducts();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  const createdProduct = useMutation(async (product: CreateProductFormData) => {
      const createdProduct = createProduct({
        name: product.name,
        description: product.description,
        category: product.category,
        price: product.price,
        quantity: product.quantity,
        photo: product.photo,
        unity: product.unity
      })
      return createdProduct;
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('product')
    }
  });


  const handleCreateProduct: SubmitHandler<CreateProductFormData> = async (values) => {
    await createdProduct.mutateAsync(values);
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
          onSubmit={handleSubmit(handleCreateProduct)}
        >
          <Heading size="lg" fontWeight="normal">Cadastrar Produto</Heading>
          <Link href="/products">
              <Button
                as="a"
                size="sm"
                fontSize="sm"
                colorScheme="pink"
                leftIcon={<Icon as={RiFileListFill} fontSize="20" />}
              >
                Listar
              </Button>
            </Link>

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
                label="Descrição"
                {...register('description')}
                error={errors.description}
              />s
              <div>
                <Text marginBottom="1">Categoria</Text>
                <Select placeholder="Categoria"
                  border="none"
                  focusBorderColor="pink.500"
                  bgColor="gray.900"
                  _hover={{
                    color:"blackAlpha.500"
                  }}
                  size="lg"
                >
                  <option value="vehicles">Veiculos</option>
                  <option value="tech">Tecnologia</option>
                  <option value="home">Casa e Móveis</option>
                  <option value="tools">Ferramentas</option>
                  <option value="health">Casa e Móveis</option>
                  <option value="fashion">Moda</option>
                </Select>
              </div>
            </SimpleGrid>
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input
                name="quantity"
                label="Quantidade"
                {...register('quantity')}
                error={errors.quantitys}
              />
              <Input
                name="unity"
                label="Unidade"
                {...register('unity')}
                error={errors.unity}
              />
              <Input
                name="price"
                label="Preço"
                {...register('price')}
                error={errors.price}
              />
            </SimpleGrid>
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <div>
                <Text>Frete grátis?</Text>
                <Checkbox />
              </div>
              <Input
                name="cost"
                label="Custo do Frete"
                {...register('cost')}
                error={errors.cost}
              />
              <Input
                name="photo"
                label="Url Foto"
                {...register('photo')}
                error={errors.photo}
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