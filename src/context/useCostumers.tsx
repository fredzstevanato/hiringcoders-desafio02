import { createContext, ReactNode, useState, useContext } from 'react';
import { v4 as uuidV4 } from 'uuid';

export interface Costumer {
  id: string;
  name: string;
  address: string;
  email: string;
  avatar: string;
  isCanLog?: boolean;
}

export type CostumerInput = Omit<Costumer, 'id'>;


interface CostumerProviderProps {
  children: ReactNode;
}

interface CostumerContextData {
  costumers: Costumer[];
  createCostumers: (product:CostumerInput) => Promise<void>;
  loadCostumers: () => Promise<Costumer[]>;
}

const CostumersContext = createContext<CostumerContextData>({} as CostumerContextData);

export function CostumersProvider({ children }: CostumerProviderProps) {
  const [costumers, setCostumers] = useState<Costumer[]>([]);

  async function createCostumers({name, address, avatar, email }: CostumerInput) {
    const costumer = {
      id: uuidV4(),
      name,
      address,
      avatar,
      email
    }

    setCostumers([
      ...costumers,
      costumer
    ]);

    localStorage.setItem('@commerce-costumer', JSON.stringify(costumers))
  }

  async function loadCostumers() {
    try {                                     
      const data = await localStorage.getItem('@commerce-costumer');
      const costumersAll = data ? (JSON.parse(data) as Costumer) : {};

      const costumersStored = Object
      .keys(costumersAll)
      .map((costumer) => {
        return {
          ...setCostumers[costumer]
        }     
      })   
      return costumersStored;
    } catch (error){
      throw new Error(error);
    }
  }

  return (
    <CostumersContext.Provider value={{ costumers , createCostumers, loadCostumers}}>
      {children}
    </CostumersContext.Provider>
  );
}

export function useCostumer() {
  const context = useContext(CostumersContext);

  return context;
}

