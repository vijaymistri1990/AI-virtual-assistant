import { Routes,Route } from "react-router-dom"
import Login from "./pages/Login.jsx"
import Home from "./pages/Home.jsx"
import { useEffect, useState } from "react"
import { BASE_URL } from "./utils/Constants.js"
import axios from "axios"

function App(){
  const[user,setUser]=useState(null)
  const[loading,setLoading]=useState(true)

const getCurrentUser = async()=>{
  try {
    const res = await axios.get(`${BASE_URL}/user/current-user`, {
    withCredentials: true
});
    if(res.data.success){
      setUser(res.data.data)
    }
  } catch (error) {
    console.log(error)
  }finally{
    setLoading(false)
  }
}

useEffect(()=>{
  getCurrentUser()
},[])

  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
    </Routes>
  )
}
export default App