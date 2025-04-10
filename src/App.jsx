import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './components/SignIn';
import Article from './components/Article';
import NewArticle from './components/New_article';
import UpdatedArticle from './components/UpdatedArticle';
import Dashboard from './components/Dashboard';
import SignedLayout from './layouts/SignedLayout';
import SignedOutLayout from './layouts/SignedOutLayout';
import Bon_entree from './components/Bon_entree';
import Bon_sortie from './components/Bon_sortie';
import Bon_retour from './components/Bon_retour';
import Form_entree from './components/Form_entree';
import Form_sortie from './components/Form_sortie';
import Form_retour from './components/Form_retour';
import Fournisseur from './components/Fournisseur';
import Famille_article from './components/FamilleArticle';
import ProtectedRoutes from './utils/ProtectedRoutes';
import New_famille from './components/New_famille';
import New_fournisseur from './components/New_founisseur';
import UpdatedFamille from './components/updatedfamille';
import UpdatedFournisseur from './components/UpdatedFournisseur';
// import './App.css'



function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<ProtectedRoutes/>}>
            <Route path='' element={<SignedLayout><Article/></SignedLayout>}/>
            <Route path='/dashboard' element={<SignedLayout><Dashboard/></SignedLayout>} exact/>
            <Route path='/articles' >
              <Route path='' element={<SignedLayout><Article/></SignedLayout>}/>
              <Route path='newarticles' element={<SignedLayout><NewArticle/></SignedLayout>}/>
              <Route path='updatedarticles/:id' element={<SignedLayout><UpdatedArticle/></SignedLayout>}/>
            </Route>
            <Route path='/bon_entree'>
              <Route path='' element={<SignedLayout><Bon_entree/></SignedLayout>}/>
              <Route path='form_entree' element={<SignedLayout><Form_entree/></SignedLayout>}/>
            </Route>
            <Route path='/bon_sortie'>
              <Route path='' element={<SignedLayout><Bon_sortie/></SignedLayout>}/>
              <Route path='form_sortie' element={<SignedLayout><Form_sortie/></SignedLayout>}/>
            </Route>
            <Route path='/bon_retour'>
              <Route path='' element={<SignedLayout><Bon_retour/></SignedLayout>}/>
              <Route path='form_retour' element={<SignedLayout><Form_retour/></SignedLayout>}/>
            </Route>
            <Route path='/fournisseurs'>
              <Route path='' element={<SignedLayout><Fournisseur/></SignedLayout>} exact/>
              <Route path='newfournisseur' element={<SignedLayout><New_fournisseur/></SignedLayout>} exact/>
              <Route path='updatedfournisseur/:id' element={<SignedLayout><UpdatedFournisseur/></SignedLayout>} exact/>
            </Route>
            <Route path='/famille_article'>
              <Route path='' element={<SignedLayout><Famille_article/></SignedLayout>} exact/>
              <Route path='newfamille' element={<SignedLayout><New_famille/></SignedLayout>} exact/>
              <Route path='updatedfamille/:id' element={<SignedLayout><UpdatedFamille/></SignedLayout>} exact/>
            </Route>
            <Route path='*' element={<SignedLayout><h1>Not found</h1></SignedLayout>} exact/>
          </Route>
        
        {/* When logged out */}
          <Route path='/signin'>   
            <Route path='' element={<SignedOutLayout><SignIn/></SignedOutLayout>}/>   
            <Route path='singout' element={<SignedOutLayout><SignIn/></SignedOutLayout>}/>   
            <Route path='forgot-password' element={<SignedOutLayout><SignIn/></SignedOutLayout>}/>
          </Route>      
        </Routes>
      </Router>
    </>
  );
}

export default App;