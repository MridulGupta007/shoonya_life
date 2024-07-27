import React, { createContext, useEffect, useState } from "react";
import Retreats from "./Components/Retreats";
import Footer from "./Components/Footer";
import { debounce } from "lodash";
const UrlContext = createContext();
export { UrlContext };

function App() {
  const [pageNum, setPageNum] = useState(1);

  // received data from url
  const [data, setData] = useState([]);

  // determines if received data is of favourable type
  const [receivedData, setReceivedData] = useState(false)

  // baseUrl is formed
  let baseUrl = new URL(
    `https://669f704cb132e2c136fdd9a0.mockapi.io/api/v1/retreats?page=` +
      pageNum +
      `&limit=3`
  );

  // debouncing is implemented to deal with user input for search filter
  const fetchData = debounce(async (url) => {
    try {
      const fetchedInfo = await fetch(url);
      const jsonInfo = await fetchedInfo.json();
      
      // if data is correct, setData is called and receivedData is set to true
      if(jsonInfo !== 'Not found'){
        setReceivedData(true)
        setData(jsonInfo)
      } else{
        setReceivedData(false)
      }
    } catch (err) {
      console.error(err);
    }
  }, 10);

  // useEffect manages the fetch Api call
  useEffect(() => {
    fetchData(baseUrl);
  }, [pageNum]);

  return (
    <UrlContext.Provider value={{ pageNum, setPageNum, data, receivedData }}>
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
                onChange={event => {
                  // received date is converted to Unix timestamp
                  const unixTimestamp = Math.floor((new Date(event.target.value)).getTime() / 1000)

                  // filter params are created
                  const params = new URLSearchParams(baseUrl.search);
                  if (params.has("filter")) {
                    params.set("filter", event.target.value);
                  } else {
                    params.append("filter", event.target.value);
                    params.toString();
                  }

                  // new base url is created
                  baseUrl = baseUrl.origin + baseUrl.pathname + "?" + params;
                  fetchData(baseUrl);
                }}
              />
              <select
                name="type"
                id="type"
                className="px-2 py-3 outline-none focus:outline-none active:outline-none bg-[#efefef] md:bg-[#1b3252] rounded-md md:text-white md:placeholder:text-white md:w-20 lg:w-40"
                onChange={(event) => {

                  // existing params are retrieved from url
                  const params = new URLSearchParams(baseUrl.search);

                  // verifying if filter params exist
                  if (params.has("filter")) {
                    params.set("filter", event.target.value);
                  } else {
                    params.append("filter", event.target.value);
                    params.toString();
                  }

                  // new url is created
                  baseUrl = baseUrl.origin + baseUrl.pathname + "?" + params;
                  fetchData(baseUrl);
                }}
              >
                <option value="" disabled selected>
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
                const params = new URLSearchParams(baseUrl.search);

                // verifying if search param exists
                if (params.has("search")) {
                  params.set("search", event.target.value);
                } else {
                  params.append("search", event.target.value);
                  params.toString();
                }

                // new url is created with updated search params
                baseUrl = baseUrl.origin + baseUrl.pathname + "?" + params;
                fetchData(baseUrl);
              }}
            />
          </div>

          <Retreats />
        </div>
        <Footer />
      </>
    </UrlContext.Provider>
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
