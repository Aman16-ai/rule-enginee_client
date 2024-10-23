import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import RuleForm from './Components/RuleForm'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout'
import EvaluateForm from './Components/EvaluateForm'
function App() {
  const router = createBrowserRouter([
    {
      path:"/",
      element:<Layout/>,
      children:[
        {
          index:true,
          element:<RuleForm/>
        },
        {
          path:"evaluate-user",
          element:<EvaluateForm/>
        }
      ]
    }
  ])

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
