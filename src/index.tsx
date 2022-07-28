import { ChakraProvider, theme } from '@chakra-ui/react';
import ReactDOM from 'react-dom/client';
import App from './App'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ChakraProvider resetCSS>
      <App />
  </ChakraProvider>
);

