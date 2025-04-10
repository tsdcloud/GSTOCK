import React, {useState, useEffect} from "react";
import "../components/style.css";
import { Link } from "react-router-dom";
import {SquarePen, Trash2} from 'lucide-react';

export default function Fournisseur () {

    const [fournisseurs, setFournisseurs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState ("");
    const token = localStorage.getItem("token");


    const fetchFournisseurs = async () => {
        try {
            const response = await fetch("http://172.19.120.186:8002/api/suppliers/",{
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
            setFournisseurs(result.data.results);
            } catch (error) {
                console.log(error)
                setError(error);
            } finally {
                setLoading(false);
        }
    };
    
    useEffect(() => {
        fetchFournisseurs();
    }, []);
        



    const handleDelete = async (id) => {
        console.log("http://172.19.120.186:8002/api/suppliers/"+id);
        try {
            let response = await fetch("http://172.19.120.186:8002/api/suppliers/"+id,{
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            });

            console.log(response.status);

            setFournisseurs(fournisseurs.filter(fournisseur => fournisseur.id !== id));
        } catch (error) {
            setError(error);
        }
    };

    const handleSearchTerm = (e) =>{
        let value = e.target.value;
        setSearchTerm(value);
        
        let updatedData = fournisseurs.filter((value) => {
            return value.title.toLowerCase().includes(searchTerm.toLowerCase());
        })

        if(updatedData.length < 1 || e.target.value === ""){
            fetchFournisseurs();
            return;
        }

        setFournisseurs(updatedData);
    }


    if (loading) return <div className="text-2xl font-bold  mt-70 ml-130">Is loading...</div>;
    if (error) return <div>Error: {error.message}</div>;


    return(

        <div className="fournisseur">

            {/* Contenu principal */}
            <div className="flex justify-between items-center mt-20 ">
                    <h1 className="text-3xl font-bold">Fournisseurs</h1>
                        <div className="flex space-x-4">
                            <div className="relative">
                                <input
                                type="text"
                                id="searchBar"
                                name="searchBar"
                                onChange={handleSearchTerm}
                                placeholder="Rechercher..."
                                className="p-2 pl-4 pr-10 border rounded-full bg-white"
                                /> 
                            </div>                      
                            <Link to={"newarticles"} className="bg-blue-900 text-white px-10 py-2 rounded-lg hover:bg-blue-800">
                            Créer un nouvau fournisseur
                            </Link>
                        </div>
                </div>
                <div className="flex">
                    <table className="w-full border-collapse border border-blue-900 mt-20">
                        <thead>
                            <tr className="bg-[#f2e4d0] text-left">
                                <th className="border border-blue-900 p-2">Code</th>
                                <th className="border border-blue-900 p-2">Nom</th>
                                <th className="border border-blue-900 p-2">Adresse</th>
                                <th className="border border-blue-900 p-2">N° téléphone</th>
                                <th className="border border-blue-900 p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="">
                        {fournisseurs?.map((fournisseur) => (
                            <tr key={fournisseur.id} className="border-b">
                                <td className="border border-blue-900 p-2">{fournisseur.code}</td>
                                <td className="border border-blue-900 p-2">{fournisseur.nom}</td>
                                <td className="border border-blue-900 p-2">{fournisseur.tel}</td>
                                <td className="border border-blue-900 p-2">{fournisseur.adresse}</td>
                                <td className="border border-blue-900 p-2">
                                    <div className="flex">
                                        <Link to={"updatedfournisseur/"} style={{ color: 'green' }}className= "px-2 py-1 rounded flex">{<SquarePen />}</Link>
                                        <button  onClick={()=>handleDelete(fournisseur.id)} style={{ color: 'red' }}className="px-2 py-1 rounded flex"><Trash2 /></button>
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