import { useState } from "react";
import { GoogleOAuthProvider } from '@react-oauth/google';
import RegistrationModal from "./pages/GoogleAuth";


export default function App() {
  const [open, setOpen] = useState(false);
  return (
    <GoogleOAuthProvider clientId="285018621048-3t4r6du53df4kaofav0hatqjmd0taove.apps.googleusercontent.com">
      <button
      onClick={() => setOpen(true)}>Регистрация</button>
      {open && <RegistrationModal onClose={() => setOpen(false)} />}
    </GoogleOAuthProvider>

    
  );
}
