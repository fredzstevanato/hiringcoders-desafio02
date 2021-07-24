import { QueryClientProvider } from 'react-query'
import { ChakraProvider } from "@chakra-ui/react"
import { theme } from "./styles/theme";

import { queryClient } from './services/queryClient';
import { Routes } from './routes';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
          <Routes />
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;
