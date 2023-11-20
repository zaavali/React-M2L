import './carousel.css'
import  { useEffect, useState} from 'react';



const Carousel = () => {
    
  const data = [
    {
      src:"/assets/raquette.jpg",
      className: "raquette",
      alt :""
    },
    {
      src: "/assets/raquettetennis.jpg",
      className: "rt",
      alt :""
    },
    {
      src: "/assets/balles tennis.jpg",
      className: "bt",
      alt :""
    },
    {
      src: "/assets/raquette-badminton.jpg",
      className: "rb",
      alt :""
    },
    
    {
      src: "/assets/volants.jpg",
      className: "v",
      alt :""
    },
    {
      src: "/assets/basketballon.webp",
      className: "bb",
      alt :""
    },
  ]
  const [currentIndex, setCurrentIndex] = useState(0)
  useEffect(() => {

    const interval = setInterval(()=> setCurrentIndex((lastIdx) => (lastIdx + 1) % data.length), 3000)

    return () => clearInterval(interval)
}, [data.length])




return (
  <div className='carousel-container'>
     {data.map((item , index) => {
  return    <img src={window.location.origin + item.src} className={'carousel-item'} alt={item.alt} style={{transform: `translate(-${currentIndex * 100}%)`}}
  key={""}/>
          })};
          
  </div>
)      
            

           
        
}

export default Carousel