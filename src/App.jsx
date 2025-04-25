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

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Find Doctors</h1>
      
      <AutocompleteSearch 
        doctors={doctors} 
        onSearch={handleSearch} 
        searchTerm={searchTerm}
      />
      
      <div className="flex flex-col md:flex-row gap-6 mt-8">
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
          <DoctorList doctors={filteredDoctors} />
        </div>
      </div>
    </div>
  );
}

export default App;