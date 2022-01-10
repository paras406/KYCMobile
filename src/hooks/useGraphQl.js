import {
    useQuery,
    useMutation,
    useLazyQuery,
} from "@apollo/client";

const useGetGraphQL = (requestObject) => {
    const {
        model = (data) => { return data },
        query,
        errorModel = (data) => { return data; }
    } = requestObject;

    const [getCall, { loading, error, data, ...params }] = useLazyQuery(query);

    return {
        getCall,
        state: {
            data: model(data),
            error: errorModel(error),
            loading,
        },
        ...params,
    };
}

const usePostGraphQL = (requestObject) => {
    const {
        model = (data) => { return data },
        query,
        errorModel = (data) => { return data; }
    } = requestObject;

    const [executeFunc, { data, error, loading }] = useMutation(query);

    return [
        executeFunc,
        {
            data: model(data),
            error: errorModel(error),
            loading,
        },
    ];
}

export {
    useGetGraphQL,
    usePostGraphQL,
};