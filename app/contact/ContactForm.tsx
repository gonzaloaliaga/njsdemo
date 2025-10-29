"use client";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactForm() {
  const [form, setForm] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "El nombre es requerido";
    if (!form.email.trim()) e.email = "El correo es requerido";
    else {
      const re = /\S+@\S+\.\S+/;
      if (!re.test(form.email)) e.email = "Correo inválido";
    }
    if (!form.subject.trim()) e.subject = "El asunto es requerido";
    if (!form.message.trim()) e.message = "El mensaje es requerido";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSending(true);
    await new Promise((r) => setTimeout(r, 700));
    setSending(false);
    setSubmitted(true);
    setForm({ name: "", email: "", subject: "", message: "" });
    setErrors({});
  };

  return (
    <div>
      {submitted && (
        <div className="alert alert-success" role="alert">
          Mensaje enviado correctamente. ¡Gracias por contactarnos!
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Nombre
          </label>
          <input
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
            placeholder="Tu nombre"
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Correo electrónico
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            placeholder="tucorreo@ejemplo.com"
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="subject" className="form-label">
            Asunto
          </label>
          <input
            id="subject"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            className={`form-control ${errors.subject ? "is-invalid" : ""}`}
            placeholder="Asunto del mensaje"
          />
          {errors.subject && (
            <div className="invalid-feedback">{errors.subject}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="message" className="form-label">
            Mensaje
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            value={form.message}
            onChange={handleChange}
            className={`form-control ${errors.message ? "is-invalid" : ""}`}
            placeholder="Escribe tu mensaje aquí"
          />
          {errors.message && (
            <div className="invalid-feedback">{errors.message}</div>
          )}
        </div>

        <div className="d-flex justify-content-end">
          <button type="submit" className="btn btn-danger" disabled={sending}>
            {sending ? "Enviando..." : "enviar mensaje"}
          </button>
        </div>
      </form>
    </div>
  );
}
