import { useState, useEffect } from "react";
import EditPPE from "./sections/editppe";
import Location from "./sections/location";
import ViewPPE from "./sections/viewppe";

export const ReqOff = ({ offer, edit }) => {
  const [ppe, setPPE] = useState([]);
  
  var typeReq = "";
  var pageDesc = "";
  if (edit) {
    if (offer) {
      typeReq = "Submit a PPE Offer";
      pageDesc =
        "This will go into our database and other contributors will be able to request available PPE from you.";
    } else {
      typeReq = "Submit a PPE Request";
      pageDesc =
        "This will go into our database and other contributors will be able to view your PPE request.";
    }
  } else {
    if (offer) {
      typeReq = "View a PPE Offer";
      pageDesc =
        "You are viewing a PPE offer.";
    } else {
      typeReq = "View a PPE Request";
      pageDesc =
        "You are viewing a PPE request.";
    }
  }
  const [localEdit, setLocalEdit] = useState(edit);
  const [type, setType] = useState("gloves");
  const [postal, setPostal] = useState("");

  useEffect(() => {
    // TODO: request if not in edit mode
    if (!edit) {
      setPPE([
        { type: "masks", amount: "100", desc: "Surgical" },
        { type: "gloves", amount: "100", desc: "Surgical" },
        { type: "masks", amount: "1000", desc: "KN-95" },
      ]);
      setPostal("H3A1G3")
    }
  }, []);

  return (
    <div>
      <div className="container mx-auto my-4">
        <div>
          <form action="#" method="POST">
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
                  <ViewPPE ppe={ppe} localEdit={localEdit} setPPE={setPPE}/>
                  {localEdit && (
                    <EditPPE ppe={ppe} setPPE={setPPE}/>
                  )}
              </section>
              <Location postal={postal} localEdit={localEdit} setPostal={setPostal}/>
              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                {localEdit != edit && (
                  <a
                    type="submit"
                    onClick={() => setLocalEdit(!localEdit)}
                    className="cursor-pointer inline-flex justify-center mr-2 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Cancel
                  </a>
                )}
                {localEdit ? (
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Submit
                  </button>
                ) : (
                  <a
                    type="submit"
                    onClick={() => setLocalEdit(!localEdit)}
                    className="cursor-pointer inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Edit
                  </a>
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
