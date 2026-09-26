import React from 'react';
import { Trip } from '../types';
import { Star, Plane, ThermometerSun, Briefcase, Droplets } from 'lucide-react';
import { EfficiencyBadge } from './EfficiencyBadge';

interface TripCardProps {
  trip: Trip;
}

export const TripCard: React.FC<TripCardProps> = ({ trip }) => {
  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-stone-100 flex flex-col h-full">
      {/* Image Header */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={trip.imageUrl} 
          alt={trip.destination} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
        />
        <div className="absolute top-3 left-3">
          <EfficiencyBadge score={trip.efficiencyScore} />
        </div>
        
        {trip.tags.length > 0 && (
          <div className="absolute bottom-3 left-3 flex gap-2">
            {trip.tags.map(tag => (
              <span key={tag} className="px-2 py-0.5 bg-white/90 backdrop-blur text-xs font-semibold text-stone-700 rounded-md shadow-sm">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Content Body */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-bold text-xl text-stone-900 leading-tight">{trip.destination}, {trip.country}</h3>
            <div className="flex items-center gap-1 text-stone-500 text-sm mt-1">
              <span>{trip.hotelName}</span>
              <span className="flex text-amber-400">
                {Array.from({ length: trip.hotelStars }).map((_, i) => (
                  <Star key={i} size={12} fill="currentColor" />
                ))}
              </span>
            </div>
          </div>
          <div className="text-right">
             <div className="text-2xl font-bold text-stone-900">€{trip.pricePerPerson}</div>
             <div className="text-xs text-stone-400">per person</div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 my-4 bg-stone-50 p-3 rounded-xl border border-stone-100">
          <div className="flex items-center gap-2 text-stone-600">
            <ThermometerSun size={16} className="text-orange-400" />
            <span className="text-sm font-medium">{trip.airTemp}° Air</span>
          </div>
          <div className="flex items-center gap-2 text-stone-600">
            <Droplets size={16} className="text-sky-400" />
            <span className="text-sm font-medium">{trip.waterTemp}° Water</span>
          </div>
          <div className="flex items-center gap-2 text-stone-600">
            <Plane size={16} className="text-stone-400" />
            <span className="text-sm">{trip.departureTime}</span>
          </div>
          <div className="flex items-center gap-2 text-stone-600">
            <Briefcase size={16} className={trip.ptoDaysRequired <= 0.5 ? "text-green-500" : "text-stone-400"} />
            <span className={`text-sm ${trip.ptoDaysRequired <= 0.5 ? 'font-bold text-green-700' : ''}`}>
              {trip.ptoDaysRequired === 0 ? "No PTO needed!" : `${trip.ptoDaysRequired} day PTO`}
            </span>
          </div>
        </div>

        <div className="mt-auto pt-3 border-t border-stone-100 flex items-center justify-between">
           <div className="text-xs text-stone-400">
             Total for two: <span className="font-medium text-stone-600">€{trip.totalPrice}</span>
           </div>
           <button className="bg-stone-900 hover:bg-orange-500 text-white px-5 py-2 rounded-lg text-sm font-semibold transition-colors duration-200">
             Book Now
           </button>
        </div>
      </div>
    </div>
  );
};