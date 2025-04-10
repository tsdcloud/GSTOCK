import React from 'react';
import img_logo from "../assets/img_logo.png";
import { Link } from 'react-router-dom';
import { Clipboard, UserRoundPen, PackageOpen, ClipboardPen, ClipboardPaste, ClipboardCopy, UserRound, ChartNoAxesCombined } from 'lucide-react';

const SignedLayout = ({children}) => {
    const links = [
        {
            to: "/dashboard",
            text: "Dashboard",
            icon: <ChartNoAxesCombined style={{width:"20px", color:"#fff"}} />
        },
        {
            to: "/articles",
            text: "Articles",
            icon: <Clipboard style={{width:"20px", color:"#fff"}}/>
        },
        {
            to: "/fournisseurs",
            text: "Fournisseurs",
            icon: <UserRoundPen style={{width:"20px", color:"#fff"}}/>
        },
        {
            to: "/famille_article",
            text: "Famille d'articles",
            icon: <PackageOpen style={{width:"20px", color:"#fff"}}/>
        },
        {
            to: "/bon_entree",
            text: "Bon d'entrée",
            icon: <ClipboardPen style={{width:"20px", color:"#fff"}}/>
        },
        {
            to: "/bon_sortie",
            text: "Bon de sortie",
            icon: <ClipboardPaste  style={{width:"20px", color:"#fff"}}/>
        },
        {
            to: "/bon_retour",
            text: "Bon de retour",
            icon: <ClipboardCopy  style={{width:"20px", color:"#fff"}}/>
        },
        {
            to: "/profile",
            text: "Profile",
            icon: <UserRound  style={{width:"20px", color:"#fff"}}/>
        }
    ]
    
  return (
    <div className='w-full h-screen flex overflow-hidden'>
        {/* Aside */}
        <aside className="w-20 bg-blue-900 flex flex-col items-center py-6 space-y-6 h-screen">
            <div className="space-y-6 flex flex-col items-center mt-6">
                {
                    links.map((link, index)=>
                    <Link to={link.to} className="hover:text-gray-300 flex flex-col items-center p-2" key={index}>
                        {/* <img src={link.image} alt={link.text} className="w-6 mt-6" /> */}
                        <span>{link.icon}</span>
                        <h6 className='text-white text-xs text-center'>{link.text}</h6>
                    </Link>
                    )
                }
                {/* <button className="hover:text-gray-300">
                    <img src={article} alt="Articles" className="w-6 mt-5" />
                    <h6 className='text-white text-xs'>Article</h6>
                </button>
                <button className="hover:text-gray-300">
                    <img src={fournisseur} alt="Fournisseurs" className="w-6 mt-5" />
                    <h6 className='text-white text-xs'>Fournisseur</h6>
                </button>
                <button className="hover:text-gray-300">
                    <img src={famille_article} alt="Famille d'articles" className="w-6 mt-5" />
                    <h6 className='text-white text-xs'>Famille d'articles</h6>
                </button>
                <button className="hover:text-gray-300">
                    <img src={bon} alt="bon d'entrée" className="w-6 mt-5" />
                    <h6 className='text-white text-xs'>Bon d'entrée</h6>
                </button>
                <button className="hover:text-gray-300">
                    <img src={bon} alt="bon de sortie" className="w-6 mt-5" />
                    <h6 className='text-white text-xs'>Bon de sortie</h6>
                </button>
                <button className="hover:text-gray-300">
                    <img src={bon} alt="bon de retour" className="w-6 mt-5" />
                    <h6 className='text-white text-xs'>Bon de retour</h6>
                </button>
                <button className="hover:text-gray-300">
                    <img src={profile} alt="Profile" className="w-6 mt-40" />
                    <h6 className='text-white text-xs'>Profile</h6>
                </button> */}
            </div>
        </aside>
        {/* Aside */}

        {/* Content */}
        <div className="p-4 grow flex flex-col">
            {/* Header */}
            <div>
                <img  src={img_logo} alt="Logo BFC" className="w-20 h-20"/>
            </div>
            {/* Header */}
            <div className='grow'>
                {children}
            </div>
            {/* Footer */}
            <footer className='text-center text-gray-600 text-sm mt-6'>
                <p>Gstock Gestion des stocks© 2025. Tous droits réservés</p>
            </footer>
            {/* Footer */}
        </div>
        {/* Content */}

    </div>
  )
}

export default SignedLayout