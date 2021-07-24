import {  Product } from '../context/useProduct'
import { v4 as uuidV4 } from 'uuid';
import { commerce } from 'faker'

export function createProduct(quantity: number, category: string) {
  const product = {
    id: uuidV4(),
    name: commerce.product(),
    description: commerce.productDescription(),
    price: commerce.price(1, 500),
    quantity,
    category,
    shipping: {
      isFree: true,
      cost: 0,
    }
  }
  return product
}

export let produtcList: Product[] = [];

export function CreateProductsLS() {
      for (var i = 0; i < 10; i++) {
        const produt = createProduct(1, 'cars');
   
        produtcList.push({
          id: produt.id,
          category: produt.category,
          description: produt.description,
          name: produt.name,
          price: Number(produt.price),
          quantity: Number(produt.quantity),
          photo: '',
          shipping: {
            cost: produt.shipping.cost,
            isFree: true
          },
          unity: 'UND'
        });
      }
      localStorage.setItem('@commerce-products', JSON.stringify(produtcList))
    }
