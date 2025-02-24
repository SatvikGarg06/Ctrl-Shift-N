import { Outlet } from "react-router"
import { Link } from "react-router"
import { useRef,useEffect } from "react"

function App() {
  const linkRef=useRef(null)

  return (
    <>
    {/* <Header></Header> */}
    <Outlet/>
    </>
  )
}

export default App

