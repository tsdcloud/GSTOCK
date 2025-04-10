import React, {useState, useEffect} from "react";
import "../components/style.css";
import { Link } from "react-router-dom";
import {SquarePen, Trash2, Download} from 'lucide-react';
// import { FaSearch, FaEdit, FaTrash, FaEllipsisV } from "react-icons/fa";


export default function Bon_retour () {


    const [bon_retour, setBon_retour] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState ("");
    


    useEffect(() => {

        const fetchBon_retour = async () => {
            try {
                const response = await fetch("http://172.19.120.186:8002/api/return_vouchers/",{
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                }); 
                if(response.status !== 200){
                    alert('Could not fetch data');
                    return;
                }
                
                let result = await response.json();
                setBon_retour(result);
                } catch (error) {
                    console.log(error)
                    setError(error);
                } finally {
                    setLoading(false);
            }
        };
        fetchBon_retour();
    }, []);
        



    const handleDelete = async (id) => {
        console.log("http://172.19.120.186:8002/api/return_vouchers/"+id);
        try {
            let response = await fetch("http://172.19.120.186:8002/api/return_vouchers/"+id,{
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
            });

            console.log(response.status);

            setBon_retour(bon_retour.filter(bon_retour => bon_retour.id !== id));
        } catch (error) {
            setError(error);
        }
    };

    const handleSearchTerm = (e) =>{
        let value = e.target.value;
        setSearchTerm(value);
        
        let updatedData = bon_retour.filter((value) => {
            return value.title.toLowerCase().includes(searchTerm.toLowerCase());
        })

        if(updatedData.length < 1 || e.target.value === ""){
            fetchBon_retour();
            return;
        }

        setBon_retour(updatedData);
    }



    if (loading) return <div className="text-2xl font-bold  mt-70 ml-130">Is loading...</div>;
    if (error) return <div>Error: {error.message}</div>;


    return (

        <div className="bon_retour">
            {/* Contenu principal */}
                <div className="flex justify-between items-center mt-20 ">
                    <h1 className="text-3xl font-bold">Bon de retour</h1>
                        <div className="flex space-x-4">
                            <div className="relative">
                                <input
                                type="text"
                                name="searchBar"
                                id="searchBar"
                                placeholder="Rechercher..."
                                onChange={handleDelete}
                                className="p-2 pl-4 pr-10 border rounded-full bg-white"
                                /> 
                        {/* <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" /> */}
                            </div>                      
                        <Link to={"form_retour"} className="bg-blue-900 text-white px-10 py-2 rounded-lg hover:bg-blue-800">
                            Créer un nouveau bon de retour
                            </Link>
                        </div>
                </div>
                <div className="flex">
                    <table className="w-full border-collapse border border-blue-900 mt-20">
                        <thead>
                            <tr className="bg-[#f2e4d0] text-left">
                                <th className="border border-blue-900 p-2">N° référence</th>
                                <th className="border border-blue-900 p-2">Date de création</th>
                                <th className="border border-blue-900 p-2">Créé par</th>
                                <th className="border border-blue-900 p-2">Article</th>
                                <th className="border border-blue-900 p-2">Quantité</th>
                                <th className="border border-blue-900 p-2">Description</th>
                                <th className="border border-blue-900 p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="max-h-[30vh]">
                        {bon_retour?.map((bon_retour) => (
                            <tr key={bon_retour.id} className="border-b">
                                <td className="border border-blue-900 p-2">{bon_retour.reference}</td>
                                <td className="border border-blue-900 p-2">{bon_retour.date}</td>
                                <td className="border border-blue-900 p-2">{bon_retour.created}</td>
                                <td className="border border-blue-900 p-2">{bon_retour.article}</td>
                                <td className="border border-blue-900 p-2">{bon_retour.quantite}</td>
                                <td className="border border-blue-900 p-2">{bon_retour.description}</td>
                                <td className="border border-blue-900 p-2">
                                    <div className="flex">
                                        <Link to={"form_retour"} style={{ color: 'green' }}className= "px-2 py-1 rounded flex">{<SquarePen />}</Link>
                                        <button onClick={() => handleDelete(bon_retour.id)} style={{ color: 'red' }}className="px-2 py-1 rounded flex"><Trash2 /></button>
                                        <Link to={"impression"} style={{ color: 'blue' }}className="px-2 py-1 rounded flex"><Download /></Link>
                                    </div> 
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
        </div>
    );
};
