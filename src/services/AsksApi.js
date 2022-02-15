import axios from "./axios";

class AsksApi {
    async findAll(){
        try {
            const rows = await (await axios.get("/asks")).data;
            return rows;
        }
        catch {
            return {error: "Couldn't connect to api"};
        }
    }

    async find(_id){
        try {
            const rows = await (await axios.get(`/ask/${_id}`)).data;
            return rows;
        }
        catch {
            return {error: "Couldn't connect to api"};
        }
    }

    async store(payload){
        try {
            const rows = await (await axios.post(`/ask`, payload)).data;
            return rows;
        }
        catch (e){
            return {error: "Couldn't connect to api"};
        }
    }

    async update(id, payload){
        try {
            const rows = await (await axios.put(`/ask/${id}`, payload)).data;
            return rows;
        }
        catch (e){
            return {error: "Couldn't connect to api"};
        }
    }
}

export default new AsksApi();