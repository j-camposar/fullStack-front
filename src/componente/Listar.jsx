import React, { useState } from "react";
import ActualizarContrasena from "./ActualizarContrasena";

export default function Listar({ usuarios }) {
    const [selectedUser, setSelectedUser] = useState(null);
    const [mensaje, setMensaje] = useState("");

return (
    <>
      <h3 style={{ marginTop: 30 }}>👥 Usuarios registrados</h3>
      <table border="1" width="100%" cellPadding="5">
        <thead>
          <tr>
            <th>ID</th>
            <th>Usuario</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.length > 0 ? (
            usuarios.map((u) => (
              <React.Fragment key={u.id}>
                <tr>
                  <td>{u.id}</td>
                  <td>{u.username}</td>
                  <td>{u.email}</td>
                  <td>
                    <button
                      onClick={() =>
                        setSelectedUser(selectedUser === u.id ? null : u.id)
                      }
                    >
                      {selectedUser === u.id
                        ? "Cancelar"
                        : "Cambiar contraseña"}
                    </button>
                  </td>
                </tr>

                {selectedUser === u.id && (
                    <ActualizarContrasena setMensaje={setMensaje} setSelectedUser={setSelectedUser} u={u}/>
                )}
              </React.Fragment>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                Sin usuarios registrados
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {mensaje && <p style={{ marginTop: 15 }}>{mensaje}</p>}
    </>
  );
}
