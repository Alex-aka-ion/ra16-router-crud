import {useEffect, useRef, useState} from "react";

export default function useFetch(initialOptions, initialData) {
    const [options, setOptions] = useState(initialOptions);
    const [data, setData] = useState(initialData);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [redirect, setRedirect] = useState(false);

    const timestampRef = useRef();

    useEffect(() => {
        const fetchData = async () => {
            if (!options) return;
            const timestamp = Date.now();
            timestampRef.current = timestamp;
            setLoading(true);
            setRedirect(false);
            try {
                let requestOptions = null;
                if (options.method === 'POST') {
                    requestOptions = {
                        method: options.method,
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify(options.body)
                    }
                } else if (options.method === 'DELETE') {
                    requestOptions = {
                        method: options.method,
                    }
                }

                setError(null);
                console.log(requestOptions);
                const response = await fetch(process.env.REACT_APP_API_URL + options.url, requestOptions);
                const res = await response.text();
                console.log(res);
                const data = res ? JSON.parse(res) : {};

                if (timestampRef.current === timestamp) {
                    setData(data);
                    if (options.redirect)
                        setRedirect(true);
                }
            } catch (e) {
                setError(e);
            } finally {
                setLoading(false);
                setOptions(null);
            }
        };

        fetchData();
    }, [options]);

    return [data, loading, error, setOptions, redirect];
}
