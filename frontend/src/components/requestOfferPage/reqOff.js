import Userfront from "@userfront/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EditPPE from "./sections/editppe";
import Location from "./sections/location";
import ViewPPE from "./sections/viewppe";

Userfront.init("8nwrppdb");
const userData = JSON.parse(JSON.stringify(Userfront.user, null, 2));

function validPostal(value) {
  var regex =
    /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i;
  return regex.exec(value);
}

export const ReqOff = ({ offer, edit }) => {
  const navigate = useNavigate();
  const params = useParams();
  const [ppe, setPPE] = useState([]);

  var typeReq = "";
  var pageDesc = "";
  if (edit) {
    if (offer) {
      typeReq = "Submit a PPE Offer";
      pageDesc =
        "This will go into our database and other contributors will be able to request available PPE from you.";
    } else {
      typeReq = "Make a PPE Request";
      pageDesc =
        "This will go into our database and other contributors will be able to view your PPE request.";
    }
  } else {
    if (offer) {
      typeReq = "View a PPE Offer";
      pageDesc = `You are viewing a PPE offer with ID ${params.id}.`;
    } else {
      typeReq = "View a PPE Request";
      pageDesc = `You are viewing a PPE request with ID ${params.id}.`;
    }
  }
  const [localEdit, setLocalEdit] = useState(edit);
  const [postal, setPostal] = useState("");
  const [postalError, setPostalError] = useState("");
  const [ppeDescError, setppeDescError] = useState(false);
  const [ppeNumError, setppeNumError] = useState(false);

  const deleteInDB = () => {
    if (offer) {
      axios
        .delete(`/offers/${params.id}`)
        .then((response) => {
          console.log(response.data);
          navigate("/dashboard");
        })
        .catch((e) => {
          console.log(e.response);
        });
    } else {
      axios
        .delete(`/requests/${params.id}`)
        .then((response) => {
          console.log(response.data);
          navigate("/dashboard");
        })
        .catch((e) => {
          console.log(e.response);
        });
    }
  };

  const handleSubmit = (e) => {
    // TODO: handle put request for editing
    e.preventDefault();

    if (!(ppe.length > 0)) {
      setppeDescError(true);
      setppeNumError(true);
    } else if (!validPostal(postal)) {
      setPostalError(true);
    } else {
      setPostalError(false);
      setppeNumError(false);
      setppeDescError(false);
      if (offer) {
        axios
          .post("/offers", {
            userId: userData.username,
            ppeProfiles: ppe,
            postalCode: postal,
          })
          .then((response) => {
            console.log(response.data);
            setLocalEdit(false);
            navigate(`/request/${response.data._id}`);
          })
          .catch((e) => {
            console.log(e.response);
          });
      } else {
        axios
          .post("/requests", {
            userId: userData.username,
            ppeProfiles: ppe,
            postalCode: postal,
          })
          .then((response) => {
            console.log(response.data);
            setLocalEdit(false);
            navigate(`/request/${response.data._id}`);
          })
          .catch((e) => {
            console.log(e.response);
          });
      }
    }
  };

  useEffect(() => {
    if (!edit) {
      console.log(params.id);
      if (offer) {
        axios
          .get(`/offers/${params.id}`)
          .then((response) => {
            console.log(response.data);
            setPPE(response.data.ppeProfiles);
            setPostal(response.data.postalCode);
          })
          .catch((e) => {
            console.log(e.response);
          });
      } else {
        axios
          .get(`/requests/${params.id}`)
          .then((response) => {
            console.log(response.data);
            setPPE(response.data.ppeProfiles);
            setPostal(response.data.postalCode);
          })
          .catch((e) => {
            console.log(e.response);
          });
      }
    }
  }, []);

  return (
    <div>
      <div className="container mx-auto my-4">
        <div>
          <form onSubmit={handleSubmit} method="POST">
            <div className="shadow sm:rounded-md sm:overflow-hidden">
              <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                <div className="px-4 sm:px-0">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    {typeReq}
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">{pageDesc}</p>
                </div>
              </div>
              <section id="ppe" className="px-4 py-5 bg-white sm:p-6">
                <ViewPPE ppe={ppe} localEdit={localEdit} setPPE={setPPE} />
                {localEdit && (
                  <EditPPE
                    ppeDescError={ppeDescError}
                    ppeNumError={ppeNumError}
                    setppeDescError={setppeDescError}
                    setppeNumError={setppeNumError}
                    ppe={ppe}
                    setPPE={setPPE}
                  />
                )}
              </section>
              <Location
                postal={postal}
                localEdit={localEdit}
                setPostal={setPostal}
                postalError={postalError}
              />
              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                {!edit && (
                  <button
                    type="button"
                    onClick={() => deleteInDB()}
                    className="cursor-pointer inline-flex justify-center mr-2 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Delete
                  </button>
                )}
                {localEdit !== edit && (
                  <button
                    type="button"
                    onClick={() => setLocalEdit(!localEdit)}
                    className="cursor-pointer inline-flex justify-center mr-2 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Cancel
                  </button>
                )}
                {localEdit ? (
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Submit
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setLocalEdit(!localEdit)}
                    className="cursor-pointer inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReqOff;
