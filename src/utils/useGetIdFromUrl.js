import React, { useEffect, useState } from "react";

const useGetIdFromUrl = () => {
  const [id, setId] = useState(null);
  useEffect(() => {
    let id = window.location.pathname
      ? window.location.pathname.match(/\d+/g)
      : null;
    setId(id);
  }, []);
  return id;
};

export default useGetIdFromUrl;
