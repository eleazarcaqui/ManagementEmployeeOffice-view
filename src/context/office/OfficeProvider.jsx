import { createContext, useContext, useEffect, useState } from "react";
import { getOffices } from "../../services/officeService";

const OfficeContext = createContext();

export const OfficeProvider = ({ children }) => {
  const [offices, setOffices] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOffices = async () => {
    try {
      setLoading(true);
      const data = await getOffices(); 
      setOffices(data);
    } catch (err) {
      console.error("Failed to fetch offices:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOffices();
  }, []);

  return (
    <OfficeContext.Provider value={{ offices, loading, fetchOffices }}>
      {children}
    </OfficeContext.Provider>
  );
};

export const useOfficeContext = () => useContext(OfficeContext);
