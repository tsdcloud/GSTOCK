import React from "react";
import img_logo from "../assets/img_logo.png";
import bg from "../assets/bg.svg";


const SignedOutLayout = ({children}) => {
  return (
    <div className='h-screen w-full flex overflow-hidden relative bg-blue-900 z-0'>
        <div className="h-screen absolute">
            <img src={bg} alt="background" className="w-full h-screen"/>
        </div>
            {/* Header */}
            <div className="p-10">
                <img src={img_logo} alt="BFC Logo" className="h-25" />
            </div>
            {/* Header */}

            {/* Content */}
            <div className="flex items-center justify-between w-full z-50">
                {/* Text */}
                <div className="p-4 grow flex flex-col font-[sans-serif] space-y-2">
                    <h1 className="text-8xl font-bold text-blue-900 leading-tight mt-2 font-poppins ">
                        Gstock
                    </h1>
                    <h2 className="text-[25px] font-semibold text-black-400 leading-tight font-poppins">
                        Révolutionnez la gestion des stocks,
                    </h2>
                    <h2 className="text-[25px] font-bold text-black-400 leading-tight font-poppins">
                        gagnez en efficacité,
                    </h2>
                    <h2 className="text-[25px] font-bold text-black-400 leading-tight">
                        gagnez en temps.
                    </h2>
                </div>

                <div className='p-50'>
                    {children}
                </div>
                {/* Text */}
            </div>
            {/* Footer */}
            <div>
                <footer >
                    {/* <div className=" w-full overflow-hidden">
                        <div className="fixed bottom-0 left-0 w-full">
                            <svg
                                className="w-full -top-"
                                viewBox="0 0 1440 320"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                >
                                <path
                                    fill="#1e3a8a"
                                    d="M0,160L80,144C160,128,320,96,480,117.3C640,139,800,213,960,229.3C1120,245,1280,203,1360,181.3L1440,160V320H1360C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320H0Z"
                                ></path>
                            </svg>
                        </div>
                    </div> */}
                </footer>
            </div>
            {/* Footer */}
            {/* Content */}
    </div>
  )
}

export default SignedOutLayout