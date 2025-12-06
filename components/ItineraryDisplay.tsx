
import React from 'react';
import { Compass, Loader2, AlertTriangle, MapPin, Utensils, CalendarDays, Clock, Sun, Moon, Coffee } from 'lucide-react';
import type { Itinerary } from '../types';

interface ItineraryDisplayProps {
  itinerary: Itinerary | null;
  isLoading: boolean;
  error: string;
}

const ItineraryDisplay: React.FC<ItineraryDisplayProps> = ({ itinerary, isLoading, error }) => {
  if (isLoading) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-white dark:bg-gray-800 p-12 rounded-xl shadow-lg min-h-[400px]">
        <Loader2 className="h-16 w-16 text-blue-600 animate-spin mb-6" />
        <p className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">Diseñando tu viaje perfecto...</p>
        <p className="text-gray-500 dark:text-gray-400 text-center max-w-md">
          Nuestra IA está consultando mapas, revisando restaurantes y organizando tus actividades.
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 p-8 rounded-xl shadow-lg">
        <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
        <p className="text-lg font-semibold">¡Ups! Algo salió mal</p>
        <p className="text-center mt-2">{error}</p>
      </div>
    );
  }

  if (!itinerary) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg text-center min-h-[400px]">
        <div className="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-full mb-6">
          <Compass className="h-16 w-16 text-blue-600 dark:text-blue-400" />
        </div>
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Tu próxima aventura comienza aquí</h3>
        <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto leading-relaxed">
          Completa tus preferencias a la izquierda y deja que nuestra IA cree un itinerario detallado día a día solo para ti.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Trip Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl shadow-xl p-8 text-white">
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">{itinerary.tripTitle}</h1>
          <p className="text-blue-100 text-lg leading-relaxed max-w-3xl opacity-95 font-light">{itinerary.summary}</p>
        </div>
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-blue-400 opacity-10 rounded-full blur-2xl"></div>
      </div>

      {/* Days Grid */}
      <div className="grid gap-8">
        {itinerary.days.map((dayPlan, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
            
            {/* Day Header - Clean & White */}
            <div className="px-8 pt-8 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-50 dark:border-gray-700/50">
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-center justify-center w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 shadow-sm border border-blue-100 dark:border-blue-800">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-500">Día</span>
                  <span className="text-2xl font-black leading-none">{dayPlan.day}</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                    {dayPlan.theme}
                  </h3>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                    <CalendarDays className="w-4 h-4 mr-1.5" />
                    <span>Exploración del día</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 grid lg:grid-cols-12 gap-10">
              {/* Activities Column (Timeline) */}
              <div className="lg:col-span-8 space-y-2">
                <h4 className="font-bold text-gray-900 dark:text-white uppercase text-xs tracking-widest mb-6 flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                  Ruta de Actividades
                </h4>
                
                <div className="space-y-8 relative">
                  {/* Timeline Line */}
                  <div className="absolute left-[19px] top-2 bottom-4 w-0.5 bg-gray-200 dark:bg-gray-700"></div>

                  {dayPlan.activities.map((activity, actIndex) => (
                    <div key={actIndex} className="relative pl-12 group">
                      {/* Timeline Dot */}
                      <div className="absolute left-0 top-1.5 w-10 h-10 bg-white dark:bg-gray-800 rounded-full border-2 border-blue-100 dark:border-blue-900/50 flex items-center justify-center z-10 shadow-sm group-hover:border-blue-500 transition-colors duration-300">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      </div>
                      
                      {/* Content Card */}
                      <div className="bg-gray-50 dark:bg-gray-700/30 rounded-xl p-5 border border-gray-100 dark:border-gray-700/50 hover:border-blue-200 dark:hover:border-blue-700/50 transition-all duration-300 hover:shadow-md">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                          <h5 className="font-bold text-lg text-gray-900 dark:text-white">
                            {activity.name}
                          </h5>
                          {activity.timeSlot && (
                            <span className="inline-flex items-center text-xs font-medium text-blue-700 dark:text-blue-300 bg-blue-100/50 dark:bg-blue-900/30 px-3 py-1 rounded-full whitespace-nowrap">
                              <Clock className="w-3 h-3 mr-1.5" />
                              {activity.timeSlot}
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
                          {activity.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Food Column */}
              <div className="lg:col-span-4 flex flex-col gap-6">
                <h4 className="font-bold text-gray-900 dark:text-white uppercase text-xs tracking-widest flex items-center">
                  <Utensils className="w-4 h-4 mr-2 text-orange-500" />
                  Experiencias Culinarias
                </h4>
                
                <div className="space-y-4">
                  {/* Lunch Card */}
                  <div className="bg-orange-50/50 dark:bg-orange-900/20 rounded-xl p-5 border border-orange-100 dark:border-orange-800/30 hover:shadow-sm transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-orange-100 dark:bg-orange-900/40 rounded-lg text-orange-600 dark:text-orange-400">
                        <Sun className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-bold text-orange-600 dark:text-orange-400 tracking-wide uppercase">Almuerzo</span>
                    </div>
                    <p className="text-gray-800 dark:text-gray-200 text-sm leading-relaxed font-medium">
                      {dayPlan.meals.lunch}
                    </p>
                  </div>

                  {/* Dinner Card */}
                  <div className="bg-indigo-50/50 dark:bg-indigo-900/20 rounded-xl p-5 border border-indigo-100 dark:border-indigo-800/30 hover:shadow-sm transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-indigo-100 dark:bg-indigo-900/40 rounded-lg text-indigo-600 dark:text-indigo-400">
                        <Moon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 tracking-wide uppercase">Cena</span>
                    </div>
                    <p className="text-gray-800 dark:text-gray-200 text-sm leading-relaxed font-medium">
                      {dayPlan.meals.dinner}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItineraryDisplay;
