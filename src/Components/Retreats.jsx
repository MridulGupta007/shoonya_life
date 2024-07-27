import React, { useContext, useEffect, useState } from "react";
import RetreatCard from "./RetreatCard";
import { UrlContext } from "../App";

function Retreats() {
  const urlContext = useContext(UrlContext);

  // disable state for Previous Button
  const [prevDisabled, setPrevDisabled] = useState(true);

  // UseEffect manages the disabled state for Previous Button
  useEffect(() => {
    setPrevDisabled(urlContext.pageNum === 1);
  }, [urlContext.pageNum]);

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col gap-y-3 md:flex-row flex-wrap md:justify-between">

        {/* if data is correctly received, only then data is mapped */}
        {urlContext.receivedData ? (
          urlContext.data.map((elem, index) => {
            return <RetreatCard elem={elem} key={index} />;
          })
        ) : (
          <p>No data Available</p>
        )}


      </div>
      <div className="flex justify-center gap-x-3 mt-3 md:mt-7">
        <button
          className="bg-[#1b3252] rounded-full md:rounded-lg text-white px-4 py-3 md:min-w-40"
          disabled={prevDisabled}
          onClick={() => {
            // setting pageNum -= 1
            urlContext.setPageNum((prev) => prev !== 1 && prev - 1);
          }}
        >
          Previous
        </button>
        <button
          className="bg-[#1b3252] rounded-full md:rounded-lg text-white px-4 py-3 md:min-w-40"
          onClick={() => {
            // setting pageNum += 1
            urlContext.setPageNum((prev) => prev + 1);
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Retreats;
