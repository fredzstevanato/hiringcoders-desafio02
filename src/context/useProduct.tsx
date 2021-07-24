import { createContext, ReactNode, useState, useContext } from 'react';
import { v4 as uuidV4 } from 'uuid';

export interface Product {
  id: string;
  name: string;
  description: string;
  quantity: number;
  unity: string;
  price: number;
  shipping?: {
    isFree?: boolean;
    cost?: number;
  };
  photo?: string;
  category: string;
}

export type ProductInput = Omit<Product, 'id'>;

interface ProductsProviderProps {
  children: ReactNode;
}

interface ProductsContextData {
  products: Product[];
  createProduct: (product:ProductInput) => Promise<void>;
  loadProducts: () => Promise<Product[]>;
}

const ProductsContext = createContext<ProductsContextData>({} as ProductsContextData);

export function ProductsProvider({ children }: ProductsProviderProps) {
  const [products, setProducts] = useState<Product[]>([]);

  async function createProduct({name, description, category, price, unity, quantity, photo, shipping}: ProductInput) {
    const product = {
      id: uuidV4(),
      name,
      description, 
      price,
      quantity, 
      category,
      photo,
      shipping,
      unity
    }

    setProducts([
      ...products,
      product
    ]);

    localStorage.setItem('@commerce-products', JSON.stringify(products))
  }

  async function addCart() {
    
  }

  async function loadProducts() {
    try {
      const data = await localStorage.getItem('@commerce-products');
      const productsAll = data ? (JSON.parse(data) as Product) : {};

      const productStored = Object
      .keys(productsAll)
      .map((product) => {
        return {
          ...productsAll[product]
        }     
      })   
      return productStored;
    } catch (error){
      throw new Error(error);
    }
  }

  return (
    <ProductsContext.Provider value={{ products, createProduct, loadProducts}}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductsContext);

  return context;
}

