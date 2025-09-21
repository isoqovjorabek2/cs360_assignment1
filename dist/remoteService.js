// src/remoteService.ts
import axios from "axios";
axios.defaults.baseURL = "http://localhost:4001";
// Generic GET
export async function remoteGet(path) {
    const response = await axios.get(path);
    return response.data;
}
// Generic DELETE
export async function remoteDelete(path) {
    const response = await axios.delete(path);
    return response.data;
}
// Generic POST
export async function remotePost(path, data) {
    const response = await axios.post(path, data);
    return response.data;
}
//# sourceMappingURL=remoteService.js.map