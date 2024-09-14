import { useState } from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';
import ChartPopover from './ChartPopover';

function CardComponent({ card }) {
  const [loading, setLoading] = useState(true);

  const handleImageLoad = () => {
    setLoading(false);
  };

  return (
    <div className='flex flex-col md:flex-row items-center justify-center space-y-6 mx-auto'>
      <div className='flex flex-row justify-center space-x-8'>
        <div className="relative w-1/2 md:w-1/3">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-zinc-500 border-solid border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          <img
            src={card.image}
            alt={card.name}
            className={`xl:rounded-2xl lg:rounded-xl md:rounded-md rounded-lg w-full ${loading ? 'hidden' : ''}`}
            onLoad={handleImageLoad}
          />
        </div>
        <div className='flex flex-col space-y-4 justify-center items-start uppercase'>
          <p><span className='font-semibold'>Name:</span> {card.name}</p>
          <p><span className='font-semibold'>Set:</span> {card.set}</p>
          <p><span className='font-semibold'>Rarity:</span> {card.rarity}</p>
          <p>{card.after_tix} <span className='font-semibold'>TIX</span> </p>
          { card.after_eur && <p>{card.after_eur} <span className='font-semibold'>EUR</span></p>}
          <a href={card.cardmarket} rel='noopener noreferrer' target='_blank' className='font-semibold flex items-center justify-center bg-zinc-200 hover:bg-zinc-300 active:scale-95 p-4 rounded-lg text-zinc-800 cursor-pointer space-x-2'>
            Buy now &nbsp; <FaExternalLinkAlt />
          </a>
        </div>
      </div>
      <ChartPopover mtgo_id={card.mtgo_id} />
    </div>
  );
}

export default CardComponent;
