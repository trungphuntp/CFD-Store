import { useEffect, useState } from "react";

const useQuery = (promise, dependencies = []) => {
    const [data, setData] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchdata();
    }, dependencies);

    const fetchdata = async (query) => {
        try {
            const res = await promise(query);
            setData(res?.data?.data || []);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };
    return {
        data,
        error,
        loading,
        refetch: fetchdata,
    };
};
export default useQuery;
