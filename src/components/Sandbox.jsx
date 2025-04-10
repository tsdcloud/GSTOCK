
import "../components/style.css";
import { useState,useEffect } from "react";
import { useFetcher } from "react-router-dom";


export default function Sandbox() {

    const [eleves, setEleves] = useState([]);

    async function getToDos() {
        try {
            let response = await fetch("https://jsonplaceholder.typicode.com/todos/",{
                method: "GET",
                header: {
                    "content-Type": "application/json"
                }
            });

            const result = await response.json();
            console.log(result);
            setEleves(result);
            }catch(error){
            console.log(error);
            }
        

        }

        useEffect (() => {
            getToDos();
        }, [])
    

    return (
        <div>
            {eleves.map(eleve => <h1> {eleve.title} </h1>)}
        </div>
    )
}
    // const [articles, setArticles] = useState([]);

    //     async function getToDos() {
    //         try {
    //             let response = await fetch("https://jsonplaceholder.typicode.com/todos/", {
    //                 method: "GET",
    //                 headers: {
    //                     "Content-Type": "application/json"
    //                 }
    //             });
    //             const result = await response.json();
    //             console.log(result);
    //             setArticles(result);
    //         }catch(error){
    //             console.log(error);
    //         }
    //     }

    //     useEffect(()=>{
    //         getToDos();
    //     }, [])

    // return(
    //     <div className="overflow-y-auto h-screen">
    //         {articles.map(article=><h1>{article.title}</h1>)}
    //     </div>
    
