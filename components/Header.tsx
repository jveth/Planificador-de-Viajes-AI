
import React from 'react';
import { Bot } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 md:px-8 py-4 flex items-center justify-center md:justify-start">
        <Bot className="h-8 w-8 text-blue-500 mr-3" />
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Planificador de Viajes AI
        </h1>
      </div>
    </header>
  );
};

export default Header;
