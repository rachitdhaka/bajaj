import { useState } from 'react';

const DoctorCard = ({ doctor }) => {
  // Generate a consistent color based on doctor name
  const generateColorFromName = (name) => {
    const colorOptions = [
      'bg-blue-500', 'bg-green-500', 'bg-purple-500', 
      'bg-pink-500', 'bg-yellow-500', 'bg-indigo-500'
    ];
    
    // Simple hash function to get consistent index
    const nameHash = name.split('').reduce((acc, char) => {
      return acc + char.charCodeAt(0);
    }, 0);
    
    return colorOptions[nameHash % colorOptions.length];
  };

  // Format specialties safely, handling cases where it might be undefined or not an array
  const formatSpecialties = () => {
    if (!doctor.speciality) {
      return "No specialties listed";
    }
    
    if (Array.isArray(doctor.speciality)) {
      return doctor.speciality.join(', ');
    }
    
    // Handle case where speciality might be a string
    if (typeof doctor.speciality === 'string') {
      return doctor.speciality;
    }
    
    return "No specialties listed";
  };

  const handleBookAppointment = () => {
    alert(`Appointment request submitted for Dr. ${doctor.name}. You will receive a confirmation shortly.`);
  };

  // Get initials from doctor's name
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  const avatarBgColor = generateColorFromName(doctor.name);
  
  const [imageError, setImageError] = useState(false);

  return (
    <div data-testid="doctor-card" className="bg-white rounded-lg shadow p-4 flex flex-col md:flex-row">
      <div className="md:w-1/4 mb-4 md:mb-0 flex items-center justify-center">
        {imageError ? (
          // Fallback to colored avatar with initials if image fails
          <div className={`w-24 h-24 rounded-full ${avatarBgColor} flex items-center justify-center text-white font-bold text-xl`}>
            {getInitials(doctor.name)}
          </div>
        ) : (
          // Use placeholders with consistent but varied images based on doctor ID
          <img 
            src={`/api/placeholder/${200 + (doctor.id % 10) * 20}/${200 + (doctor.id % 8) * 20}`}
            alt={`Dr. ${doctor.name}`}
            className="w-24 h-24 rounded-full object-cover"
            onError={() => setImageError(true)}
          />
        )}
      </div>
      
      <div className="md:w-3/4">
        <h3 data-testid="doctor-name" className="text-lg font-semibold">{doctor.name}</h3>
        
        <div data-testid="doctor-specialty" className="mt-1 text-gray-600">
          {formatSpecialties()}
        </div>
        
        <div className="mt-2 flex flex-wrap gap-2">
          <div data-testid="doctor-experience" className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-sm">
            {doctor.experience} years experience
          </div>
          
          <div data-testid="doctor-fee" className="bg-green-50 text-green-700 px-2 py-1 rounded-md text-sm">
            ₹{doctor.fee} Consultation Fee
          </div>
          
          {doctor.video_consult && (
            <div className="bg-purple-50 text-purple-700 px-2 py-1 rounded-md text-sm flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Video Consult
            </div>
          )}
          
          {doctor.in_clinic && (
            <div className="bg-orange-50 text-orange-700 px-2 py-1 rounded-md text-sm flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              In Clinic
            </div>
          )}
        </div>
        
        <div className="mt-4">
          <button 
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
            onClick={handleBookAppointment}
          >
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;