"use client";

import { useState, useRef, ChangeEvent, FormEvent, useEffect, useId } from "react";
import { motion } from "framer-motion";
import { FiMail, FiMapPin, FiPhone, FiSend } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { IconType } from "react-icons";
import { SectionHeading } from "./shared/SectionHeading";
import { Card } from "./shared/Card";
import { contactInfo } from "@/constants";

// Accessibility notes:
// - Inputs are associated with labels via id / htmlFor using useId().
// - Error messages are connected through aria-describedby.
// - Live regions announce success / error status.
// - Button is disabled while sending or when form invalid.

interface BaseFieldState {
  value: string;
  touched: boolean;
  error: string | null;
}

interface FormState {
  name: BaseFieldState;
  email: BaseFieldState;
  message: BaseFieldState & { remaining: number };
  loading: boolean;
  success: boolean;
  globalError: string | null;
}

interface FormInputProps {
  label: string;
  field: BaseFieldState;
  name: string;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  autoComplete?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  icon?: IconType;
}

interface TextareaProps {
  label: string;
  field: FormState["message"];
  name: string;
  placeholder?: string;
  disabled?: boolean;
  maxLength: number;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur: () => void;
}

interface ContactItemProps {
  icon: IconType;
  title: string;
  value: string;
  href?: string;
  delay?: number;
  customStyles?: {
    icon: string;
    background: string;
    border: string;
  };
}

interface AnimatedStatusMessageProps {
  show: boolean;
  type: "success" | "error";
  message: string;
}

const MAX_MESSAGE_LENGTH = 1500;

const emailPattern =
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);

  const [form, setForm] = useState<FormState>({
    name: { value: "", touched: false, error: null },
    email: { value: "", touched: false, error: null },
    message: {
      value: "",
      touched: false,
      error: null,
      remaining: MAX_MESSAGE_LENGTH,
    },
    loading: false,
    success: false,
    globalError: null,
  });

  // Derived validity
  const isValid =
    !form.name.error &&
    !form.email.error &&
    !form.message.error &&
    form.name.value.trim().length > 0 &&
    form.email.value.trim().length > 0 &&
    form.message.value.trim().length > 0;

  // Field ids
  const nameId = useId();
  const emailId = useId();
  const messageId = useId();

  // Validate helpers
  const validateName = (value: string): string | null => {
    if (!value.trim()) return "Please enter your name.";
    if (value.trim().length < 2) return "Name must be at least 2 characters.";
    return null;
  };

  const validateEmail = (value: string): string | null => {
    if (!value.trim()) return "Please enter your email.";
    if (!emailPattern.test(value)) return "Please enter a valid email.";
    return null;
  };

  const validateMessage = (value: string): string | null => {
    if (!value.trim()) return "Please enter a message.";
    if (value.trim().length < 10) return "Message must be at least 10 characters.";
    if (value.length > MAX_MESSAGE_LENGTH) return `Message must be under ${MAX_MESSAGE_LENGTH} characters.`;
    return null;
  };

  // On change handlers
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setForm(prev => ({
      ...prev,
      name: {
        ...prev.name,
        value,
        error: prev.name.touched ? validateName(value) : prev.name.error,
      },
    }));
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setForm(prev => ({
      ...prev,
      email: {
        ...prev.email,
        value,
        error: prev.email.touched ? validateEmail(value) : prev.email.error,
      },
    }));
  };

  const handleMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setForm(prev => {
      const remaining = Math.max(0, MAX_MESSAGE_LENGTH - value.length);
      return {
        ...prev,
        message: {
          ...prev.message,
          value,
          remaining,
          error: prev.message.touched
            ? validateMessage(value)
            : prev.message.error,
        },
      };
    });
  };

  // Blur handlers
  const markTouched = (field: "name" | "email" | "message") => {
    setForm(prev => {
      const value = prev[field].value;
      let error: string | null;
      if (field === "name") error = validateName(value);
      else if (field === "email") error = validateEmail(value);
      else error = validateMessage(value);
      if (field === "message") {
        return {
          ...prev,
          message: { ...prev.message, touched: true, error },
        };
      }
      return {
        ...prev,
        [field]: { ...prev[field], touched: true, error },
      } as FormState;
    });
  };

  // Clear success after delay
  useEffect(() => {
    if (form.success) {
      const t = setTimeout(() => {
        setForm(prev => ({ ...prev, success: false }));
      }, 6000);
      return () => clearTimeout(t);
    }
  }, [form.success]);

  const resetForm = () => {
    setForm({
      name: { value: "", touched: false, error: null },
      email: { value: "", touched: false, error: null },
      message: {
        value: "",
        touched: false,
        error: null,
        remaining: MAX_MESSAGE_LENGTH,
      },
      loading: false,
      success: false,
      globalError: null,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Final validation
    const nameError = validateName(form.name.value);
    const emailError = validateEmail(form.email.value);
    const messageError = validateMessage(form.message.value);

    if (nameError || emailError || messageError) {
      setForm(prev => ({
        ...prev,
        name: { ...prev.name, touched: true, error: nameError },
        email: { ...prev.email, touched: true, error: emailError },
        message: { ...prev.message, touched: true, error: messageError },
        globalError: "Please correct the errors highlighted below.",
      }));
      return;
    }

    setForm(prev => ({ ...prev, loading: true, globalError: null }));

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.value,
          email: form.email.value,
          message: form.message.value,
        }),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data.error || "Failed to send message.");
      }

      setForm(prev => ({ ...prev, success: true, loading: false }));
      resetForm();
    } catch (err) {
      setForm(prev => ({
        ...prev,
        loading: false,
        globalError: err instanceof Error ? err.message : "An unexpected error occurred.",
      }));
    }
  };

  return (
    <section id="contact" className="py-16 relative overflow-hidden">
      {/* Decorative background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/3 w-[38rem] h-[38rem] bg-primary/5 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-0 right-1/4 w-[36rem] h-[36rem] bg-secondary/5 rounded-full blur-[120px] animate-pulse-slow delay-1000" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-white/2 via-transparent to-transparent" />
      </div>

      <div className="container mx-auto px-4">
        <SectionHeading
          title="Get in Touch"
          subtitle="Professional collaboration, consulting, or just a quick hello — I respond promptly."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div>
            <Card className="h-full">
              <address className="not-italic space-y-8">
                <p className="text-sm text-gray-400 leading-relaxed">
                  I value clear, timely communication. Choose the channel that works
                  best for you and I will follow up shortly.
                </p>
                <div className="space-y-8">
                  <ContactItem
                    icon={FiMail}
                    title="Email"
                    value={contactInfo.email}
                    href={`mailto:${contactInfo.email}`}
                  />
                  <ContactItem
                    icon={FiPhone}
                    title="Phone"
                    value={contactInfo.phone}
                    href={`tel:${contactInfo.phone}`}
                  />
                  <ContactItem
                    icon={FaWhatsapp}
                    title="WhatsApp"
                    value="Chat instantly"
                    href={`https://wa.me/${contactInfo.whatsapp}?text=Hi, I saw your portfolio and would like to connect!`}
                  />
                  <ContactItem
                    icon={FiMapPin}
                    title="Location"
                    value={contactInfo.location}
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contactInfo.location)}`}
                  />
                </div>
              </address>
            </Card>
          </div>

          {/* Form */}
          <Card>
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              noValidate
              className="space-y-7"
            >
              <div className="space-y-6">
                <FormInput
                  label="Name"
                  name="name"
                  field={form.name}
                  placeholder="Your full name"
                  onChange={handleNameChange}
                  onBlur={() => markTouched("name")}
                  disabled={form.loading}
                  autoComplete="name"
                  icon={FiMail}
                />
                <FormInput
                  label="Email"
                  name="email"
                  type="email"
                  field={form.email}
                  placeholder="you@example.com"
                  onChange={handleEmailChange}
                  onBlur={() => markTouched("email")}
                  disabled={form.loading}
                  autoComplete="email"
                />
                <MessageTextarea
                  label="Message"
                  name="message"
                  field={form.message}
                  placeholder="Share project details, goals, timelines, or questions..."
                  onChange={handleMessageChange}
                  onBlur={() => markTouched("message")}
                  disabled={form.loading}
                  maxLength={MAX_MESSAGE_LENGTH}
                />
              </div>

              {/* Global error */}
              <AnimatedStatusMessage
                show={Boolean(form.globalError)}
                type="error"
                message={form.globalError || ""}
              />

              <motion.button
                type="submit"
                whileHover={{ scale: form.loading || !isValid ? 1 : 1.015 }}
                whileTap={{ scale: form.loading || !isValid ? 1 : 0.97 }}
                disabled={form.loading || !isValid}
                className={`relative w-full py-4 px-6 rounded-xl font-medium flex items-center justify-center gap-2
                transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60
                ${form.loading || !isValid
                    ? "bg-gray-700 cursor-not-allowed text-gray-300"
                    : "bg-gradient-to-r from-primary via-primary/90 to-secondary hover:shadow-[0_0_0_3px_rgba(0,0,0,0.3)] hover:brightness-105 text-white"
                  }`}
                aria-disabled={form.loading || !isValid}
              >
                {form.loading
                  ? (
                    <motion.div
                      className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      role="status"
                      aria-label="Sending..."
                    />
                  )
                  : (
                    <>
                      Send Message
                      <FiSend aria-hidden="true" className="text-lg" />
                    </>
                  )}
              </motion.button>

              <div className="space-y-3">
                <AnimatedStatusMessage
                  show={form.success}
                  type="success"
                  message="Message sent successfully. I'll be in touch soon."
                />
              </div>

              {/* Live region for screen readers */}
              <span
                className="sr-only"
                role="status"
                aria-live="polite"
              >
                {form.success
                  ? "Message sent successfully"
                  : form.globalError
                    ? "There is an error with the form"
                    : ""}
              </span>

              {/* Subtle reassurance / privacy note */}
              <p className="text-xs text-gray-500 text-center">
                I respect your privacy. Your information will never be shared.
              </p>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
}

function ContactItem({
  icon: Icon,
  title,
  value,
  href,
  delay = 0,
  customStyles = {
    icon: "text-primary group-hover:text-primary-light",
    background:
      "from-primary/10 to-secondary/10 group-hover:from-primary/20 group-hover:to-secondary/20",
    border: "border-gray-700/50 group-hover:border-primary/30",
  },
}: ContactItemProps) {
  const content = (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay }}
      whileHover={{ scale: 1.02 }}
      className="group relative"
    >
      <div className="flex items-start gap-4">
        <motion.div
          whileHover={{ rotate: [0, -10, 10, 0] }}
          transition={{ duration: 0.6 }}
          className={`p-3 rounded-xl bg-gradient-to-br ${customStyles.background}
                     border ${customStyles.border} transition-all duration-300 shadow-inner`}
        >
          <Icon className={`w-6 h-6 ${customStyles.icon} transition-colors`} aria-hidden="true" />
        </motion.div>
        <div>
          <h3 className="text-gray-200 font-medium mb-1 tracking-wide group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-gray-400 group-hover:text-gray-300 text-sm transition-colors">
            {value}
          </p>
        </div>
      </div>
      <motion.div
        className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={{ scale: 0.88 }}
        whileHover={{ scale: 1.05 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent rounded-lg blur-xl" />
      </motion.div>
    </motion.div>
  );

  if (href) {
    const external = href.startsWith("http");
    return (
      <a
        href={href}
        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 rounded-lg"
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
      >
        {content}
      </a>
    );
  }

  return content;
}

function FormInput({
  label,
  field,
  name,
  type = "text",
  placeholder,
  disabled,
  autoComplete,
  onChange,
  onBlur,
  icon: Icon,
}: FormInputProps) {
  const errorId = `${name}-error`;
  const inputId = `${name}-input`;
  const hasError = field.touched && !!field.error;
  return (
    <div className="space-y-2">
      <label
        htmlFor={inputId}
        className="block text-sm font-medium text-gray-300 tracking-wide"
      >
        {label}
      </label>
      <div
        className={`relative group rounded-lg border transition-all duration-300
        ${hasError
            ? "border-red-500/60 focus-within:border-red-400"
            : "border-gray-700/50 group-hover:border-gray-600/60 focus-within:border-primary"
          } bg-gray-800/30`}
      >
        {Icon && (
          <Icon
            className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5
            ${hasError ? "text-red-400" : "text-gray-500 group-focus-within:text-primary"}`}
            aria-hidden="true"
          />
        )}
        <input
          id={inputId}
          name={name}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete={autoComplete}
          onChange={onChange}
          onBlur={onBlur}
          value={field.value}
          aria-invalid={hasError || undefined}
          aria-describedby={hasError ? errorId : undefined}
          className={`w-full px-3 py-3 ${Icon ? "pl-11" : ""} bg-transparent rounded-lg
            text-white placeholder-gray-500 outline-none
            focus-visible:ring-0`}
        />
      </div>
      <FieldError field={field} id={errorId} />
    </div>
  );
}

function MessageTextarea({
  label,
  field,
  name,
  placeholder,
  disabled,
  maxLength,
  onChange,
  onBlur,
}: TextareaProps) {
  const errorId = `${name}-error`;
  const inputId = `${name}-input`;
  const hasError = field.touched && !!field.error;
  const usagePercent = ((MAX_MESSAGE_LENGTH - field.remaining) / MAX_MESSAGE_LENGTH) * 100;
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-300 tracking-wide"
        >
          {label}
        </label>
        <span
          className={`text-xs tabular-nums ${field.remaining < 75
            ? "text-red-400"
            : field.remaining < 200
              ? "text-yellow-400"
              : "text-gray-500"
            }`}
        >
          {MAX_MESSAGE_LENGTH - field.remaining}/{MAX_MESSAGE_LENGTH}
        </span>
      </div>
      <div
        className={`relative group rounded-lg border transition-all duration-300 overflow-hidden
        ${hasError
            ? "border-red-500/60"
            : "border-gray-700/50 group-hover:border-gray-600/60 focus-within:border-primary"
          } bg-gray-800/30`}
      >
        <textarea
          id={inputId}
          name={name}
          rows={6}
          placeholder={placeholder}
          disabled={disabled}
          maxLength={maxLength}
          onChange={onChange}
          onBlur={onBlur}
          value={field.value}
          aria-invalid={hasError || undefined}
          aria-describedby={hasError ? errorId : undefined}
          className="w-full resize-none px-4 py-3 bg-transparent rounded-lg text-white placeholder-gray-500 outline-none focus-visible:ring-0"
        />
        <div className="absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-500"
          style={{ width: `${usagePercent}%` }}
          aria-hidden="true"
        />
      </div>
      <FieldError field={field} id={errorId} />
    </div>
  );
}

function FieldError({ field, id }: { field: BaseFieldState; id: string }) {
  if (!(field.touched && field.error)) return null;
  return (
    <motion.p
      id={id}
      role="alert"
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-xs text-red-400 flex items-center gap-1"
    >
      {field.error}
    </motion.p>
  );
}

function AnimatedStatusMessage({ show, type, message }: AnimatedStatusMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: show ? 1 : 0, height: show ? "auto" : 0 }}
      role={type === "error" ? "alert" : "status"}
      className={`rounded-lg p-4 text-sm tracking-wide ${type === "success"
        ? "bg-green-500/10 text-green-400 border border-green-500/20"
        : "bg-red-500/10 text-red-400 border border-red-500/20"
        }`}
    >
      {message}
    </motion.div>
  );
}
