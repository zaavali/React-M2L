
import './App.css';
import Body from './components/body';
import Navbar from './components/nav.js';
import Footer from './components/footer';
import Carousel from './components/carousel';
import Produits from './components/produits';
import Produitsh from './components/produitsh';
import Produitsf from './components/produitsf';
import Quiz from './components/bdd';
import Prodbdd from './components/produitsbdd';

function App() {
  return (
    <div className="App">
    <Navbar/>
  <Body/>
    <Carousel/>
    <Produits/>
    <Produitsh/>
    <Produitsf/>
    <Produits/>
    <Quiz/>
    <Prodbdd/>
    <Footer/>
    </div>
  );
}

export default App;
