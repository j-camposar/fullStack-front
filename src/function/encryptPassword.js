import CryptoJS from "crypto-js";

const SECRET_KEY = process.env.REACT_APP_SECRET_KEY; // Clave compartida con el backend

/**
 * Encripta la contraseña antes de enviarla al servidor.
 * 
 * Mecanismo:
 * 1. Se concatena la contraseña ingresada por el usuario con una clave secreta compartida.
 * 2. La cadena resultante se codifica en Base64 para su transmisión segura.
 * 
 * Nota: Este método no sustituye el cifrado seguro (como AES o bcrypt),
 * pero evita el envío de la contraseña en texto plano.
 */
export function encryptPassword(password) {
  const combined = password + SECRET_KEY;
  return btoa(combined);
}
