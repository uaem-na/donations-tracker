import { useState, useEffect } from "react";

export const NewReqOff = ({offer}) => {
  var typeReq = ""
  var pageDesc = ""
  if(offer){
    typeReq = "Offer"
    pageDesc = "This will go into our database and other contributors will be able to request available PPE from you."
  } else {
    typeReq = "Request"
    pageDesc = "This will go into our database and other contributors will be able to view your PPE request."
  }

  const [ppe, setPPE] = useState([]);
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("gloves");
  const [postal, setPostal] = useState("");

  const removePPE = (i) => {
    setPPE(ppe.slice(0, i).concat(ppe.slice(i + 1)));
  };

  const addPPE = (e) => {
    e.preventDefault();
    const newObj = {
      type: type,
      desc: desc,
      amount: amount,
    };
    ppe.push(newObj);
    setAmount("");
    setDesc("");
  };

  return (
    <div>
      <div className="container mx-auto my-4">
        <div>
          <form action="#" method="POST">
            <div className="shadow sm:rounded-md sm:overflow-hidden">
              <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                <div className="px-4 sm:px-0">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Submit a PPE {typeReq}
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">
                    {pageDesc}
                  </p>
                </div>
              </div>
              <section id="ppe" className="px-4 py-5 bg-white sm:p-6">
                <section id="location">
                  <div className="grid grid-cols-6 gap-6">
                    {ppe.length > 0 && (
                      <div className="col-span-6">
                          <p
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Added PPE:
                      </p>
                        <div className="grid grid-cols-6">
                          {ppe.map((p, i) => (
                            <div className="col-span-3 mr-2 text-sm font-medium text-gray-700 p-4 border-2 rounded-md">
                              <p>
                                <span className="font-bold">Type: </span>
                                {p.type}
                              </p>
                              <p>
                                <span className="font-bold">Description: </span>
                                {p.desc}
                              </p>
                              <p>
                                <span className="font-bold">Amount: </span>
                                {p.amount}
                              </p>
                              <a
                                className="cursor-pointer inline-flex justify-center mt-2 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                onClick={() => removePPE(i)}
                              >
                                Remove
                              </a>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Type of PPE
                      </label>
                      <select
                        id="country"
                        name="country"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        autoComplete="country-name"
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option value="gloves">Gloves</option>
                        <option value="masks">Masks</option>
                      </select>
                    </div>
                    <div className="col-span-6 sm:col-span-6 lg:col-span-4">
                      <label
                        htmlFor="desc"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Description
                      </label>
                      <input
                        type="text"
                        name="desc"
                        id="desc"
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                        autoComplete="desc"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="col-span-3 sm:col-span-3 lg:col-span-2">
                      <label
                        htmlFor="amount"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Amount
                      </label>
                      <input
                        type="text"
                        name="amount"
                        id="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        autoComplete="amount"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="col-span-6 text-right">
                      <button
                        onClick={addPPE}
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </section>
              </section>
              <section id="location" className="px-4 py-5 bg-white sm:p-6">
                <section id="location">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Country
                      </label>
                      <select
                        disabled
                        id="country"
                        name="country"
                        autoComplete="country-name"
                        className="bg-gray-100 mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option>Canada</option>
                      </select>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="province"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Province
                      </label>
                      <select
                        disabled
                        id="province"
                        name="province"
                        autoComplete="province-name"
                        className="bg-gray-100 mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option>Quebec</option>
                      </select>
                    </div>
                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label
                        htmlFor="postal-code"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Postal code
                      </label>
                      <input
                        type="text"
                        name="postal-code"
                        id="postal-code"
                        value={postal}
                        onChange={(e) =>
                          setPostal(e.target.value.toUpperCase())
                        }
                        autoComplete="postal-code"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="col-span-6">
                      <p className="text-sm text-black">
                        Note: For now this service is only available in the
                        Greater Montreal area.
                      </p>
                    </div>
                  </div>
                </section>
              </section>
              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewReqOff;
