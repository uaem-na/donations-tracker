export const ViewPPE = ({ ppe, localEdit, setPPE }) => {
  const removePPE = (i) => {
    setPPE(ppe.slice(0, i).concat(ppe.slice(i + 1)));
  };

  return (
    <>
      {ppe && ppe.length > 0 && (
        <div className="col-span-6">
          <p className="block text-sm font-medium text-gray-700 mb-2">
            Added PPE:
          </p>
          <div className="grid grid-cols-6">
            {ppe.map((p, i) => (
              <div className="col-span-3 mr-2 text-sm font-medium text-gray-700 mb-2 p-4 border-2 rounded-md">
                <p>
                  <span className="font-bold">Category: </span>
                  {p.category}
                </p>
                <p>
                  <span className="font-bold">Description: </span>
                  {p.description}
                </p>
                <p>
                  <span className="font-bold">Amount: </span>
                  {p.quantity}
                </p>
                {localEdit && (
                  <button
                    type="button"
                    className="cursor-pointer inline-flex justify-center mt-2 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    onClick={() => removePPE(i)}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ViewPPE;
