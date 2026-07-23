import { Routes,Route, Navigate } from "react-router-dom"
import Login from "./pages/Login.jsx"
import Home from "./pages/Home.jsx"
import { useEffect, useState } from "react"
import { BASE_URL } from "./utils/Constants.js"
import axios from "axios"
import ProtectedRoute from "./components/ProtectedRoute.jsx"
import Navbar from "./components/Navbar.jsx"
import { Builder } from "./pages/Builder.jsx"
import Billing from "./pages/Billing.jsx"

function App(){
  const[user,setUser]=useState(null)
  const[loading,setLoading]=useState(true)
const getCurrentUser = async()=>{
  try {
    const res = await axios.get(`${BASE_URL}/user/current-user`, {
    withCredentials: true
});

    if(res?.data?.success){
      setUser(res?.data?.data)
    }
    setLoading(false)
  } catch (error) {
    console.log(error)
    setUser(null)
  }finally{
    setLoading(false)
  }
}

useEffect(()=>{
  getCurrentUser()
},[])

  return (
    <Routes>
<Route path="/login" element={<Login setUser={setUser}/>}/>
      <Route path="/*" element={<ProtectedRoute user={user} loading={loading}>
        <Navbar setUser={setUser} user={user} />
        <Routes>
          <Route path="/" element={<Home user={user}/>}/>
          <Route path="/builder" element={<Builder user={user}setUser={setUser}/>}/>
          <Route path="/billing" element={<Billing user={user}/>}/>
          <Route path="*" element={<Navigate to="/" replace/>}/>
        </Routes>
      </ProtectedRoute>}/>
    </Routes>
  )
}
export default App