import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { MainLayout } from './components/Layout/MainLayout'
import Home from './pages/Home'
import FetchOld from './pages/FetchOld'
import FetchRQ from './pages/FetchRQ'
import { QueryClientProvider, useQueryClient } from '@tanstack/react-query'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/old',
        element: <FetchOld />
      },
      {
        path: '/rq',
        element: <FetchRQ />
      },
    ]
  }
])

const App = () => {
  const queryClient = useQueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} ></RouterProvider>
    </QueryClientProvider>
  )
}

export default App