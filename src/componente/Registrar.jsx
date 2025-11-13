import React, { useState } from 'react';
import { encryptPassword } from "../function/encryptPassword";

export default function Registrar({ obtenerUsuarios }) {
    const [mensaje, setMensaje] = useState("");
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    // ----------------------------------------------------------
    // ✏️ Manejar cambios en los inputs del formulario
    // ----------------------------------------------------------
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // ----------------------------------------------------------
    // 📬 Enviar datos al backend para registrar un nuevo usuario
    // ----------------------------------------------------------
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensaje(""); // Limpia mensajes previos

        try {
            // 🧠 Obtiene el token JWT almacenado tras el login
            const token = localStorage.getItem("token");

            // 🔐 Encripta la contraseña antes de enviarla al backend
            const encrypted = encryptPassword(formData.password);
            console.log("🔑 Contraseña original:", formData.password);
            console.log("🔒 Contraseña encriptada:", encrypted);

            // 📡 Envía solicitud al endpoint protegido de registro
            const res = await fetch("https://yn8csy-3000.csb.app/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    username: formData.username,
                    email: formData.email,
                    password: encrypted,
                }),
            });

            const data = await res.json();

            // ✅ Registro exitoso
            if (res.ok) {
                setMensaje(`✅ ${data.message}`);
                setFormData({ username: "", email: "", password: "" });

                // 🔄 Actualiza lista de usuarios en pantalla
                obtenerUsuarios(token);
            } 
            // ❌ Error controlado desde el backend
            else {
                setMensaje(`❌ ${data.error || "Error desconocido"}: ${data.details || ""}`);
            }

        } catch (error) {
            // ⚠️ Error de conexión o excepción inesperada
            setMensaje(`⚠️ Error de conexión: ${error.message}`);
        }
    };

    // ----------------------------------------------------------
    // 🧱 Render del formulario de registro de usuario
    // ----------------------------------------------------------
    return (
        <>
            <h2>🧍 Registro de Usuario</h2>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="Usuario"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    style={{ width: "100%", marginBottom: 10, padding: 8 }}
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Correo"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={{ width: "100%", marginBottom: 10, padding: 8 }}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    style={{ width: "100%", marginBottom: 10, padding: 8 }}
                />

                <button type="submit" style={{ width: "100%", padding: 10 }}>
                    Registrar
                </button>
            </form>

            {mensaje && <p style={{ marginTop: 15 }}>{mensaje}</p>}
        </>
    );
}
