import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./customQuery";



export const fileApi = createApi({
    reducerPath: "fileApi",
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        uploadFile: builder.mutation({
            query: (file) => ({
                url: "/file",
                method: "POST",
                body: file,
                headers: {
                    ContentType: "multipart/form-data",
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            }),
        }),
    }),
});

export const { useUploadFileMutation } = fileApi;
