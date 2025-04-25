import React from 'react'

const ConsultationFilter = ({ consultationType, onChange }) => {
    return (
      <div>
        <h3 data-testid="filter-header-moc" className="font-semibold mb-2">Consultation Mode</h3>
        <div className="space-y-2">
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              data-testid="filter-video-consult"
              className="form-radio h-4 w-4 text-blue-600"
              checked={consultationType === 'video'}
              onChange={() => onChange('video')}
            />
            <span className="ml-2">Video Consult</span>
          </label>
          
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              data-testid="filter-in-clinic"
              className="form-radio h-4 w-4 text-blue-600"
              checked={consultationType === 'clinic'}
              onChange={() => onChange('clinic')}
            />
            <span className="ml-2">In Clinic</span>
          </label>
          
          {consultationType && (
            <button 
              className="text-sm text-blue-500 hover:underline mt-1"
              onClick={() => onChange('')}
            >
              Clear Selection
            </button>
          )}
        </div>
      </div>
    );
  };
  
  export default ConsultationFilter;