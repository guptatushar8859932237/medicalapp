import axios, { Axios } from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseurl } from "../../Baseurl";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
export default function Appointment2() {
  const [modalopen, setModalOpen] = useState(false);
  const [waitngData, setWaitngData] = useState(false);
  const [openmodal, setOpenmodal] = useState(false);
  const [eid, setEid] = useState("");
  const [doctorsdata, setDoctorsdata] = useState([]);
  const [dataConfirm, setDataConfirm] = useState("");
  const [appointmentdata, setAppointmentdata] = useState([]);
  const navigate = useNavigate();
  const handleclickmodal = () => {
    setModalOpen(true);
  };
  const handleclose = () => {
    setModalOpen(false);
    waitingAppointmentList1();
  };
  useEffect(() => {
    waitingAppointmentList1();
  }, []);
  const waitingAppointmentList1 = async () => {
    try {
      const response = await axios.get(`${baseurl}waitingAppointmentList`);
      if (response.data.success === true) {
        setWaitngData(response.data.data);
      } else {
        console.log("some thing went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getdata();
  }, []);
  const getdata = async () => {
    try {
      const response = await axios.get(`${baseurl}getAllAppointments`);
      if (response.data.success === true) {
        setAppointmentdata(response.data.data);
      } else {
        console.log("somenthing went wrng");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleclick = (id) => {
    setEid(id);
    setOpenmodal(true);
  };
  const handleclose22 = () => {
    setOpenmodal(false);
  };
  useEffect(() => {
    getallActiveDoctor();
  }, []);
  const getallActiveDoctor = async () => {
    const response = await axios.get(`${baseurl}getActiveDoctors`);
    setDoctorsdata(response.data.data);
  };

  const handlechange = (e) => {
    const { name, value } = e.target;
    setDataConfirm({ ...dataConfirm, [name]: value });
  };

  const BookingConfirm = async () => {
    const datapost = {
      doctorId: dataConfirm.doctorId,
      startTime: dataConfirm.startTime,
      endTime: dataConfirm.endTime,
    };

    try {
      const response = await axios.post(
        `${baseurl}bookingAppointment/${eid}`,
        datapost
      );

      if (response.data.success === true) {
        Swal.fire("Success!!", "Appointment added successfully.", "success");
        handleclose22();
        handleclose();
        waitingAppointmentList1();
        // You can add toast or modal close here if needed
      } else {
        console.log("API error");
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const handlechangeDropdownData = (e, id) => {
    const { name, value } = e.target;
    uctioncall(value, id);
  };
  const uctioncall = async (value, id) => {
    const datapost = {
      status: value,
    };
    try {
      const response = await axios.post(
        `${baseurl}changeAppointmentStatus/${id}`,
        datapost
      );
      if (response.data.success === true) {
        getdata();
        console.log(response.data);
        toast.success(response.data.message);
      } else {
        console.log("aPi error");
      }
    } catch (error) {
      console.log("Something went wrong");
    }
  };

  const handledelet = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axios.delete(`${baseurl}deleteAppointments/${id}`);
        Swal.fire("Deleted!", "appointment has been deleted.", "success");
        getdata();
      } catch (error) {
        Swal.fire("Error!", "Something went wrong while deleting.", "error");
      }
    }
  };
  return (
    <div className="pc-container">
      <div className="pc-content">
        <div className="col-12">
          <div className="card table-card">
            <div className="card-header">
              <div className="d-sm-flex align-items-center justify-content-between">
                <h5 className="mb-3 mb-sm-0">Appointment list</h5>
                <div>
                  <button
                    className="btn btn-primary my-2 px-4 mx-1"
                    onClick={() => {
                      navigate("/Admin/Addappointment");
                    }}
                  >
                    New Appointment{" "}
                  </button>
                  <button
                    className="btn btn-link my-2 px-4 mx-1 border"
                    onClick={handleclickmodal}
                  >
                    Waiting{" "}
                  </button>
                  <button className="btn btn-link my-2 px-4 mx-1 border">
                    Online Booking{" "}
                  </button>
                </div>
              </div>
            </div>
            <div className="card-body pt-3">
              <div className="table-responsive">
                <table className="table table-hover" id="pc-dt-simple">
                  <thead>
                    <tr>
                      <th>Appointment Date</th>
                      <th>Doctor</th>
                      <th>Patient</th>
                      <th>Reason</th>
                      <th>status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointmentdata && appointmentdata.length > 0 ? (
                      appointmentdata.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td className="mb-0">
                              {new Date(
                                item.appointmentDate
                              ).toLocaleDateString("en-GB")}
                            </td>
                            <td>{item.doctorName}</td>
                            <td>{item.patientName}</td>
                            <td>{item.reason}</td>
                            <td>
                              <select
                                onChange={(e) => {
                                  handlechangeDropdownData(e, item.id);
                                }}
                                name="status"
                                value={item.status}
                                className="bg-white rounded py-1"
                              >
                                <option value="">Select</option>
                                <option value="No-show">No-show</option>
                                <option value="Completed">Completed</option>
                                <option value="Cancelled">Cancelled</option>
                                <option value="Not-Confirmed">
                                  Not Confirmed
                                </option>
                                <option value="Confirmed">Confirmed</option>
                              </select>
                            </td>
                            <td>
                              <a
                                href="#"
                                className="avtar avtar-xs btn-link-secondary"
                              >
                                <i className="ti ti-eye f-20" />
                              </a>
                              <a
                                href="#"
                                className="avtar avtar-xs btn-link-secondary"
                              >
                                <i className="ti ti-edit f-20" />
                              </a>
                              <div
                                onClick={() => {
                                  handledelet(item.id);
                                }}
                                className="avtar avtar-xs btn-link-secondary"
                              >
                                <i className="ti ti-trash f-20" />
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center text-muted">
                          No Data Found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {modalopen && (
          <div
            className="modal fade show"
            style={{ backgroundColor: "rgba(0,0,0,0.5)", display: "block" }}
          >
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Waiting List</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={handleclose}
                  ></button>
                </div>
                <div className="modal-body">
                  {/* Form for adding doctor */}
                  <input
                    className="w-100 py-2 rounded-pill my-2 ps-2"
                    placeholder="Search..."
                  ></input>
                  <table class="table table-striped">
                    <table class="table">
                      <thead>
                        <tr>
                          <th scope="col">File </th>
                          <th scope="col">Name</th>
                          <th scope="col">Phone</th>
                          <th scope="col">Date</th>
                          <th scope="col">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {waitngData && waitngData.length > 0 ? (
                          waitngData.map((item, index) => {
                            console.log(item);
                            return (
                              <>
                                <tr key={index}>
                                  <th scope="row">1</th>
                                  <td>{item.patientName}</td>
                                  <td>@mdo</td>
                                  <td>
                                    {new Date(
                                      item.appointmentDate
                                    ).toLocaleDateString("en-GB")}
                                  </td>
                                  <td>
                                    <div className="d-flex">
                                      <div
                                        className="text-primary"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => {
                                          handleclick(item.id);
                                        }}
                                      >
                                        Book
                                      </div>
                                      <div
                                        className="mx-1 text-danger"
                                        style={{ cursor: "pointer" }}
                                      >
                                        Cancel
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              </>
                            );
                          })
                        ) : (
                          <tr>
                            <td colSpan="5" className="text-center text-muted">
                              No Data Found
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
        {openmodal && (
          <div
            className="modal fade show"
            style={{ backgroundColor: "rgba(0,0,0,0.5)", display: "block" }}
          >
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Confirm Booking</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={handleclose22}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-6">
                      <label className="form-label">Start Time</label>
                      <input
                        type="time"
                        name="startTime"
                        onChange={handlechange}
                        className="form-control"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">End Time</label>
                      <input
                        type="time"
                        name="endTime"
                        onChange={handlechange}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label className="form-label">Doctor </label>
                      <br />
                      <select
                        className="w-100 py-2 bg-light rounded"
                        name="doctorId"
                        onChange={handlechange}
                      >
                        <option>Select...</option>
                        {doctorsdata &&
                          doctorsdata.length > 0 &&
                          doctorsdata.map((item, index) => {
                            console.log(item);
                            return (
                              <>
                                <option key={index} value={item.id}>
                                  {item.fullName}
                                </option>
                              </>
                            );
                          })}
                      </select>
                    </div>
                  </div>
                  {/* </table> */}

                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => handleclose22()}
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={BookingConfirm}
                    >
                      Save changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}
