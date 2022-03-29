import OfferCard from "./offer_card";

export const PPEOffers = (offers) => {
    return(
      <>
      {/* theres a weird bug where it is passed as an object */}
      {offers.offers.length>0 && offers.offers.map((ppe) => (
        <OfferCard id={ppe._id} postalCode={ppe.postalCode} ppeProfiles={ppe.ppeProfiles} createdAt={ppe.createdAt}/>
      ))}
      </>
    )
}

export default PPEOffers;