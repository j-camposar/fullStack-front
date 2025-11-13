import React, { useState } from "react";
import { encryptPassword } from "../function/encryptPassword";

export default function ActualizarContrasena({ setSelectedUser, u, setMensaje }) {
    const [form, setForm] = useState({ password: "", newPassword: "" });

    // ----------------------------------------------------------
    // ✏️ Manejar cambios en los campos del formulario
    // ----------------------------------------------------------
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // ----------------------------------------------------------
    // 🔄 Enviar solicitud para actualizar la contraseña del usuario
    // ----------------------------------------------------------
    const handleSubmit = async (e, username) => {
        e.preventDefault();
        setMensaje("");

        try {
            const token = localStorage.getItem("token");

            // 🔐 Encriptar las contraseñas antes de enviarlas al backend
            const passwordEncrypt = encryptPassword(form.password);
            const newPasswordEncrypt = encryptPassword(form.newPassword);

            const res = await fetch("https://yn8csy-3001.csb.app/actualizaContrasena", {
                method: "PUT",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`, // Se envía el JWT al backend
                },
                body: JSON.stringify({
                    username,
                    password: passwordEncrypt,
                    newPassword: newPasswordEncrypt,
                }),
            });

            const data = await res.json();

            if (res.ok) {
                setMensaje(`✅ ${data.message}`);
                setSelectedUser(null); // Oculta el formulario tras éxito
                setForm({ password: "", newPassword: "" }); // Limpia campos
            } else {
                setMensaje(`❌ ${data.error || "Error desconocido"}`);
            }

        } catch (error) {
            setMensaje(`⚠️ Error de conexión: ${error.message}`);
        }
    };

    // ----------------------------------------------------------
    // 🧱 Render del formulario de actualización de contraseña
    // ----------------------------------------------------------
    return (
        <tr>
            <td colSpan="4">
                <form
                    onSubmit={(e) => handleSubmit(e, u.username)}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                        marginTop: "10px",
                    }}
                >
                    <input
                        type="password"
                        name="password"
                        placeholder="Contraseña actual"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="newPassword"
                        placeholder="Nueva contraseña"
                        value={form.newPassword}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit">Actualizar</button>
                </form>
            </td>
        </tr>
    );
}
