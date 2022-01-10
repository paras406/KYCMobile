import {
    useQuery,
    useMutation,
    useLazyQuery,
} from "@apollo/client";

const useGetGraphQL = (requestObject) => {
    const {
        query,
    } = requestObject;


    return useLazyQuery(query);
}

const usePostGraphQL = (requestObject) => {
    const {
        query,
    } = requestObject;

    return useMutation(query);
}

export {
    useGetGraphQL,
    usePostGraphQL,
};