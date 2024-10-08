import React from 'react'

function Footer() {
  return (
    

<footer className="lg:sticky lg:bottom-0 z-40 bg-white mt-auto text-xs shadow dark:bg-zinc-950 font-semibold text-zinc-400">
    <div className="w-full p-4 md:flex md:items-center md:justify-between uppercase">
      <span className="sm:text-center">The information and images presented on this site are copyrighted by <a href='https://company.wizards.com/en' target='_blank' rel='noreferrer' className='hover:underline underline-offset-4 decoration-4 hover:text-zinc-100'>Wizards of the Coast, LLC</a></span>
    <ul className="flex flex-wrap items-center mt-2 sm:mt-0">
        <li>Data is provided by <a href='https://scryfall.com/docs/api' target='_blank' rel='noreferrer' className='hover:underline underline-offset-4 decoration-4 hover:text-zinc-100'>Scryfall</a>
        </li>
    </ul>
    </div>
</footer>

  )
}

export default Footer