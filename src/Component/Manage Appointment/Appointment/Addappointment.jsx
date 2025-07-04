// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { baseurl } from '../../../Baseurl';
// const Addappointment = () => {
//   const [formData, setFormData] = useState({
//     patientId: '',
//     doctorId: '',
//     appointmentDate: '',
//     start_time: '',
//     end_time: '',
//     reason: '',
//     status: 'Scheduled'
//   });
//   const [errors, setErrors] = useState({});
//   const [patient, setPatient] = useState([]);
//   const [success, setSuccess] = useState('');
//   const statusOptions = ['Scheduled', 'Completed', 'Cancelled', 'Waiting'];

//   const validate = () => {
//     const newErrors = {};
//     if (!formData.patientId) newErrors.patientId = 'Patient ID is required';
//     if (!formData.doctorId) newErrors.doctorId = 'Doctor ID is required';
//     if (!formData.appointmentDate) newErrors.appointmentDate = 'Date is required';
//     if (!formData.start_time) newErrors.start_time = 'Start time is required';
//     if (!formData.end_time) newErrors.end_time = 'End time is required';
//     if (!formData.reason.trim()) newErrors.reason = 'Reason is required';
//     return newErrors;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formErrors = validate();
//     if (Object.keys(formErrors).length > 0) {
//       setErrors(formErrors);
//       return;
//     }
//     try {
//       const res = await axios.post(`${baseurl}createAppointment`, formData);
//       console.log(res.data);
//       setSuccess('Appointment added successfully!');
//       setFormData({
//         patientId: '',
//         doctorId: '',
//         appointmentDate: '',
//         start_time: '',
//         end_time: '',
//         reason: '',
//         // status: 'Scheduled'
//       });
//       setErrors({});
//     } catch (error) {
//       console.error(error);
//       setSuccess('');
//     }
//   };


//     useEffect(() => {
//       getdata();
//     }, []);
//     const getdata = async () => {
//       try {
//         const response = await axios.get(`${baseurl}getAllPatients`);
//         if (response.data.success === true) {
//           console.log(response)
//           setPatient(response.data.data); // or response.data.patients if nested
//         } else {
//           console.error("Failed to fetch patient data:", response.data.message);
//         }
//       } catch (error) {
//         console.error("Error fetching patient data:", error.message);
//       }
//     };

//   return (
//      <div className="pc-container">
//          <div className="pc-content">
//            {/* [ breadcrumb ] start */}
//            <div className="page-header"></div>
//     <div className="container mt-5">
//       <h3 className="mb-4">Add Appointment</h3>
//       {success && <div className="alert alert-success">{success}</div>}
//       <form onSubmit={handleSubmit} noValidate>
//         <div className="mb-3">
//           <label>Patient ID</label><br />

//           {/* <input
//             type="number"
//             className={`form-control ${errors.patientId ? 'is-invalid' : ''}`}
//             name="patientId"
//             value={formData.patientId}
//             onChange={handleChange}
//           /> */}
//           <select className='w-100 form-select'>
//             <option >select</option>
//             {
         
//               patient.map((item, i) => (
//                 <option key={i} value={item.id} onChange={handleChange}>
//                   {item.firstName	}{' '} {item.lastName}
//                   </option>
//               ))
             

//             }
//           </select>
//           <div className="invalid-feedback">{errors.patientId}</div>
//         </div>

//         <div className="mb-3">
//           <label>Doctor ID</label>
//           <input
//             type="number"
//             className={`form-control ${errors.doctorId ? 'is-invalid' : ''}`}
//             name="doctorId"
//             value={formData.doctorId}
//             onChange={handleChange}
//           />
//           <div className="invalid-feedback">{errors.doctorId}</div>
//         </div>

//         <div className="mb-3">
//           <label>Appointment Date</label>
//           <input
//             type="date"
//             className={`form-control ${errors.appointmentDate ? 'is-invalid' : ''}`}
//             name="appointmentDate"
//             value={formData.appointmentDate}
//             onChange={handleChange}
//           />
//           <div className="invalid-feedback">{errors.appointmentDate}</div>
//         </div>

//         <div className="mb-3">
//           <label>Start Time</label>
//           <input
//             type="time"
//             className={`form-control ${errors.start_time ? 'is-invalid' : ''}`}
//             name="start_time"
//             value={formData.start_time}
//             onChange={handleChange}
//           />
//           <div className="invalid-feedback">{errors.start_time}</div>
//         </div>

//         <div className="mb-3">
//           <label>End Time</label>
//           <input
//             type="time"
//             className={`form-control ${errors.end_time ? 'is-invalid' : ''}`}
//             name="end_time"
//             value={formData.end_time}
//             onChange={handleChange}
//           />
//           <div className="invalid-feedback">{errors.end_time}</div>
//         </div>

//         <div className="mb-3">
//           <label>Reason</label>
//           <input
//             type="text"
//             className={`form-control ${errors.reason ? 'is-invalid' : ''}`}
//             name="reason"
//             value={formData.reason}
//             onChange={handleChange}
//           />
//           <div className="invalid-feedback">{errors.reason}</div>
//         </div>

//         <div className="mb-3">
//           <label>Status</label>
//           <select
//             className="form-select"
//             name="status"
//             value={formData.status}
//             onChange={handleChange}
//           >
//             {statusOptions.map((status, i) => (
//               <option key={i} value={status}>
//                 {status}
//               </option>
//             ))}
//           </select>
//         </div>

//         <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Add Appointment</button>
//       </form>
//     </div>
//     </div>
//     </div>
//   );
// };

// export default Addappointment;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseurl } from '../../../Baseurl';
import { toast, ToastContainer } from 'react-toastify';
import { Navigate, useNavigate } from 'react-router-dom';

const AddAppointment = () => {
  const [formData, setFormData] = useState({
    patientId: '',
    doctorId: '',
    appointmentDate: '',
    start_time: '',
    end_time: '',
    reason: '',
    status: 'Scheduled'
  });

  const [errors, setErrors] = useState({});
  const [patientList, setPatientList] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [success, setSuccess] = useState('');
  const navigate = useNavigate()
  const statusOptions = ['Scheduled', 'Completed', 'Cancelled', 'Waiting'];

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await axios.get(`${baseurl}getAllPatients`);
      if (response.data.success) {
        setPatientList(response.data.data);
      } else {
        console.error('Failed to fetch patients:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching patient data:', error);
    }
  };
  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get(`${baseurl}getActiveDoctors`);
      if (response.data.success) {
        console.log(response.data)
        setDoctors(response.data.data);
      } else {
        console.error('Failed to fetch patients:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching patient data:', error);
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.patientId) newErrors.patientId = 'Patient is required';
    if (!formData.doctorId) newErrors.doctorId = 'Doctor ID is required';
    if (!formData.appointmentDate) newErrors.appointmentDate = 'Date is required';
    if (!formData.start_time) newErrors.start_time = 'Start time is required';
    if (!formData.end_time) newErrors.end_time = 'End time is required';
    if (!formData.reason.trim()) newErrors.reason = 'Reason is required';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();
    // const formErrors = validate();
    // if (Object.keys(formErrors).length > 0) {
    //   setErrors(formErrors);
    //   return;
    // }

    try {
      const response = await axios.post(`${baseurl}createAppointment`, formData);
      if (response.data.success) {
        toast.success(response.data.message)
        setTimeout(()=>{

          navigate('/Admin/appointment2')
        },[1500])
        setSuccess('Appointment added successfully!');
        setFormData({
          patientId: '',
          doctorId: '',
          appointmentDate: '',
          start_time: '',
          end_time: '',
          reason: '',
          status: 'Scheduled'
        });
        setErrors({});
      }
    } catch (error) {
      console.error('Error creating appointment:', error);
      setSuccess('');
    }
  };

  return (
       <div className="pc-container">
        <div className="pc-content">
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h3 className="mb-4">Add Appointment</h3>
          <div className="mb-3">
            <label className="form-label">Patient</label>
            <select
              className={`form-select ${errors.patientId ? 'is-invalid' : ''}`}
              name="patientId"
              value={formData.patientId}
              onChange={handleChange}
            >
              <option value="">Select Patient</option>
              {patientList.map((patient) => (
                <option key={patient.id} value={patient.id}>
                  {patient.firstName} {patient.lastName}
                </option>
              ))}
            </select>
            <div className="invalid-feedback">{errors.patientId}</div>
          </div>
          <div className="mb-3">
            <label className="form-label">Doctor ID</label>
             <div className="mb-3">
            <select
              className={`form-select ${errors.doctorId ? 'is-invalid' : ''}`}
              name="doctorId"
              value={formData.doctorId}
              onChange={handleChange}
            >
              <option value="">Select Doctor</option>
              {doctors.map((patient) => (
                <option key={patient.id} value={patient.id}>
                  {patient.fullName	} 
                </option>
              ))}
            </select>
            <div className="invalid-feedback">{errors.doctorId}</div>
          </div>
            {/* <input
              type="number"
              className={`form-control ${errors.doctorId ? 'is-invalid' : ''}`}
              name="doctorId"
              value={formData.doctorId}
              onChange={handleChange}
            /> */}
            <div className="invalid-feedback">{errors.doctorId}</div>
          </div>

          <div className="mb-3">
            <label className="form-label">Appointment Date</label>
            <input
              type="date"
              className={`form-control ${errors.appointmentDate ? 'is-invalid' : ''}`}
              name="appointmentDate"
              value={formData.appointmentDate}
              onChange={handleChange}
            />
            <div className="invalid-feedback">{errors.appointmentDate}</div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Start Time</label>
              <input
                type="time"
                className={`form-control ${errors.start_time ? 'is-invalid' : ''}`}
                name="start_time"
                value={formData.start_time}
                onChange={handleChange}
              />
              <div className="invalid-feedback">{errors.start_time}</div>
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">End Time</label>
              <input
                type="time"
                className={`form-control ${errors.end_time ? 'is-invalid' : ''}`}
                name="end_time"
                value={formData.end_time}
                onChange={handleChange}
              />
              <div className="invalid-feedback">{errors.end_time}</div>
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Reason</label>
            <input
              type="text"
              className={`form-control ${errors.reason ? 'is-invalid' : ''}`}
              name="reason"
              value={formData.reason}
              onChange={handleChange}
            />
            <div className="invalid-feedback">{errors.reason}</div>
          </div>

          {/* <div className="mb-3">
            <label className="form-label">Status</label>
            <select
              className="form-select"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              {statusOptions.map((status, i) => (
                <option key={i} value={status}>{status}</option>
              ))}
            </select>
          </div> */}

          <div className="text-end">
            <button  className="btn btn-primary" onClick={handleSubmit}>Add Appointment</button>
          </div>
  
      </div>
    </div>
    </div>
    <ToastContainer />
    </div>
  );
};

export default AddAppointment;