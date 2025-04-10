import React, { useState} from "react";
import "../components/style.css";
import { Link } from "react-router-dom";
import { useNavigate, useFetcher } from "react-router-dom";
import { EyeIcon, EyeOffIcon } from "lucide-react";


 export default function SignIn () {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate ();

  const handleLogin = async(e)=>{
    e.preventDefault();
    console.log(password, username)
    try {
      let response = await fetch("http://172.19.120.186:8000/gateway/login/",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body:JSON.stringify({ "login":username, "password":password}),
    });
    
    if (response.status !== 200){
      alert("Failed to log in!")
      return
    }

    if(response.status == 200) {
      let result = await response.json();

      console.log(result)
      localStorage.setItem("token", result.data.access);

      navigate("/");
    }

    } catch (error) {
      console.log(error);
    }
  }


   return (

        <div className="">

          {/* Main Content */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 ">
            {/* Login Form */}
            <div className="bg-[#f2e4d0] p-8 rounded-xl shadow-lg w-full max-w-md ">
              <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl">
                Connectez-vous !
              </h1>
              <form className="z-[9999]" onSubmit={handleLogin}>
                <div>
                  <label htmlFor="" className="text-sm font-medium">Nom d'utilisateur ou adresse email<span className="text-red-500">*</span></label>
                  <input type="text"
                  className="bg-white border rounded-md block w-full p-2 "
                  required 
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="" className="text-sm font-medium ">Mot de passe<span className="text-red-500">*</span></label>
                  <div className="relative flex justify-center items-center">
                    <input type={showPassword ? "text" :"password"}
                    className="bg-white border rounded-md mt-1 block w-full p-2"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required />
                    {showPassword ? <EyeIcon className="text-gray-400 h-5 absolute right-0 cursor-pointer" onClick={()=>setShowPassword(false)}/> : <EyeOffIcon className="text-gray-400 h-5 absolute right-0 cursor-pointer" onClick={()=>setShowPassword(true)}/> }
                  </div>

                </div>
                <div>
                  <Link to={"signin"} className="text-blue-900 text-sm font-medium">Mot de passe oublié ?</Link>
                </div>
                <div>
                  <button 
                  type="submit"
                  className="w-full mt-4 bg-blue-900 font-bold text-white py-2 rounded-md text-center transition-transform hover:scale-102">
                    Je me connecte
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      );
    };
