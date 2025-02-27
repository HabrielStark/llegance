import React, { useEffect, useState, useRef } from 'react';
import { ChefHat, Clock, MapPin, Phone, Instagram, Facebook, Twitter } from 'lucide-react';
import DishCard from './components/DishCard';
import Gallery from './components/Gallery';
import AnimatedText from './components/AnimatedText';
import SmoothScroll from './components/SmoothScroll';
import ReservationModal from './components/ReservationModal';

function App() {
  const [showSteam, setShowSteam] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Show steam animation after a delay
    const timer = setTimeout(() => {
      setShowSteam(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const featuredDishes = [
    {
      id: 1,
      name: "Truffle Infused Risotto",
      description: "Arborio rice cooked to perfection with white truffle oil, wild mushrooms, and aged parmesan",
      price: "$42",
      image: "https://images.unsplash.com/photo-1633436375153-d7045cb93e38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: 2,
      name: "Pan-Seared Scallops",
      description: "Fresh Atlantic scallops with cauliflower purée, crispy pancetta, and micro herbs",
      price: "$38",
      image: "https://images.unsplash.com/photo-1532980193509-0e4e7e0b4f40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: 3,
      name: "Wagyu Beef Fillet",
      description: "A5 Japanese Wagyu with truffled potato mousseline, glazed vegetables, and red wine jus",
      price: "$68",
      image: "https://images.unsplash.com/photo-1558030006-450675393462?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    }
  ];

  const galleryImages = [
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1592861956120-e524fc739696?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  ];

  return (
    <SmoothScroll>
      <div className="font-serif">
        {/* Hero Section */}
        <div ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 z-10"></div>
          <video 
            className="absolute inset-0 w-full h-full object-cover" 
            autoPlay 
            muted 
            loop
            playsInline
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-top-view-of-a-chef-garnishing-a-dish-39767-large.mp4" type="video/mp4" />
          </video>
          
          <div className="container mx-auto px-6 relative z-20 text-center">
            <div className="mb-8">
              <ChefHat className="inline-block text-amber-300 mb-4" size={48} />
            </div>
            
            <AnimatedText 
              text="L'ÉLÉGANCE" 
              className="text-5xl md:text-7xl font-light tracking-widest text-white mb-4"
            />
            
            <div className="h-0.5 w-24 bg-gradient-to-r from-transparent via-amber-300 to-transparent mx-auto my-8"></div>
            
            <AnimatedText 
              text="Where culinary artistry meets exquisite ambiance" 
              className="text-xl md:text-2xl text-gray-200 mb-12 italic"
              delay={1500}
            />
            
            <div className="relative inline-block">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                  alt="Signature Dish" 
                  className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-full border-4 border-amber-200/30 shadow-2xl mx-auto"
                />
                
                {/* Steam Animation */}
                <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/4 transition-opacity duration-1000 ${showSteam ? 'opacity-70' : 'opacity-0'}`}>
                  <div className="steam-container">
                    <div className="steam steam-one"></div>
                    <div className="steam steam-two"></div>
                    <div className="steam steam-three"></div>
                    <div className="steam steam-four"></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-16 flex flex-col md:flex-row items-center justify-center gap-8 text-white">
              <div className="flex items-center">
                <Clock className="mr-2 text-amber-300" size={20} />
                <span>Open Tue-Sun: 6pm - 11pm</span>
              </div>
              <div className="flex items-center">
                <Phone className="mr-2 text-amber-300" size={20} />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <MapPin className="mr-2 text-amber-300" size={20} />
                <span>42 Gourmet Avenue, New York</span>
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20">
            <div className="animate-bounce">
              <div className="w-8 h-12 border-2 border-white rounded-full flex justify-center pt-1">
                <div className="w-1 h-3 bg-white rounded-full animate-scroll"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* About Section */}
        <section className="py-24 bg-gradient-to-b from-black to-gray-900">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-light text-white mb-8 tracking-wider">OUR STORY</h2>
              <div className="h-0.5 w-24 bg-gradient-to-r from-transparent via-amber-300 to-transparent mx-auto mb-12"></div>
              <p className="text-gray-300 leading-relaxed mb-8">
                Founded in 2010 by acclaimed Chef Antoine Dubois, L'Élégance has redefined fine dining with its commitment to culinary excellence and impeccable service. Our philosophy is simple: source the finest seasonal ingredients, prepare them with precision and creativity, and serve them in an atmosphere of refined elegance.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Each dish tells a story—a narrative of tradition, innovation, and passion. We invite you to experience the art of gastronomy in its purest form, where every detail is meticulously crafted to create an unforgettable dining experience.
              </p>
            </div>
          </div>
        </section>
        
        {/* Featured Dishes */}
        <section className="py-24 bg-gradient-to-b from-gray-900 to-black">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-light text-white mb-8 tracking-wider text-center">SIGNATURE CREATIONS</h2>
            <div className="h-0.5 w-24 bg-gradient-to-r from-transparent via-amber-300 to-transparent mx-auto mb-16"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {featuredDishes.map(dish => (
                <DishCard key={dish.id} dish={dish} />
              ))}
            </div>
          </div>
        </section>
        
        {/* Gallery Section */}
        <section className="py-24 bg-gradient-to-b from-black to-gray-900">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-light text-white mb-8 tracking-wider text-center">CULINARY GALLERY</h2>
            <div className="h-0.5 w-24 bg-gradient-to-r from-transparent via-amber-300 to-transparent mx-auto mb-16"></div>
            
            <Gallery images={galleryImages} />
          </div>
        </section>
        
        {/* Reservation CTA */}
        <section className="py-24 bg-gradient-to-b from-gray-900 to-black relative">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80')] bg-cover bg-center opacity-20"></div>
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-light text-white mb-8 tracking-wider">RESERVE YOUR EXPERIENCE</h2>
              <div className="h-0.5 w-24 bg-gradient-to-r from-transparent via-amber-300 to-transparent mx-auto mb-12"></div>
              <p className="text-gray-300 leading-relaxed mb-12">
                Indulge in an evening of gastronomic delight. Reservations are recommended to ensure your preferred dining time.
              </p>
              <button 
                className="px-8 py-3 bg-transparent border-2 border-amber-300 text-amber-300 hover:bg-amber-300 hover:text-black transition-all duration-300 tracking-wider"
                onClick={() => setIsReservationOpen(true)}
              >
                BOOK A TABLE
              </button>
            </div>
          </div>
        </section>
        
        {/* Footer */}
        <footer className="py-12 bg-black">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-8 md:mb-0">
                <ChefHat className="inline-block text-amber-300 mb-4" size={32} />
                <h3 className="text-2xl text-white tracking-widest">L'ÉLÉGANCE</h3>
              </div>
              
              <div className="flex space-x-8 mb-8 md:mb-0">
                <a href="#" className="text-gray-400 hover:text-amber-300 transition-colors">
                  <Instagram size={24} />
                </a>
                <a href="#" className="text-gray-400 hover:text-amber-300 transition-colors">
                  <Facebook size={24} />
                </a>
                <a href="#" className="text-gray-400 hover:text-amber-300 transition-colors">
                  <Twitter size={24} />
                </a>
              </div>
              
              <div className="text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} L'Élégance. All rights reserved.
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* Reservation Modal */}
      <ReservationModal 
        isOpen={isReservationOpen} 
        onClose={() => setIsReservationOpen(false)} 
      />
    </SmoothScroll>
  );
}

export default App;