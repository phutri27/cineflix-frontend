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
import SpecificCinemaMovies from './pages/admin-dashboard/cinemas/showing-movies/SpecificCinemaMovies'
import Snacks from './pages/admin-dashboard/snacks/Snacks'
import Vouchers from './pages/admin-dashboard/vouchers/Vouchers'
import User from './pages/admin-dashboard/users/User'
import RoleAccess from './components/RoleAcess'
import SpecficMovie from './pages/movies/SpecficMovie'
import ShowingMovies from './pages/movies/ShowingMovies'
import ComingMovies from './pages/movies/ComingMovies'
import Profile from './pages/profile/Profile'
import GeneralInfo from './pages/profile/GeneralInfo'
import DetailedInfo from './pages/profile/DetailedInfo'
import ChangePassword from './pages/profile/ChangePassword'
import NewPassword from './pages/profile/NewPassword'
import ForgotPassword from './pages/forgot-password/ForgotPassword'
import { Outlet } from 'react-router'
import ForgotNewPassword from './pages/forgot-password/ForgotNewPassword'
import SeatsDisplay from './pages/booking/SeatsDisplay'
import Payment from './pages/booking/Payment'
import CancelPayment from './pages/payment/CancelPayment'
import MoviesBySearch from './pages/movies/MoviesBySearch'
import PaymentSuccess from './pages/payment/PaymentSuccess'
import { LoginAccess, RestrictLogin } from './components/RoleAcess'
import VnpayPayment from './pages/payment/VnpayPayment'

const queryClient = new QueryClient()
const router = createBrowserRouter([
     {
      element: <LoginAccess />,
      children: [
        {path:"/signup",element: <Signup />},
        {path:"/login", element: <Login />},
      ]
     },
     {
        path: "/",
        element: <Home />
     },
     {
      path: "/default/movies/showing-movies",
      element: <ShowingMovies />
     },
     {
      path: "/default/movies/coming-soon",
      element: <ComingMovies />
     },
     {
      path: "/default/movies",
      element: <MoviesBySearch />
     },
     {
      path: "/default/:movie_id",
      element: <SpecficMovie />
     },
     {
      element: <RestrictLogin />,
      children: [
        {
          path:"/default/checkout/payment/:showTimeId",
          element: <Payment />
        },
        {
          path: "/forgotpassword",
          element: <Outlet />,
          children: [
            {index: true, element: <ForgotPassword />},
            {path: "new-password", element: <ForgotNewPassword />}
          ]
        },
        {
          path: "/default/profile",
          element: <Profile />,
          children: [
            { index: true, element: <GeneralInfo /> },
            { path: "detailed", element: <DetailedInfo /> },
            { path: "change-password", element: <ChangePassword />},
            { path: "new-password", element: <NewPassword />},
            { path: "booking-history", element: <p>Booking history</p>},
          ]
        },
      ]
     },
     {
        path:"/payment",
        children:[
          {path: "complete", element: <PaymentSuccess />},
          {path: "cancel", element: <CancelPayment />},
          {path: "vnpay", element: <VnpayPayment />}
        ]
      },
     {
      path: "/default/cinema/:cinemaId/booking/ticket/:showTimeId",
      element: <SeatsDisplay />
     },
     {
        element: <RoleAccess />,
        children: [
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
              {path: "cinemas", element: <Cinemas />},
              {path: "snacks", element: <Snacks />},
              {path: "vouchers", element: <Vouchers />},
              {path: "users", element: <User />}
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
          },
          {
            path: "/admin/cinemas/:cinemaId/movies/:movieId/showtimes",
            element: <SpecificCinemaMovies />
          },
        ]
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
