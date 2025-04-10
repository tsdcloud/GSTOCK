import React, {useState, useEffect} from 'react';
import "../components/style.css";
import { Link } from "react-router-dom";
import {SquarePen, Trash2} from 'lucide-react'


export default function Famille_article () {

    const [famille_articles, setFamille_articles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState ("");
    const token = localStorage.getItem("token");


    const fetchFamille_articles = async () => {
        try {
            const response = await fetch("http://172.19.120.186:8002/api/fam_articles",{
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            }); 
            if(response.status !== 200){
                alert('Could not fetch data');
                return;
            }
            
            let result = await response.json();
            setFamille_articles(result.data.results);
            } catch (error) {
                console.log(error)
                setError(error);
            } finally {
                setLoading(false);
        }
    };

    useEffect(() => {
        fetchFamille_articles();
    }, []);
        


    const handleDelete = async (id) => {
        console.log("http://172.19.120.186:8002/api/fam_articles/"+id);
        try {
            let response = await fetch("http://172.19.120.186:8002/api/fam_articles/"+id,{
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            });

            console.log(response.status);

            setFamille_articles(famille_articles.filter(famille_articles => famille_articles.id !== id));
        } catch (error) {
            setError(error);
        }
    };


    const handleSearchTerm = (e) =>{
        let value = e.target.value;
        setSearchTerm(value);
        
        let updatedData = famille_articles.filter((value) => {
            return value.name.toLowerCase().includes(searchTerm.toLowerCase());
        })

        if(updatedData.length < 1 || e.target.value === ""){
            fetchFamille_articles();
            return;
        }

        setFamille_articles(updatedData);
    }


    if (loading) return <div className="text-2xl font-bold  mt-70 ml-130">Is loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    
    return (

        <div className='famille_article'>


            {/* Contenu principal */}
            <div className="flex justify-between items-center mt-20 ">
                <h1 className="text-3xl font-bold">Famille d'articles</h1>
                    <div className="flex space-x-4">
                        <div className="relative">
                            <input
                            type="text"
                            name="searchBar"
                            id="searchBar"
                            placeholder="Rechercher..."
                            onChange={handleSearchTerm}
                            className="p-2 pl-4 pr-10 border rounded-full bg-white"
                            /> 
                        </div>                      
                        <Link to={"newfamille"} className="bg-blue-900 text-white px-10 py-2 rounded-lg hover:bg-blue-800">
                        Créer une nouvelle famille d'article
                        </Link>
                    </div>
            </div>
            <div className="flex">
                <table className="w-full border-collapse border border-blue-900 mt-20">
                    <thead>
                        <tr className="bg-[#f2e4d0] text-left">
                            <th className="border border-blue-900 p-2">Nom</th>
                            <th className="border border-blue-900 p-2">Code</th>
                            <th className="border border-blue-900 p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {famille_articles?.map((famille_article) => (
                            <tr key={famille_article.id} className="border-b">
                            <td className="border border-blue-900 p-2">{famille_article.name}</td>
                            <td className="border border-blue-900 p-2">{famille_article.code}</td>
                            <td className="border border-blue-900 p-2">
                                <div className="flex">
                                    <Link to={"updatedfamille/"+famille_article.id} style={{ color: 'green' }}className= "px-2 py-1 rounded flex">{<SquarePen />}</Link>
                                    <button onClick={()=>handleDelete(famille_article.id)} style={{ color: 'red' }}className="px-2 py-1 rounded flex"><Trash2 /></button>
                                </div>  
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    )
}