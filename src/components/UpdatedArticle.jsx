import React, {useState, useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../components/style.css";


export default function NewArticle () {

    const {id} = useParams()
    const [code, setCode] = useState("");
    const [name, setName] = useState("");
    const [prix, setPrix ]= useState("");
    const [famille_articles, setFamille_articles] = useState([]);
    const [selectedFam, setSelectedFam] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(true);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();


    const fetchFamille_article = async () => {
            try {
                const response = await fetch( "http://172.19.120.186:8002/api/fam_articles/",{
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                }); 
    
                let result = await response.json();
                setFamille_articles(result.data.results);
                
            } catch (err) {
                setError(err.message);
            }
        };
    
    useEffect(() => {
        fetchFamille_article();
    }, []);
    

    const handleFetchArticle=async()=>{
        setLoading(true);
        try {
            let response = await fetch("http://172.19.120.186:8002/api/articles/"+id);
            if(response.status !== 200){
                console.log("Failed to fecth");
                return;
            }
            let result = await response.json();
            setName(result?.name);
            setCode(result?.code);
            setPrix(result?.prix);

        } catch (error) {
            console.log(error);
        }finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
        handleFetchArticle();
    }, [id])

    const handleUpdated = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        try {
            const response = await fetch("http://172.19.120.186:8002/api/articles/"+id,{
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify ({ 
                    "code":code,
                    "name":name,
                    "family":selectedFam,
                    "unit_price":prix
                })
             });
             console.log(response)
            if (response.status === 200) {
                setSuccess(true);
                setCode('');
                setName('');
                setSelectedFam('');
                setPrix('');

                navigate("/articles");
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
            setCurrentArticle((prev) => ({ ...prev, [name]: value }));
        };


    return(
        <div className="newarticles">
            {/* Contenu principal */}
            <div className="flex justify-between items-center mt-20 ">
                <h1 className="text-3xl font-bold">Modification d'un article</h1>
                    <div className="flex space-x-4">
                        <div className="relative">
                            <input
                            type="text"
                            placeholder="Rechercher..."
                            className="p-2 pl-4 pr-10 border rounded-full bg-white"
                            /> 
                        </div>                      
                        <button className="bg-blue-900 text-white px-10 py-2 rounded-lg hover:bg-blue-800">
                            Modifier un article
                        </button>
                    </div>
            </div>
            {/* Article Form */}
            <div className="bg-[#f2e4d0] p-2 rounded-xl shadow-lg justify-between mt-20 w-250">
                <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-2xl">
                Modifier un article
                </h1> 
                <form className="mt-8" onSubmit={handleUpdated}>
                    <div className="mb-4">
                    <label className="block text-left text-sm font-medium text-gray-700">
                     Nom de l'article <span className="text-red-500">*</span>
                    </label>
                    <input 
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
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
                    <div className="mb-4">
                        <label htmlFor="options" className="block mb-2 text-gray-700">
                            Famille d'article <span className="text-red-500">*</span>
                        </label>
                        <select 
                            id="famille_article"
                            // value={famille_articles}
                            onChange={(e) => setSelectedFam(e.target.value)}
                            className="block w-full p-2 border bg-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option value="" >
                                    Sélectionnez la famille d'article
                                </option>
                                {famille_articles?.map((famille_article) => (
                                <option key={famille_article.id} value={famille_article.id}>
                                    {famille_article.name} 
                                </option>
                                ))}
                        </select>        
                    </div>
                    <div className="mb-4">
                        <label className="block text-left text-sm font-medium text-gray-700 mt-8">
                        Prix unitaire <span className="text-red-500">*</span>
                        </label>
                    <input
                        type="text"
                        id="prix"
                        value={prix}
                        onChange={(e) => setPrix(e.target.value)}
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
