import { Flex, Button, Icon, SimpleGrid, Box } from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";
import { Header } from "../components/Header";
import { ProductBox } from "../components/Products/ProductBox";

import { RiAddLine } from 'react-icons/ri'

import { useProducts, Product } from "../context/useProduct"
import { CreateProductsLS } from "../utils/CreateProductLS";

/* interface Product {
  name: string;
  price: number;
  photo: string;
} */

export function Home() {
  const { loadProducts } = useProducts();
  const [ productAll, setProductAll ] = useState<Product[]>([]);
  const [ productDetails, setProductDetails ] = useState<Product>()


  const listProducts = localStorage.getItem('@commerce-products')

  if(!listProducts) {
    CreateProductsLS();
  }

  useEffect(() => {
    async function loadStorageData() {
      const productsStoraged = await loadProducts();

      setProductAll(productsStoraged);
    }
    loadStorageData()
  }, [])

  useEffect(() => {
    console.log(productDetails)
  }, [productDetails])

  return(
    <Flex
      w="100vw"
      flexDir="column"
      maxW={1480}
    >
      <Header />

      <Flex
        w="100%" my="6" maxW={1480} mx="auto" px="6"
        
      >
        <SimpleGrid flex="1" gap="" minChildWidth="220px" align="flex-start">

        {productAll.map(product => {
          return (
            <Box>
              <ProductBox key={product.id}
                name={product.name}
                photo="https://http2.mlstatic.com/D_Q_NP_741517-MLB31170448800_062019-AB.webp"
                price={Number(product.price)}
              />
              <Button 
                w={50}
                ml="190"
                mt="-50"
                bg="green.500" 
                rightIcon={<Icon as ={RiAddLine} color="whiteAlpha.700" fontSize={30} />}
                onClick={() => setProductDetails({
                  name: product.name,
                  category: product.category,
                  description: product.description,
                  id: product.id,
                  price: product.price,
                  quantity: product.quantity,
                  shipping: product.shipping,
                  photo: product.photo,
                  unity: product.unity

                })}
              />
            </Box>
          )
        })}
        </SimpleGrid>
      </Flex>
    </Flex> 
  )
}