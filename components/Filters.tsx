import React from 'react';
import { FilterState } from '../types';
import { SlidersHorizontal, ThermometerSun, Calendar, Star } from 'lucide-react';

interface Props {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
}

export const Filters: React.FC<Props> = ({ filters, setFilters }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 h-fit sticky top-4">
      <div className="flex items-center gap-2 mb-6 text-stone-800">
        <SlidersHorizontal size={20} />
        <h2 className="font-bold text-lg">Smart Filters</h2>
      </div>

      <div className="space-y-8">
        {/* Budget */}
        <div>
          <label className="block text-sm font-semibold text-stone-700 mb-3">
            Max Price Per Person
          </label>
          <input 
            type="range" 
            min="200" 
            max="1000" 
            step="50"
            value={filters.maxPrice}
            onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
            className="w-full accent-orange-500 h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-sm text-stone-500 mt-2 font-medium">
            <span>€200</span>
            <span className="text-orange-600">€{filters.maxPrice}</span>
            <span>€1000+</span>
          </div>
        </div>

        {/* Water Temp */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-stone-700 mb-3">
            <ThermometerSun size={16} className="text-sky-500" />
            Min Water Temp
          </label>
          <div className="flex gap-2 flex-wrap">
            {[18, 20, 22, 24].map((temp) => (
              <button
                key={temp}
                onClick={() => setFilters(prev => ({ ...prev, minWaterTemp: temp }))}
                className={`flex-1 py-2 px-3 text-sm rounded-lg font-medium transition-colors ${
                  filters.minWaterTemp === temp 
                    ? 'bg-sky-100 text-sky-800 border-2 border-sky-200' 
                    : 'bg-stone-50 text-stone-600 hover:bg-stone-100 border border-stone-200'
                }`}
              >
                {temp}°C+
              </button>
            ))}
          </div>
        </div>

        {/* Hotel Stars */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-stone-700 mb-3">
             <Star size={16} className="text-amber-400" />
             Hotel Quality
          </label>
           <div className="flex bg-stone-100 p-1 rounded-lg">
             {[4, 5].map((stars) => (
               <button
                  key={stars}
                  onClick={() => setFilters(prev => ({ ...prev, minStars: stars as 4 | 5 }))}
                  className={`flex-1 py-2 text-sm rounded-md font-medium transition-all ${
                    filters.minStars === stars
                    ? 'bg-white text-stone-900 shadow-sm'
                    : 'text-stone-500 hover:text-stone-700'
                  }`}
               >
                 {stars} Stars Only
               </button>
             ))}
           </div>
        </div>

        {/* Max PTO */}
        <div>
           <label className="flex items-center gap-2 text-sm font-semibold text-stone-700 mb-3">
            <Calendar size={16} className="text-green-600" />
            Max PTO Days
          </label>
          <div className="grid grid-cols-3 gap-2">
             {[0, 1, 2].map((days) => (
               <button
                 key={days}
                 onClick={() => setFilters(prev => ({ ...prev, maxPto: days }))}
                 className={`py-2 text-sm rounded-lg font-medium border transition-colors ${
                   filters.maxPto === days
                   ? 'bg-green-50 text-green-800 border-green-200'
                   : 'bg-white text-stone-600 border-stone-200 hover:border-stone-300'
                 }`}
               >
                 {days === 0 ? "0 Days" : `${days} Day${days > 1 ? 's' : ''}`}
               </button>
             ))}
          </div>
        </div>

      </div>
    </div>
  );
};