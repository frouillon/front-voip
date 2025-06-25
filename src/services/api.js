import axios from "axios";

const API_URL = "http://localhost:5000";

const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export const sendVoiceMessage = async (data) => {
    try {
        const response = await api.post("/send-voice", data);
        console.log("Response from server:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error sending voice message:", error);
        throw error;
    }
}