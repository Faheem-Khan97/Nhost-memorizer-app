import React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { NhostReactProvider } from '@nhost/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import { nhost } from './lib/nhost';
import CreateMemo from './pages/CreateMemo';
import { NhostApolloProvider } from '@nhost/react-apollo';
function App() {
  return (
    <ChakraProvider theme={theme}>
      <NhostReactProvider nhost={nhost}>
        <NhostApolloProvider nhost={nhost}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="sign-up" element={<SignUp />} />
              <Route path="sign-in" element={<SignIn />} />
              <Route path="create-memo" element={<CreateMemo />} />
            </Routes>
          </BrowserRouter>
        </NhostApolloProvider>
      </NhostReactProvider>
    </ChakraProvider>
  );
}

export default App;
