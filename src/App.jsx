import React, { createContext, useEffect, useState } from "react";
import Retreats from "./Components/Retreats";
import Footer from "./Components/Footer";
import { debounce } from "lodash";
import { data } from "autoprefixer";

const RetreatContext = createContext();
export { RetreatContext };

function App() {
  // URL setup
  const baseUrl = new URL(
    "https://669f704cb132e2c136fdd9a0.mockapi.io/api/v1/retreats"
  );
  const [url, setUrl] = useState(baseUrl);

  // store fetched data for multiple retreats
  const [retreatList, setRetreatList] = useState([]);

  // storing an object of params
  const [paramObject, setParamObject] = useState({ page: 1, limit: 3 });

  // store fetched data for single retreat
  const [singleRetreat, setSingleRetreat] = useState({});

  // verify null response from API
  const [receivedNullData, setReceivedNullData] = useState(false);

  // manage pages
  const [pageNum, setPageNum] = useState(1);

  // create URL with added params in base URL
  const createUrl = (obj) => {

    // converting the params object to strings
    const newParams = new URLSearchParams([...Object.entries(obj)]).toString();

    // new url is generated from baseURl
    const newUrl = new URL(`${baseUrl.origin}${baseUrl.pathname}?${newParams}`);
    return newUrl.href;
  };

  // fetch data function
  // 'single' param checks whether the url fetches single retreat or multiple
  const fetchData = debounce(async (url, single) => {
    try {
      const fetchedData = await fetch(url);

      if (fetchedData.status >= 400 && fetchedData.status <= 499) {
        
        setReceivedNullData(true);
      } else {
        setReceivedNullData(false)
        const fetchedDataToJson = await fetchedData.json();
        
        if (single) {
          
          setRetreatList([])
          setSingleRetreat(fetchedDataToJson);
         
        } else {
          
          setRetreatList(fetchedDataToJson);
          
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, 100);

  useEffect(() => {
    // generating Initial URL for request with parameters
    const initialReq = createUrl(paramObject);
    
    // maintaining URL state for future considerations
    setUrl(initialReq);

    // making request
    fetchData(initialReq, false);
  }, [paramObject]);

  return (
    <RetreatContext.Provider
      value={{
        singleRetreat,
        retreatList,
        pageNum,
        setPageNum,
        setUrl,
        url,
        createUrl,
        receivedNullData,
        paramObject,
        setParamObject,
      }}
    >
      <>
        <Navbar />

        <div className="flex flex-col gap-y-4 px-3 md:px-4 lg:px-5 py-2 md:py-3 lg:py-4 mb-16 md:mb-0 font-open-sans">
          {/*Not for Mobile View  */}
          <div className="hidden md:flex md:flex-col md:gap-y-3 bg-[#e0d9cf] md:h-[30vh] lg:h-[50vh] px-10 py-5 rounded-lg shadow-xl">
            <div className="bg-wellness h-5/6 object-cover bg-center rounded-lg"></div>
            <h1 className="text-[20px]">Discover Your Inner Peace</h1>
            <p className="text-[16px]">
              Join us for a series of wellness retreats designed to help you
              find tranquility and rejuvenation.
            </p>
          </div>

          {/* Filter Section */}
          <div className="flex flex-col gap-y-2 md:flex-row justify-between">
            <div className="flex flex-col gap-y-2 md:flex-row md:gap-x-8">
              <input
                type="date"
                className="px-2 py-3 outline-none focus:outline-none active:outline-none bg-[#efefef] md:bg-[#1b3252] rounded-md md:text-white md:placeholder:text-white md:w-20 lg:w-40"
                onChange={(event) => {
                  if (event.target.value) {
                    const unixTimeStamp = Math.floor(
                      new Date(event.target.value).getTime() / 1000
                    );
                    const existingParams = new URLSearchParams(url.search);

                    if (existingParams.has("date")) {
                      const newObj = {
                        ...paramObject,
                        date: unixTimeStamp,
                      };

                      setParamObject(newObj);
                    } else {
                      const newObj = {
                        ...paramObject,
                        date: unixTimeStamp,
                      };

                      setParamObject(newObj);
                    }
                  } else {
                    const newObj = {...paramObject}
                    delete newObj.date
                    setParamObject(newObj);
                  }
                }}
              />
              <select
                name="type"
                id="type"
                className="px-2 py-3 outline-none focus:outline-none active:outline-none bg-[#efefef] md:bg-[#1b3252] rounded-md md:text-white md:placeholder:text-white md:w-20 lg:w-40"
                onChange={(event) => {
                  // checking for null or undefined values
                  if (event.target.value) {
                    // destructure existing params
                    const existingParams = new URLSearchParams(url.search);

                    // verify if filter param exist
                    if (existingParams.has("filter")) {
                      // if TRUE
                      const newObj = {
                        ...paramObject,
                        filter: event.target.value,
                      };
                      setParamObject(newObj);
                    } else {
                      // if FALSE
                      const newObj = {
                        ...paramObject,
                        filter: event.target.value,
                      };
                      setParamObject(newObj);
                    }
                  } else {
                    // if the current value is either undefined or NULL
                    
                    const newObj = {...paramObject}
                    delete newObj.filter
                    setParamObject(newObj);
                  }
                }}
              >
                <option value="" selected>
                  Filter by Type
                </option>
                <option value="Yoga">Yoga</option>
                <option value="Detox">Detox</option>
                <option value="Wellness">Wellness</option>
              </select>
            </div>
            <input
              type="text"
              placeholder="Search retreats by title"
              className="outline-none focus:outline-none active:outline-none border border-[#efefef] px-2 py-2 md:bg-[#1b3252] rounded-md md:text-white md:placeholder:text-white lg:min-w-[500px]"
              onChange={(event) => {
                // checking for null or undefined values
                if (event.target.value) {
                  // destructure existing params
                  const existingParams = new URLSearchParams(url.search);

                  // verify if search param exist
                  if (existingParams.has("search")) {
                    // if TRUE
                    const newObj = {
                      ...paramObject,
                      search: event.target.value,
                    };
                    setParamObject(newObj);
                  } else {
                    // if FALSE
                    const newObj = {
                      ...paramObject,
                      search: event.target.value,
                    };
                    setParamObject(newObj);
                  }
                } else {
                  // if the current value is undefined or NULL
                  const newObj = {...paramObject}
                  delete newObj.search
                  setParamObject(newObj);
                }
              }}
            />
            <input
              type="text"
              placeholder="Search retreats by Id"
              className="outline-none focus:outline-none active:outline-none border border-[#efefef] px-2 py-2 md:bg-[#1b3252] rounded-md md:text-white md:placeholder:text-white lg:min-w-[500px]"
              onChange={(event) => {
                let newUrl;

                // checking for null or undefined values
                if (event.target.value) {
                  // creating a new url, for id's. The url is of different form : https://{baseUrl.origin}/retreats/{id}
                  newUrl = `${baseUrl}/${event.target.value}`;

                  fetchData(newUrl, true);
                } else {
                  // if the field value is NULL or undefined, we trace back to our original URL
                  newUrl = createUrl({ page: 1, limit: 3 });

                  fetchData(newUrl, false);
                }
                setUrl(newUrl);
              }}
            />
          </div>

          <Retreats />
        </div>
        <Footer />
      </>
    </RetreatContext.Provider>
  );
}

export default App;

const Navbar = () => {
  return (
    <div className="bg-[#1b3252] text-white text-center py-3 font-bold text-[24px] font-open-sans md:text-start md:px-4 lg:px-5">
      <h1>Wellness Retreats</h1>
    </div>
  );
};
