
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Compass, Loader2, AlertTriangle } from 'lucide-react';

interface ItineraryDisplayProps {
  itinerary: string;
  isLoading: boolean;
  error: string;
}

const ItineraryDisplay: React.FC<ItineraryDisplayProps> = ({ itinerary, isLoading, error }) => {
  if (isLoading) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <Loader2 className="h-16 w-16 text-blue-500 animate-spin mb-4" />
        <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">Buscando las mejores aventuras...</p>
        <p className="text-gray-500 dark:text-gray-400">Esto puede tardar unos segundos.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 p-6 rounded-lg shadow-lg">
        <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
        <p className="text-lg font-semibold">¡Ups! Algo salió mal</p>
        <p>{error}</p>
      </div>
    );
  }

  if (!itinerary) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center">
        <Compass className="h-16 w-16 text-gray-400 dark:text-gray-500 mb-4" />
        <h3 className="text-xl font-bold text-gray-800 dark:text-white">Tu aventura te espera</h3>
        <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-sm">Completa el formulario a la izquierda y presiona "Crear mi Itinerario" para que nuestra IA diseñe un plan de viaje perfecto para ti.</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">Tu Itinerario Personalizado</h2>
      <div className="prose prose-blue dark:prose-invert max-w-none">
         <ReactMarkdown
            components={{
              h1: ({node, ...props}) => <h1 className="text-2xl font-bold my-4" {...props} />,
              h2: ({node, ...props}) => <h2 className="text-xl font-semibold my-3" {...props} />,
              h3: ({node, ...props}) => <h3 className="text-lg font-semibold my-2" {...props} />,
              p: ({node, ...props}) => <p className="leading-relaxed" {...props} />,
              ul: ({node, ...props}) => <ul className="list-disc pl-5 my-2" {...props} />,
              li: ({node, ...props}) => <li className="mb-1" {...props} />,
            }}
          >
            {itinerary}
          </ReactMarkdown>
      </div>
    </div>
  );
};

export default ItineraryDisplay;
