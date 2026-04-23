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
import SpecficMovie from './pages/user/movies/SpecficMovie'
import ShowingMovies from './pages/user/movies/ShowingMovies'
import ComingMovies from './pages/user/movies/ComingMovies'
import Profile from './pages/user/profile/Profile'
import GeneralInfo from './pages/user/profile/GeneralInfo'
import DetailedInfo from './pages/user/profile/DetailedInfo'
import ChangePassword from './pages/user/profile/ChangePassword'
import NewPassword from './pages/user/profile/NewPassword'
import ForgotPassword from './pages/user/forgot-password/ForgotPassword'
import { Outlet } from 'react-router'
import ForgotNewPassword from './pages/user/forgot-password/ForgotNewPassword'
import SeatsDisplay from './pages/user/booking/SeatsDisplay'
import Payment from './pages/user/booking/Payment'
import CancelPayment from './pages/user/payment/CancelPayment'
import MoviesBySearch from './pages/user/movies/MoviesBySearch'
import PaymentSuccess from './pages/user/payment/PaymentSuccess'
import { LoginAccess, RestrictLogin } from './components/RoleAcess'
import VnpayPayment from './pages/user/payment/VnpayPayment'
import CinemasUser from './pages/user/cinemas/CinemasUser'
import CinemaChart from './pages/admin-dashboard/stats/CinemaChart'
import Stats from './pages/admin-dashboard/stats/Stats'
import UserChart from './pages/admin-dashboard/stats/UserChart'
import MovieChart from './pages/admin-dashboard/stats/MovieChart'
import BookingHistory from './pages/user/profile/BookingHistory'
import TermsOfService from './pages/user/policies/TermOfService'
import PrivacyPolicy from './pages/user/policies/Privacy'
import TicketingPolicy from './pages/user/policies/TicketingPolicy'
import MemberBenefits from './pages/user/policies/MemberBenifits'
import FAQ from './pages/user/policies/Faq'
import NotFound from './pages/user/wildcard/NotFound'
import ProfileVoucher from './pages/user/profile/ProfileVoucher'
import CineflixSpecial from './pages/user/navbar-pages/CineflixSpecial'
import ContactCineflix from './pages/user/navbar-pages/ContactCineflix'
import NewsAndOffers from './pages/user/navbar-pages/NewsAndOffer'
import RootLayout from './RootLayout'
import Archive from './pages/admin-dashboard/movies/archive/Archive'

const queryClient = new QueryClient()
const router = createBrowserRouter([
      {
        element: <RootLayout />,
        children: [
        {
        element: <LoginAccess />,
        children: [
          {path:"/signup",element: <Signup />},
          {path:"/login", element: <Login />},
          {
            path: "/forgotpassword",
            element: <Outlet />,
            children: [
              {index: true, element: <ForgotPassword />},
              {path: "new-password", element: <ForgotNewPassword />}
            ]
          },
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
        path: "/default/movie/:movie_id",
        element: <SpecficMovie />
      },
      {
        path: "/default/cinemas",
        element: <CinemasUser />
      },
      {
        path: "/default/terms",
        element: <TermsOfService />
      },
      {
        path :"/default/privacy",
        element: <PrivacyPolicy />
      },
      {
        path: "/default/ticketing-policy",
        element: <TicketingPolicy />
      },
      {
        path: "/default/member-benefits",
        element: <MemberBenefits />
      },
      {
        path: "/default/faq",
        element: <FAQ />
      },
      {
        path: "/default/special",
        element: <CineflixSpecial />
      },
      {
        path: "/default/contact",
        element: <ContactCineflix />
      },
      {
        path: "/default/news",
        element: <NewsAndOffers />
      },
      {
        element: <RestrictLogin />,
        children: [
          {
            path:"/default/checkout/payment/:showTimeId",
            element: <Payment />
          },
          {
            path: "/default/profile",
            element: <Profile />,
            children: [
              { index: true, element: <GeneralInfo /> },
              { path: "detailed", element: <DetailedInfo /> },
              { path: "change-password", element: <ChangePassword />},
              { path: "new-password", element: <NewPassword />},
              { path: "booking-history", element: <BookingHistory />},
              { path: "vouchers", element: <ProfileVoucher /> }
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
                  {path: "archive", element: <Archive />}
                ]},
                {path: "cinemas", element: <Cinemas />},
                {path: "snacks", element: <Snacks />},
                {path: "vouchers", element: <Vouchers />},
                {path: "users", element: <User />},
                {
                  path: "stats",
                  element: <Stats />,
                  children: [
                    {index: true, element: <CinemaChart />},
                    {path: "cinemas", element: <CinemaChart />},
                    {path: "users", element: <UserChart />},
                    {path: "movies", element: <MovieChart />}
                  ]
                }
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
      },
      {
        path: "*",
        element: <NotFound />
      }
          ]
        },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}/>
      <ReactQueryDevtools initialIsOpen={false}/>
    </QueryClientProvider>
  </StrictMode>
)
