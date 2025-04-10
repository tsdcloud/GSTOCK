import React, {useState, useEffect} from 'react';
import { useNavigate, Outlet, Navigate } from 'react-router-dom';


const ProtectedRoutes = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(()=>{
        let token = localStorage.getItem("token");
        setIsLoading(false);
        if(!token){
            setIsLoggedIn(false);
            return
        }
        setIsLoggedIn(true);
    }, []);

    if(isLoading) return <h2>Is loading...</h2>
  return (
    <div>
        {
          !isLoggedIn ?  <Navigate to={"/signin"}/> : <Outlet />
        }
    </div>
  )
}

export default ProtectedRoutes