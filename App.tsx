import React, { useState, useMemo } from 'react';
import { FilterState, SortOption } from './types';
import { generateMockTrips, filterTrips } from './services/tripService';
import { TripCard } from './components/TripCard';
import { Filters } from './components/Filters';
import { BookItForMeModal } from './components/BookItForMeModal';
import { Palmtree, ArrowUpDown, Zap, CalendarCheck, PlaneTakeoff } from 'lucide-react';

const App: React.FC = () => {
  // Initial state reflects the "Default Intelligence" required
  const [filters, setFilters] = useState<FilterState>({
    maxPrice: 600,
    minWaterTemp: 20,
    minStars: 4,
    maximizeLongWeekends: true,
    maxPto: 2,
    departureAirport: 'London (LHR)',
  });

  const [sortBy, setSortBy] = useState<SortOption>(SortOption.EFFICIENCY);
  const [isBookForMeOpen, setIsBookForMeOpen] = useState(false);

  // Load data once
  const allTrips = useMemo(() => generateMockTrips(), []);

  // Filter and Sort
  const displayedTrips = useMemo(() => {
    const filtered = filterTrips(allTrips, filters);
    
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case SortOption.PRICE_LOW:
          return a.pricePerPerson - b.pricePerPerson;
        case SortOption.TEMP_HIGH:
          return b.waterTemp - a.waterTemp;
        case SortOption.EFFICIENCY:
        default:
          return b.efficiencyScore - a.efficiencyScore;
      }
    });
  }, [allTrips, filters, sortBy]);

  const bestTrip = displayedTrips.length > 0 ? displayedTrips[0] : null;

  return (
    <div className="min-h-screen bg-stone-50 pb-20">
      {/* Navigation / Header */}
      <nav className="bg-white border-b border-stone-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <div className="bg-orange-500 p-1.5 rounded-lg">
                <Palmtree className="text-white" size={20} />
              </div>
              <span className="font-bold text-xl text-stone-900 tracking-tight">WeekendWise</span>
            </div>
            
            <button 
              onClick={() => setIsBookForMeOpen(true)}
              className="hidden md:flex items-center gap-2 bg-gradient-to-r from-stone-900 to-stone-800 text-white px-5 py-2 rounded-full text-sm font-semibold shadow-md hover:shadow-lg transition-all hover:scale-105"
            >
              <Zap size={16} className="text-yellow-400" />
              Book It For Me
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-white border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-extrabold text-stone-900 mb-4 leading-tight">
              Maximum vacation. <br/>
              <span className="text-orange-500">Minimum PTO.</span>
            </h1>
            <div className="flex items-center gap-3 bg-blue-50 text-blue-800 px-4 py-3 rounded-xl border border-blue-100 w-fit">
               <CalendarCheck size={20} />
               <p className="font-medium text-sm">We automatically find trips that feel longer than the days you take off.</p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-4 items-center">
             {/* Departure Input */}
            <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <PlaneTakeoff size={18} className="text-stone-400" />
                </div>
                <input
                  type="text"
                  value={filters.departureAirport}
                  onChange={(e) => setFilters(prev => ({ ...prev, departureAirport: e.target.value }))}
                  placeholder="Departing from..."
                  className="pl-10 pr-4 py-3 bg-stone-100 border-none rounded-xl text-stone-900 font-semibold text-sm focus:ring-2 focus:ring-orange-500 w-full sm:w-64 placeholder-stone-400"
                />
            </div>

            {/* Maximize Long Weekends Toggle */}
            <label className="flex items-center gap-3 cursor-pointer bg-stone-100 px-4 py-3 rounded-xl hover:bg-stone-200 transition-colors">
              <div className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={filters.maximizeLongWeekends}
                  onChange={(e) => setFilters(prev => ({ ...prev, maximizeLongWeekends: e.target.checked }))}
                />
                <div className="w-11 h-6 bg-stone-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
              </div>
              <span className="text-sm font-semibold text-stone-700 select-none">Maximize Long Weekends</span>
            </label>

            {/* Sort Dropdown */}
            <div className="relative">
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="appearance-none bg-stone-100 border-none text-stone-700 py-3 pl-4 pr-10 rounded-xl font-semibold text-sm cursor-pointer hover:bg-stone-200 focus:ring-2 focus:ring-orange-500"
              >
                {Object.values(SortOption).map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              <ArrowUpDown size={16} className="absolute right-3 top-3.5 text-stone-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar */}
          <aside className="lg:w-1/4 flex-shrink-0">
            <Filters filters={filters} setFilters={setFilters} />
          </aside>

          {/* Results Grid */}
          <main className="flex-1">
            <div className="flex justify-between items-center mb-6">
               <h2 className="text-stone-500 font-medium">
                 {displayedTrips.length > 0 ? (
                    <>Found <strong className="text-stone-900">{displayedTrips.length}</strong> smart getaways</>
                 ) : (
                    <span>No trips found</span>
                 )}
               </h2>
               <button 
                onClick={() => setIsBookForMeOpen(true)}
                className="lg:hidden flex text-sm font-bold text-orange-600 items-center gap-1"
               >
                 <Zap size={14} /> Book It For Me
               </button>
            </div>

            {displayedTrips.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {displayedTrips.map(trip => (
                  <TripCard key={trip.id} trip={trip} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-stone-200">
                <div className="text-stone-300 mb-4 text-6xl">🛫</div>
                <h3 className="text-xl font-bold text-stone-900">
                  {filters.departureAirport ? `No flights found from ${filters.departureAirport}` : "Please enter a departure airport"}
                </h3>
                <p className="text-stone-500 mt-2 max-w-md mx-auto">
                   {filters.departureAirport 
                      ? "Try changing your departure airport, dates, or adjusting filters to find more options."
                      : "We need to know where you're flying from to find the best smart getaways."
                   }
                </p>
                <button 
                  onClick={() => setFilters({ ...filters, maxPrice: 1000, minWaterTemp: 18, departureAirport: 'London (LHR)' })}
                  className="mt-6 text-orange-600 font-semibold hover:underline"
                >
                  Reset Filters & Departure
                </button>
              </div>
            )}
          </main>

        </div>
      </div>

      {/* Stretch Feature: Book It For Me Modal */}
      <BookItForMeModal 
        isOpen={isBookForMeOpen} 
        onClose={() => setIsBookForMeOpen(false)} 
        bestTrip={bestTrip} 
      />

    </div>
  );
};

export default App;