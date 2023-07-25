import RequestLink from "./RequestLink";

export const Requests = ({ requests }) => {
  const EmptyRequests = () => {
    return (
      <>
        <p>You have no requests.</p>
      </>
    );
  };

  return (
    <>
      {requests && requests.length > 0 ? (
        requests.map((ppe) => (
          <RequestLink
            status={ppe.status}
            id={ppe._id}
            postalCode={ppe.postalCode}
            ppeProfiles={ppe.ppeProfiles}
            createdAt={ppe.createdAt}
          />
        ))
      ) : (
        <EmptyRequests />
      )}
    </>
  );
};

export default Requests;
