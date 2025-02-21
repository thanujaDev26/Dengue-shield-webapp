import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';



const Notebook = () => {
  const location = useLocation();
    const navigate = useNavigate();
  
  // Retrieving the data passed via location.state
  const { patientId, patientName, patientAddress, gender, age } = location.state || {};
  
  const [formData, setFormData] = useState({
    date: '',
    day: '',
    time: '',
    timePeriod: 'AM',
    dutyPlace: '',
    outgoingTime: '',
    outgoingTimePeriod: 'AM',
    ingoingTime: '',
    ingoingTimePeriod: 'AM',
    fieldOutTime: '',
    fieldInTime: '',
    distance: '',
    vehicleOption: 'Public Transport',
    religion: '',
    race: '',
    job: '',
  });

  // Pre-filling the form data with location.state if available
  useEffect(() => {
    if (location.state) {
      setFormData((prevData) => ({
        ...prevData,
        date: location.state.date || '',
        day: location.state.day || '',
        time: location.state.time || '',
        timePeriod: location.state.timePeriod || 'AM',
        dutyPlace: location.state.dutyPlace || '',
        outgoingTime: location.state.outgoingTime || '',
        outgoingTimePeriod: location.state.outgoingTimePeriod || 'AM',
        ingoingTime: location.state.ingoingTime || '',
        ingoingTimePeriod: location.state.ingoingTimePeriod || 'AM',
        fieldOutTime: location.state.fieldOutTime || '',
        fieldInTime: location.state.fieldInTime || '',
        distance: location.state.distance || '',
        vehicleOption: location.state.vehicleOption || 'Public Transport',
        religion: location.state.religion || '',
        race: location.state.race || '',
        job: location.state.job || '',
      }));
    }
  }, [location.state]);

  // Handle form field changes (but since it's read-only, we may not need this)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('YOUR_BACKEND_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          patientId,
          patientName,
          patientAddress,
          gender,
          age,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Form Submitted:', result);
      alert('Data submitted successfully!');
    } catch (error) {
      console.error('Error submitting data:', error);
      alert('Error submitting data. Please try again later.');
    }
  };
  const handleContinue = () => {
    navigate('/outwardform', { state: { patientId } }); // Navigate to Notebook with patientId
  };

  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div className='justify-items-center'>
    <div className="w-2/3 items-center p-6 bg-white rounded-lg shadow-md mt-6 mb-10">
      <h2 className="text-2xl text-center font-bold mb-20">
        Notebook for Patient {patientId}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-10 mr-10">
        <div>
          <label htmlFor="patientId" className="block text-sm font-medium text-gray-700">
            Patient ID
          </label>
          <input
            type="text"
            id="patientId"
            value={patientId || ''}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            disabled
          />
        </div>

        <div>
          <label htmlFor="patientId" className="block text-sm font-medium text-gray-700">
            H544 ID
          </label>
          <input
            type="text"
            id="h544no"
            value=""
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            disabled
          />
        </div>

        <div>
          <label htmlFor="patientName" className="block text-sm font-medium text-gray-700">
            Patient Name
          </label>
          <input
            type="text"
            id="patientName"
            value={patientName || ''}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            disabled
          />
        </div>

        <div>
          <label htmlFor="patientAddress" className="block text-sm font-medium text-gray-700">
            Patient Address
          </label>
          <input
            type="text"
            id="patientAddress"
            value={patientAddress || ''}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            disabled
          />
        </div>

        <div>
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
            Gender
          </label>
          <input
            type="text"
            id="gender"
            value={gender || ''}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            disabled
          />
        </div>

        <div>
          <label htmlFor="age" className="block text-sm font-medium text-gray-700">
            Age
          </label>
          <input
            type="text"
            id="age"
            value={age || ''}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            disabled
          />
        </div>

        {/* <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
        </div> */}

        {/* <div>
          <label htmlFor="day" className="block text-sm font-medium text-gray-700">
            Day
          </label>
          <input
            type="text"
            id="day"
            name="day"
            value={formData.day}
            onChange={handleChange}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
        </div> */}

        <div>
          <label htmlFor="dutyPlace" className="block text-sm font-medium text-gray-700">
            Duty Place
          </label>
          <input
            type="text"
            id="dutyPlace"
            placeholder='Matara'
            name="dutyPlace"
            value={formData.dutyPlace}
            onChange={handleChange}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            disabled
          />
        </div>

        {/* <div>
          <label htmlFor="outgoingTime" className="block text-sm font-medium text-gray-700">
            Outgoing Time
          </label>
          <input
            type="time"
            id="outgoingTime"
            name="outgoingTime"
            value={formData.outgoingTime}
            onChange={handleChange}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
        </div>         */}

        {/* <div>
          <label htmlFor="fieldInTime" className="block text-sm font-medium text-gray-700">
            Field In Time
          </label>
          <input
            type="time"
            id="fieldInTime"
            name="fieldInTime"
            value={formData.fieldInTime}
            onChange={handleChange}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label htmlFor="fieldOutTime" className="block text-sm font-medium text-gray-700">
            Field Out Time
          </label>
          <input
            type="time"
            id="fieldOutTime"
            name="fieldOutTime"
            value={formData.fieldOutTime}
            onChange={handleChange}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
        </div> */}

        {/* <div>
          <label htmlFor="ingoingTime" className="block text-sm font-medium text-gray-700">
            Ingoing Time
          </label>
          <input
            type="time"
            id="ingoingTime"
            name="ingoingTime"
            value={formData.ingoingTime}
            onChange={handleChange}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
        </div> */}

        

        <div>
          <label htmlFor="distance" className="block text-sm font-medium text-gray-700">
            Distance(km)
          </label>
          <input
            type="number"
            id="distance"
            name="distance"
            placeholder='Distance from PHI Office to Pations House'
            value={formData.distance}
            onChange={handleChange}
            className="w-full p-2 mb-4 border border-gray-300 rounded"        
          />
        </div>

        <div>
          <label htmlFor="occupation" className="block text-sm font-medium text-gray-700">
            Occupation
          </label>
          <select            
            id="occupation"
            name="occupation"
            value={formData.occupation}
            onChange={handleChange}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          >
            <option value="" disabled selected>Select the Occupation</option>
            <option value="Farmer">Farmer</option>
            <option value="Teacher">Teacher</option>
            <option value="Doctor">Doctor</option>
            <option value="Engineer">Engineer</option>
            <option value="Lawyer">Lawyer</option>
            <option value="Nurse">Nurse</option>
            <option value="Software Developer">Software Developer</option>
            <option value="Accountant">Accountant</option>
            <option value="Construction Worker">Construction Worker</option>
            <option value="Fisherman">Fisherman</option>
            <option value="Police Officer">Police Officer</option>
            <option value="Soldier">Soldier</option>
            <option value="Driver">Driver</option>
            <option value="Chef">Chef</option>
            <option value="Electrician">Electrician</option>
            <option value="Mechanic">Mechanic</option>
            <option value="Banker">Banker</option>
            <option value="Carpenter">Carpenter</option>
            <option value="Shopkeeper">Shopkeeper</option>
            <option value="Artist">Artist</option>
            <option value="Journalist">Journalist</option>
            <option value="Fashion Designer">Fashion Designer</option>
            <option value="Athlete">Athlete</option>
            <option value="Scientist">Scientist</option>
            <option value="Entrepreneur">Entrepreneur</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="distance" className="block text-sm font-medium text-gray-700">
            Race
          </label>
          <select            
            id="race"
            name="race"
            placeholder='Any Notes(If Any)'
            value={formData.race}
            onChange={handleChange}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          >
            <option value="" disabled selected>Select the Race</option>
            <option value="Sinhalese">Sinhalese</option>
            <option value="Sri Lankan Tamils">Sri Lankan Tamils</option>
            <option value="Indian Tamils">Indian Tamils</option>
            <option value="Sri Lankan Moors">Sri Lankan Moors</option>
            <option value="Burghers">Burghers</option>
            <option value="Malays">Malays</option>
            <option value="Vedda">Vedda</option>
          </select>
        </div>

        <div>
          <label htmlFor="religion" className="block text-sm font-medium text-gray-700">
            Religion
          </label>
          <select            
            id="religion"
            name="religion"
            value={formData.religion}
            onChange={handleChange}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          >
            <option value="" disabled selected>Select Your Religion</option>
            <option value="Buddhism">Buddhism</option>
            <option value="Hinduism">Hinduism</option>
            <option value="Islam">Islam</option>
            <option value="Christianity">Christianity</option>
            <option value="Roman Catholicism">Roman Catholicism</option>
            <option value="Other">Other</option>
          </select>
        </div> 

        <div>
          <label htmlFor="houseCondition" className="block text-sm font-medium text-gray-700">
            Nature of Condition
          </label>
          <select            
            id="houseCondition"
            name="houseCondition"
            value={formData.houseCondition}
            onChange={handleChange}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          >
            <option value="" disabled selected>Select the House Condition</option>
            <option value="Well-maintained">Well-maintained</option>
            <option value="Moderate">Moderate</option>
            <option value="Poorly Maintained">Poorly Maintained</option>
            <option value="Temporary Shelter">Temporary Shelter</option>
            <option value="Overcrowded">Overcrowded</option>
            <option value="Unsanitary">Unsanitary</option>
            <option value="Flood-prone Area">Flood-prone Area</option>
            <option value="Mosquito Breeding Risk">Mosquito Breeding Risk</option>
          </select>
        </div>

        <div>
          <label htmlFor="isolation" className="block text-sm font-medium text-gray-700">
            Isolation
          </label>
          <select            
            id="isolation"
            name="isolation"
            value={formData.isolation}
            onChange={handleChange}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          >
            <option value="" disabled selected>Select Isolation Type</option>
            <option value="Home">Home</option>
            <option value="Hospital">Hospital</option>
          </select>
        </div>       

        <div>
          <label htmlFor="termination" className="block text-sm font-medium text-gray-700">
            Date of Termination
          </label>
          <select            
            id="termination"
            name="termination"
            value={formData.termination}
            onChange={handleChange}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          >
            <option value="" disabled selected>Select Termination Type</option>
            <option value="Death">Death</option>
            <option value="Recovery">Recovery</option>
          </select>
        </div>

        <div>
          <label htmlFor="distance" className="block text-sm font-medium text-gray-700">
            Remarks
          </label>
          <textarea            
            id="remarks"
            name="remarks"
            placeholder='Any Notes(If Any)'
            value={formData.remarks}
            onChange={handleChange}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
        </div>       

       
      </div>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 ml-10 mr-10'>
          <button
            onClick={handleBack}
            className="bg-green-500 text-white mt-5 px-4 py-2 rounded-lg hover:bg-green-600"
          >
            Back
          </button>
          <button
            onClick={handleSubmit}
            className="bg-green-500 text-white mt-5 px-4 py-2 rounded-lg hover:bg-green-600"
          >
            Submit 
          </button>
          <button
            onClick={handleContinue}
            className="bg-green-500 text-white mt-5 px-4 py-2 rounded-lg hover:bg-green-600"
          >
            Next
          </button>
        </div>
      </div>
      </div>

  );
};

export default Notebook;
