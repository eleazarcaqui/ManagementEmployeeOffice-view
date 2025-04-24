import { useState, useEffect } from 'react';
import { getOfficesWithEmployees, deleteOfficeById  } from '../services/officeService';

const useOffices = () => {
  const [offices, setOffices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOffices = async () => {
      try {
        setLoading(true);
        const data = await getOfficesWithEmployees();
        
        setOffices(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchOffices();
  }, []);

  const deleteOffice = async (id) => {
    try {
      await deleteOfficeById(id);
     
      setOffices(prevOffices => prevOffices.filter(office => office.id !== id));
      return true;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  return { offices, loading, error, deleteOffice };

};

export default useOffices;