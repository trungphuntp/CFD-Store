import { useEffect, useState } from "react";

const useDebounce = (changeValue, delayTime) => {
    const [debounceValue, setDebounceValue] = useState(changeValue);

    useEffect(() => {
        const timeouter = setTimeout(() => {
            setDebounceValue(changeValue);
        }, delayTime);
        return () => {
            clearTimeout(timeouter);
        };
    }, [changeValue, changeValue]);

    return debounceValue;
};

export default useDebounce;
