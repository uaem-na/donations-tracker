import { useState } from "react";

export const EditPPE = ({
  ppe,
  setPPE,
  ppeDescError,
  ppeNumError,
  setppeDescError,
  setppeNumError,
}) => {
  const [type, setType] = useState("masks");
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");

  const addPPE = (e) => {
    e.preventDefault();
    if (desc && amount) {
      setppeNumError(false);
      setppeDescError(false);
      const newObj = {
        category: type,
        description: desc,
        quantity: amount,
      };
      setPPE([...ppe, newObj]);
      setAmount("");
      setDesc("");
    } else if (desc) {
      setppeNumError(true);
      setppeDescError(false);
    } else if (amount) {
      setppeDescError(true);
      setppeNumError(false);
    } else {
      setppeNumError(true);
      setppeDescError(true);
    }
  };

  return (
    <section id="editppe" className="grid grid-cols-6 gap-6">
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
          placeholder="e.g. KN-95 Surgical Masks"
          onChange={(e) => setDesc(e.target.value)}
          autoComplete="desc"
          className={
            `mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ` +
            (ppeDescError && `border-red-500 bg-red-200`)
          }
        />
      </div>
      <div className="col-span-3 sm:col-span-3 lg:col-span-2">
        <label
          htmlFor="amount"
          className="block text-sm font-medium text-gray-700"
        >
          Quantity
        </label>
        <input
          type="text"
          name="quantity"
          id="quantity"
          value={amount}
          onChange={(e) => setAmount(e.target.value.replace(/[^0-9]/gi, ""))}
          autoComplete="quantity"
          placeholder="e.g. 52"
          className={
            `mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ` +
            (ppeNumError && `border-red-500 bg-red-200`)
          }
        />
      </div>
      {(ppeNumError || ppeDescError) &&
        (ppeNumError && ppeDescError && ppe.length === 0 ? (
          <div className="col-span-6 text-sm text-red-500 p-1">
            Please add at least one PPE item.
          </div>
        ) : (
          <div className="col-span-6 text-sm text-red-500 p-1">
            Please fill in all the PPE item fields.
          </div>
        ))}
      <div className="col-span-6 text-right">
        <button
          onClick={addPPE}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add
        </button>
      </div>
    </section>
  );
};

export default EditPPE;
