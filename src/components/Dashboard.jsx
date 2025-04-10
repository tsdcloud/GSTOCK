import React from "react";
import "../components/style.css";

export default function Dashboard () {
    return (
        <div>
            {/* Header */}
            <div className="flex-1 p-5">
                <div className="items-center mt-20">
                <h1 className="text-3xl font-bold">Dashboard</h1>            
                <span className="px-3 py-1 bg-blue-900 text-white text-sm font-bold rounded-md">Mois de Mars</span>
                <input
                    type="text"
                    placeholder="Rechercher..."
                    className="p-2 pl-4 pr-10 border rounded-full bg-white ml-225"
                />                 
                </div>
               
                <div className="flex space-x-6 my-6">
                    <button className="px-6 py-3 bg-blue-900 text-white font-bold rounded-md">Bon d’entrée</button>
                    <button className="px-6 py-3 bg-blue-900 text-white font-bold rounded-md">Bon de retour</button>
                    <button className="px-6 py-3 bg-blue-900 text-white font-bold rounded-md">Bon de sortie</button>
                </div>
                <div className="mt-6">
                    <h2 className="text-xl font-bold mb-4">Nouvelle DMD</h2>
                    <div className="space-y-2">
                        {["DMD du service Achat", "DMD du service IT", "DMD du service Dev"].map((dmd, index) => (
                        <div key={index} className="flex justify-between items-center border-2 border-blue-900 p-3 rounded-md">
                            <span>{dmd}</span>
                            <button className="text-blue-900 font-bold">Afficher</button>
                        </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    )
}