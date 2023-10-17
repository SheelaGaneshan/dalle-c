import React from 'react';
import Home from './components/Home';
import Create from './components/Create';
import { BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import { logo } from './assets';

const App = () => {
  return (
   <BrowserRouter>
    <header className="w-full flex justify-between item-center bg-white sm:px-8 px-4 py-4
    border-b broder-b[#e6ebf4]">
      <Link to="/">
        <img src={logo} alt="logo" className='w-28 object-contain' />
      </Link>
      <Link to="/create" className="font-inter font-medium bg-[#6469ff] text-white 
       px-4 py-2 rounded-md">Create</Link>
    </header>
    <main className="sm:p-8 px-4 py-8 w-full bg-[#f9f4fe] min-h-[calc(100vh-73px)]">
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/create' element={<Create/>}/>
    </Routes>
    </main>

   </BrowserRouter>

  )
}

export default App