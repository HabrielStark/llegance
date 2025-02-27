import React from 'react';

interface Dish {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
}

interface DishCardProps {
  dish: Dish;
}

const DishCard: React.FC<DishCardProps> = ({ dish }) => {
  return (
    <div className="group relative overflow-hidden rounded-lg shadow-xl transition-all duration-500 hover:shadow-2xl">
      <div className="aspect-w-16 aspect-h-9 overflow-hidden">
        <img 
          src={dish.image} 
          alt={dish.name} 
          className="w-full h-64 object-cover object-center transform transition-transform duration-700 group-hover:scale-110"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent opacity-90"></div>
      <div className="absolute bottom-0 left-0 right-0 p-6 transform transition-transform duration-500 group-hover:translate-y-0 translate-y-4">
        <h3 className="text-xl font-medium text-white mb-2">{dish.name}</h3>
        <p className="text-gray-300 text-sm mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">{dish.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-amber-300 font-light">{dish.price}</span>
          <button className="px-4 py-1 bg-transparent border border-amber-300 text-amber-300 text-sm hover:bg-amber-300 hover:text-black transition-colors duration-300 opacity-0 group-hover:opacity-100">
            Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default DishCard;