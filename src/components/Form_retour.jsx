import React, {useState} from "react";
import "../components/style.css";
import { useNavigate } from "react-router-dom";

export default function Form_retour () {


    const [name, setName] = useState("");
    const [code, setCode] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("token");
    const navigate = useNavigate ();


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        try {
            const myheaders = new Headers();
            myheaders.append("Authorization", `Bearer ${token}`);
            myheaders.append("Content-Type", "application/json");

            const response = await fetch( "http://172.19.120.186:8002/api/return_vouchers/",{
                method: "POST",
                headers: myheaders,
                body: JSON.stringify ({
                    "name":name,
                    "code":code
                })
                });
            console.log(response)
            if (response.status === 201) {
                setSuccess(true);
                setName('');
                setCode('');

                navigate("/bon_retour")
                }
            } catch (error) {
                console.log(error)
                setError(error.message);
            }finally {
                setLoading(false);
            }
        };
    
    return (

        <div>
            {/* Contenu principal */}
            <div className="flex justify-between items-center mt-20 shadow-md">
                <h1 className="text-3xl font-bold">Enregistrement d'un nouveau bon de retour</h1>
                    <div className="flex space-x-4">
                        <div className="relative">
                            <input
                            type="text"
                            placeholder="Rechercher..."
                            className="p-2 pl-4 pr-10 border rounded-full bg-white"
                            /> 
                    {/* <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" /> */}
                        </div>                      
                    </div>
            </div>
            {/* Article Form */}
            <div className="bg-[#f2e4d0] p-2 rounded-xl shadow-lg justify-center items-center mt-20 w-250 ">
                <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-2xl">
                Créer un nouveau bon de retour
                </h1> 
                <form className="mt-5">                  
                    <div className="mb-4">
                    <label className="block text-left text-sm font-medium text-gray-700">
                     Code DMD<span className="text-red-500">*</span>
                    </label>
                    <input 
                       type="text"
                        className="mt-1 block w-full bg-white p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="options" className="block text-left text-sm font-medium text-gray-700">
                            Article <span className="text-red-500">*</span>
                        </label>
                        <select 
                            id="options"
                            value="selectedOption"
                            onChange="handleChange"
                            className="mt-1 block w-full p-2 border rounded-md focus:ring-blue-500 bg-white focus:border-blue-500">
                                <option value="" disabled>
                                Sélectionnez les articles
                                </option>
                                <option value="option1">Groupes électrogènes</option>
                                <option value="option2">Stylos BIC</option>
                                <option value="option3">Chaises de bureau</option>
                                <option value="option4">Balais à manchee</option>
                        </select>        
                    </div>
                    <div className="mb-4">
                        <label htmlFor="options" className="block text-left text-sm font-medium text-gray-700">
                            Service <span className="text-red-500">*</span>
                        </label>
                        <select 
                            id="options"
                            value="selectedOption"
                            onChange="handleChange"
                            className="mt-1 block w-full p-2 border rounded-md focus:ring-blue-500 bg-white focus:border-blue-500">
                                <option value="" disabled>
                                Sélectionnew le service
                                </option>
                                <option value="option1">Comptabilité matière</option>
                                <option value="option2">Comptabilité</option>
                                <option value="option3">Achat</option>
                                <option value="option4">Marketing</option>
                        </select>        
                    </div>
                    <div className="mb-4">
                    <label className="block text-left text-sm font-medium text-gray-700">
                     Description<span className="text-red-500">*</span>
                    </label>
                    <input 
                       type="text"
                        className="mt-1 block w-full bg-white p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                    </div>
                    
                    <button 
                        type="submit"
                        className="w-full mt-4 bg-blue-900 font-bold text-white py-2 rounded-md text-center transition-transform hover:scale-102">
                        Créer
                    </button>
                </form> 
            </div>

        </div>

    )
}

