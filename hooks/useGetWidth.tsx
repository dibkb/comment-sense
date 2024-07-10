import { useEffect, useState } from "react";

const useGetWidth = () => {
  const [width, setWidth] = useState<number | undefined>(window.innerWidth);
  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);

    () => window.removeEventListener("resize", handleResize);
  }, []);
  return { width };
};
export default useGetWidth;
