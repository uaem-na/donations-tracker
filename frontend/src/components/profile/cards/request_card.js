export const RequestCard = ({reportIds, ppeProfiles, date, status}) => {
    let statuses = ["Completed", "In Progress", "Under Approval"]
    let statusColors = ["text-green-600", "text-yellow-500", "text-blue-400"]
    return(
        <div className="inline-block px-3 font-semibold">
                <div className="p-6 w-64 h-80 max-w-xs overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
                    <h2 className="text-2xl text-gray-700 mb-2">{date}</h2>
                    <h3 className={`text-xl text-gray-700 mb-2 ${statusColors[status]}`}>{statuses[status]}</h3>
                    <h3 className="text-gray-700">Offered PPE:</h3>
                    <div className="mb-2">
                        <ul className="list-disc">
                            {ppeProfiles.map((ppe) => (
                                <li className="ml-4">{ppe}</li>
                            ))}
                        </ul>
                    </div>
                    <h3 className="text-gray-400">Associated IDs:</h3>
                    <p className="text-gray-400">
                        {reportIds.map((item, index) => ((index ? ', ': '') + item))}
                    </p>
                </div>
        </div>
    )
}

export default RequestCard;