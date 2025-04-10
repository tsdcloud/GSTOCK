import React, {useState, useEffect} from "react";
import "../components/style.css";
import { Link } from "react-router-dom";
import {SquarePen, Trash2, Download} from 'lucide-react';
// import { FaSearch, FaEdit, FaTrash, FaEllipsisV } from "react-icons/fa";


export default function Bon_sortie () {

    const [bon_sortie, setBon_sortie] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState ("");


    useEffect(() => {

        const fetchBon_sortie = async () => {
            try {
                const response = await fetch("https://jsonplaceholder.typicode.com/todos/",{
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
                setBon_sortie(result);
                } catch (error) {
                    console.log(error)
                    setError(error);
                } finally {
                    setLoading(false);
            }
        };
        fetchBon_sortie();
    }, []);
        



    const handleDelete = async (id) => {
        console.log("http://172.19.120.186:8002/api/exit_vouchers/"+id);
        try {
            let response = await fetch("http://172.19.120.186:8002/api/exit_vouchers/"+id,{
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
            });

            console.log(response.status);

            setBon_sortie(bon_sortie.filter(bon_sortie => bon_sortie.id !== id));
        } catch (error) {
            setError(error);
        }
    };


    const handleSearchTerm = (e) =>{
        let value = e.target.value;
        setSearchTerm(value);
        
        let updatedData = bon_sortie.filter((value) => {
            return value.title.toLowerCase().includes(searchTerm.toLowerCase());
        })

        if(updatedData.length < 1 || e.target.value === ""){
            fetchBon_sortie();
            return;
        }

        setBon_sortie(updatedData);
    }



    if (loading) return <div className="text-2xl font-bold  mt-70 ml-130">Is loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (

        <div className="bon_sortie">
            {/* Contenu principal */}
                <div className="flex justify-between items-center mt-20 ">
                    <h1 className="text-3xl font-bold">Bon de sortie</h1>
                        <div className="flex space-x-4">
                            <div className="relative">
                                <input
                                type="text"
                                id="searchBar"
                                name="searchBar"
                                placeholder="Rechercher..."
                                onChange={handleSearchTerm}
                                className="p-2 pl-4 pr-10 border rounded-full bg-white"
                                /> 
                        {/* <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" /> */}
                            </div>                      
                        <Link to={"form_sortie"} className="bg-blue-900 text-white px-10 py-2 rounded-lg hover:bg-blue-800">
                            Créer un nouveau bon de sortie
                        </Link>
                        </div>
                </div>
                <div className="flex">
                    <table className="w-full border-collapse border border-blue-900 mt-20">
                        <thead>
                            <tr className="bg-[#f2e4d0] text-left">
                                <th className="border border-blue-900 p-2">N° référence</th>
                                <th className="border border-blue-900 p-2">Code de la DMD</th>
                                <th className="border border-blue-900 p-2">Date de création</th>
                                <th className="border border-blue-900 p-2">Créé par</th>
                                <th className="border border-blue-900 p-2">Article</th>
                                <th className="border border-blue-900 p-2">Quantité</th>
                                <th className="border border-blue-900 p-2">Description</th>
                                <th className="border border-blue-900 p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="">
                        {bon_sortie?.map((bon_sortie) => (
                            <tr key={bon_sortie.id} className="border-b">
                                <td className="border border-blue-900 p-2">{bon_sortie.reference}</td>
                                <td className="border border-blue-900 p-2">{bon_sortie.date}</td>
                                <td className="border border-blue-900 p-2">{bon_sortie.created}</td>
                                <td className="border border-blue-900 p-2">{bon_sortie.dmd}</td>
                                <td className="border border-blue-900 p-2">{bon_sortie.article}</td>
                                <td className="border border-blue-900 p-2">{bon_sortie.quantite}</td>
                                <td className="border border-blue-900 p-2">{bon_sortie.description}</td>
                                <td className="border border-blue-900 p-2">
                                    <div className="flex">
                                        <Link to={"form_sortie"} style={{ color: 'green' }}className= "px-2 py-1 rounded flex">{<SquarePen />}</Link>
                                        <Link to={"newarticles"} style={{ color: 'red' }}className="px-2 py-1 rounded flex"><Trash2 /></Link>
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
