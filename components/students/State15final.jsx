import React, { useState, useEffect, useRef } from "react";

import Confetti from "react-confetti";

function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    // Add event listener
    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}

export default function state15() {
  const size = useWindowSize();
  console.log(size)
  return (
    <>
    {size.width && size.height && (
          <Confetti width={size.width} height={size.height} />
        )}
      <div
        className=" bg-white  rounded-md p-5 mt-5"
        style={{ boxShadow: "#00000038 1.95px 1.95px 1.95px" }}
      >
        
        <div
          className="flex items-center justify-center mx-auto px-4  py-4  mt-4 bg-white rounded-lg  text-4xl w-11/12 stage2:w-[450px] stage2:h-[250px] "
          style={{
            boxShadow:
              " rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
            //width: "90%",
          }}
        >
          <p className=" text-center"> Congratulations 🎉</p>



          
        </div>
      </div>

    </>
  );
}
