import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { parseSwapiURL } from '../utils/urlHelpers';

const SmartValue = ({ value }) => {
  // 1. Si es un array, renderizar recursivamente
  if (Array.isArray(value)) {
    return (
      <div className="flex flex-wrap gap-2">
        {value.map((item, i) => (
          <SmartValue key={i} value={item} />
        ))}
      </div>
    );
  }

  // 2. Analizar si es una URL de SWAPI
  const swapiInfo = parseSwapiURL(value);

  if (swapiInfo) {
    // Usamos Link para navegación interna real
    return (
      <Link
        to={`/resource/${swapiInfo.resource}/${swapiInfo.id}`}
        className="inline-flex items-center gap-1 text-blue-600 hover:underline bg-blue-50 px-2 py-0.5 rounded text-xs font-mono mr-1 mb-1 border border-blue-100 hover:border-blue-300 transition-colors"
      >
        <ExternalLink size={10} />
        {swapiInfo.resource}/{swapiInfo.id}
      </Link>
    );
  }

  // 3. Si es URL externa normal
  if (typeof value === 'string' && value.startsWith('http')) {
    return (
      <a 
        href={value} 
        target="_blank" 
        rel="noreferrer" 
        className="text-blue-400 truncate block max-w-xs hover:text-blue-600"
      >
        {value}
      </a>
    );
  }

  // 4. Texto plano
  return <span>{String(value)}</span>;
};

export default SmartValue;