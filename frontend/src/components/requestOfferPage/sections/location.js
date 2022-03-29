export const Location = ({postal, setPostal, localEdit, postalError}) => {
    return(
        <section id="location" className="px-4 py-5 bg-white sm:p-6">
                {localEdit ? (
                  <section id="editlocation">
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
                            setPostal(e.target.value.toUpperCase().replace(/[^a-z0-9]/gi,'').substring(0,6))
                          }
                          placeholder="e.g. H3A1G3"
                          autoComplete="postal-code"
                          className={`mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md `+ (postalError && `border-red-500 bg-red-200`)}
                        />
                        {postalError && (<p className="text-sm text-red-500 p-1">Invalid postal code.</p>)}
                      </div>
                      <div className="col-span-6">
                        <p className="text-sm text-black">
                          Note: For now this service is only available in the
                          Greater Montreal area.
                        </p>
                      </div>
                    </div>
                  </section>
                ) : (
                  <div>
                    <p className="block text-sm font-medium text-gray-700 mb-2">
                        PPE Location: {postal}
                      </p>
                  </div>
                )}
              </section>
    )
}

export default Location;