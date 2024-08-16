import React from 'react'

function Footer() {
  return (
    

<footer class="bg-white text-xs shadow dark:bg-zinc-700 font-semibold text-zinc-400">
    <div class="w-full p-4 md:flex md:items-center md:justify-between uppercase">
      <span class="sm:text-center">The information presented on this site about Magic: The Gathering, is copyrighted by <a href='https://company.wizards.com/en' target='_blank' rel='noreferrer' className='hover:underline'>Wizards of the Coast</a></span>
    <ul class="flex flex-wrap items-center mt-2 sm:mt-0">
        <li>The data is provided by <a href='https://scryfall.com/docs/api' target='_blank' rel='noreferrer' className='hover:underline'>Scryfall</a>
        </li>
    </ul>
    </div>
</footer>

  )
}

export default Footer