import React, {useState, useEffect} from "react";
import "../components/style.css";
import { Link } from "react-router-dom";
import {SquarePen, Trash2} from 'lucide-react'


export default function Article () {

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState ("");
    const token = localStorage.getItem("token");

    const fetchArticles = async () => {
        try {
            const response = await fetch("http://172.19.120.186:8002/api/articles/",{
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
            setArticles(result.data.results);
            } catch (error) {
                console.log(error)
                setError(error);
            } finally {
                setLoading(false);
        }
    };

    useEffect(() => {
        fetchArticles();
    }, []);


    const handleDelete = async (id) => {
        console.log(""+id);
        try {
            let response = await fetch("http://172.19.120.186:8002/api/articles/"+id,{
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            });

            console.log(response.status);

            setArticles(articles.filter(article => article.id !== id));
        } catch (err) {
            setError(err);
        }
    };

    const handleSearchTerm = (e) =>{
        let value = e.target.value;
        setSearchTerm(value);
        
        let updatedData = articles.filter((value) => {
            return value.title.toLowerCase().includes(searchTerm.toLowerCase());
        })

        if(updatedData.length < 1 || e.target.value === ""){
            fetchArticles();
            return;
        }

        setArticles(updatedData);
    }


    if (loading) return <div className="text-2xl font-bold  mt-70 ml-130">Is loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (

        <div className="articles">
            {/* Contenu principal */}
                <div className="flex justify-between items-center mt-20 ">
                    <h1 className="text-3xl font-bold">Articles</h1>
                    <div className="flex space-x-4">
                        <div className="searchBar">
                            <input
                            type="text"
                            name="searchBar"
                            id="searchBar"
                            placeholder="Rechercher..."
                            onChange={handleSearchTerm}
                            className="p-2 pl-4 pr-10 border rounded-full bg-white"
                            /> 
                        </div>                                          
                        <Link to={"/articles/newarticles"} className="bg-blue-900 text-white px-10 py-2 rounded-lg hover:bg-blue-800">
                        Créer un nouvel article
                        </Link>
                    </div>
                </div>
                <div className="flex flex-col max-h-[60vh] overflow-y-hidden">
                    <table className="w-full border-collapse border border-blue-900 mt-20 max-h-[50vh] overflow-y-scroll">
                        <thead>
                            <tr className="bg-[#f2e4d0] text-left">
                                <th className="border border-blue-900 p-2 max-w-[100px] min-w-[30px] w-[100px]">Code</th>
                                <th className="border border-blue-900 p-2 max-w-[100px] min-w-[30px] w-[100px]">Nom</th>
                                <th className="border border-blue-900 p-2 max-w-[80px] min-w-[30px] w-[80px]">Prix unitaire (CFA)</th>
                                <th className="border border-blue-900 p-2 max-w-[50px] min-w-[30px] w-[50px]">Quantité en stock</th>
                                <th className="border border-blue-900 p-2 max-w-[52.5px] min-w-[30px] w-[52.5px]">Actions</th>
                            </tr>
                        </thead>
                    </table>
                    <div className="overflow-y-scroll [&::-webkit-scrollbar]:w-2
                            [&::-webkit-scrollbar-track]:rounded-full
                            [&::-webkit-scrollbar-track]:bg-gray-100
                            [&::-webkit-scrollbar-thumb]:rounded-full
                            [&::-webkit-scrollbar-thumb]:bg-gray-300">
                        <table className="w-full border-collapse border border-blue-900 max-h-[50vh] overflow-y-scroll">
                            
                            <tbody className="">
                            {articles?.map(article => (
                                <tr key={article.id} className="border-b">
                                    <td className="border border-blue-900 p-2 max-w-[100px] min-w-[30px] w-[100px]">{article.code}</td>
                                    <td className="border border-blue-900 p-2 max-w-[100px] min-w-[30px] w-[100px]">{article.name}</td>
                                    <td className="border border-blue-900 p-2 max-w-[80px] min-w-[30px] w-[80px]">{article.unit_price}</td>
                                    <td className="border border-blue-900 p-2 max-w-[50px] min-w-[30px] w-[50px]">{article.stock}</td>
                                    <td className="border border-blue-900 p-2 max-w-[50px] min-w-[30px] w-[50px]">
                                        <div className="flex">
                                            <Link to={"updatedarticles/"+article.id} style={{ color: 'green' }}className= "px-2 py-1 rounded flex">{<SquarePen />}</Link>
                                            <button onClick={()=>handleDelete(article.id)} style={{ color: 'red' }}className="px-2 py-1 rounded flex"><Trash2 /></button>
                                        </div> 
                                    </td>
                                </tr>
                            ))}   
                            </tbody>
                        </table>
                    </div>
                </div>
        </div>
    );
};
