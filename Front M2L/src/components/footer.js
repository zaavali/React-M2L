import './footer.css'









function Footer({children}){
    return (
        
        <div className="footer"> 
          
    {children}
      
    <img src="/assets/m2l.png" className="img_film" alt=""/>
   
  <ul>
    <li> <h3>Société</h3></li>
    <li>Conditions d'utilisation</li>
    <li>Politique de confidentialité</li>
    <li>Politique des cookies</li>
    <li>Politique des bons de réduction</li>

  </ul>
  
  <ul>
    <li><h3>Aide</h3></li>
    <li>FAQ's</li>
    <li>Nous Contacter</li>
  </ul>
 
  <ul>
    <li> <h3>Suivez nous</h3></li>
    <li><img src="/assets/fb.png" className="fb" alt=""/></li>
    <li><img src="/assets/x.webp" className="x" alt=""/></li>
 

  </ul>
        </div>
       
       
    )
    
    
    
}
export default Footer;