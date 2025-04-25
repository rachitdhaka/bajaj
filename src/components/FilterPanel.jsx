import ConsultationFilter from './ConsultationFilter';
import SpecialtiesFilter from './SpecialtiesFilter';
import SortFilter from './SortFilter';

const FilterPanel = ({ 
  doctors, 
  consultationType, 
  selectedSpecialties, 
  sortBy,
  onConsultationChange, 
  onSpecialtiesChange, 
  onSortChange 
}) => {
  // Extract unique specialties from all doctors
  const getAllSpecialties = () => {
    const specialtySet = new Set();
    
    // Error handling: Make sure doctors array exists and each doctor has a speciality property
    if (doctors && doctors.length > 0) {
      doctors.forEach(doctor => {
        // Check if speciality exists and is an array before calling forEach
        if (doctor.speciality && Array.isArray(doctor.speciality)) {
          doctor.speciality.forEach(spec => specialtySet.add(spec));
        } else if (doctor.speciality && typeof doctor.speciality === 'string') {
          // Handle case where speciality might be a string instead of array
          specialtySet.add(doctor.speciality);
        }
      });
    }
    
    return Array.from(specialtySet).sort();
  };

  const specialties = getAllSpecialties();

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>
      
      <ConsultationFilter 
        consultationType={consultationType}
        onChange={onConsultationChange}
      />
      
      <div className="border-t my-4"></div>
      
      <SpecialtiesFilter 
        specialties={specialties}
        selectedSpecialties={selectedSpecialties}
        onChange={onSpecialtiesChange}
      />
      
      <div className="border-t my-4"></div>
      
      <SortFilter 
        sortBy={sortBy}
        onChange={onSortChange}
      />
    </div>
  );
};

export default FilterPanel;