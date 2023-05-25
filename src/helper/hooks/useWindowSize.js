// import { useLayoutEffect, useState } from "react";

// const useWindowSize = () => {
//     const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

//     const handleSize = () => {
//         setWindowSize({
//             width: window.innerWidth,
//             height: window.innerHeight
//         });
//     };
 
//     useLayoutEffect(() => {
//         handleSize();

//         window.addEventListener("resize", handleSize);

//         return () => window.removeEventListener("resize", handleSize);
//     }, []);

//     return windowSize;
// };

// export default useWindowSize;


import { useState, useEffect } from "react";

export default function useWindowSize() {
  function getSize() {
    return {
      width: window.innerWidth,
      height: window.innerHeight
    };
  }

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    function handleResize() {
      setWindowSize(getSize());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}
