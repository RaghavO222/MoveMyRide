import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:5001",
    timeout: 10000
})

instance.interceptors.request.use(async (config) => {
    try{
        const token = localStorage.getItem("token");
        if(!token){
            throw new Error("Token not found");
        }

        config.headers.Authorization = `Bearer ${token}`;
        return config;
    }catch(err){
        console.log("intercepter error: ",err);
    }
})

instance.interceptors.response.use(
    (response) => {
        console.log("Response data: ",response.data);
        return response;
    },
    (error) => {
        console.error("Response error: ",error);
        if(error.response.status === 401){
            console.log("Unauthorized error");
        }
    }
)

export default instance;