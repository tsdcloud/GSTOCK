import React, {useState, useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../components/style.css";


export default function UpdatedFamille () {

    const {id} = useParams()
    const [familyName, setFamilyName] = useState("");
    const [code, setCode] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(true);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("token");
    const navigate = useNavigate ();

    const handleFetchFamille= async()=>{
        setLoading(true);
        try {
            let response = await fetch("http://172.19.120.186:8002/api/fam_articles/"+id,{
                headers:{
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`
                }
            });
            if(response.status !== 200){
                console.log("Failed to fecth");
                return;
            }
            let result = await response.json();
            setFamilyName(result?.name);
            setCode(result?.code);

        } catch (error) {
            console.log(error);
        }finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
        handleFetchFamille();
    }, [id])

    const handleUpdated = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        try {
            const response = await fetch("http://172.19.120.186:8002/api/fam_articles/"+id,{
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify ({
                    "name":familyName,
                    "code":code
                })
             });
             console.log(response)
            if (response.status === 200) {
                setSuccess(true);
                setFamilyName('');
                setCode('');
                
                navigate ("/famille_article");
                }
            } catch (error) {
                console.log(error)
                setError(error.message);
            }finally {
                setLoading(false);
            }
    };

        const handleChange = (e) => {
            const { name, value } = e.target;
            setCurrentFamille(prev => ({ ...prev, [familyName]: value }));
        };


    return(
        <div className="updatedfamille">
            {/* Contenu principal */}
            <div className="flex justify-between items-center mt-20 ">
                <h1 className="text-3xl font-bold">Modification d'une famille d'article</h1>
            </div>
            {/* Article Form */}
            <div className="bg-[#f2e4d0] p-2 rounded-xl shadow-lg justify-between mt-20 w-250">
                <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-2xl">
                Modifier une famille d'article
                </h1> 
                <form className="mt-8" onSubmit={handleUpdated}>
                    <div className="mb-4">
                    <label className="block text-left text-sm font-medium text-gray-700">
                     Nom de la famille <span className="text-red-500">*</span>
                    </label>
                    <input 
                        type="text"
                        id="familyName"
                        value={familyName}
                        onChange={(e) => setFamilyName(e.target.value)}
                        className="mt-1 block w-full bg-white p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                    </div>
                    <div className="mb-4">
                        <label className="block text-left text-sm font-medium text-gray-700 mt-8">
                        Code <span className="text-red-500">*</span>
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
                    <button 
                        type="submit"
                        onClick={()=> handleChange()}
                        className="w-full mt-4 bg-blue-900 font-bold text-white py-2 rounded-md text-center transition-transform hover:scale-102">
                        Modifier
                    </button>
                </form> 
            </div>
        </div>
    )

};
