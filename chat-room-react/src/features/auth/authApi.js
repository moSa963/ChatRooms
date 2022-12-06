import request from "../../util/Request";



export const fetchUser = async () => {

    try {
        const res = await request("api/user");

        if (res.ok) {
            const js = await res.json();
            return { error: false, data: js.data };
        }

        return { error: true, status: res.status, statusText: res.statusText };
    } catch (r) {
        return { error: true, status: 1, statusText: "error" };
    }
}