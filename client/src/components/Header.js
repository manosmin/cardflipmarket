import React, { useState } from 'react';

function Header({ onFetchData }) {
  const [activeButton, setActiveButton] = useState('today');

  const handleButtonClick = (period) => {
    onFetchData(period);
    setActiveButton(period);
  };

  return (
    <header className='sticky top-0 z-10 lg:text-base text-sm overflow-x-hidden'>
      <nav className="border-zinc-200 px-4 lg:px-6 py-2.5 bg-zinc-950 text-zinc-300">
        <div className="flex lg:flex-row flex-col flex-wrap justify-between items-center" >
          <div className='flex flex-col md:flex-row md:space-x-2 justify-center items-center text-lg font-bold'>
            <a href='/#' 
            className='font-bold text-zinc-100 uppercase' 
            rel='noreferrer'>MTGO Price Tracker</a>
            <span className='font-bold text-sm my-2 text-zinc-400 uppercase '>made by <a href='https://github.com/manosmin' rel='noopener noreferrer' target='_blank' className='hover:underline underline-offset-4 decoration-4 hover:text-zinc-100'>github.com/manosmin</a></span>
          </div>
          <ul className="flex lg:flex-row lg:space-x-8 font-bold animate-slideIn opacity-0" style={{ "--delay": 0.2 + "s" }}>
            <li>
              <button
                className={`${activeButton === 'today' ? 'text-zinc-100 underline decoration-4' : 'text-zinc-400'} block py-2 pr-4 pl-3 lg:border-0 lg:p-0 hover:text-zinc-100 hover:underline hover:decoration-4 border-zinc-700 underline-offset-8 uppercase`}
                onClick={() => handleButtonClick('today')}
              >
                Today
              </button>
            </li>
            <li>
              <button
                className={`${activeButton === '3-days' ? 'text-zinc-100 underline decoration-4' : 'text-zinc-400'} block py-2 pr-4 pl-3 lg:border-0 lg:p-0 hover:text-zinc-100 border-zinc-700 hover:underline hover:decoration-4 underline-offset-8 uppercase`}
                onClick={() => handleButtonClick('3-days')}
              >
                3-Days
              </button>
            </li>
            <li>
              <button
                className={`${activeButton === 'weekly' ? 'text-zinc-100 underline decoration-4' : 'text-zinc-400'} block py-2 pr-4 pl-3 lg:border-0 lg:p-0 hover:text-zinc-100 border-zinc-700 hover:underline hover:decoration-4 underline-offset-8 uppercase`}
                onClick={() => handleButtonClick('weekly')}
              >
                Weekly
              </button>
            </li>
            <li>
              <button
                className={`${activeButton === '15-days' ? 'text-zinc-100 underline decoration-4' : 'text-zinc-400'} block py-2 pr-4 pl-3 lg:border-0 lg:p-0 hover:text-zinc-100 border-zinc-700 hover:underline hover:decoration-4 underline-offset-8 uppercase`}
                onClick={() => handleButtonClick('15-days')}
              >
                15-Days
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
