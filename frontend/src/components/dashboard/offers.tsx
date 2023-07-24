import OfferLink from "./offerLink";

const EmptyOffers = () => {
  return (
    <>
      <p>You have no offers.</p>
    </>
  );
};

export const Offers = ({ offers }) => {
  return (
    <>
      {offers && offers.length > 0 ? (
        offers.map((ppe) => (
          <OfferLink
            key={ppe._id}
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
