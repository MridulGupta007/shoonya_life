import React, { useContext, useEffect, useState } from "react";
import RetreatCard from "./RetreatCard";
import { RetreatContext } from "../App";

function Retreats() {
  const retreatContext = useContext(RetreatContext);
  const { receivedNullData, singleRetreat, retreatList, setPageNum, pageNum, setParamObject, paramObject } = retreatContext;
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col gap-y-3 md:flex-row flex-wrap md:justify-between">
        {!receivedNullData ? (
          retreatList && retreatList.length > 0 ? (
            retreatList.map((elem, index) => {
              return <RetreatCard elem={elem} key={index} />;
            })
          ) : (
            <RetreatCard elem={singleRetreat} />
          )
        ) : (
          <p>No Data Available</p>
        )}
      </div>
      <div className="flex justify-center gap-x-3 mt-3 md:mt-7">
        <button
          className="bg-[#1b3252] rounded-full md:rounded-lg text-white px-4 py-3 md:min-w-40"
          onClick={(event) => {
            const newObj = {
              ...paramObject,
              page: pageNum - 1
            }
            setParamObject(newObj)
            setPageNum(prev => prev - 1)
          }}
        >
          Previous
        </button>
        <button
          className="bg-[#1b3252] rounded-full md:rounded-lg text-white px-4 py-3 md:min-w-40"
          onClick={(event) => {
            const newObj = {
              ...paramObject,
              page: pageNum + 1
            }
            setParamObject(newObj)
            setPageNum(prev => prev + 1)
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Retreats;
