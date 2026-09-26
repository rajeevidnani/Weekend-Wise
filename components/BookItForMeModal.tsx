import React, { useState, useEffect } from 'react';
import { Trip } from '../types';
import { Sparkles, CheckCircle, Loader, X } from 'lucide-react';
import { TripCard } from './TripCard';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  bestTrip: Trip | null;
}

export const BookItForMeModal: React.FC<Props> = ({ isOpen, onClose, bestTrip }) => {
  const [stage, setStage] = useState<'analyzing' | 'found' | 'booked'>('analyzing');

  useEffect(() => {
    if (isOpen) {
      setStage('analyzing');
      const timer = setTimeout(() => {
        setStage('found');
      }, 2500); // Fake analysis time
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/50 hover:bg-white rounded-full transition-colors"
        >
          <X size={20} className="text-stone-500" />
        </button>

        <div className="p-8 text-center">
          {stage === 'analyzing' && (
            <div className="py-12 flex flex-col items-center">
              <div className="relative">
                <div className="absolute inset-0 bg-orange-400 rounded-full blur-xl opacity-20 animate-pulse"></div>
                <Sparkles size={48} className="text-orange-500 relative z-10 animate-bounce" />
              </div>
              <h3 className="text-2xl font-bold mt-6 mb-2 text-stone-900">Scanning Europe...</h3>
              <p className="text-stone-500">Checking flight patterns, PTO usage, and water temperatures.</p>
              <div className="mt-8 flex gap-2 justify-center">
                <Loader className="animate-spin text-stone-300" />
              </div>
            </div>
          )}

          {stage === 'found' && bestTrip && (
            <div className="flex flex-col items-center text-left">
              <div className="bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-sm font-bold mb-6 flex items-center gap-2">
                <CheckCircle size={16} /> Best Option Found
              </div>
              
              <div className="w-full transform transition-all">
                <TripCard trip={bestTrip} />
              </div>

              <div className="mt-6 w-full">
                <button 
                  onClick={() => setStage('booked')}
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-200 transition-all active:scale-95"
                >
                  Book This Trip Now
                </button>
                <p className="text-xs text-stone-400 mt-3 text-center">Instant confirmation. 24h free cancellation.</p>
              </div>
            </div>
          )}

           {stage === 'booked' && (
            <div className="py-12 flex flex-col items-center">
               <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                 <CheckCircle size={40} className="text-green-600" />
               </div>
               <h3 className="text-2xl font-bold mb-2 text-stone-900">You're going away!</h3>
               <p className="text-stone-500">Booking confirmation sent to your email.</p>
               <button onClick={onClose} className="mt-8 text-stone-900 font-semibold underline">
                 Back to search
               </button>
            </div>
           )}
        </div>
      </div>
    </div>
  );
};