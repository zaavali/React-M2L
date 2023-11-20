
import React from 'react';
import { Link } from 'react-router-dom';
import'./nav.css'





function Nav({children}){
    return (
        
        <div className="nav"> 
          
    {children}
      
    <img src="/assets/m2l.png" className="img_film" alt=""/>
    <Link to="/">Accueil </Link>
    
    
    <Link to="/produits">Produits</Link>
   
        <Link to="/contact">Contact</Link>
    <Link to="/user"><img src="/assets/user.png" className="user" alt=""/>Se Connecter</Link>
   <img src="/assets/panier.png" className="panier" alt=""/><b className='b'>0</b>
        </div>
       
       
    )
    
    
    
}
export default Nav;