import React, { useState, useEffect } from 'react';
import Registrar from './componente/Registrar';
import Listar from './componente/Listar';

export default function App() {

    const [usuarios, setUsuarios] = useState([]);

    // ----------------------------------------------------------
    // 🔐 Iniciar sesión y obtener el token JWT desde el backend
    // ----------------------------------------------------------
    const handleLogin = async () => {
        const res = await fetch("https://yn8csy-3000.csb.app/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: "admin", password: "123456" }),
        });

        const data = await res.json();

        if (res.ok) {
            console.log("🟢 Token obtenido:", data.token);
            // Guardar token JWT en almacenamiento local para futuras peticiones
            localStorage.setItem("token", data.token);
            alert("✅ Login exitoso");
            return data.token;
        } else {
            alert("❌ " + data.error);
            return null;
        }
    };

    // ----------------------------------------------------------
    // 📦 Obtener lista de usuarios desde el backend
    // ----------------------------------------------------------
    const obtenerUsuarios = async (token) => {
        try {
            const res = await fetch("https://yn8csy-3000.csb.app/users", {
                headers: {
                    "Authorization": `Bearer ${token}`, // Enviar token JWT al backend
                },
            });
            const data = await res.json();
            setUsuarios(data);
        } catch (error) {
            console.error("⚠️ Error al cargar usuarios:", error);
        }
    };

    // ----------------------------------------------------------
    // 🔄 Efecto inicial: login automático y carga de usuarios
    // ----------------------------------------------------------
    useEffect(() => {
        const iniciar = async () => {
            // Intentar usar token guardado previamente
            let token = localStorage.getItem("token");

            // Si no existe, iniciar sesión automáticamente
            // if (!token) {
                token = await handleLogin();
            // }

            // Si se obtuvo un token válido, cargar usuarios
            if (token) {
                await obtenerUsuarios(token);
            } else {
                console.warn("⚠️ No se pudo obtener el token JWT.");
            }
        };

        iniciar();
    }, []);

    // ----------------------------------------------------------
    // 🧱 Render principal: registro de usuario + listado
    // ----------------------------------------------------------
    return (
        <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
            <Registrar obtenerUsuarios={obtenerUsuarios} />
            <Listar usuarios={usuarios} />
        </div>
    );
}
