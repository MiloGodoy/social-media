import Link from 'next/link'
import React from 'react'


const App = () => {
  
  return (
    <div className='pt-20'>
      <div className='text-center px-8'>
          <div className='mb-6'>
              <div className='relative inline-flex before:absolute before:inset-0'>
                  <Link href='http://localhost:3001/vistas/conversation' className='px-10 py-3 text-sm font-medium inline-flex items-center justify-center border rounded-full text-zinc-300 hover:text-white transition duration-150 ease-in-out w-full group border-slate-100/40' target="_blank">
                      <span className='relative inline-flex items-center text-xl'>
                          Messenger

                      </span>
                  </Link>
              </div>
          </div>
      </div>

      <div className='text-center px-8'>
          <div className='mb-6'>
              <div className='relative inline-flex before:absolute before:inset-0'>
                  <Link href='http://localhost:3001/vistas/twitter' className='px-10 py-3 text-sm font-medium inline-flex items-center justify-center border rounded-full text-zinc-300 hover:text-white transition duration-150 ease-in-out w-full group border-slate-100/40' target="_blank">
                      <span className='relative inline-flex items-center text-xl'>
                          Social Media Feed

                      </span>
                  </Link>
              </div>
          </div>
      </div>
    </div>
  );
};

export default App;
