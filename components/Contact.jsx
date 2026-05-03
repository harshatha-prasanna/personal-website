'use client';

import { useState } from 'react';
import config from '@/config';

export default function Contact() {
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('submitting');

    try {
      const res = await fetch(
        `https://formspree.io/f/${config.contact.formspreeId}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(form),
        }
      );

      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  const inputStyle = {
    border: '1px solid #8B7355',
    background: 'transparent',
    outline: 'none',
  };

  return (
    <section id="contact" className="space-y-8">
      <h2 className="font-serif text-3xl text-ink">Contact</h2>

      {status === 'success' ? (
        <p className="font-sans text-sm text-taupe">
          Message sent. I will get back to you soon.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field
              label="Name"
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              inputStyle={inputStyle}
              required
            />
            <Field
              label="Email"
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              inputStyle={inputStyle}
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="message"
              className="font-sans text-xs text-taupe tracking-wide"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={form.message}
              onChange={handleChange}
              required
              style={inputStyle}
              className="font-sans text-sm text-ink rounded px-3 py-2 resize-none focus:border-ink transition-colors"
            />
          </div>

          {status === 'error' && (
            <p className="font-sans text-xs text-taupe">
              Something went wrong. Please try again.
            </p>
          )}

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="font-sans text-sm font-medium text-taupe px-5 py-2 rounded transition-colors hover:text-ink disabled:opacity-50"
            style={{ border: '1px solid #8B7355' }}
          >
            {status === 'submitting' ? 'Sending...' : 'Send'}
          </button>
        </form>
      )}
    </section>
  );
}

function Field({ label, id, name, type, value, onChange, inputStyle, required }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="font-sans text-xs text-taupe tracking-wide">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        style={inputStyle}
        className="font-sans text-sm text-ink rounded px-3 py-2 focus:border-ink transition-colors"
      />
    </div>
  );
}
