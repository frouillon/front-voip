import React, { useEffect, useState } from "react";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { sendVoiceMessage } from "../../services/api";

const PhoneForm = () => {
    const [data, setData] = useState({
        to_number: "",
        country_code: "",
        message: "",
        id_voz: "",
    });
        
    const [code, setCode] = useState("51");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");
    const [voice, setVoice] = useState("*");

    const handleSubmit = (e) => {
        e.preventDefault();
        setData({
            to_number: phone,
            country_code: code,
            message: message,
            id_voz: voice,
        });
        alert("Llamando...");
        setInterval(() => {
            setPhone("");
            setMessage("");
            setVoice("*");
        },2000 );
    }

    useEffect(() => {
        sendVoiceMessage(data);
        console.log("Data to be sent:", data);
    }, [data]);


return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-400">
        <form className="flex flex-col gap-4 max-w-xl w-full mx-auto p-4 border rounded bg-white" onSubmit={handleSubmit}>
            <h1 className="text-2xl font-bold text-center mb-4">Formulario de Llamada</h1>
            <label className="flex text-gray-700 mb-2 gap-2 items-center">
                Número de teléfono:
                <div className="flex items-center gap-2">
                    <PhoneInput
                        international
                        name="country_code"
                        defaultCountry="PE"
                        onChange={newCode => {
                            newCode = newCode.replace("+", "");
                            setCode(newCode);
                            console.log("Selected country code:", newCode);
                        }
                        }
                        className="border rounded p-2 w-[100px]"
                    />
                    <input
                        type="tel"
                        className="border rounded p-2 w-2/3"
                        placeholder="Ingresa tu número"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                </div>
            </label>

            <label className="text-gray-700">
                Mensaje:
            </label>
            <textarea className="border rounded p-2 w-full h-32 resize-none" placeholder="Escribe tu mensaje aquí..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            ></textarea>

            <label className="text-gray-700">
                Seleccionar voz:
                <select className="border rounded p-2 w-1/2 mx-3"
                value={voice}
                onChange={(e) => setVoice(e.target.value)}
                required
                >
                    <option value="*" disabled>Voces</option>
                    <option value="1">Lucia (es-ES)</option>
                    <option value="2">Sergio (es-ES)</option>
                    <option value="3">Penelope (es-US)</option>
                    <option value="4">Pedro (es-US)</option>
                    <option value="5">Danielle (es-US)</option>
                </select>
            </label>
            <fieldset className="flex gap-2">
                <label className="text-gray-700 mb-1">Emisor</label>
                <label className="flex items-center">
                    <input
                        type="radio"
                        name="emisor"
                        value="usa"
                        className="mr-2"
                        required
                    />
                    EEUU
                </label>
                <label className="flex items-center">
                    <input
                        type="radio"
                        name="emisor"
                        value="germany"
                        className="mr-2"
                        required
                    />
                    Alemania
                </label>
            </fieldset>
            <button 
            type="submit" 
            className="bg-zinc-500 text-white p-2 rounded hover:bg-zinc-800 transition-colors duration-300 hover:cursor-pointer"
            >Llamar</button>
        </form>
    </div>
);
};

export default PhoneForm;
