import RequestCard from "./request_card";

export const PPERequests = () => {
  let ppeTypeDummy = ["Gloves", "Masks", "KN-95"];
  let reportIds = [112, 343434, 34343, 3555, 5553];
  let date = "12/2/22"  

    return(
        <div className="flex overflow-x-scroll hide-scroll-bar">
            <div className="flex flex-nowrap p-10">
              <RequestCard reportIds={reportIds} ppeProfiles={ppeTypeDummy} date={date} status={1}/>
              <RequestCard reportIds={reportIds} ppeProfiles={ppeTypeDummy} date={date} status={2}/>
              <RequestCard reportIds={reportIds} ppeProfiles={ppeTypeDummy} date={date} status={0}/>
              <RequestCard reportIds={reportIds} ppeProfiles={ppeTypeDummy} date={date} status={1}/>
              <RequestCard reportIds={reportIds} ppeProfiles={ppeTypeDummy} date={date} status={2}/>
            </div>
          </div>
    )
}

export default PPERequests;