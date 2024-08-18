import React from 'react';

function Header({ onFetchData }) {
  return (
    <header className='sticky top-0 z-10 lg:text-base text-sm'>
      <nav className="border-zinc-200 px-4 lg:px-6 py-2.5 bg-zinc-950  text-zinc-300">
        <div className="flex lg:flex-row flex-col flex-wrap justify-between items-center">
          <div className='lg:block'>
            <a href='/#' className='font-bold text-zinc-100 uppercase cursor-pointer' rel='noreferrer'>CardFlipMarket</a>
          </div>
          <ul className="flex lg:flex-row lg:space-x-8 my-2 font-bold">
            <li>
              <button
                className="block py-2 pr-4 pl-3 lg:border-0 lg:p-0 text-zinc-400  hover:text-zinc-100 border-zinc-700 uppercase"
                onClick={() => onFetchData('today')}
              >
                Today
              </button>
            </li>
            <li>
              <button
                className="block py-2 pr-4 pl-3 lg:border-0 lg:p-0 text-zinc-400  hover:text-zinc-100  border-zinc-700 uppercase"
                onClick={() => onFetchData('3-days')}
              >
                3-Days
              </button>
            </li>
            <li>
              <button
                className="block py-2 pr-4 pl-3 lg:border-0 lg:p-0 text-zinc-400  hover:text-zinc-100 border-zinc-700 uppercase"
                onClick={() => onFetchData('weekly')}
              >
                Weekly
              </button>
            </li>
            <li>
              <button
                className="block py-2 pr-4 pl-3 lg:border-0 lg:p-0 text-zinc-400  hover:text-zinc-100 border-zinc-700 uppercase"
                onClick={() => onFetchData('15-days')}
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
