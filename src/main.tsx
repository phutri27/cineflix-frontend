import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter} from 'react-router'
import { QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import AdminDashboard from './pages/admin-dashboard/AdminDashboard'
import Movies from './pages/admin-dashboard/movies/Movies'
import Movie from './pages/admin-dashboard/movies/Movie'
import SingleMovieEdit from './pages/admin-dashboard/movies/SingleMovieEdit'

const queryClient = new QueryClient()
const router = createBrowserRouter([
     {
        path: "/",
        element: <Home />
     },
     {
        path:"/signup",
        element: <Signup />
     },
     {
        path:  "/login",
        element: <Login />
     },
     {
      path: "/admin/dashboard",
      element: <AdminDashboard />,
      children: [
        {path: "movies", 
         element: <Movies />, 
         children:
         [
           {index: true, element: <Movie />}
         ]},
      ]
     },
     {
      path: "/admin/edit-movie/:movieId",
      element: <SingleMovieEdit />,
     }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}/>
      <ReactQueryDevtools initialIsOpen={false}/>
    </QueryClientProvider>
  </StrictMode>
)
