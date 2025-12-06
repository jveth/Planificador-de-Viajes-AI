
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
        
        <div className="space-y-1">
          <label htmlFor="destination" className="block text-sm font-medium text-gray-600 dark:text-gray-300">Destino</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              id="destination"
              name="destination"
              value={preferences.destination}
              onChange={handleChange}
              placeholder="Ej. París, Francia"
              required
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>
        </div>
        
        <div className="space-y-1">
          <label htmlFor="duration" className="block text-sm font-medium text-gray-600 dark:text-gray-300">Duración (días)</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="number"
              id="duration"
              name="duration"
              value={preferences.duration}
              onChange={handleChange}
              min="1"
              max="30"
              required
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label htmlFor="budget" className="block text-sm font-medium text-gray-600 dark:text-gray-300">Presupuesto</label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <select
              id="budget"
              name="budget"
              value={preferences.budget}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 appearance-none"
            >
              <option>Económico</option>
              <option>Moderado</option>
              <option>Lujoso</option>
            </select>
          </div>
        </div>

        <div className="space-y-1">
          <label htmlFor="interests" className="block text-sm font-medium text-gray-600 dark:text-gray-300">Intereses</label>
          <div className="relative">
            <Heart className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <textarea
              id="interests"
              name="interests"
              value={preferences.interests}
              onChange={handleChange}
              rows={3}
              placeholder="Ej. museos, playa, senderismo"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label htmlFor="restrictions" className="block text-sm font-medium text-gray-600 dark:text-gray-300">Restricciones</label>
          <div className="relative">
            <Ban className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <textarea
              id="restrictions"
              name="restrictions"
              value={preferences.restrictions}
              onChange={handleChange}
              rows={2}
              placeholder="Ej. viajo con niños, movilidad reducida"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? (
            <Loader2 className="animate-spin h-5 w-5 mr-2 text-white" />
          ) : (
            <Wand2 className="h-5 w-5 mr-2 text-white" />
          )}
          {isLoading ? 'Generando Magia...' : 'Crear mi Itinerario'}
        </button>
      </form>
    </div>
  );
};

export default TravelForm;
