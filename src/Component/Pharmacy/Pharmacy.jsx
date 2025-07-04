import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseurl } from "../../Baseurl";
import Swal from "sweetalert2";
export default function Pharmacy() {
  const [activeTab, setActiveTab] = useState("tab1");
  const [modalOpen, setModalOpen] = useState(false);
  const [data, setData] = useState("");
  const [drugs,setDrugs] = useState(false);

  const handleclick = () => {
    setModalOpen(true);
  };

  useEffect(()=>{
    getdata()
  },[])
 const getdata = async () => {
  try {
    const response = await axios.get(`${baseurl}getDrugs`);

    if (response.data?.success===true) {
      setDrugs(response.data.data);
    } else {
      console.warn("Drugs data not received properly:", response.data);
      alert("Failed to fetch drugs data.");
    }
  } catch (error) {
    if (error.response) {
      console.error("Server responded with error:", error.response.data);
      alert(`Error: ${error.response.data.message || "Something went wrong."}`);
    } else if (error.request) {
      console.error("No response received from server:", error.request);
      alert("No response from server. Please check your internet connection.");
    } else {
      console.error("Error setting up request:", error.message);
      alert(`Error: ${error.message}`);
    }
  }
};

const handlechange =(e)=>{
  const {name,value}=e.target
  setData({...data,[name]:value})
}

const apihitnav = async () => {
  const datapost = {
    name: data?.name || '',
    substance: data?.substance || '',
    unit_of_measurement: data?.unit_of_measurement || '',
    company: data?.company || '',
    quality: data?.quality || '',
    expiration_date: data?.expiration_date || '',
    cost: data?.cost || '',
    price: data?.price || '',
  };

  try {
    // Basic validation (optional: customize according to your form requirements)
    for (let key in datapost) {
      if (datapost[key] === '') {
        console.error(`Missing field: ${key}`);
        return;
      }
    }

    const response = await axios.post(`${baseurl}addDrug`, datapost);

    if (response?.data?.success === true) {
      setModalOpen(false)
       getdata()
     Swal.fire("Success!!", " Add Drug Successfully.", "success");
    } else {
      console.error('❌ Something went wrong:', response?.data?.message || 'Unknown error');
    }
  } catch (error) {
    if (error.response) {
      // Server responded with status other than 2xx
      console.error('❌ Server Error:', error.response.data.message || error.response.data);
    } else if (error.request) {
      // Request was made but no response received
      console.error('❌ Network Error: No response received from server');
    } else {
      // Error setting up the request
      console.error('❌ Request Error:', error.message);
    }
  }
};

  return (
    <div className="pc-container">
      <div className="pc-content ">
        <div>
          <div className="container mt-4">
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === "tab1" ? "active" : ""}`}
                  onClick={() => setActiveTab("tab1")}
                >
                  Inventory
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === "tab2" ? "active" : ""}`}
                  onClick={() => setActiveTab("tab2")}
                >
                  Rx standard List
                </button>
              </li>
            </ul>

            <div className="mt-3">
              {activeTab === "tab1" && (
                <div className="col-12">
                  <div className="card table-card">
                    <div className="card-header">
                      <div className="d-sm-flex align-items-center justify-content-between">
                        <h5 className="mb-3 mb-sm-0">Medicine List</h5>
                        <div>
                          <button
                            className="btn btn-primary my-2 px-4"
                            style={{ cursor: "pointer" }}
                            onClick={handleclick}
                          >
                            Add Item
                          </button>
                          <button
                            className="btn btn-light my-2 px-4 mx-2"
                            style={{ cursor: "pointer" }}
                          >
                            Categories
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="card-body pt-3">
                      <div className="table-responsive">
                        <table className="table table-hover" id="pc-dt-simple">
                          <thead>
                            <tr>
                              <th>Photo</th>
                              <th>ID</th>
                              <th>Category</th>
                              <th>Name</th>
                              <th>Substance</th>
                              <th>Strength </th>
                              <th>Unit</th>
                              <th>Company</th>
                              <th>Quantity</th>
                              <th>Expiry</th>
                              <th>Cost</th>
                              <th>Price</th>
                              <th>Control</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              drugs && drugs.length>0 && drugs.map((item,index)=>{
                                console.log(item)
                                return(
                                  <>
                                   <tr key={index}>
                              
                              <td>""</td>
                              <td>{item.id}</td>
                              <td>""</td>
                              <td>{item.name}</td>
                              <td>{item.substance}</td>
                              <td>""</td>
                              <td>{item.unit_of_measurement}</td>
                              <td>{item.company}</td>
                              <td>{item.quality}</td>
                              <td>{new Date(item.expiration_date).toLocaleDateString("en-GB")}</td>
                              <td>{item.cost}</td>
                              <td>{item.price}</td>
                              <td>""</td>
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
                                )
                              })
                            }
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {activeTab === "tab2" && <div>This is content for Tab 2</div>}
            </div>
          </div>
        </div>
      </div>
      <div
        className={`modal ${modalOpen ? "show" : ""}`}
        style={{
          display: modalOpen ? "block" : "none",
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Item</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setModalOpen(false)}
              ></button>
            </div>
            <div className="modal-body">
              <div className="container ">
                <form>
                  <div className="row">
                    <div className="col-md-2 d-flex justify-content-center align-items-start">
                      <div
                        style={{
                          width: "100px",
                          height: "100px",
                          borderRadius: "50%",
                          backgroundColor: "#ccc",
                        }}
                      ></div>
                    </div>
                    <div className="col-md-10">
                      <div className="row mb-3">
                        <div className="col-md-4">
                          <label className="form-label">Name</label>
                          <input type="text"  className="form-control" onChange={handlechange} name="name" />
                        </div>
                        <div className="col-md-4">
                          <label className="form-label">Substance</label>
                          <input type="text" className="form-control"  onChange={handlechange} name="substance" />
                        </div>
                        <div className="col-md-4">
                          <label className="form-label">Unit of Measurement</label>
                          <input type="text" className="form-control"  onChange={handlechange} name="unit_of_measurement" />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-md-4">
                          <label className="form-label">
                            Company
                          </label>
                          <input type="text"  onChange={handlechange} className="form-control" name="company" />
                        </div>
                        <div className="col-md-4">
                          <label className="form-label">Quality</label>
                          <input type="text"  onChange={handlechange} className="form-control" name="quality" />
                        </div>
                        <div className="col-md-4">
                          <label className="form-label">Expiration Date</label>
                          <input type="date"  onChange={handlechange} className="form-control" name="expiration_date" />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-md-4">
                          <label className="form-label">Cost</label>
                          <input type="text"  onChange={handlechange} className="form-control" name="cost" />
                        </div>
                        <div className="col-md-4">
                          <label className="form-label">Price</label>
                          <input type="text"  onChange={handlechange} className="form-control" name="price" />
                        </div>
                      
                      </div>
                     
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setModalOpen(false)}
              >
                Close
              </button>
              <button type="button" onClick={apihitnav} className="btn btn-primary">
                Add Drug
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
