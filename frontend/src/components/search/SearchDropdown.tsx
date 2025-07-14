import React, { useState, useEffect, useRef } from 'react';
import { Search, Music, Users, MapPin, GraduationCap, Calendar } from 'lucide-react';

interface SearchResult {
  id: string;
  title: string;
  type: 'gig' | 'professional' | 'studio' | 'school' | 'event';
  description: string;
  location?: string;
  rating?: number;
  price?: string;
  icon: React.ReactNode;
}

interface SearchDropdownProps {
  onResultSelect?: (result: SearchResult) => void;
}

const SearchDropdown: React.FC<SearchDropdownProps> = ({ onResultSelect }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const mockData: SearchResult[] = [
    { id: '1', title: 'Jazz Night at Blue Note', type: 'gig', description: 'Weekly jazz performance', location: 'New York', price: '$500', icon: <Music className="h-4 w-4" /> },
    { id: '2', title: 'Wedding Reception Band', type: 'gig', description: 'Elegant wedding ceremony', location: 'Los Angeles', price: '$1200', icon: <Music className="h-4 w-4" /> },
    { id: '4', title: 'Sarah Johnson - Vocalist', type: 'professional', description: 'Pop/R&B specialist', location: 'Nashville', rating: 4.9, price: '$75/hr', icon: <Users className="h-4 w-4" /> },
    { id: '5', title: 'Mike Chen - Producer', type: 'professional', description: 'Hip Hop & Electronic', location: 'Atlanta', rating: 4.8, price: '$90/hr', icon: <Users className="h-4 w-4" /> },
    { id: '7', title: 'SoundWave Studios', type: 'studio', description: 'Professional recording studio', location: 'Los Angeles', rating: 4.9, price: '$150/hr', icon: <MapPin className="h-4 w-4" /> },
    { id: '10', title: 'Berklee Online', type: 'school', description: 'Guitar & Bass lessons', location: 'Online', rating: 4.7, price: '$50/lesson', icon: <GraduationCap className="h-4 w-4" /> }
  ];

  useEffect(() => {
    if (query.length >= 2) {
      const filtered = mockData.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase()) ||
        item.location?.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 6);
      setResults(filtered);
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleResultClick = (result: SearchResult) => {
    setQuery(result.title);
    setIsOpen(false);
    onResultSelect?.(result);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'gig': return 'bg-blue-900 text-blue-200';
      case 'professional': return 'bg-green-900 text-green-200';
      case 'studio': return 'bg-purple-900 text-purple-200';
      case 'school': return 'bg-orange-900 text-orange-200';
      default: return 'bg-gray-900 text-gray-200';
    }
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6" />
        <input
          type="text"
          placeholder="Search for musicians, gigs, studios, schools..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-4 bg-[#141414] border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#E50914] transition-colors text-lg"
        />
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-[#141414] border border-gray-700 rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto">
          {results.map((result, index) => (
            <div
              key={result.id}
              className={`p-4 cursor-pointer hover:bg-gray-800 transition-colors ${index !== results.length - 1 ? 'border-b border-gray-700' : ''}`}
              onClick={() => handleResultClick(result)}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  {result.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="text-white font-medium truncate">{result.title}</h4>
                    <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(result.type)}`}>
                      {result.type}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm mb-2">{result.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-4">
                      {result.location && (
                        <span className="text-gray-500">{result.location}</span>
                      )}
                      {result.rating && (
                        <span className="text-yellow-400">★ {result.rating}</span>
                      )}
                    </div>
                    {result.price && (
                      <span className="text-[#E50914] font-medium">{result.price}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchDropdown;
