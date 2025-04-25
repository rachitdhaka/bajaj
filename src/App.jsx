import { useEffect, useState } from 'react';
import AutocompleteSearch from './components/AutocompleteSearch';
import FilterPanel from './components/FilterPanel';
import DoctorList from './components/DoctorList';
import { updateUrlParams, getUrlParams } from './utils/urlUtils';

function App() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [consultationType, setConsultationType] = useState('');
  const [selectedSpecialties, setSelectedSpecialties] = useState([]);
  const [sortBy, setSortBy] = useState('');
  
  // Fetch doctors data
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch('https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json');
        if (!response.ok) {
          throw new Error('Failed to fetch doctor data');
        }
        const data = await response.json();
        setDoctors(data);
        setFilteredDoctors(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  // Load filters from URL on initial load
  useEffect(() => {
    if (doctors.length > 0) {
      const params = getUrlParams();
      
      // Set filters from URL parameters
      if (params.search) setSearchTerm(params.search);
      if (params.consultation) setConsultationType(params.consultation);
      if (params.specialties) setSelectedSpecialties(params.specialties.split(','));
      if (params.sort) setSortBy(params.sort);
      
      applyFilters(
        params.search || '',
        params.consultation || '',
        params.specialties ? params.specialties.split(',') : [],
        params.sort || ''
      );
    }
  }, [doctors]);

  // Apply filters when any filter changes
  useEffect(() => {
    applyFilters(searchTerm, consultationType, selectedSpecialties, sortBy);
    
    // Update URL parameters
    updateUrlParams({
      search: searchTerm,
      consultation: consultationType,
      specialties: selectedSpecialties.length ? selectedSpecialties.join(',') : null,
      sort: sortBy
    });
  }, [searchTerm, consultationType, selectedSpecialties, sortBy, doctors]);

  const applyFilters = (search, consultation, specialties, sort) => {
    if (!doctors.length) return;
    
    let result = [...doctors];
    
    // Filter by search term
    if (search) {
      result = result.filter(doctor => 
        doctor.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    // Filter by consultation type
    if (consultation) {
      result = result.filter(doctor => {
        if (consultation === 'video') {
          return doctor.video_consult;
        } else if (consultation === 'clinic') {
          return doctor.in_clinic;
        }
        return true;
      });
    }
    
    // Filter by specialties
    if (specialties.length > 0) {
      result = result.filter(doctor =>
        specialties.some(specialty => 
          doctor.speciality.includes(specialty)
        )
      );
    }
    
    // Sort the results
    if (sort) {
      if (sort === 'fees') {
        result.sort((a, b) => a.fee - b.fee);
      } else if (sort === 'experience') {
        result.sort((a, b) => b.experience - a.experience);
      }
    }
    
    setFilteredDoctors(result);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleConsultationChange = (type) => {
    setConsultationType(type);
  };

  const handleSpecialtiesChange = (specialties) => {
    setSelectedSpecialties(specialties);
  };

  const handleSortChange = (sortOption) => {
    setSortBy(sortOption);
  };

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
  
  if (error) return (
    <div className="flex justify-center items-center h-screen text-red-500">
      <div className="text-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-xl">{error}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with image */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-6 md:mb-0">
              <h1 className="text-3xl font-bold mb-2">Find Your Doctor</h1>
              <p className="text-blue-100">Connect with top specialists for your healthcare needs</p>
            </div>
            <div className="md:w-1/2 flex justify-center md:justify-end">
              <div className="relative w-64 h-48">
                <svg width="100%" height="100%" viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
                  <rect x="40" y="20" width="120" height="130" rx="10" fill="#ffffff" />
                  <circle cx="100" cy="60" r="25" fill="#60a5fa" />
                  <rect x="60" y="95" width="80" height="10" rx="3" fill="#93c5fd" />
                  <rect x="60" y="115" width="80" height="10" rx="3" fill="#93c5fd" />
                  <rect x="75" y="135" width="50" height="10" rx="3" fill="#2563eb" />
                  <path d="M95,40 Q100,35 105,40 T115,40" stroke="#ffffff" strokeWidth="2" fill="none" />
                  <circle cx="90" cy="55" r="5" fill="#ffffff" />
                  <circle cx="110" cy="55" r="5" fill="#ffffff" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <AutocompleteSearch 
            doctors={doctors} 
            onSearch={handleSearch} 
            searchTerm={searchTerm}
          />
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/4">
            <FilterPanel
              doctors={doctors}
              consultationType={consultationType}
              selectedSpecialties={selectedSpecialties}
              sortBy={sortBy}
              onConsultationChange={handleConsultationChange}
              onSpecialtiesChange={handleSpecialtiesChange}
              onSortChange={handleSortChange}
            />
          </div>
          
          <div className="md:w-3/4">
            <div className="bg-white rounded-lg shadow p-4 mb-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Available Doctors</h2>
                <div className="text-sm text-gray-600">
                  Showing {filteredDoctors.length} of {doctors.length} doctors
                </div>
              </div>
            </div>
            
            <DoctorList doctors={filteredDoctors} />
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-gray-300">© 2025 Doctor Finder. All rights reserved.</p>
            </div>
            <div className="flex space-x-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400 hover:text-white cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400 hover:text-white cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;