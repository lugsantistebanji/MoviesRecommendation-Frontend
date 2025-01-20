import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css';
import theme from '../theme.js';
import App from './App.jsx';
import Home from './pages/Home.jsx'
import Movies from './pages/movies/Movies.jsx'
import Shows from './pages/shows/Shows.jsx'
import Search from './pages/search/Search.jsx'
import DetailsPage from "./pages/DetailsPage.jsx";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: '/movies',
          element: <Movies />
        },
        {
          path: '/shows',
          element: <Shows />
        },
        {
          path: '/search',
          element: <Search />
        },
        {
          path: '/:type/:id',
          element: <DetailsPage />
        }
      ]
    }
  ]
);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  </StrictMode>
)
