import React from 'react';
import { BrowserRouter, Routes, Route, NavLink, Link } from 'react-router-dom';
import useFetch from './hooks/useFetch';
import ResourceList from './pages/ResourceList';
import ResourceDetail from './pages/ResourceDetail';

// Componente Home simple
const Home = () => (
  <div className="text-center py-20 animate-in zoom-in-95 duration-500">
    <h1 className="text-4xl font-extrabold text-gray-900 mb-4">La Galaxia en Datos</h1>
    <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto">
      Explora la base de datos oficial de Star Wars. Selecciona una categoría arriba para comenzar.
    </p>
  </div>
);

function App() {
  // Obtenemos las categorías dinámicamente para el menú
  const { data: resources } = useFetch('https://swapi.dev/api/');
  const navLinks = resources ? Object.keys(resources) : [];

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
        
        {/* Navbar Fija */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
          <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
            <Link 
              to="/"
              className="text-xl font-black tracking-tighter cursor-pointer flex items-center gap-2 hover:opacity-80"
            >
              <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-yellow-400 text-xs">SW</div>
              SWAPI<span className="text-gray-400 font-normal">EXPLORER</span>
            </Link>
          </div>

          {/* Menú de Categorías Dinámico */}
          <div className="max-w-5xl mx-auto px-4 overflow-x-auto no-scrollbar">
            <nav className="flex space-x-1 py-2">
              {navLinks.map(res => (
                <NavLink
                  key={res}
                  to={`/resource/${res}`}
                  className={({ isActive }) => `
                    px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide whitespace-nowrap transition-all
                    ${isActive 
                      ? 'bg-black text-yellow-400 shadow-md transform scale-105' 
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-800'}
                  `}
                >
                  {res}
                </NavLink>
              ))}
            </nav>
          </div>
        </header>

        {/* Contenido Principal (Rutas) */}
        <main className="max-w-3xl mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/resource/:resource" element={<ResourceList />} />
            <Route path="/resource/:resource/:id" element={<ResourceDetail />} />
            {/* Ruta 404 opcional */}
            <Route path="*" element={<div className="text-center mt-10">Página no encontrada</div>} />
          </Routes>
        </main>

        <footer className="text-center py-8 text-gray-400 text-sm">
          Datos provistos por SWAPI.
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;