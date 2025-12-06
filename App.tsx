
import React, { useState, useCallback } from 'react';
import { TravelPreferences, Itinerary } from './types';
import { generateItinerary } from './services/geminiService';
import TravelForm from './components/TravelForm';
import ItineraryDisplay from './components/ItineraryDisplay';
import Header from './components/Header';

const App: React.FC = () => {
  const [preferences, setPreferences] = useState<TravelPreferences>({
    destination: '',
    duration: 3,
    budget: 'Moderado',
    interests: 'cultura, comida local, paisajes naturales',
    restrictions: 'ninguna',
  });
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleGenerateItinerary = useCallback(async () => {
    setIsLoading(true);
    setError('');
    setItinerary(null);
    try {
      const result = await generateItinerary(preferences);
      setItinerary(result);
    } catch (err) {
      setError('Hubo un error al generar el itinerario. Por favor, inténtalo de nuevo.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [preferences]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 xl:col-span-3">
            <TravelForm
              preferences={preferences}
              setPreferences={setPreferences}
              onSubmit={handleGenerateItinerary}
              isLoading={isLoading}
            />
          </div>
          <div className="lg:col-span-8 xl:col-span-9">
            <ItineraryDisplay
              itinerary={itinerary}
              isLoading={isLoading}
              error={error}
            />
          </div>
        </div>
      </main>
      <footer className="text-center p-4 text-gray-500 text-sm">
        <p>Creado con ❤️ por un Planificador de Viajes AI</p>
      </footer>
    </div>
  );
};

export default App;
