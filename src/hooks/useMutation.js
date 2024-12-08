import { useState } from "react";

const useMutation = (promise) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);

    const execute = async (payload, options) => {
        const { onSuccess, onFail } = options || {};
        setLoading(true);
        try {
            const res = await promise(payload);
            setData(res.data?.data || []);
            onSuccess?.(res.data?.data);
        } catch (error) {
            setData([]);
            setError(error);
            onFail?.(error);
        } finally {
            setLoading(false);
        }
    };

    return {
        data,
        error,
        loading,
        execute,
    };
};
export default useMutation;
