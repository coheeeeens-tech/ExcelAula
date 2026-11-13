import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { firebaseConfig, TEACHER_ID, EMAIL_DOMAIN } from "./firebase-config.js";

const $ = id => document.getElementById(id);
const toEmail = id => id.trim().toLowerCase().replace(/[^a-z0-9._-]/g, "") + "@" + EMAIL_DOMAIN;
const msg = (el, t, ok) => { el.textContent = t; el.style.color = ok ? "var(--green)" : "#c0392b"; };

if (firebaseConfig.apiKey === "PEGA_AQUI") {
  msg($("lmsg"), "Falta configurar Firebase: edita firebase-config.js.");
} else {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  $("lform").addEventListener("submit", async e => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, toEmail($("lid").value), $("lpw").value);
      $("lpw").value = "";
    } catch { msg($("lmsg"), "ID o contraseña incorrectos."); }
  });

  $("logout").addEventListener("click", () => signOut(auth));

  onAuthStateChanged(auth, user => {
    document.body.classList.toggle("in", !!user);
    $("teacher").hidden = !(user && user.email === toEmail(TEACHER_ID));
    $("who").textContent = user ? user.email.split("@")[0] : "";
  });

  // El profesor da de alta alumnos usando una segunda instancia para no perder su sesión.
  $("sform").addEventListener("submit", async e => {
    e.preventDefault();
    const id = $("sid").value, pw = $("spw").value;
    try {
      const sec = initializeApp(firebaseConfig, "alta");
      const secAuth = getAuth(sec);
      await createUserWithEmailAndPassword(secAuth, toEmail(id), pw);
      await signOut(secAuth);
      msg($("smsg"), "Alumno " + id.trim().toLowerCase() + " creado.", true);
      $("sform").reset();
    } catch (err) {
      msg($("smsg"), err.code === "auth/email-already-in-use" ? "Ese ID ya existe." :
        err.code === "auth/weak-password" ? "La contraseña debe tener al menos 6 caracteres." : "No se pudo crear el alumno.");
    }
  });
}
