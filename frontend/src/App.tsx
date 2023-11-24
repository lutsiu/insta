import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import LoginPage from './pages/Login';
import SignUpPage from './pages/SignUp';


function App() {
  
  const router = createBrowserRouter([
    {index: true, element: <LoginPage/>},
    {path: '/sign-up', element: <SignUpPage/>}
  ])

  return <RouterProvider router={router}/>
}

export default App
