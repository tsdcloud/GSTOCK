import React, {useState, useEffect} from "react";
import "../components/style.css";
import { useNavigate } from "react-router-dom";


export default function New_famille () {

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

            const response = await fetch( "http://172.19.120.186:8002/api/fam_articles/",{
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

                navigate("/famille_article")
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
                <h1 className="text-3xl font-bold">Enregistrement d'une nouvelle famille d'article</h1>
            </div>
            {/* Article Form */}
            <div className="bg-[#f2e4d0] p-2 rounded-xl shadow-lg justify-between mt-20 w-250">
                <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-2xl">
                Créer une nouvelle famille d'article
                </h1> 
                <form className="mt-8" onSubmit={handleSubmit}>
                    <div className="mb-4">
                    <label className="block text-left text-sm font-medium text-gray-700">
                     Nom de la famille d'article <span className="text-red-500">*</span>
                    </label>
                    <input 
                        type="text"
                        id="userid"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1 block w-full bg-white p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                    </div>                   
                    <div className="mb-4">
                        <label className="block text-left text-sm font-medium text-gray-700 mt-8">
                        Code de la famille d'article <span className="text-red-500">*</span>
                        </label>
                    <input
                        type="text"
                        value={code}

                        onChange={(e) => setCode(e.target.value)}
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
