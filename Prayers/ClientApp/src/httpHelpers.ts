interface HttpResponse<T> extends Response {
    parsedBody?: T;
}

export const http = {
    request: async function <T>(request: RequestInfo): Promise<HttpResponse<T>> {
        const response: HttpResponse<T> = await fetch(
            request
        );

        try {
            // may error if there is no body
            response.parsedBody = await response.json();
        } catch (ex) { }

        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response;
    },

    get: async function <T>(
        path: string,
        args: RequestInit = { method: "get"}
    ): Promise<HttpResponse<T>> {
        return await http.request<T>(new Request(path, args));
    },

    post: async function <T>(
        path: string,
        body: any,
        args: RequestInit = { method: "post", body: JSON.stringify(body), headers: { "Content-Type": "application/json" } }
    ): Promise<HttpResponse<T>> {
        return await http.request<T>(new Request(path, args));
    },

    put: async function <T>(
        path: string,
        body: any,
        args: RequestInit = { method: "put", body: JSON.stringify(body), headers: { "Content-Type": "application/json" } }
    ): Promise<HttpResponse<T>> {
        return await http.request<T>(new Request(path, args));
    },

    delete: async function <T>(
        path: string,
        args: RequestInit = { method: "delete" }
    ): Promise<HttpResponse<T>> {
        return await http.request<T>(new Request(path, args));
    }
}