import OfferLink from "./offerLink";

export const Offers = ({ offers }) => {
  const EmptyOffers = () => {
    return (
      <>
        <p>You have no offers.</p>
      </>
    );
  };
  return (
    <>
      {offers && offers.length > 0 ? (
        offers.map((ppe) => (
          <OfferLink
            id={ppe._id}
            postalCode={ppe.postalCode}
            ppeProfiles={ppe.ppeProfiles}
            createdAt={ppe.createdAt}
          />
        ))
      ) : (
        <EmptyOffers />
      )}
    </>
  );
};

export default Offers;
