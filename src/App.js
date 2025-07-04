import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import Login from './Component/Header/Login/Login';
import Admin from './Admin';
import Patient from './Component/Header/MAnage Patient/Patient';
import ManageDoctors from './Component/Header/Manage doctors/ManageDoctors';
import Staff from './Component/Header/ManageStaff/Staff';
import ManageAppointment from './Component/Manage Appointment/ManageAppointment';
import ManageLabs from './Component/ManageLabs/ManageLabs';
import Protected from './Component/Protected';
import Addappointment from './Component/Manage Appointment/Appointment/Addappointment';
import Addpatient from './Component/Header/MAnage Patient/Addpatient';
import Billing from './Component/Billing/Billing';
import Pharmacy from './Component/Pharmacy/Pharmacy';
import Insurance from './Component/Insuranse/Insurance';
import Medical from './Component/Medical/Medical';
import Changepassword from './Component/Profile/Changepassword';
import Register from './Component/Header/Login/Register';
import Appointment2 from './Component/Appointment2/Appointment2';
import DoctorBooking from './Component/Header/ManageStaff/DoctorBooking';
import Myprofile from './Setting/Myprofile';
import DoctorDashboard from './Component/Header/ManageStaff/DoctorDashboard';
import Reports from './Component/Reports/Reports';
import Homepage from './Pages/Homepage';
import BarCharTwo from './Pages/BarChartTwo';
import Service from './Component/service/Service';
import EditPatient from './Component/Header/MAnage Patient/EditPatient';
function App() {
  // console.log("hellow admin")
  return (
    <div className="App">
      <BrowserRouter basename='/medicalSystem'>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Homepage" element={<Homepage />} />
          <Route
            path="/Admin"
            element={<Protected Component={Admin} />}>
            <Route path="/Admin/dashboard" element={<Dashboard />} />
            <Route path="/Admin/barchartTwo" element={<BarCharTwo />} />

            <Route path="/Admin/Patient" element={<Patient />} />
            <Route path="/Admin/Service" element={<Service />} />
            <Route path="/Admin/addPatient" element={<Addpatient />} />
            <Route path="/Admin/EditPatient" element={<EditPatient />} />
            <Route path="/Admin/Changepassword" element={<Changepassword />} />
              <Route  path='/Admin/appointment2' element={<Appointment2 />}  />
            {/* doctor routes */}
            <Route path="/Admin/ManageDoctors" element={<ManageDoctors />} />
            <Route path="/Admin/ManageStaff" element={<Staff />} />
            <Route path="/Admin/Manageappointment" element={<ManageAppointment />} />
            <Route path="/Admin/ManageLabs" element={<ManageLabs />} />
            <Route path="/Admin/Addappointment" element={<Addappointment />} />
            <Route path="/Admin/Billing" element={<Billing />} />
            <Route path="/Admin/Pharmacy" element={<Pharmacy />} />
            <Route path="/Admin/Insurance" element={<Insurance />} />
            <Route path="/Admin/Medicals" element={<Medical />} />
            <Route path="/Admin/DoctorBooking" element={<DoctorBooking />} />
            <Route path="/Admin/myprofile" element={<Myprofile />} />
            <Route path="/Admin/DoctorDashboard" element={<DoctorDashboard />} />
            <Route path="/Admin/ReportsInc" element={<Reports />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
