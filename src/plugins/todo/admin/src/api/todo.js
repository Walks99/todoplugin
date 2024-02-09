import { useFetchClient } from "@strapi/helper-plugin";

const todoRequests = {
    getAllTodos: async () => {
        const fetchClient = useFetchClient();
        return await fetchClient.get("/todo/find");
    },
    addTodo: async (data) => {
        const fetchClient = useFetchClient();
        return await fetchClient.post("/todo/create", {
            body: { data: data},
        });
    },
    toggleTodo: async (id) => {
        const fetchClient = useFetchClient();
        return await fetchClient.put("/todo/toggle/${id}", {
            method: "PUT",
        });
    },
    editTodo: async (id, data) => {
        const fetchClient = useFetchClient();
        return await fetchClient.put("/todo/update/${id}", {
            body: { data: data},
        });
    },
    deleteTodo: async (id) => {
        const fetchClient = useFetchClient();
        return await fetchClient.del("/todo/delete/${id}", {
            method: "DELETE",
        });
    },
};
export default todoRequests;
