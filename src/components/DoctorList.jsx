import DoctorCard from './DoctorCard';

const DoctorList = ({ doctors }) => {
  if (doctors.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-center">
        <p>No doctors match your search criteria. Please try different filters.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {doctors.map(doctor => (
        <DoctorCard key={doctor.id} doctor={doctor} />
      ))}
    </div>
  );
};

export default DoctorList;