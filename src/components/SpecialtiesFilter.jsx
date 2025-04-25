import React from 'react'

const SpecialtiesFilter = ({ specialties, selectedSpecialties, onChange }) => {
    const handleChange = (specialty) => {
      if (selectedSpecialties.includes(specialty)) {
        onChange(selectedSpecialties.filter(s => s !== specialty));
      } else {
        onChange([...selectedSpecialties, specialty]);
      }
    };
  
    const handleClearAll = () => {
      onChange([]);
    };
  
    // Convert specialty string to the format needed for data-testid
    const formatSpecialtyForTestId = (specialty) => {
      return specialty.replace(/\//g, '-');
    };
  
    return (
      <div>
        <div className="flex justify-between items-center mb-2">
          <h3 data-testid="filter-header-speciality" className="font-semibold">Speciality</h3>
          {selectedSpecialties.length > 0 && (
            <button 
              className="text-sm text-blue-500 hover:underline"
              onClick={handleClearAll}
            >
              Clear All
            </button>
          )}
        </div>
        
        <div className="max-h-64 overflow-y-auto space-y-2">
          {specialties.map((specialty) => (
            <label key={specialty} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                data-testid={`filter-specialty-${formatSpecialtyForTestId(specialty)}`}
                className="form-checkbox h-4 w-4 text-blue-600"
                checked={selectedSpecialties.includes(specialty)}
                onChange={() => handleChange(specialty)}
              />
              <span className="ml-2 text-sm">{specialty}</span>
            </label>
          ))}
        </div>
      </div>
    );
  };
  
  export default SpecialtiesFilter;