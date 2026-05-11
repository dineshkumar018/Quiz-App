import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import SignupPage from "./components/pages/Signup";
import Footer from "./components/Footer";
import LoginPage from "./components/pages/LoginPage";
import { WelcomeScreen } from "./components/pages/WelcomeScreen";
import QuestionScreen from "./components/pages/QuestionScreen";
import Logout from "./components/pages/Logout";
import ResultScreen from "./components/pages/ResultScreen";
import ProtectedRoutes from "./components/ProtectedRoutes";

export const routes ={
  signup: "/signup",
  login:"/login",
  ProtectedRoutes:{
    welcome: "/welcome",
    questions:"/questions",
    result:"/result",
    logout : "/logout"
  }
}

const router = createBrowserRouter([
  { path: "/", element: <Navigate to={routes.login} replace/> },
  { path: routes.signup, element: <SignupPage /> },
  { path: routes.login, element: <LoginPage /> },
  { path: routes.ProtectedRoutes.welcome, element :<ProtectedRoutes element={<WelcomeScreen />} />},
  { path: routes.ProtectedRoutes.questions, element :<ProtectedRoutes element={<QuestionScreen/>} /> },
  { path: routes.ProtectedRoutes.logout, element :<ProtectedRoutes element={<Logout />} />},
  { path: routes.ProtectedRoutes.result, element :<ProtectedRoutes element={<ResultScreen/>} /> },
]);

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Toaster />
      <RouterProvider router={router} />
      <Footer />
    </div>
  );
}

export default App;
