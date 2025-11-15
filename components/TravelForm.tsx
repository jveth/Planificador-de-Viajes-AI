
import React from 'react';
import { TravelPreferences } from '../types';
import { MapPin, Calendar, DollarSign, Heart, Ban, Wand2, Loader2 } from 'lucide-react';

interface TravelFormProps {
  preferences: TravelPreferences;
  setPreferences: React.Dispatch<React.SetStateAction<TravelPreferences>>;
  onSubmit: () => void;
  isLoading: boolean;
}

const TravelForm: React.FC<TravelFormProps> = ({ preferences, setPreferences, onSubmit, isLoading }) => {
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPreferences(prev => ({
      ...prev,
      [name]: name === 'duration' ? parseInt(value, 10) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg sticky top-8">
      <h2 className="text-xl font-bold mb-6 text-gray-800 dark:text-white">Define tu viaje ideal</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        
        <div className="relative">
          <label htmlFor="destination" className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">Destino</label>
          <MapPin className="absolute left-3 top-9 h-5 w-5 text-gray-400" />
          <input
            type="text"
            id="destination"
            name="destination"
            value={preferences.destination}
            onChange={handleChange}
            placeholder="Ej. París, Francia"
            required
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-700"
          />
        </div>
        
        <div className="relative">
          <label htmlFor="duration" className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">Duración (días)</label>
          <Calendar className="absolute left-3 top-9 h-5 w-5 text-gray-400" />
          <input
            type="number"
            id="duration"
            name="duration"
            value={preferences.duration}
            onChange={handleChange}
            min="1"
            max="30"
            required
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-700"
          />
        </div>

        <div className="relative">
          <label htmlFor="budget" className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">Presupuesto</label>
          <DollarSign className="absolute left-3 top-9 h-5 w-5 text-gray-400" />
          <select
            id="budget"
            name="budget"
            value={preferences.budget}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-700"
          >
            <option>Económico</option>
            <option>Moderado</option>
            <option>Lujoso</option>
          </select>
        </div>

        <div className="relative">
          <label htmlFor="interests" className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">Intereses</label>
          <Heart className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <textarea
            id="interests"
            name="interests"
            value={preferences.interests}
            onChange={handleChange}
            rows={3}
            placeholder="Ej. museos, playa, senderismo"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-700"
          />
        </div>

        <div className="relative">
          <label htmlFor="restrictions" className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">Restricciones</label>
          <Ban className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <textarea
            id="restrictions"
            name="restrictions"
            value={preferences.restrictions}
            onChange={handleChange}
            rows={2}
            placeholder="Ej. viajo con niños, movilidad reducida"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-700"
          />
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? (
            <Loader2 className="animate-spin h-5 w-5 mr-2" />
          ) : (
            <Wand2 className="h-5 w-5 mr-2" />
          )}
          {isLoading ? 'Generando Magia...' : 'Crear mi Itinerario'}
        </button>
      </form>
    </div>
  );
};

export default TravelForm;
