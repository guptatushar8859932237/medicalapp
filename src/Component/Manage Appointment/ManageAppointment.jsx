import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Ract3d from "./Ract3d";
import axios from "axios";
import { baseurImage, baseurl } from "../../Baseurl";
import Swal from "sweetalert2";
import perImg from "../../../src/assests/profile.jpg"
export default function ManageAppointment() {
  const tableCell = (value) => <td>{value}</td>;
  const location = useLocation();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [openVital, setOpenVital] = useState(false);
  const [openVital121, setOpenVital121] = useState(false);
  const [diagonisemodal, setDiagonisemodal] = useState(false);
  const [vitaldatas, setVitaldatas] = useState([]);
  const [personalinfo, setPersonalinfo] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [diagnosis, setDiagnosis] = useState([]);
  const [diagnosis11, setDiagnosis11] = useState([]);
  const [patientservice, setpatientservice] = useState([]);
  const [getservice, setGetservice] = useState([]);
  const [patients, setPatients] = useState([]);
  const [inpval, setInpval] = useState("");
  const [dataAppointment, setDataAppointment] = useState([]);

  const handleclick = () => {
    setModalOpen(true);
  };
  const datauser = location.state.patientid.id;
  const handleClose = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    getdata();
  }, []);

  const getdata = async () => {
    try {
      const response = await axios.post(
        `${baseurl}appointmentByPatientId/${location?.state?.patientid.id}`
      );
      if (response.data.success === true) {
        setDataAppointment(response.data.data);
      } else {
        console.log("something went worng");
      }
    } catch (error) {
      console.error(
        "Error while fetching appointment data:",
        error.response?.data || error.message
      );
    }
  };

  const handleclickopenvital = () => {
    setOpenVital(true);
  };
  const handleclickopenvital11 = () => {
    setOpenVital121(true);
  };
  const handlecloseVital = () => {
    setOpenVital(false);
  };
  const hndleclosemodalservice = () => {
    setOpenVital121(false);
  };
  const hndleclosddddd = () => {
    setDiagonisemodal(false);
  };
  const services = [
    {
      sn: "221",
      doctor: "Dr Ali",
      category: "Dental",
      service: "Root Canal Treatment",
      price: "100.000BHD",
      discount: "0",
      total: "0%",
      deductible: "100.000BHD",
      copat: "30 BHD",
      coins: "30 BHD",
      status: "Pending",
    },
    {
      sn: "221",
      doctor: "Dr Ali",
      category: "Dental",
      service: "Root Canal Treatment",
      price: "100.000BHD",
      discount: "0",
      total: "0%",
      deductible: "100.000BHD",
      copat: "30 BHD",
      coins: "30 BHD",
      status: "Approved",
    },
  ];

  const insuranceCards = [
    {
      status: "Active",
      company: "Next Care Will",
      policy: "345683246",
      patient: "John Ward",
      issue: "31-09-25",
      expiry: "31-09-25",
      deductible: "3000",
      copatient: "20%",
      coins: "50%",
    },
    {
      status: "Expired",
      company: "Next Care Will",
      policy: "345683246",
      patient: "John Ward",
      issue: "31-09-25",
      expiry: "31-09-25",
      deductible: "3000",
      copatient: "20%",
      coins: "50%",
    },
  ];
  const invoices = [
    {
      id: "INV221",
      date: "xx/MM/yy",
      services: "P221P224#A22S",
      amount: "230.00BHD",
      vat: "10.00BHD",
      discount: "0",
      insurance: "No",
      status: "Paid",
    },
    {
      id: "INV221",
      date: "xx/MM/yy",
      services: "P221P224#A22S",
      amount: "230.00BHD",
      vat: "10.00BHD",
      discount: "0",
      insurance: "No",
      status: "Paid",
    },
    {
      id: "INV221",
      date: "xx/MM/yy",
      services: "P221P224#A22S",
      amount: "230.00BHD",
      vat: "10.00BHD",
      discount: "0",
      insurance: "No",
      status: "Paid",
    },
  ];

  const paymentPlans = [
    { sn: 1, name: "Ortho", duration: "600.0", paid: "18", remaining: "200" },
  ];

  const paymentInvoices = [
    {
      sn: 32,
      invoiceId: "INV221",
      date: "xx/MM/yy",
      amount: "230.00BHD",
      method: "Cash",
      transaction: "C3467667",
      cashier: "Eikane",
    },
  ];

  const handlechange = (e) => {
    const { name, value } = e.target;
    setInpval({ ...inpval, [name]: value });
  };

  const handlesavevital123 = async () => {
    try {
      const dataPost = {
        patientId: location?.state?.patientid.id,
        doctor_id: inpval.doctor_id,
        serviceId: inpval.service_id,
        amount: inpval.amount,
        insurance: inpval.insurance,
        vat: inpval.vat,
      };
      const response = await axios.post(
        `${baseurl}AddPatientServices`,
        dataPost
      );

      // Optional: check status and show success
      if (response.status === 200 || response.status === 201) {
        hndleclosemodalservice();
        console.log("Service Added successfully:", response.data);
        setOpenVital121(false);
        Swal.fire("Success", "Service Added successfully.", "success");
      } else {
        console.warn("Unexpected response:", response);
        Swal.fire(
          "error",
          "Unexpected server response. Please try again.",
          "error"
        );
      }
    } catch (error) {
      if (error.response) {
        // Backend responded with error
        console.error("Error response:", error.response.data);
      } else if (error.request) {
        console.error("No response received:", error.request);
        alert(
          "No response from server. Please check your internet connection."
        );
      } else {
        console.error("Error setting up request:", error.message);
      }
    }
  };
  const handlesavevital = async () => {
    try {
      if (
        !location?.state?.patientid.id ||
        !inpval.nurse ||
        !inpval.recorded_at
      ) {
        console.warn("Missing required fields");
        alert("Please fill in all required fields.");
        return;
      }
      const dataPost = {
        patient_id: parseInt(location?.state?.patientid.id),
        nurse: inpval.nurse,
        recorded_at: inpval.recorded_at,
        blood_pressure_systolic: inpval.blood_pressure_systolic,
        blood_pressure_diastolic: inpval.blood_pressure_diastolic,
        heart_rate: inpval.heart_rate,
        respiratory_rate: inpval.respiratory_rate,
        temperature: inpval.temperature,
        weight: inpval.weight,
        height: inpval.height,
        bmi: inpval.bmi,
        oxygen_saturation: inpval.oxygen_saturation,
        notes: inpval.notes,
      };

      const response = await axios.post(
        `${baseurl}recordPatientVitals`,
        dataPost
      );

      // Optional: check status and show success
      if (response.status === 200 || response.status === 201) {
        handlecloseVital();
        console.log("Vitals recorded successfully:", response.data);
        Swal.fire("success", "Vitals add Successfully", "success");
      } else {
        console.warn("Unexpected response:", response);
      }
    } catch (error) {
      if (error.response) {
        // Backend responded with error
        console.error("Error response:", error.response.data);
      } else if (error.request) {
        // Request was made but no response received
        console.error("No response received:", error.request);
      } else {
        // Other errors
        console.error("Error setting up request:", error.message);
      }
    }
  };

  const handlemodaldiagonise = () => {
    setDiagonisemodal(true);
  };

  useEffect(() => {
    getDataa();
  }, []);

  const getDataa = async () => {
    try {
      const response = await axios.get(
        `${baseurl}getPatientVitalsByPatientId/${location?.state?.patientid.id}`
      );

      if (response.data?.success === true) {
        console.log("Vitals fetched successfully:", response.data);
        setVitaldatas(response.data.vitals);
      } else {
        console.warn("Vitals not found or invalid status:", response.data);
      }
    } catch (error) {
      if (error.response) {
        console.error("API error:", error.response.data);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error in request setup:", error.message);
      }
    }
  };

  // get doctor
  useEffect(() => {
    getDoctors();
  }, []);
  const getDoctors = async () => {
    try {
      const response = await axios.get(`${baseurl}getActiveDoctors`);
      if (response.data.success === true) {
        setDoctors(response.data.data);
        // You can set the doctors data to state if needed
      } else {
        console.log("something went worng");
      }
    } catch (error) {
      console.log(error.response.data.data);
    }
  };
  useEffect(() => {
    getDiagnosis();
  }, []);
  const getDiagnosis = async () => {
    try {
      const response = await axios.get(`${baseurl}getDiagnosisList`);
      if (response.data.success === true) {
        setDiagnosis(response.data.data);
        console.log(response.data.data);
        // You can set the doctors data to state if needed
      } else {
        console.log("something went worng");
      }
    } catch (error) {
      console.log(error.response.data.data);
    }
  };

  const handlesavediagonise = async () => {
    try {
      if (!inpval.icd10_id || !inpval.notes || !inpval.doctor_id) {
        Swal.fire("Error", "Please fill in all fields.", "error");
        return;
      }

      const dataPost = {
        patient_id: parseInt(location?.state?.patientid.id),
        icd10_id: inpval.icd10_id,
        doctor_id: inpval.doctor_id,
        notes: inpval.notes,
        diagnosis_date: inpval.diagnosis_date,
      };

      const response = await axios.post(
        `${baseurl}recordPatientDiagnosis`,
        dataPost
      );

      if (response.data.success === true) {
        setDiagonisemodal(false);
        Swal.fire("Success", "Diagnosis saved successfully.", "success");
        // Optionally, you can refresh the diagnosis list or perform other actions
      } else {
        Swal.fire(
          "Error",
          "Failed to save diagnosis. Please try again.",
          "error"
        );
      }
    } catch (error) {
      console.error("Error saving diagnosis:", error);
      Swal.fire(
        "Error",
        "Failed to save diagnosis. Please try again.",
        "error"
      );
    }
  };

  useEffect(() => {
    getrecordDiagpise();
  }, []);
  const getrecordDiagpise = async () => {
    try {
      const response = await axios.get(
        `${baseurl}getPatientDiagnosisByPatientId/${location?.state?.patientid.id}`
      );
      if (response.data.success === true) {
        console.log("Diagnosis fetched successfully:", response.data);
        setDiagnosis11(response.data.data);
      } else {
        console.warn("Diagnosis not found or invalid status:", response.data);
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  useEffect(() => {
    getservices();
  }, []);
  const getservices = async () => {
    try {
      const response = await axios.get(`${baseurl}getServices`);
      if (response.data.success === true) {
        setGetservice(response.data.data);
      } else {
        console.log("something went wrong");
      }
    } catch (error) {
      console.log(error.response.data.data.message);
    }
  };
  useEffect(() => {
    Servicedata11();
  }, []);
  const Servicedata11 = async () => {
    try {
      const response = await axios.get(`${baseurl}getServices`);
      if (response.data.success === true) {
        console.log("Patient data fetched successfully:", response.data.data);
        setPatients(response.data.data);
      } else {
        console.error("Failed to fetch patient data:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching patient data:", error.message);
    }
  };
  const getPatientAppointment = async () => {
    try {
      const response = await axios.get(
        `${baseurl}getPatientById/${location?.state?.patientid.id}`
      );
      if (response.data.success === true) {
        console.log(
          "Patient appointment fetched successfully:",
          response.data.data
        );
        setPersonalinfo(response.data.data);
      } else {
        console.error(
          "Failed to fetch patient appointment:",
          response.data.message
        );
      }
    } catch (error) {
      console.error("Error fetching patient appointment:", error.message);
    }
  };
  useEffect(() => {
    getPatientAppointment();
  }, []);
  const getPatientservice = async () => {
    try {
      const response = await axios.get(
        `${baseurl}GetPatientServices/${location?.state?.patientid.id}`
      );
      console.log(response)
      if (response.status === 200) {
        console.log(
          "Patient service fetched successfully:",
          response.data.data
        );
        setpatientservice(response.data.data);
      } else {
        console.error(
          "Failed to fetch patient service:",
          response.data.message
        );
      }
    } catch (error) {
      console.error("Error fetching patient service:", error.message);
    }
  };
  useEffect(() => {
    getPatientservice();
  }, []);
  return (
    <div className="pc-container">
      <div className="pc-content">         
        {/* [ Main Content ] start */}   
        <div className="patientTab">
          <div>
            <ul
              className="nav justify-content-between nav-tabs"
              id="myTab"
              role="tablist"
            >
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link active"
                  id="personaldata-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#personaldata"
                  type="button"
                  role="tab"
                  aria-controls="personaldata"
                  aria-selected="false"
                >
                  Personal Data
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="Appointment-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#Appointment"
                  type="button"
                  role="tab"
                  aria-controls="Appointment"
                  aria-selected="false"
                >
                  Appointment
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="vitalsings-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#vitalsings"
                  type="button"
                  role="tab"
                  aria-controls="vitalsings"
                  aria-selected="false"
                >
                  Vital Sings
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="medicalhistory-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#medicalhistory"
                  type="button"
                  role="tab"
                  aria-controls="medicalhistory"
                  aria-selected="false"
                >
                  Medical
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="dental-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#dental"
                  type="button"
                  role="tab"
                  aria-controls="dental"
                  aria-selected="false"
                >
                  Dental
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="service-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#service"
                  type="button"
                  role="tab"
                  aria-controls="service"
                  aria-selected="false"
                >
                  Service
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link "
                  id="insurance-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#insurance"
                  type="button"
                  role="tab"
                  aria-controls="insurance"
                  aria-selected="true"
                >
                  Insurance
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="billing-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#billing"
                  type="button"
                  role="tab"
                  aria-controls="billing"
                  aria-selected="false"
                >
                  Billing
                </button>
              </li>
            </ul>

            <div className="tab-content" id="myTabContent">
              {/* <div
                className="tab-pane fade  "
                id="insurance"
                role="tabpanel"
                aria-labelledby="insurance-tab"
              >
                <div className="col-12">
                  <div className="table-card">
                    <div className="card-header">
                      <div className="d-sm-flex align-items-center justify-content-between">
                        {/* <div><a href="../admins/course-teacher-apply.html" className="btn btn-outline-secondary">Apply Teacher List</a> <a href="../admins/course-teacher-add.html" className="btn btn-primary">Add Teacher</a></div> */}
              {/* </div>
                    </div>
                    <div>
                      <div className="d-flex py-2 justify-content-end ">
                        <button className="borderBtn me-2">New Claims</button>
                        <button className="bgBtn ">Add Insurance</button>
                      </div>

                      <div className="row"> */}
              {/* Left: Table */}
              {/* <div className="col-lg-9">
                          <div className="borderInsure">
                            <div className="serviceHis">
                              <div className="d-flex justify-content-between">
                                <span>Services History</span>
                                <span>Balance: 300BHD</span>
                              </div>
                              <div className="d-flex justify-content-between secClaim">
                                <div className=" fw-semibold">
                                  <span> Claims #3290</span>
                                  <span className="text-muted">(Sent)</span>
                                </div>
                                <div className="d-flex gap- align-items-center iconTab">
                                  <i class="fas fa-print"></i>
                                  <i class="fas fa-pen"></i>
                                  <i class="fas fa-trash"></i>
                                  <button className="innerBtn me-2">
                                    Send
                                  </button>
                                  <button className="innerBtn">Pay</button>
                                </div>
                              </div>
                            </div>
                            <div className="card-body p-0 mt-0">
                              <div className="table-responsive mt-0">
                                <table className="table-hover mb-0 text-center w-100">
                                  <thead className="table-primary">
                                    <tr>
                                      <th>Sn</th>
                                      <th>Doctor</th>
                                      <th>Category</th>
                                      <th>Service</th>
                                      <th>Price</th>
                                      <th>Discount</th>
                                      <th>Total</th>
                                      <th>Deductable</th>
                                      <th>Co-Pat</th>
                                      <th>Co-Ins</th>
                                      <th>Status</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {services.map((item, index) => (
                                      <tr key={index}>
                                        <td>{item.sn}</td>
                                        <td>{item.doctor}</td>
                                        <td>{item.category}</td>
                                        <td>{item.service}</td>
                                        <td>{item.price}</td>
                                        <td>{item.discount}</td>
                                        <td>{item.total}</td>
                                        <td>{item.deductible}</td>
                                        <td>{item.copat}</td>
                                        <td>{item.coins}</td>
                                        <td>{item.status}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div> */}

              {/* Table Footer Action */}
              {/* <div className="d-flex justify-content-end align-items-center px-3 py-2">
                                <div>
                                  <span>Total: 132 BHD</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Right: Insurance Cards */}
              {/* <div className="col-lg-3 mt-3 mt-lg-0">
                          {insuranceCards.map((card, idx) => (
                            <div
                              className={`insureCard mb-3`}
                              key={idx}
                              style={{
                                backgroundColor:
                                  card.status === "Active"
                                    ? "#fef5e6"
                                    : "#fff7f5",
                              }}
                            >
                              <div className="d-flex justify-content-between align-items-center mb-2 insCard1">
                                <strong>
                                  Insurance Card {idx + 1}
                                  <span
                                    className={`ms-2 badge bg-${
                                      card.status === "Active"
                                        ? "success"
                                        : "secondary"
                                    }`}
                                  >
                                    Status {card.status}
                                  </span>
                                </strong>
                                <i className="bi bi-pencil-square"></i>
                              </div>
                              <div className="p20">
                                <p className="mb-1">
                                  <strong>Company Name:</strong> {card.company}
                                </p>
                                <p className="mb-1">
                                  <strong>Policy Number:</strong> {card.policy}
                                </p>
                                <p className="mb-1">
                                  <strong>Patient Name:</strong> {card.patient}
                                </p>
                                <p className="mb-1">
                                  <strong>Issue Date:</strong> {card.issue}
                                </p>
                                <p className="mb-1">
                                  <strong>Expiry Date:</strong> {card.expiry}
                                </p>
                                <p className="mb-1">
                                  <strong>Deductable:</strong> {card.deductible}
                                </p>
                                <p className="mb-1">
                                  <strong>Co-Patient:</strong> {card.copatient}
                                </p>
                                <p className="mb-1">
                                  <strong>Co-Insurance:</strong> {card.coins}
                                </p>
                                <p className="mb-0">
                                  <strong>Scan Copy:</strong>{" "}
                                  <i className="bi bi-paperclip"></i>
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> * */}
              <div
                className="tab-pane fade  "
                id="insurance"
                role="tabpanel"
                aria-labelledby="insurance-tab"
              >
                <div className="col-12">
                  <div className="card table-card patientCardHeader">
                    <div
                      className="tableHeader"
                      style={{ borderBottom: "1px solid #e8ebee" }}
                    >
                      <div className="d-flex align-items-center justify-content-between">
                        <h5>Services History</h5>
                        <div>
                          <div className="d-flex">
                            <button className="borderBtn me-2">
                              New Claims
                            </button>
                            <button className="bgBtn ">Add Insurance</button>
                          </div>
                        </div>

                        {/* <div><a href="../admins/course-teacher-apply.html" className="btn btn-outline-secondary">Apply Teacher List</a> <a href="../admins/course-teacher-add.html" className="btn btn-primary">Add Teacher</a></div> */}
                      </div>
                    </div>
                    <div>
                      <div className="row p-4">
                        {/* Left: Table */}
                        <div className="col-lg-8">
                          <div className="borderInsure">
                            <div className="serviceHis">
                              <div className="d-flex justify-content-between tableHeader  secClaim">
                                <div className="d-flex align-items-center">
                                  <div>
                                    <span>
                                      {" "}
                                      <strong>Claims :</strong> #3290
                                    </span>
                                    <span className="text-muted">(Sent)</span>
                                  </div>
                                  <div className="ps-3">
                                    <span>
                                      <strong>Balance:</strong> 300BHD
                                    </span>
                                  </div>
                                </div>

                                <div className="d-flex gap- align-items-center iconTab">
                                  <i class="fas fa-print"></i>
                                  <i class="fas fa-pen"></i>
                                  <i class="ti ti-trash f-20"></i>
                                  <button className="borderBtn me-2">
                                    Send
                                  </button>
                                  <button className="bgBtn">Pay</button>
                                </div>
                              </div>
                            </div>
                            <div className="card-body p-0 mt-0">
                              <div className="table-responsive mt-0">
                                <table>
                                  <thead>
                                    <tr>
                                      <th>Sn</th>
                                      <th>Doctor</th>
                                      <th>Category</th>
                                      <th>Service</th>
                                      <th>Price</th>
                                      <th>Discount</th>
                                      <th>Total</th>
                                      <th>Deductable</th>
                                      <th>Co-Pat</th>
                                      <th>Co-Ins</th>
                                      <th>Status</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {services.map((item, index) => (
                                      <tr key={index}>
                                        <td>{item.sn}</td>
                                        <td>{item.doctor}</td>
                                        <td>{item.category}</td>
                                        <td>{item.service}</td>
                                        <td>{item.price}</td>
                                        <td>{item.discount}</td>
                                        <td>{item.total}</td>
                                        <td>{item.deductible}</td>
                                        <td>{item.copat}</td>
                                        <td>{item.coins}</td>
                                        <td>{item.status}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>

                              {/* Table Footer Action */}
                              <div className="d-flex justify-content-end align-items-center px-3 py-2">
                                <div>
                                  <span>
                                    <strong className="pe-2">Total:</strong> 132
                                    BHD
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Right: Insurance Cards */}
                        <div className="col-lg-4">
                          {insuranceCards.map((card, idx) => (
                            <div
                              className={`insureCard mb-3`}
                              key={idx}
                              style={{
                                backgroundColor:
                                  card.status === "Active"
                                    ? "#fef5e6"
                                    : "#fff7f5",
                              }}
                            >
                              <div className="d-flex justify-content-between align-items-center tableHeader cardInsureAlign">
                                <div>
                                  <h5>Insurance Card {idx + 1}</h5>
                                </div>

                                <p
                                  className={`ms-2 badge bg-${
                                    card.status === "Active"
                                      ? "success"
                                      : "secondary"
                                  }`}
                                >
                                  Status {card.status}
                                </p>
                              </div>
                              <div className="p20">
                                <p className="mb-1">
                                  <strong>Company Name:</strong> {card.company}
                                </p>
                                <p className="mb-1">
                                  <strong>Policy Number:</strong> {card.policy}
                                </p>
                                <p className="mb-1">
                                  <strong>Patient Name:</strong> {card.patient}
                                </p>
                                <p className="mb-1">
                                  <strong>Issue Date:</strong> {card.issue}
                                </p>
                                <p className="mb-1">
                                  <strong>Expiry Date:</strong> {card.expiry}
                                </p>
                                <p className="mb-1">
                                  <strong>Deductable:</strong> {card.deductible}
                                </p>
                                <p className="mb-1">
                                  <strong>Co-Patient:</strong> {card.copatient}
                                </p>
                                <p className="mb-1">
                                  <strong>Co-Insurance:</strong> {card.coins}
                                </p>
                                <p className="mb-0">
                                  <strong>Scan Copy:</strong>{" "}
                                  <i className="bi bi-paperclip"></i>
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="billing"
                role="tabpanel"
                aria-labelledby="billing-tab"
              >
                <div className="col-12">
                  <div className="table-card">
                    <div className="card-header">
                      <div className="d-sm-flex align-items-center justify-content-between">
                        {/* <div><a href="../admins/course-teacher-apply.html" className="btn btn-outline-secondary">Apply Teacher List</a> <a href="../admins/course-teacher-add.html" className="btn btn-primary">Add Teacher</a></div> */}
                      </div>
                    </div>
                    <div
                      className="container-fluid py-4"
                      style={{
                        backgroundColor: "#f0f2f5",
                        minHeight: "100vh",
                        fontFamily: "Inter, sans-serif",
                      }}
                    >
                      {/* Link to Bootstrap 5 CSS CDN */}
                      <link
                        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
                        rel="stylesheet"
                      />
                      {/* Link to Bootstrap 5 JS CDN (bundle includes Popper.js) */}
                      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

                      {/* Main Row */}
                      <div className="row g-4">
                        {/* Left Column - Invoices Table */}
                        <div className="col-lg-8">
                          <div className="card shadow-sm rounded-4">
                            <div className="card-header bg-white border-0 py-3 d-flex justify-content-between align-items-center rounded-top-4">
                              <h5 className="mb-0 fw-bold">Invoices</h5>
                              <div className="d-flex align-items-center">
                                <button
                                  className="btn btn-light rounded-circle p-2 me-2 shadow-sm"
                                  title="Settings"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="feather feather-settings"
                                  >
                                    <circle cx="12" cy="12" r="3"></circle>
                                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0-.33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09A1.65 1.65 0 0 0 15 4.6a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                                  </svg>
                                </button>
                                <button
                                  className="btn btn-light rounded-circle p-2 me-3 shadow-sm"
                                  title="Filter"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="feather feather-filter"
                                  >
                                    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                                  </svg>
                                </button>
                                <button className="btn btn-primary rounded-pill px-3 py-2 shadow-sm fw-bold">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="feather feather-plus me-1"
                                  >
                                    <line x1="12" y1="5" x2="12" y2="19"></line>
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                  </svg>
                                  New Invoice
                                </button>
                              </div>
                            </div>
                            <div className="card-body p-0">
                              <div className="table-responsive">
                                <table className="table table-hover mb-0">
                                  <thead className="bg-light">
                                    <tr>
                                      <th
                                        scope="col"
                                        className="text-muted fw-normal py-3 ps-4"
                                      >
                                        Inv#
                                      </th>
                                      <th
                                        scope="col"
                                        className="text-muted fw-normal py-3"
                                      >
                                        Date
                                      </th>
                                      <th
                                        scope="col"
                                        className="text-muted fw-normal py-3"
                                      >
                                        Services
                                      </th>
                                      <th
                                        scope="col"
                                        className="text-muted fw-normal py-3"
                                      >
                                        Amount
                                      </th>
                                      <th
                                        scope="col"
                                        className="text-muted fw-normal py-3"
                                      >
                                        VAT
                                      </th>
                                      <th
                                        scope="col"
                                        className="text-muted fw-normal py-3"
                                      >
                                        Discount
                                      </th>
                                      <th
                                        scope="col"
                                        className="text-muted fw-normal py-3"
                                      >
                                        Insurance
                                      </th>
                                      <th
                                        scope="col"
                                        className="text-muted fw-normal py-3"
                                      >
                                        Status
                                      </th>
                                      <th
                                        scope="col"
                                        className="text-muted fw-normal py-3 text-center"
                                      >
                                        Action
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {invoices.map((invoice, index) => (
                                      <tr key={index}>
                                        <td className="py-3 ps-4">
                                          {invoice.id}
                                        </td>
                                        <td className="py-3">{invoice.date}</td>
                                        <td className="py-3">
                                          {invoice.services}
                                        </td>
                                        <td className="py-3">
                                          {invoice.amount}
                                        </td>
                                        <td className="py-3">{invoice.vat}</td>
                                        <td className="py-3">
                                          {invoice.discount}
                                        </td>
                                        <td className="py-3">
                                          {invoice.insurance}
                                        </td>
                                        <td className="py-3">
                                          <span className="badge bg-success-subtle text-success fw-normal px-3 py-2 rounded-pill">
                                            {invoice.status}
                                          </span>
                                        </td>
                                        <td className="py-3 text-center">
                                          <button
                                            className="btn btn-link p-0 text-decoration-none me-2"
                                            title="View"
                                          >
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="18"
                                              height="18"
                                              viewBox="0 0 24 24"
                                              fill="none"
                                              stroke="currentColor"
                                              strokeWidth="2"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              className="feather feather-eye text-primary"
                                            >
                                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                              <circle
                                                cx="12"
                                                cy="12"
                                                r="3"
                                              ></circle>
                                            </svg>
                                          </button>
                                          <button
                                            className="btn btn-link p-0 text-decoration-none me-2"
                                            title="Print"
                                          >
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="18"
                                              height="18"
                                              viewBox="0 0 24 24"
                                              fill="none"
                                              stroke="currentColor"
                                              strokeWidth="2"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              className="feather feather-printer text-secondary"
                                            >
                                              <polyline points="6 9 6 2 18 2 18 9"></polyline>
                                              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                                              <rect
                                                x="6"
                                                y="14"
                                                width="12"
                                                height="8"
                                              ></rect>
                                            </svg>
                                          </button>
                                          <button
                                            className="btn btn-link p-0 text-decoration-none"
                                            title="Delete"
                                          >
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="18"
                                              height="18"
                                              viewBox="0 0 24 24"
                                              fill="none"
                                              stroke="currentColor"
                                              strokeWidth="2"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              className="feather feather-trash-2 text-danger"
                                            >
                                              <polyline points="3 6 5 6 21 6"></polyline>
                                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                              <line
                                                x1="10"
                                                y1="11"
                                                x2="10"
                                                y2="17"
                                              ></line>
                                              <line
                                                x1="14"
                                                y1="11"
                                                x2="14"
                                                y2="17"
                                              ></line>
                                            </svg>
                                          </button>
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Right Column - Summary & Payment Plans */}
                        <div className="col-lg-4">
                          {/* Summary Card */}
                          <div className="card shadow-sm rounded-4 mb-4">
                            <div className="card-header bg-primary text-white border-0 py-3 d-flex justify-content-between align-items-center rounded-top-4">
                              <h5 className="mb-0 fw-bold">Summary</h5>
                              <button
                                className="btn btn-link p-0 text-white"
                                title="Edit Summary"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="20"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="feather feather-edit"
                                >
                                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                </svg>
                              </button>
                            </div>
                            <div className="card-body bg-white rounded-bottom-4 p-3">
                              <p className="mb-2">
                                <span className="fw-semibold">Name :</span>{" "}
                                Ahmed Ali Khan
                              </p>
                              <p className="mb-2">
                                <span className="fw-semibold">
                                  Pending Balance :
                                </span>{" "}
                                50.000 BHD
                              </p>
                              <p className="mb-2">
                                <span className="fw-semibold">
                                  Total Payments :
                                </span>{" "}
                                450.000 BHD
                              </p>
                              <p className="mb-2">
                                <span className="fw-semibold">
                                  Insurance Balance :
                                </span>{" "}
                                0.0 BHD
                              </p>
                              <p className="mb-0">
                                <span className="fw-semibold">
                                  Last Payment :
                                </span>{" "}
                                03/02/2025
                              </p>
                            </div>
                          </div>

                          {/* Payment Plans Card */}
                          <div className="card shadow-sm rounded-4">
                            <div className="card-header bg-primary text-white border-0 py-3 d-flex justify-content-between align-items-center rounded-top-4">
                              <h5 className="mb-0 fw-bold">Payment Plans</h5>
                              <button className="btn btn-light rounded-pill px-3 py-2 shadow-sm fw-bold">
                                Payment Plan
                              </button>
                            </div>
                            <div className="card-body p-0 bg-white rounded-bottom-4">
                              <div className="table-responsive">
                                <table className="table table-hover mb-0">
                                  <thead className="bg-light">
                                    <tr>
                                      <th
                                        scope="col"
                                        className="text-muted fw-normal py-3 ps-4"
                                      >
                                        Sn
                                      </th>
                                      <th
                                        scope="col"
                                        className="text-muted fw-normal py-3"
                                      >
                                        Name
                                      </th>
                                      <th
                                        scope="col"
                                        className="text-muted fw-normal py-3"
                                      >
                                        Duration
                                      </th>
                                      <th
                                        scope="col"
                                        className="text-muted fw-normal py-3"
                                      >
                                        Paid
                                      </th>
                                      <th
                                        scope="col"
                                        className="text-muted fw-normal py-3"
                                      >
                                        Remaining
                                      </th>
                                      <th
                                        scope="col"
                                        className="text-muted fw-normal py-3 text-center"
                                      >
                                        Action
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {paymentPlans.map((plan, index) => (
                                      <tr key={index}>
                                        <td className="py-3 ps-4">{plan.sn}</td>
                                        <td className="py-3">{plan.name}</td>
                                        <td className="py-3">
                                          {plan.duration}
                                        </td>
                                        <td className="py-3">{plan.paid}</td>
                                        <td className="py-3">
                                          {plan.remaining}
                                        </td>
                                        <td className="py-3 text-center">
                                          <button
                                            className="btn btn-link p-0 text-decoration-none me-2"
                                            title="View"
                                          >
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="18"
                                              height="18"
                                              viewBox="0 0 24 24"
                                              fill="none"
                                              stroke="currentColor"
                                              strokeWidth="2"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              className="feather feather-eye text-primary"
                                            >
                                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                              <circle
                                                cx="12"
                                                cy="12"
                                                r="3"
                                              ></circle>
                                            </svg>
                                          </button>
                                          <button
                                            className="btn btn-link p-0 text-decoration-none"
                                            title="Edit"
                                          >
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="18"
                                              height="18"
                                              viewBox="0 0 24 24"
                                              fill="none"
                                              stroke="currentColor"
                                              strokeWidth="2"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              className="feather feather-edit-2 text-secondary"
                                            >
                                              <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                                            </svg>
                                          </button>
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Second Row - Payment Invoices Table */}
                      <div className="row mt-4">
                        <div className="col-12">
                          <div className="card shadow-sm rounded-4">
                            <div className="card-header bg-white border-0 py-3 d-flex justify-content-between align-items-center rounded-top-4">
                              <h5 className="mb-0 fw-bold">Payment Invoices</h5>
                              <button className="btn btn-primary rounded-pill px-3 py-2 shadow-sm fw-bold">
                                Payment
                              </button>
                            </div>
                            <div className="card-body p-0">
                              <div className="table-responsive">
                                <table className="table table-hover mb-0">
                                  <thead className="bg-light">
                                    <tr>
                                      <th
                                        scope="col"
                                        className="text-muted fw-normal py-3 ps-4"
                                      >
                                        Sn
                                      </th>
                                      <th
                                        scope="col"
                                        className="text-muted fw-normal py-3"
                                      >
                                        Invoice ID
                                      </th>
                                      <th
                                        scope="col"
                                        className="text-muted fw-normal py-3"
                                      >
                                        Date
                                      </th>
                                      <th
                                        scope="col"
                                        className="text-muted fw-normal py-3"
                                      >
                                        Amount
                                      </th>
                                      <th
                                        scope="col"
                                        className="text-muted fw-normal py-3"
                                      >
                                        Method
                                      </th>
                                      <th
                                        scope="col"
                                        className="text-muted fw-normal py-3"
                                      >
                                        Transaction
                                      </th>
                                      <th
                                        scope="col"
                                        className="text-muted fw-normal py-3"
                                      >
                                        Cashier
                                      </th>
                                      <th
                                        scope="col"
                                        className="text-muted fw-normal py-3 text-center"
                                      >
                                        Action
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {paymentInvoices.map((payment, index) => (
                                      <tr key={index}>
                                        <td className="py-3 ps-4">
                                          {payment.sn}
                                        </td>
                                        <td className="py-3">
                                          {payment.invoiceId}
                                        </td>
                                        <td className="py-3">{payment.date}</td>
                                        <td className="py-3">
                                          {payment.amount}
                                        </td>
                                        <td className="py-3">
                                          {payment.method}
                                        </td>
                                        <td className="py-3">
                                          {payment.transaction}
                                        </td>
                                        <td className="py-3">
                                          {payment.cashier}
                                        </td>
                                        <td className="py-3 text-center">
                                          <button
                                            className="btn btn-link p-0 text-decoration-none me-2"
                                            title="View"
                                          >
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="18"
                                              height="18"
                                              viewBox="0 0 24 24"
                                              fill="none"
                                              stroke="currentColor"
                                              strokeWidth="2"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              className="feather feather-eye text-primary"
                                            >
                                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                              <circle
                                                cx="12"
                                                cy="12"
                                                r="3"
                                              ></circle>
                                            </svg>
                                          </button>
                                          <button
                                            className="btn btn-link p-0 text-decoration-none"
                                            title="Edit"
                                          >
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="18"
                                              height="18"
                                              viewBox="0 0 24 24"
                                              fill="none"
                                              stroke="currentColor"
                                              strokeWidth="2"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              className="feather feather-edit-2 text-secondary"
                                            >
                                              <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                                            </svg>
                                          </button>
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="tab-pane fade show active"
                id="personaldata"
                role="tabpanel"
                aria-labelledby="personaldata-tab analytics-tab-1"
                tabIndex={0}
              >
                <div className="col-12">
                  <div>
                    <div className="card-header">
                      <div className="d-sm-flex align-items-center justify-content-between">
                        {/* <div><a href="../admins/course-teacher-apply.html" className="btn btn-outline-secondary">Apply Teacher List</a> <a href="../admins/course-teacher-add.html" className="btn btn-primary">Add Teacher</a></div> */}
                      </div>
                    </div>

                    <div className="mt-5 commonCard pt-5">
                      <div className="row g-3">
                        {/* Left Section */}
                        <div className="col-md-8">
                          {/* Personal Info */}
                          <div className="card mb-3" style={{position:"relative"}}>
                            <div className="personaimg text-center">
                                 <img style={{width:"100px",height:"100px"}} src={personalinfo.profileImage ===null ?  perImg  : ` ${baseurImage}${personalinfo.profileImage}`} alt="1" />
                             </div>
                            <div>
                              <h5 className="card-title">Personal Info</h5>
                              <div className="row p20">
                                <div className="col-md-6">
                                  <label className="form-label">
                                    File Number
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={personalinfo.fileNumber}
                                    placeholder="File Number"
                                    disabled  
                                  />
                                </div>
                                <div className="col-md-6">
                                  <label className="form-label">Name</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Name"
                                    disabled
                                    value={personalinfo.firstName}
                                  />
                                </div>
                                <div className="col-md-6">
                                  <label className="form-label">
                                    Medical ID
                                  </label>
                                  <input type="text" disabled className="form-control" />
                                </div>

                                <div className="col-md-6">
                                  <label className="form-label">
                                    Date of Birth
                                  </label>
                                  <input
                                    type="date" disabled
                                    className="form-control"
                                    value={
                                      personalinfo.dateOfBirth
                                        ? new Date(personalinfo.dateOfBirth)
                                            .toISOString()
                                            .split("T")[0]
                                        : ""
                                    }
                                  />
                                  {/* <input type="date" className="form-control" value={personalinfo.dateOfBirth} /> */}
                                </div>
                                <div className="col-md-4">
                                  <label className="form-label">Age</label>
                                  <input
                                    type="number"
                                    className="form-control"
                                    value={personalinfo.age}
                                    disabled
                                    placeholder="Age"
                                  />
                                </div>
                                <div className="col-md-4">
                                  <label className="form-label">Civil ID</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Civil ID" disabled 
                                    value={personalinfo.civilIdNumber}
                                  />
                                </div>
                                <div className="col-md-3">
                                  <label className="form-label d-block">
                                    Gender
                                  </label>
                                  <div className="d-flex">
                                    <div className="form-check form-check-inline">
                                      <input
                                        className="form-check-input"
                                        type="radio"
                                        name="gender"
                                        value="Male"
                                        id="male"
                                        checked={personalinfo.gender === "Male"}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="male"
                                      >
                                        Male
                                      </label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                      <input
                                        className="form-check-input"
                                        type="radio"
                                        name="gender"
                                        value="Female"
                                        id="female"
                                        checked={
                                          personalinfo.gender === "Female"
                                        }
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="female"
                                      >
                                        Female
                                      </label>
                                    </div>
                                  </div>
                                </div>

                                <div className="col-md-6">
                                  <label className="form-label">
                                    Passport ID
                                  </label>
                                  <input
                                    type="text"
                                    value={personalinfo.passportNumber}
                                    className="form-control" disabled
                                    placeholder=" Passport ID"
                                  />
                                </div>
                                <div className="col-md-6">
                                  <label className="form-label">
                                    Nationality
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control" disabled
                                    value={personalinfo.nationality}
                                    placeholder="Nationality"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Contact Details */}
                          <div className="card mb-3">
                            <div>
                              <h5 className="card-title">Contact Details</h5>
                              <div className="row p20">
                                <div className="col-md-6">
                                  <label className="form-label">Mobile</label>
                                  <input
                                    type="text"
                                    className="form-control" disabled
                                    placeholder="Mobile"
                                    value={personalinfo.mobileNumber}
                                  />
                                </div>
                                <div className="col-md-6">
                                  <label className="form-label">Phone</label>
                                  <input
                                    type="text" disabled
                                    className="form-control"
                                    placeholder="Phone"
                                  />
                                </div>
                                <div className="col-md-6">
                                  <label className="form-label">Email</label>
                                  <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Email" disabled
                                    value={personalinfo.email}
                                  />
                                </div>
                                <div className="col-md-6">
                                  <label className="form-label">Address</label>
                                  <input
                                    type="text"
                                    className="form-control" disabled
                                    value={personalinfo.address}
                                    placeholder="Address"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Right Section */}
                        <div className="col-md-4 rightSidePer">
                          {/* Visit Info */}

                          {/* Emergency Contact */}
                          <div className="card mb-3">
                            <div>
                              <h5 className="card-title">Emergency Contact</h5>
                              <div className="p20"> 
                                <div className="row">
                                  <div className="col-lg-6">
                                    <label class="form-label">Name</label>
                                    <input
                                      type="text"
                                      value={personalinfo.emContactName}
                                      className="form-control" disabled
                                      placeholder="Name"
                                    />
                                  </div>
                                  <div className="col-lg-6">
                                    <label class="form-label">Relation</label>
                                    <input
                                      type="text"
                                      className="form-control" disabled
                                      value={personalinfo.emContactRelation}
                                      placeholder="Relation"
                                    />
                                  </div>
                                  <div className="col-lg-6">
                                    <label class="form-label">Phone 1</label>
                                    <input
                                      type="text" disabled
                                      className="form-control"
                                      value={personalinfo.emContactPhone1}
                                      placeholder="Phone 1"
                                    />
                                  </div>
                                  <div className="col-lg-6">
                                    <label class="form-label">Phone 2</label>
                                    <input
                                      type="text"
                                      className="form-control" disabled
                                      placeholder="Phone 2"
                                      value={personalinfo.emContactPhone2}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="card mb-3">
                            <div>
                              <h5 className="card-title">Documents</h5>
                              <div className="p20">
                                <div className="row">
                                  <div className="col-lg-12">
                                    <div>
                                      <label className="form-label mb-2">
                                        CPR Scan
                                      </label>
                                      <br />
                                      {personalinfo.CPR_scan_doc ? (
                                        <a
                                          href={`${baseurImage}/${personalinfo.CPR_scan_doc}`}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="bgBtn my-2"
                                        >
                                          View CPR Scan
                                        </a>
                                      ) : (
                                        <span>No document available</span>
                                      )}
                                    </div>
                                  </div>
                                  <div className="col-lg-12">
                                    <div>
                                      <label className="form-label">
                                        Passport Copy
                                      </label>
                                      <br />
                                      {personalinfo.passport_copy ? (
                                        <a
                                          href={`${baseurImage}/${personalinfo.passport_copy}`}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="bgBtn my-2"
                                        >
                                          View Passport
                                        </a>
                                      ) : (
                                        <span>No document available</span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="card mb-3 ">
                            <div className="card-body  p-3">
                              <div className="d-flex">
                                <p>
                                  <strong>Last Visit:</strong>{" "}
                                  {new Date(
                                    personalinfo.lastVisitDate
                                  ).toLocaleDateString("en-GB") === "01/01/1970"
                                    ? ""
                                    : new Date(
                                        personalinfo.lastVisitDate
                                      ).toLocaleDateString("en-GB")}
                                </p>
                                {/* <p className="ps-2">
                                  <strong>First Visit:</strong> {new Date(personalinfo.firstVisitDate).toLocaleDateString("en-GB")}
                                </p> */}
                              </div>
                              <p>
                                <strong>File Opening:</strong>{" "}
                                {new Date(
                                  personalinfo.fileOpenedDate
                                ).toLocaleDateString("en-GB")}
                              </p>
                              <label className="form-label">
                                Primary Doctor
                              </label>
                              <select className="form-select" disabled>
                                <option>{personalinfo.Primary_Doctor}</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="Appointment"
                role="tabpanel"
                aria-labelledby="Appointment-tab"
              >
                <div className="col-12">
                  <div className="card table-card patientCardHeader">
                    <div className="tableHeader">
                      <div className="d-flex justify-content-end">
                        <button
                          className="bgBtn"
                          onClick={() => {
                            navigate("/Admin/Addappointment");
                          }}
                        >
                          New Appointment
                        </button>
                        {/* <button className="bgBtn" onClick={handleclick}>
                          Plan Appointment
                        </button> */}
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="table-responsive mt-0">
                        <table className="table table-hover" id="pc-dt-simple">
                          <thead>
                            <tr>
                              <th>Doctor Name</th>
                              <th>Start Time</th>
                              <th>End Time</th>
                              <th>Reason</th>
                              <th>Appointment Status</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {dataAppointment && dataAppointment.length > 0 ? (
                              dataAppointment.map((item, index) => {
                                console.log(item);
                                return (
                                  <tr key={index}>
                                    <td>{item.doctorName}</td>
                                    <td>{item.startTime}</td>
                                    <td>{item.endTime}</td>
                                    <td>{item.reason}</td>
                                    <td>{item.status}</td>
                                    <td>
                                      <a
                                        href="#"
                                        className=" viewIcon avtar avtar-xs btn-link-secondary"
                                      >
                                        <i className="ti ti-eye f-20" />
                                        <span>View</span>
                                      </a>
                                      <a
                                        href="#"
                                        className="avtar avtar-xs btn-link-secondary editIcon"
                                      >
                                        <i className="ti ti-edit f-20" />
                                        <span>Edit</span>
                                      </a>
                                      <a
                                        href="#"
                                        className="avtar avtar-xs btn-link-secondary deleteIcon"
                                      >
                                        <i className="ti ti-trash f-20" />
                                        <span>Delete</span>
                                      </a>
                                    </td>
                                  </tr>
                                );
                              })
                            ) : (
                              <tr>
                                <td
                                  colSpan="6"
                                  className="text-center text-muted"
                                >
                                  No data found
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="tab-pane fade"
                id="vitalsings"
                role="tabpanel"
                aria-labelledby="vitalsings-tab"
              >
                <div className="col-12">
                  <div className="card table-card patientCardHeader">
                    <div className=" borderShapeTab tableHeader">
                      <div className="d-sm-flex align-items-center justify-content-end ">
                        <div>
                          <button
                            className="bgBtn"
                            onClick={handleclickopenvital}
                          >
                            Add Vitals
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="table-responsive mt-0 mb-0">
                        <table className="table table-hover" id="pc-dt-simple">
                          <thead>
                            <tr>
                              <th>Date</th>
                              <th>Time</th>
                              <th>Nurse</th>
                              <th>BP</th>
                              <th>HR</th>
                              <th>Temp </th>
                              <th>RR </th>
                              <th>Weight</th>
                              <th>Height </th>
                              <th>Action </th>
                            </tr>
                          </thead>
                          <tbody>
                            {vitaldatas &&
                              vitaldatas.length > 0 &&
                              vitaldatas.map((item, index) => {
                                console.log(item);
                                return (
                                  <>
                                    <tr key={index}>
                                      <td>
                                        {new Date(
                                          item.recorded_at
                                        ).toLocaleDateString("en-GB")}
                                      </td>
                                      <td>""</td>
                                      <td>{item.nurse}</td>
                                      <td>
                                        {item.blood_pressure_systolic} /{" "}
                                        {item.blood_pressure_diastolic}
                                      </td>
                                      <td>{item.heart_rate}</td>
                                      <td>{item.temperature}</td>
                                      <td>{item.respiratory_rate}</td>
                                      <td>{item.weight}</td>
                                      <td>{item.height}</td>
                                      <td>
                                        <a
                                          href="#"
                                          className="avtar avtar-xs btn-link-secondary"
                                        >
                                          <i className="ti ti-eye f-20" />{" "}
                                        </a>
                                        <a
                                          href="#"
                                          className="avtar avtar-xs btn-link-secondary"
                                        >
                                          <i className="ti ti-edit f-20" />{" "}
                                        </a>
                                        <a
                                          href="#"
                                          className="avtar avtar-xs btn-link-secondary"
                                        >
                                          <i className="ti ti-trash f-20" />
                                        </a>
                                      </td>
                                    </tr>
                                  </>
                                );
                              })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                {openVital && (
                  <div
                    className="modal fade show"
                    style={{
                      backgroundColor: "rgba(0,0,0,0.5)",
                      display: "block",
                    }}
                  >
                    <div className="modal-dialog modal-lg">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title">Add Vital</h5>
                          <button
                            type="button"
                            className="btn-close"
                            onClick={handlecloseVital}
                          ></button>
                        </div>
                        <div className="modal-body">
                          {/* Form for adding doctor */}

                          <div className="row">
                            <div className="col-md-6">
                              <label className="form-label">Nurse</label>
                              <input
                                type="text"
                                name="nurse"
                                onChange={handlechange}
                                className="form-control"
                              />
                            </div>
                            <div className="col-md-6">
                              <label className="form-label">Recorded At</label>
                              <input
                                type="text"
                                name="recorded_at"
                                onChange={handlechange}
                                className="form-control"
                              />
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <label className="form-label">
                                Blood Pressure Systolic
                              </label>
                              <input
                                type="text"
                                name="blood_pressure_systolic"
                                onChange={handlechange}
                                className="form-control"
                              />
                            </div>
                            <div className="col-md-6">
                              <label className="form-label">
                                Blood Pressure Diastolic
                              </label>
                              <input
                                type="text"
                                name="blood_pressure_diastolic"
                                onChange={handlechange}
                                className="form-control"
                              />
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <label className="form-label">Heart Rate</label>
                              <input
                                type="text"
                                name="heart_rate"
                                onChange={handlechange}
                                className="form-control"
                              />
                            </div>
                            <div className="col-md-6">
                              <label className="form-label">
                                Respiratory Rate
                              </label>
                              <input
                                type="text"
                                name="recorded_at"
                                onChange={handlechange}
                                className="form-control"
                              />
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <label className="form-label">Temperature</label>
                              <input
                                type="text"
                                name="temperature"
                                onChange={handlechange}
                                className="form-control"
                              />
                            </div>
                            <div className="col-md-6">
                              <label className="form-label">weight </label>
                              <input
                                type="text"
                                name="weight"
                                onChange={handlechange}
                                className="form-control"
                              />
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <label className="form-label">height</label>
                              <input
                                type="text"
                                name="height"
                                onChange={handlechange}
                                className="form-control"
                              />
                            </div>
                            <div className="col-md-6">
                              <label className="form-label">BMI</label>
                              <input
                                type="text"
                                name="bmi"
                                onChange={handlechange}
                                className="form-control"
                              />
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <label className="form-label">
                                Oxygen Saturation
                              </label>
                              <input
                                type="text"
                                name="oxygen_saturation"
                                onChange={handlechange}
                                className="form-control"
                              />
                            </div>
                            <div className="col-md-6">
                              <label className="form-label">Notes</label>
                              <input
                                type="text"
                                name="notes"
                                onChange={handlechange}
                                className="form-control"
                              />
                            </div>
                          </div>
                          <div className="modal-footer my-3">
                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={handlesavevital}
                            >
                              Create vital
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div
                className="tab-pane fade"
                id="medicalhistory"
                role="tabpanel"
                aria-labelledby="medicalhistory-tab"
              >
                <div className="col-12">
                  <div className="table-card">
                    <div className="card-header">
                      <div className="d-sm-flex align-items-center justify-content-between">
                        {/* <h5 className="mb-3 mb-sm-0">Insurance </h5> */}
                        {/* <div><a href="../admins/course-teacher-apply.html" className="btn btn-outline-secondary">Apply Teacher List</a> <a href="../admins/course-teacher-add.html" className="btn btn-primary">Add Teacher</a></div> */}
                      </div>
                    </div>
                    <div>
                      <div className="row mt-4">
                        {/* Visit History */}
                        <div className="col-md-5 mb-4">
                          <div className="card h-100">
                            <div className="card-header">Visit History</div>
                            <div className="table-responsive p-0 mt-0">
                              <table className="table table-sm mb-0">
                                <thead className="table-light">
                                  <tr>
                                    <th>Date</th>
                                    <th>Doctor</th>
                                    <th>Notes</th>
                                    <th>Service</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    {tableCell("xx/xx/yy")}
                                    {tableCell("Dr Ali")}
                                    {tableCell("Consultation Visit for RCT")}
                                    {tableCell("RCT #1 Molar")}
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>

                        {/* Diagnosis */}
                        <div className="col-md-4 mb-4">
                          <div className="card h-100">
                            <div className="card-header d-flex justify-content-between">
                              <span>Diagnosis (ICD-10)</span>
                              <button className=" iconAdd">
                                <i
                                  class="fas fa-plus"
                                  onClick={handlemodaldiagonise}
                                ></i>
                              </button>
                            </div>
                            <div className="p-0 table-responsive mt-0">
                              <table className="table table-sm mb-0 ">
                                <thead className="table-light">
                                  <tr>
                                    <th>Code</th>
                                    <th>Name</th>
                                    <th>Dated</th>
                                    <th>Notes</th>
                                    <th>Edit</th>
                                  </tr>
                                </thead>
                                <table>
                                  <thead>
                                    {/* <tr>
                                      <th>Name</th>
                                    </tr> */}
                                  </thead>
                                  <tbody>
                                    {Array.isArray(diagnosis11) &&
                                    diagnosis11.length > 0 ? (
                                      diagnosis11.map((item, index) => (
                                        <tr key={index}>
                                          <td>{item.name_en}</td>
                                        </tr>
                                      ))
                                    ) : (
                                      <tr>
                                        <td colSpan={1}>No Diagnosis Found</td>
                                      </tr>
                                    )}
                                  </tbody>
                                </table>
                              </table>

                              {diagonisemodal && (
                                <div
                                  className="modal fade show"
                                  style={{
                                    backgroundColor: "rgba(63, 26, 26, 0.5)",
                                    display: "block",
                                  }}
                                >
                                  <div className="modal-dialog modal-lg">
                                    <div className="modal-content">
                                      <div className="modal-header">
                                        <h5 className="modal-title">
                                          Add Diagnosis
                                        </h5>
                                        <button
                                          type="button"
                                          className="btn-close"
                                          onClick={hndleclosddddd}
                                        ></button>
                                      </div>
                                      <div className="modal-body">
                                        {/* Form for adding doctor */}

                                        <div className="row">
                                          <div className="col-md-6">
                                            <label className="form-label">
                                              Doctor
                                            </label>
                                            <select
                                              name="doctor_id"
                                              onChange={handlechange}
                                              className="form-control"
                                            >
                                              <option>Select</option>
                                              {doctors &&
                                                doctors.length > 0 &&
                                                doctors.map((items, index) => {
                                                  console.log(items);
                                                  return (
                                                    <option
                                                      key={index}
                                                      value={items.id}
                                                    >
                                                      {items.fullName}
                                                    </option>
                                                  );
                                                })}
                                            </select>
                                          </div>
                                          <div className="col-md-6">
                                            <label className="form-label">
                                              Diagnosis
                                            </label>
                                            <select
                                              name="icd10_id"
                                              onChange={handlechange}
                                              className="form-control"
                                            >
                                              <option
                                                style={{ width: "300px" }}
                                              >
                                                Select
                                              </option>
                                              {diagnosis &&
                                                diagnosis.length > 0 &&
                                                diagnosis.map(
                                                  (items, index) => {
                                                    console.log(items);
                                                    return (
                                                      <option
                                                        style={{
                                                          width: "300px",
                                                        }}
                                                        value={items.id}
                                                      >
                                                        {items.code} /{" "}
                                                        {items.name_en}
                                                      </option>
                                                      // <option>{items.fullName	}</option>
                                                    );
                                                  }
                                                )}
                                            </select>
                                          </div>
                                        </div>
                                        <div className="row">
                                          <div className="col-md-6">
                                            <label className="form-label">
                                              Diagnosis Date
                                            </label>
                                            <input
                                              type="date"
                                              name="diagnosis_date"
                                              onChange={handlechange}
                                              className="form-control"
                                            />
                                          </div>
                                          <div className="col-md-6">
                                            <label className="form-label">
                                              Notes
                                            </label>
                                            <input
                                              type="text"
                                              name="notes"
                                              placeholder="Enter notes"
                                              onChange={handlechange}
                                              className="form-control"
                                            />
                                          </div>
                                        </div>

                                        <div className="modal-footer my-3">
                                          <button
                                            type="button"
                                            className="btn btn-primary"
                                            onClick={handlesavediagonise}
                                          >
                                            Add Diagonise
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Allergies */}
                        <div className="col-md-3 mb-4">
                          <div className="card h-100">
                            <div className="card-header d-flex justify-content-between">
                              <span>Allergies</span>
                              <button className="iconAdd">
                                <i class="fas fa-plus"></i>
                              </button>
                            </div>
                            <div className="table-responsive p-0 mt-0 mt-0">
                              <table className="table table-sm mb-0">
                                <thead className="table-light">
                                  <tr>
                                    <th>Sn</th>
                                    <th>Allergy</th>
                                    <th>Reaction</th>
                                    <th>Reaction</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {[...Array(3)].map((_, i) => (
                                    <tr key={i}>
                                      {tableCell(i + 1)}
                                      {tableCell("Penicillin")}
                                      {tableCell("N/A")}
                                      {tableCell("Active")}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        {/* Chief Complaints */}
                        <div className="col-md-5 mb-4">
                          <div className="card h-100">
                            <div className="card-header d-flex justify-content-between">
                              <span>Chief Complaints</span>
                              <button className="iconAdd">
                                <i class="fas fa-plus"></i>
                              </button>
                            </div>
                            <div className="table-responsive p-0 mt-0 mt-0">
                              <table className="table table-sm mb-0">
                                <thead className="table-light">
                                  <tr>
                                    <th>Date</th>
                                    <th>Doctor</th>
                                    <th>Complaint</th>
                                    <th>Area</th>
                                    <th>Vitals</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {[...Array(3)].map((_, i) => (
                                    <tr key={i}>
                                      {tableCell("xx/xx/yy")}
                                      {tableCell("Dr Ali")}
                                      {tableCell("Migraine")}
                                      {tableCell("Head")}
                                      {tableCell("Open")}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>

                        {/* Prescription */}
                        <div className="col-md-4 mb-4">
                          <div className="card h-100">
                            <div className="card-header">Prescription</div>
                            <div className="table-responsive p-0 mt-0 mt-0">
                              <table className="table table-sm mb-0">
                                <thead className="table-light">
                                  <tr>
                                    <th>Date</th>
                                    <th>Doctor</th>
                                    <th>Drugs</th>
                                    <th>Action</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {[...Array(2)].map((_, i) => (
                                    <tr key={i}>
                                      {tableCell("dd/mm/yy")}
                                      {tableCell("Dr Morson")}
                                      {tableCell("Paracetamol & Brufen")}
                                      <td>
                                        <div className="tableIcon">
                                          <i className="fas fa-pencil-alt me-2"></i>

                                          <i className="fas fa-trash"></i>
                                        </div>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-3 mb-4">
                          <div className="card h-100">
                            <div className="card-header d-flex justify-content-between">
                              <span>X-Ray & Radiology</span>
                              <button className="iconAdd">
                                <i class="fas fa-plus"></i>
                              </button>
                            </div>
                            <div className="table-responsive p-0 mt-0 mt-0">
                              <table className="table table-sm mb-0">
                                <thead className="table-light">
                                  <tr>
                                    <th>Date</th>
                                    <th>File</th>
                                    <th>Type</th>
                                    <th>View</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {[...Array(3)].map((_, i) => (
                                    <tr key={i}>
                                      {tableCell("xx/xx/yy")}
                                      {tableCell("MRI")}
                                      {tableCell("Scan")}
                                      {tableCell("Scan")}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6 mb-4">
                          <div className="card h-100">
                            <div className="card-header d-flex justify-content-between">
                              <span>Lab Test</span>
                              <button className="iconAdd">
                                <i class="fas fa-plus"></i>
                              </button>
                            </div>
                            <div className="table-responsive mt-0 p-0">
                              <table className="table table-sm mb-0">
                                <thead className="table-light">
                                  <tr>
                                    <th>Date</th>
                                    <th>Doctor</th>
                                    <th>Complaint</th>
                                    <th>Area</th>
                                    <th>Vitals</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {[...Array(2)].map((_, i) => (
                                    <tr key={i}>
                                      {tableCell("xx/xx/yy")}
                                      {tableCell("Dr Ali")}
                                      {tableCell("Migraine")}
                                      {tableCell("Head")}
                                      {tableCell("Open")}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                        {["Attachment", "Consent Form", "Medical report"].map(
                          (title, i) => (
                            <div className="col-md-2 mb-4" key={i}>
                              <div className="card h-100">
                                <div
                                  className="card-header text-white"
                                  style={{
                                    background: "#1f6fb8",
                                    borderRadius: "20px 20px 0px 0px",
                                  }}
                                >
                                  {title}
                                </div>
                                <div className="card-body table-responsive text-center text-muted">
                                  No Data
                                </div>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="service"
                role="tabpanel"
                aria-labelledby="service-tab"
              >
                <div className="col-12">
                  <div className="table-card">
                    <div className="card-header borderShapeTab">
                      <div className="d-sm-flex align-items-center justify-content-end">
                        {/* <div><a href="../admins/course-teacher-apply.html" className="btn btn-outline-secondary">Apply Teacher List</a> <a href="../admins/course-teacher-add.html" className="btn btn-primary">Add Teacher</a></div> */}
                        <button
                          className="bgBtn me-2 my-2"
                          onClick={handleclickopenvital11}
                        >
                          Add Services
                        </button>
                      </div>
                      {openVital121 && (
                        <div
                          className="modal fade show"
                          style={{
                            backgroundColor: "rgba(66, 62, 62, 0.5)",
                            display: "block",
                          }}
                        >
                          <div className="modal-dialog modal-md">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h5 className="modal-title">Add Services</h5>
                                <button
                                  type="button"
                                  className="btn-close"
                                  onClick={hndleclosemodalservice}
                                ></button>
                              </div>
                              <div className="modal-body">
                                <label className="form-label">Service</label>
                                {/* Form for adding doctor */}
                                <select
                                  name="service_id"
                                  onChange={handlechange}
                                  className="form-select"
                                >
                                  <option value="">Select Service</option>
                                  {getservice && getservice.length > 0 ? (
                                    getservice.map((item, index) => (
                                      <option key={index} value={item.id}>
                                        {item.name}
                                      </option>
                                    ))
                                  ) : (
                                    <option value="">
                                      No Services Available
                                    </option>
                                  )}
                                </select>
                                <label className="form-label mt-2">
                                  Select Doctor
                                </label>
                                <select
                                  name="doctor_id"
                                  onChange={handlechange}
                                  className="form-select"
                                >
                                  <option value="">Select Doctor</option>
                                  {doctors && doctors.length > 0 ? (
                                    doctors.map((item, index) => (
                                      <option key={index} value={item.id}>
                                        {item.fullName}
                                      </option>
                                    ))
                                  ) : (
                                    <option value="">
                                      No Services Available
                                    </option>
                                  )}
                                </select>
                                <div className="col-md-12">
                                  <label className="form-label">Amount</label>
                                  <input
                                    type="text"
                                    name="amount"
                                    placeholder="Enter Amount"
                                    className="form-control"
                                    onChange={handlechange}
                                  />
                                </div>
                                <div className="col-md-12">
                                  <label className="form-label">
                                    Insurance
                                  </label>
                                  <input
                                    type="text"
                                    name="insurance"
                                    placeholder="Insurance"
                                    className="form-control"
                                    onChange={handlechange}
                                  />
                                </div>
                                <div className="col-md-12">
                                  <label className="form-label">VAT</label>
                                  <input
                                    type="text"
                                    name="vat"
                                    placeholder="Enter VAT"
                                    className="form-control"
                                    onChange={handlechange}
                                  />
                                </div>
                                <div className="modal-footer my-3">
                                  <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={handlesavevital123}
                                  >
                                    Add Service
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    {/* <div>
                     <div className="card-body pb-0">
                                   <div className="table-responsive table-striped">
                                     <table className="table">
                                       <thead>
                                         <tr>
                                           <th>Nmae</th>
                                           <th>File No.</th>
                                    
                                           <th>Gender</th>
                                           <th>Age</th>
                                           <th>Mobile</th>
                                           <th>Primary Doctor</th>
                                           <th>Last Visit</th>
                                           <th>Balance</th>
                                           <th className="text-center">Action</th>
                                         </tr>
                                       </thead>
                                       {/* <tbody>
                                         {currentPatients.length > 0 ? (
                                           currentPatients.map((item, index) => (
                                             <tr key={index}>
                                               <td>
                                                 <img
                                                   src={`${baseurImage}${item.profileImage}`}
                                                   alt="No Img"
                                                   className="img-radius"
                                                 />
                                                 <span className="ms-2">
                                                    {item.firstName} {item.lastName}
                                                 </span>
                                               </td>
                                               <td>{item.fileNumber}</td>
                                                
                                               <td>{item.gender}</td>
                                               <td>{item.age}</td>
                                               <td>{item.mobileNumber}</td>
                                               <td>{item.Primary_Doctor || "-"}</td>
                                               <td>
                                                 {item.lastVisitDate &&
                                                 !isNaN(new Date(item.lastVisitDate))
                                                   ? new Date(
                                                       item.lastVisitDate
                                                     ).toLocaleDateString("en-GB")
                                                   : "-"}
                                               </td>
                                               <td>{item.balance || "-"}</td>
                                               {/* <td>
                                                 <NavLink
                                                   to="/Admin/Manageappointment"
                                                   state={{ patientid: item }}
                                                   className="avtar avtar-xs btn-link-secondary viewIcon"
                                                 >
                                                   <i className="ti ti-eye f-20" />
                                                 </NavLink>
                                                 <a
                                                   href="#"
                                                   className="avtar avtar-xs btn-link-secondary editIcon"
                                                 >
                                                   <i className="ti ti-edit f-20" />
                                                 </a>
                                                 <div
                                                   style={{ cursor: "pointer" }}
                                                   className="avtar avtar-xs btn-link-secondary deleteIcon"
                                                   onClick={() => handledelete(item.id)}
                                                 >
                                                   <i className="ti ti-trash f-20" />
                                                 </div>
                                               </td> */}
                    {/* <td>
                                                 <NavLink
                                                   to="/Admin/Manageappointment"
                                                   state={{ patientid: item }}
                                                   className="avtar avtar-xs btn-link-secondary viewIcon"
                                                 >
                                                   <i className="ti ti-eye f-20" />
                                                   <span>View</span>
                                                 </NavLink>
                                                 <div
                                                   onClick={() => navigate("/Admin/EditPatient", { state: { patientid: item } })}
                                                   style={{ cursor: "pointer" }}
                                                   className="avtar avtar-xs btn-link-secondary editIcon"
                                                 >
                                                   <i className="ti ti-edit f-20" />
                                                 <span>Edit</span>
                                                 </div>
                                                 <div
                                                   style={{ cursor: "pointer" }}
                                                   className="avtar avtar-xs btn-link-secondary deleteIcon"
                                                   onClick={() => handledelete(item.id)}
                                                 >
                                                   <i className="ti ti-trash f-20" />
                                                   <span>Delete</span>
                                                 </div>
                                               </td>
                                             </tr>
                                           ))
                                         ) : (
                                           <tr>
                                             <td colSpan="10" className="text-center">
                                               No patients found.
                                             </td>
                                           </tr>
                                         )}
                                       </tbody> */}
                    {/* </table>
                                   </div>
                                   {/* Pagination */}
                    {/* {totalPages > 1 && (
                                     <nav className="tablepagination">
                                       <ul className="pagination justify-content-end mb-0 me-3">
                                         <li
                                           className={`page-item ${
                                             currentPage === 1 ? "disabled" : ""
                                           }`}
                                         >
                                           <button
                                             className="page-link"
                                             onClick={() =>
                                               currentPage > 1 && setCurrentPage(currentPage - 1)
                                             }
                                           >
                                             &laquo;
                                           </button>
                                         </li>
                                         <li className="pageNmbr">{totalPages}</li>
                                         <li
                                           className={`page-item ${
                                             currentPage === totalPages ? "disabled" : ""
                                           }`}
                                         >
                                           <button
                                             className="page-link"
                                             onClick={() =>
                                               currentPage < totalPages &&
                                               setCurrentPage(currentPage + 1)
                                             }
                                           >
                                             &raquo;
                                           </button>
                                         </li>
                                       </ul>
                                     </nav>
                                   )}
                                 </div>  */}
                    {/* </div>
                  </div> */}
                    <div className="card-body pb-0">
                      <div className="table-responsive table-striped">
                        <table className="table">
                          <thead>
                            <tr>
                              <th>Code</th>
                              <th>Service</th>

                              <th>Insurance</th>
                              <th>Duration</th>
                              <th>type</th>
                              <th className="text-center">Action</th>
                            </tr>
                          </thead>
                        <tbody>
  {patientservice && patientservice.length > 0 ? (
    patientservice.map((item, index) => {
      console.log(item); // 🔍 Log each item
      return (
        <tr key={index}>
          <td>{item.serviceCode}</td>
          <td>{item.serviceName}</td>
          <td>{item.insurance || "-"}</td>
          <td>{item.durationMinutes || "-"}</td>
          <td>{item.type || "-"}</td>
          <td>
            <div className="tableIcon">
              <i className="fas fa-pencil-alt me-2"></i>
              <i className="fas fa-trash"></i>
            </div>
          </td>
        </tr>
      );
    })
  ) : (
    <tr>
      <td colSpan="6" className="text-center">
        No services found.
      </td>
    </tr>
  )}
</tbody>

                          {/* <tbody>
                                        {currentPatients.length > 0 ? (
                                          currentPatients.map((item, index) => (
                                            <tr key={index}>
                                              <td>
                                                <img
                                                  src={`${baseurImage}${item.profileImage}`}
                                                  alt="No Img"
                                                  className="img-radius"
                                                />
                                                <span className="ms-2">
                                                   {item.firstName} {item.lastName}
                                                </span>
                                              </td>
                                              <td>{item.fileNumber}</td>
                                               
                                              <td>{item.gender}</td>
                                              <td>{item.age}</td>
                                              <td>{item.mobileNumber}</td>
                                              <td>{item.Primary_Doctor || "-"}</td>
                                              <td>
                                                {item.lastVisitDate &&
                                                !isNaN(new Date(item.lastVisitDate))
                                                  ? new Date(
                                                      item.lastVisitDate
                                                    ).toLocaleDateString("en-GB")
                                                  : "-"}
                                              </td>
                                              <td>{item.balance || "-"}</td>
                                              {/* <td>
                                                <NavLink
                                                  to="/Admin/Manageappointment"
                                                  state={{ patientid: item }}
                                                  className="avtar avtar-xs btn-link-secondary viewIcon"
                                                >
                                                  <i className="ti ti-eye f-20" />
                                                </NavLink>
                                                <a
                                                  href="#"
                                                  className="avtar avtar-xs btn-link-secondary editIcon"
                                                >
                                                  <i className="ti ti-edit f-20" />
                                                </a>
                                                <div
                                                  style={{ cursor: "pointer" }}
                                                  className="avtar avtar-xs btn-link-secondary deleteIcon"
                                                  onClick={() => handledelete(item.id)}
                                                >
                                                  <i className="ti ti-trash f-20" />
                                                </div>
                                              </td> */}
                          {/* <td>
                                                <NavLink
                                                  to="/Admin/Manageappointment"
                                                  state={{ patientid: item }}
                                                  className="avtar avtar-xs btn-link-secondary viewIcon"
                                                >
                                                  <i className="ti ti-eye f-20" />
                                                  <span>View</span>
                                                </NavLink>
                                                <div
                                                  onClick={() => navigate("/Admin/EditPatient", { state: { patientid: item } })}
                                                  style={{ cursor: "pointer" }}
                                                  className="avtar avtar-xs btn-link-secondary editIcon"
                                                >
                                                  <i className="ti ti-edit f-20" />
                                                <span>Edit</span>
                                                </div>
                                                <div
                                                  style={{ cursor: "pointer" }}
                                                  className="avtar avtar-xs btn-link-secondary deleteIcon"
                                                  onClick={() => handledelete(item.id)}
                                                >
                                                  <i className="ti ti-trash f-20" />
                                                  <span>Delete</span>
                                                </div>
                                              </td>
                                            </tr>
                                          ))
                                        ) : (
                                          <tr>
                                            <td colSpan="10" className="text-center">
                                              No patients found.
                                            </td>
                                          </tr>
                                        )}
                                      </tbody> */}
                        </table>
                      </div>
                      {/* Pagination */}
                      {/* {totalPages > 1 && ( */}
                      {/* <nav className="tablepagination">
                                      <ul className="pagination justify-content-end mb-0 me-3">
                                        <li
                                          className={`page-item ${
                                            currentPage === 1 ? "disabled" : ""
                                          }`}
                                        >
                                          <button
                                            className="page-link"
                                            onClick={() =>
                                              currentPage > 1 && setCurrentPage(currentPage - 1)
                                            }
                                          >
                                            &laquo;
                                          </button>
                                        </li>
                                        <li className="pageNmbr">{totalPages}</li>
                                        <li
                                          className={`page-item ${
                                            currentPage === totalPages ? "disabled" : ""
                                          }`}
                                        >
                                          <button
                                            className="page-link"
                                            onClick={() =>
                                              currentPage < totalPages &&
                                              setCurrentPage(currentPage + 1)
                                            }
                                          >
                                            &raquo;
                                          </button>
                                        </li>
                                      </ul>
                                    </nav> */}
                      {/* )} */}
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="dental"
                  role="tabpanel"
                  aria-labelledby="dental-tab"
                >
                  <h4>Dental Tab</h4>
                  <p>3d view</p>
                  {/* <Ract3d /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
