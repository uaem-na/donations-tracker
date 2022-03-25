import { useState, useEffect } from "react";

export const EditPPE = ({ ppe, setPPE }) => {
  const [type, setType] = useState("masks");
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");

  const addPPE = (e) => {
    e.preventDefault();
    const newObj = {
      category: type,
      description: desc,
      quantity: amount,
    };
    setPPE([...ppe, newObj]);
    setAmount("");
    setDesc("");
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
    </section>
  );
};

export default EditPPE;
