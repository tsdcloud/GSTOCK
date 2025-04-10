import React, {useState, useEffect} from "react";
import "../components/style.css";
import { useNavigate } from "react-router-dom";


export default function New_fournisseur () {

    const [supplierName, setSupplierName] = useState("");
    const [code, setCode] = useState("");
    const [tel, setTel] = useState("");
    const [adresse, setAdresse] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        try {
            const response = await fetch( "http://172.19.120.186:8002/api/suppliers/",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify ({
                    "supplierName":supplierName,
                    "code":code,
                    "tel":tel,
                    "adresse":adresse
                })
             });
            console.log(response)
            if (response.status === 201) {
                setSuccess(true);
                setSupplierName('');
                setCode('');
                setTel('');
                setAdresse('');

                navigate("/fournisseurs")
                }
            } catch (error) {
                console.log(error)
                setError(error.message);
            }finally {
                setLoading(false);
            }
        };


    return(
        <div className="newfamille">
            {/* Contenu principal */}
            <div className="flex justify-between items-center mt-20 ">
                <h1 className="text-3xl font-bold">Enregistrement d'un nouveau fournisseur</h1>
                    <div className="flex space-x-4">
                        <div className="relative">
                            <input
                            type="text"
                            placeholder="Rechercher..."
                            className="p-2 pl-4 pr-10 border rounded-full bg-white"
                            /> 
                        </div>                      
                        <button className="bg-blue-900 text-white px-10 py-2 rounded-lg hover:bg-blue-800">
                            Créer un nouveau fournisseur
                        </button>
                    </div>
            </div>
            {/* Article Form */}
            <div className="bg-[#f2e4d0] p-2 rounded-xl shadow-lg justify-between mt-20 w-250">
                <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-2xl">
                Créer un nouveau fournisseur
                </h1> 
                <form className="mt-8" onSubmit={handleSubmit}>
                    <div className="mb-4">
                    <label className="block text-left text-sm font-medium text-gray-700">
                     Nom du fournisseur <span className="text-red-500">*</span>
                    </label>
                    <input 
                        type="text"
                        id="supplierName"
                        value={supplierName}
                        onChange={(e) => setSupplierName(e.target.value)}
                        className="mt-1 block w-full bg-white p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                    </div>                   
                    <div className="mb-4">
                        <label className="block text-left text-sm font-medium text-gray-700 mt-8">
                        Code du fournisseur <span className="text-red-500">*</span>
                        </label>
                    <input
                        type="text"
                        id="code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className="mt-1 block w-full p-2 border rounded-md focus:ring-blue-500 bg-white focus:border-blue-500"
                        required
                    />
                    </div>
                    <div className="mb-4">
                        <label className="block text-left text-sm font-medium text-gray-700 mt-8">
                        Adresse du fournisseur <span className="text-red-500">*</span>
                        </label>
                    <input
                        type="text"
                        id="adresse"
                        value={adresse}
                        onChange={(e) => setAdresse(e.target.value)}
                        className="mt-1 block w-full p-2 border rounded-md focus:ring-blue-500 bg-white focus:border-blue-500"
                        required
                    />
                    </div>
                    <div className="mb-4">
                        <label className="block text-left text-sm font-medium text-gray-700 mt-8">
                        Numéro du fournisseur <span className="text-red-500">*</span>
                        </label>
                    <input
                        type="text"
                        id="tel"
                        value={tel}
                        onChange={(e) => setTel(e.target.value)}
                        className="mt-1 block w-full p-2 border rounded-md focus:ring-blue-500 bg-white focus:border-blue-500"
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

};
