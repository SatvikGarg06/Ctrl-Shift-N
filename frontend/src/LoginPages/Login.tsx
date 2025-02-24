import { useRef,useState } from "react"
import requestHandler from "../utility/requestHandler"
import validator from  "validator"
import {Link} from "react-router"
import { checkIs, doDefault, setCurrentItem } from "../store/AppContext"
// import "./effect.css"
function Login(){

        const email=useRef('')
        const password=useRef('')
        const [validator1,changevalidator1]=useState(false)
    
  function valuevalidator1(email:any,password:any){
    if ((email.current=='')||(password.current=='')||(!validator.isEmail(email.current))){
      changevalidator1(false)
    }
    else{
      changevalidator1(true)
    }
  }

  async function registerHandler() {
    try {
      const response = await requestHandler(
        "POST",
        "/login/",
        { email: email.current, password: password.current }
      );
      console.log("Response:", response);
      if(response.error){
        console.log("error")
        alert(response.message)
      }else{
        console.log("final")
        let data = checkIs()
        if(data==false){
          doDefault()
        }
        setCurrentItem("useremail",email.current)
        setCurrentItem("username",response.name)
        location.href = "/geeks"
      }
      
    } catch (error) {
      console.error("Error in registerHandler:", error);
    }
  }
  

 return (

<>
    <div className="font-[sans-serif]">
      <div className="min-h-screen flex fle-col items-center justify-center py-6 px-4">
        <div className="grid md:grid-cols-2 items-center gap-6 max-w-6xl w-full">
          <div className="border border-gray-300 rounded-lg p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
            <form className="space-y-4" >
              <div className="mb-8">
                <h3 className="text-graybutton-800 text-3xl font-bold">Sign in</h3>
                <p className="text-gray-500 text-sm mt-4 leading-relaxed">Sign in to your account and explore a world of possibilities. Your journey begins here.</p>
              </div>

              <div>
                <label className="text-gray-800 text-sm mb-2 block">Email</label>
                <div className="relative flex items-center">
                  <input name="email" type="text" onChange={(e)=>{email.current=e.target.value
                  
                    valuevalidator1(email,password)
                  }} required className="w-full text-sm text-gray-800 border border-gray-300 pl-4 pr-10 py-3 rounded-lg outline-blue-600" placeholder="Enter user name" />
                  <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-4" viewBox="0 0 24 24">
                    <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                    <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z" data-original="#000000"></path>
                  </svg>
                </div>
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Password</label>
                <div className="relative flex items-center">
                  <input name="password"  onChange={(e)=>{password.current=e.target.value

                    valuevalidator1(email,password)
                  }} type="password" required className="w-full text-sm text-gray-800 border border-gray-300 pl-4 pr-10 py-3 rounded-lg outline-blue-600" placeholder="Enter password" />
                  <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-4 cursor-pointer" viewBox="0 0 128 128">
                    <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000"></path>
                  </svg>
                </div>
              </div>
              
              <div className="!mt-8">
                {validator1&&<button  type="button" onClick={registerHandler} className="w-full shadow-xl py-2.5 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                  Sign in
                </button>}
                {!validator1&& <center><h4 className="text-lg" style={{color:"red"}}>Please, Enter valid details</h4></center>}
              </div>

              <p className="text-sm !mt-8 text-center text-gray-500">Don't have an account <Link to="/" className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap">Register here</Link></p>
            </form>
          </div>
          <div className="max-md:mt-8">
            <img src="https://readymadeui.com/login-image.webp" className="w-full aspect-[71/50] max-md:w-4/5 mx-auto block object-cover" alt="Dining Experience" />
          </div>
        </div>
      </div>
    </div>
    </>
 )
}
export default Login