import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/Login";
import SignUpPage from "./pages/SignUp";
import RestorePasswordPageStep1 from "./pages/RestorePassword/Step1";
import RestorePasswordPageStep2 from "./pages/RestorePassword/Step2";

function App() {
  const router = createBrowserRouter([
    { index: true, element: <LoginPage /> },
    { path: "/sign-up", element: <SignUpPage /> },
    {
      path: "/restore-password",
      element: <RestorePasswordPageStep1 />,
    },
    {
      path: "/restore-password/token/",
      element: <RestorePasswordPageStep2 />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
