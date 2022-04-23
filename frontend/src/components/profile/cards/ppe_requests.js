import RequestCard from "./request_card";

export const PPERequests = (requests) => {
    return(
      <>
      {/* theres a weird bug where it is passed as an object */}
      {requests.requests && requests.requests.map((ppe) => (
        <RequestCard status={ppe.status} id={ppe._id} postalCode={ppe.postalCode} ppeProfiles={ppe.ppeProfiles} createdAt={ppe.createdAt}/>
      ))}
      </>
    )
}

export default PPERequests;