import ConsultationFilter from './ConsultationFilter';
import SpecialtiesFilter from './SpecialtiesFilter';
import SortFilter from './SortFilter';

const FilterPanel = ({ 
  consultationType, 
  selectedSpecialties, 
  sortBy,
  onConsultationChange, 
  onSpecialtiesChange, 
  onSortChange 
}) => {
  // Create a static list of specialties with their correct names
  const staticSpecialties = [
    "Dentist",
    "General Physician",
    "Dermatologist",
    "Paediatrician",
    "Gynaecologist",
    "ENT",
    "Diabetologist",
    "Cardiologist",
    "Physiotherapist",
    "Endocrinologist",
    "Orthopaedic",
    "Ophthalmologist",
    "Gastroenterologist",
    "Pulmonologist",
    "Psychiatrist",
    "Urologist",
    "Dietitian/Nutritionist",
    "Psychologist",
    "Sexologist",
    "Nephrologist",
    "Neurologist",
    "Oncologist",
    "Ayurveda",
    "Homeopath"
  ];

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>
      
      <ConsultationFilter 
        consultationType={consultationType}
        onChange={onConsultationChange}
      />
      
      <div className="border-t my-4"></div>
      
      <SpecialtiesFilter 
        specialties={staticSpecialties}
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