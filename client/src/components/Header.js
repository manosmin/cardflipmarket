import React from 'react';

function Header({ onFetchData }) {
  return (
    <header>
      <nav className="border-slate-200 px-4 lg:px-6 py-2.5 bg-slate-700 text-slate-300">
        <div className="flex lg:flex-row flex-col flex-wrap justify-between items-center">
          <p className='text-base font-bold text-slate-100 uppercase cursor-pointer'>CardFlipMarket</p>
          <ul className="flex mt-4 lg:flex-row lg:space-x-8 lg:mt-4 lg:mb-4 text-base font-bold">
            <li>
              <button
                className="block py-2 pr-4 pl-3 hover:bg-slate-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 text-slate-400 lg:hover:text-white hover:bg-slate-700 hover:text-white lg:hover:bg-transparent border-slate-700 uppercase"
                onClick={() => onFetchData('today')}
              >
                Today
              </button>
            </li>
            <li>
              <button
                className="block py-2 pr-4 pl-3 hover:bg-slate-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 text-slate-400 lg:hover:text-white hover:bg-slate-700 hover:text-white lg:hover:bg-transparent border-slate-700 uppercase"
                onClick={() => onFetchData('3-days')}
              >
                3-Days
              </button>
            </li>
            <li>
              <button
                className="block py-2 pr-4 pl-3 hover:bg-slate-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 text-slate-400 lg:hover:text-white hover:bg-slate-700 hover:text-white lg:hover:bg-transparent border-slate-700 uppercase"
                onClick={() => onFetchData('weekly')}
              >
                Weekly
              </button>
            </li>
            <li>
              <button
                className="block py-2 pr-4 pl-3 hover:bg-slate-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 text-slate-400 lg:hover:text-white hover:bg-slate-700 hover:text-white lg:hover:bg-transparent border-slate-700 uppercase"
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
