import OfferCard from "./offer_card";

export const PPEOffers = () => {
  let ppeTypeDummy = ["Gloves", "Masks", "KN-95"];
  let reportIds = [112, 343434, 34343, 3555, 5553];
  let date = "12/2/22"

    return(
        <div className="flex overflow-x-scroll hide-scroll-bar">
            <div className="flex flex-nowrap p-10">
              <OfferCard reportIds={reportIds} ppeProfiles={ppeTypeDummy} date={date}/>
              <OfferCard reportIds={reportIds} ppeProfiles={ppeTypeDummy} date={date}/>
              <OfferCard reportIds={reportIds} ppeProfiles={ppeTypeDummy} date={date}/>
              <OfferCard reportIds={reportIds} ppeProfiles={ppeTypeDummy} date={date}/>
            </div>
          </div>
    )
}

export default PPEOffers;