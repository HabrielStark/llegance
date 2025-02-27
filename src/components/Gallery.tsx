import React, { useState } from 'react';

interface GalleryProps {
  images: string[];
}

const Gallery: React.FC<GalleryProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openGallery = (image: string) => {
    setSelectedImage(image);
    setIsOpen(true);
  };

  const closeGallery = () => {
    setIsOpen(false);
    setTimeout(() => {
      setSelectedImage(null);
    }, 300);
  };

  const nextImage = () => {
    if (!selectedImage) return;
    const currentIndex = images.indexOf(selectedImage);
    const nextIndex = (currentIndex + 1) % images.length;
    setSelectedImage(images[nextIndex]);
  };

  const prevImage = () => {
    if (!selectedImage) return;
    const currentIndex = images.indexOf(selectedImage);
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setSelectedImage(images[prevIndex]);
  };

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div 
            key={index} 
            className="overflow-hidden rounded-lg cursor-pointer transform transition-transform duration-500 hover:scale-105"
            onClick={() => openGallery(image)}
          >
            <img 
              src={image} 
              alt={`Gallery image ${index + 1}`} 
              className="w-full h-64 object-cover"
            />
          </div>
        ))}
      </div>

      {/* Fullscreen Gallery */}
      <div 
        className={`fixed inset-0 bg-black/95 z-50 flex items-center justify-center transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div 
          className={`relative max-w-4xl w-full h-full flex items-center justify-center transition-transform duration-500 ${
            isOpen ? 'scale-100 rotate-0' : 'scale-90 rotate-3'
          }`}
        >
          {selectedImage && (
            <img 
              src={selectedImage} 
              alt="Gallery fullscreen" 
              className="max-h-[80vh] max-w-full object-contain"
            />
          )}
          
          <button 
            className="absolute top-4 right-4 text-white hover:text-amber-300 transition-colors"
            onClick={closeGallery}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <button 
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-amber-300 transition-colors"
            onClick={prevImage}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button 
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-amber-300 transition-colors"
            onClick={nextImage}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default Gallery;