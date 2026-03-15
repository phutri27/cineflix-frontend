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
import Movie from './pages/admin-dashboard/movies/movies/Movie'
import SingleMovieEdit from './pages/admin-dashboard/movies/movies/SingleMovieEdit'
import Actors from './pages/admin-dashboard/movies/movies-option/Actors'
import Directors from './pages/admin-dashboard/movies/movies-option/Directors'
import Genres from './pages/admin-dashboard/movies/movies-option/Genres'
import Cinemas from './pages/admin-dashboard/cinemas/Cinemas'
import CinemaSpecific from './pages/admin-dashboard/cinemas/CinemaSpecific'
import ScreenView from './pages/admin-dashboard/cinemas/screens/ScreenView'
import ScreenCreate from './pages/admin-dashboard/cinemas/screens/ScreenCreate'
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
           {index: true, element: <Movie />},
           {path: "actors", element: <Actors /> },
           {path: "directors", element: <Directors />},
           {path: "genres", element: <Genres />},
         ]},
         {path: "cinemas", element: <Cinemas />}
      ]
     },
     {
      path: "/admin/edit-movie/:movieId",
      element: <SingleMovieEdit />,
     },
     {
      path: "/admin/edit-cinemas/:cinemaId",
      element: <CinemaSpecific />
     },
     {
      path: "/admin/cinemas/:cinemaId/add-screen",
      element: <ScreenCreate />
     },
     {
      path: "/admin/cinemas/:cinemaId/screens/:screenId",
      element: <ScreenView />
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
