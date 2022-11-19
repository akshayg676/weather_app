import { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";

// import icons
import {
  IoMdSunny,
  IoMdRainy,
  IoMdCloudy,
  IoMdSnow,
  IoMdThunderstorm,
  IoMdSearch,
} from "react-icons/io";

import {
  BsCloudHaze2Fill,
  BsCloudDrizzleFill,
  BsEye,
  BsWater,
  BsThermometer,
  BsWind,
} from "react-icons/bs";

import { TbTemperatureCelsius } from "react-icons/tb";
import { ImSpinner8 } from "react-icons/im";

const App = () => {
  const [location, setLocation] = useState("");
  const { isLoading, isError, data, refetch } = useQuery(
    "weatherData",
    () => {
      return axios({
        method: "get",
        url: `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&APPID=f7489a46d7d05bf4027a1b1ee2a42639`,
      });
    },
    {
      enabled: false, // will not fire get request on component mount
    }
  );

  //function to get weather information of entered location
  const handleSubmit = (e) => {
    e.preventDefault();
    refetch();
    setLocation("");
  };
  console.log(isError);
  return (
    <div className="w-full h-screen bg-gradient-to-r from-[#AA076B] to-[#61045F] flex flex-col items-center justify-center px-4 lg:px-0">
      <form
        className=" h-16 bg-black/30 w-full max-w-[450px]
      rounded-full backdrop-blur-[32px] mb-8"
      >
        <div className="h-full relative flex items-center justify-between p-2">
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="flex-1 bg-transparent outline-none placeholder:text-white text-white text-[15px] font-light pl-6 h-full"
            type="text"
            placeholder="Search by city or country"
          />
          <button
            disabled={!location.length > 0}
            onClick={handleSubmit}
            className="bg-[#1ab8ed] enabled:hover:bg-[#15abdd] w-20 h-12 rounded-full flex justify-center items-center transition disabled:opacity-40"
          >
            <IoMdSearch className="text-2xl text-white" />
          </button>
        </div>
      </form>
      {/* card */}
      <div className="w-full max-w-[450px] bg-black/20 min-h-[500px] text-white backdrop-blur-[32px] rounded-[32px] py-12 px-6">
        {isLoading ? (
          <div className="w-full h-full flex justify-center items-center">
            <ImSpinner8 className="text-white text-5xl animate-spin" />
          </div>
        ) : (
          <div>
            {/* card top */}
            <div className="flex items-center gap-x-5">
              {/* icon */}
              <div className="text-[87px]">
                <IoMdSearch />
              </div>
              <div>
                {/* country name */}
                <div className="text-2xl font-semibold">Paris, FR</div>
                {/* date */}
                <div>12/06/2022</div>
              </div>
            </div>
            {/* card body */}
            <div className="my-20">
              <div className="flex justify-center items-center">
                {/* temp */}
                <div className="text-[130px] leading-none font-light">26</div>
                {/* celsius icon */}
                <div className="text-4xl">
                  <TbTemperatureCelsius />
                </div>
              </div>
              {/* weather description */}
              <div className="capitalize text-center">Humid,HOt and Clear</div>
            </div>
            {/* card bottom */}
            <div className="max-w-[378px] mx-auto flex flex-col gap-y-6">
              <div className="flex justify-between">
                <div className="flex items-center gap-x-2">
                  {/* icon */}
                  <div className="text-[20px]">
                    <BsEye />
                  </div>
                  <div>
                    Visibility <span className="ml-2">{20000 / 1000} km</span>
                  </div>
                </div>
                <div className="flex items-center gap-x-2">
                  {/* icon */}
                  <div className="text-[20px]">
                    <BsThermometer />
                  </div>
                  <div className="flex">
                    Feels like
                    <div className="flex ml-2">
                      Rainyy
                      <TbTemperatureCelsius />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="flex items-center gap-x-2">
                  {/* icon */}
                  <div className="text-[20px]">
                    <BsWater />
                  </div>
                  <div>
                    Humidity
                    <span className="ml-2">2 %</span>
                  </div>
                </div>
                <div className="flex items-center gap-x-2">
                  {/* icon */}
                  <div className="text-[20px]">
                    <BsWind />
                  </div>
                  <div>
                    Wind <span className="ml-2">300 m/s</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
