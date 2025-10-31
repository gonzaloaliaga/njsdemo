import { useState } from "react";

export default function AboutPage() {
  // Estado del contador
  const [count, setCount] = useState(0);

  // Funciones para sumar y restar
  const handleIncrement = () => setCount(count + 1);
  const handleDecrement = () => setCount(count - 1);

  return (
    <main style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Página About</h1>
      <p>Este es un ejemplo con un contador interactivo.</p>

      <div style={{ marginTop: "20px" }}>
        <h2>Contador: {count}</h2>
        <button
          onClick={handleIncrement}
          style={{
            marginRight: "10px",
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          + Sumar
        </button>
        <button
          onClick={handleDecrement}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          - Restar
        </button>
      </div>
    </main>
  );
}