import { useMutation } from "@tanstack/react-query"

export const useMutationHook = (fnCallBack) => {
    try {
        const mutation = useMutation({
            mutationFn: fnCallBack
        })
        return mutation
    } catch (e) {
        console.log(e)
    }

}