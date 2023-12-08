import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { Qc2Context } from "../context/Qc2Provider";

const useFetchData = (url, options = {}) => {
  const { userToken } = useContext(Qc2Context);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = {
          "Content-Type": "application/json",
        };

        if (options.headers) {
          Object.assign(headers, options.headers);
        }

        if (userToken) {
          headers.Authorization = `Bearer ${userToken}`;
        }

        const axiosConfig = {
          headers,
        };

        const res = await axios.get(url, axiosConfig);
        setData(res.data);
      } catch (error) {
        setError(error.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetchData;