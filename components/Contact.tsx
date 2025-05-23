"use client";

import { ChangeEvent, useRef, useState } from "react";
import { IconType } from "react-icons"; // Add IconType import
import { motion } from "framer-motion";
import { SectionHeading } from "./shared/SectionHeading";
import { contactInfo } from "@/constants";
import { FiMail, FiMapPin, FiPhone, FiSend } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa"; // Add this import
import { Card } from "./shared/Card";

// Add these to your environment variables (.env.local)
// const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
// const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
// const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

interface FormInputProps {
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
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

// Update the Contact component's form handling
export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
    loading: false,
    success: false,
    error: null as string | null,
  });

  // Update the form handlers with proper typing
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormState((prev) => ({ ...prev, name: e.target.value }));
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormState((prev) => ({ ...prev, email: e.target.value }));
  };

  const handleMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setFormState((prev) => ({ ...prev, message: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          message: formState.message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      setFormState((prev) => ({ ...prev, success: true }));

      // Reset form
      setFormState((prev) => ({
        ...prev,
        name: "",
        email: "",
        message: "",
      }));

      // Clear success message after 5 seconds
      setTimeout(() => {
        setFormState((prev) => ({ ...prev, success: false }));
      }, 5000);
    } catch (error) {
      console.error("Error:", error);
      setFormState((prev) => ({
        ...prev,
        error: error instanceof Error
          ? error.message
          : "Failed to send message",
      }));
    } finally {
      setFormState((prev) => ({ ...prev, loading: false }));
    }
  };

  return (
    <section id="contact" className="py-10 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px] animate-pulse-slow" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-[100px] animate-pulse-slow delay-1000" />
      </div>

      <div className="container mx-auto px-4">
        <SectionHeading
          title="Get in Touch"
          subtitle="Let's discuss your project or just say hello"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-6">
            <Card>
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
                {/* Add WhatsApp Contact Item */}
                <ContactItem
                  icon={FaWhatsapp}
                  title="WhatsApp"
                  value="Chat with me"
                  href={`https://wa.me/${contactInfo.whatsapp}?text=Hi,%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20connect!`}
                  // className="whatsapp-contact"
                  // customStyles={{
                  //   icon: "text-green-500 group-hover:text-green-400",
                  //   background:
                  //     "from-green-500/10 to-green-600/10 group-hover:from-green-500/20 group-hover:to-green-600/20",
                  //   border:
                  //     "border-green-500/30 group-hover:border-green-400/50",
                  // }}
                />
                <ContactItem
                  icon={FiMapPin}
                  title="Location"
                  value={contactInfo.location}
                  href={`https://www.google.com/maps/search/?api=1&query=${contactInfo.location}`}
                />
              </div>
            </Card>
          </div>

          {/* Contact Form */}
          <Card>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <FormInput
                label="Name"
                value={formState.name}
                onChange={handleNameChange}
                required
                placeholder="Your name"
                disabled={formState.loading}
              />
              <FormInput
                label="Email"
                type="email"
                value={formState.email}
                onChange={handleEmailChange}
                required
                placeholder="your@email.com"
                disabled={formState.loading}
              />
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Message
                </label>
                <textarea
                  value={formState.message}
                  onChange={handleMessageChange}
                  rows={5}
                  className="w-full bg-gray-800/50 rounded-lg border border-gray-700
                        focus:border-primary focus:ring-1 focus:ring-primary transition-colors
                        text-white placeholder-gray-500 p-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Your message..."
                  required
                  disabled={formState.loading}
                />
              </div>

              <motion.button
                whileHover={{ scale: formState.loading ? 1 : 1.02 }}
                whileTap={{ scale: formState.loading ? 1 : 0.98 }}
                disabled={formState.loading}
                className={`
                  relative w-full py-3 px-6 rounded-lg
                  flex items-center justify-center gap-2
                  text-white font-medium transition-all duration-300
                  ${
                  formState.loading
                    ? "bg-gray-700 cursor-not-allowed"
                    : "bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
                }
                `}
              >
                {formState.loading
                  ? (
                    <motion.div
                      className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  )
                  : (
                    <>
                      Send Message
                      <FiSend className="text-lg" />
                    </>
                  )}
              </motion.button>

              {/* Status Messages */}
              <AnimatedStatusMessage
                show={formState.success}
                type="success"
                message="Message sent successfully! I'll get back to you soon."
              />
              <AnimatedStatusMessage
                show={Boolean(formState.error)}
                type="error"
                message={formState.error || ""}
              />
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
}

// Update ContactItem with proper typing
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.02 }}
      className="group relative"
    >
      <div className="flex items-start gap-4">
        <motion.div
          whileHover={{ rotate: [0, -10, 10, 0] }}
          transition={{ duration: 0.5 }}
          className={`p-3 rounded-xl bg-gradient-to-br ${customStyles.background}
                     border ${customStyles.border}
                     transition-all duration-300`}
        >
          <Icon className={`w-6 h-6 ${customStyles.icon} transition-colors`} />
        </motion.div>
        <div>
          <h3 className="text-gray-200 font-medium mb-1 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
            {value}
          </p>
        </div>
      </div>

      {/* Hover effect */}
      <motion.div
        className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={{ scale: 0.8 }}
        whileHover={{ scale: 1.05 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent rounded-lg blur-xl" />
      </motion.div>
    </motion.div>
  );

  if (href) {
    return (
      <a
        href={href}
        className="block"
        target={href.startsWith("https://wa.me") ? "_blank" : undefined}
        rel={href.startsWith("https://wa.me")
          ? "noopener noreferrer"
          : undefined}
      >
        {content}
      </a>
    );
  }

  return content;
}

// Update the FormInput component with proper typing
function FormInput({ label, ...props }: FormInputProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-300">
        {label}
      </label>
      <input
        className="w-full bg-gray-800/30 rounded-lg border border-gray-700/50
          focus:border-primary focus:ring-2 focus:ring-primary/20
          transition-all duration-300 text-white placeholder-gray-500 p-4
          hover:border-gray-600/50"
        {...props}
      />
    </div>
  );
}

function AnimatedStatusMessage(
  { show, type, message }: AnimatedStatusMessageProps,
) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: show ? 1 : 0, height: show ? "auto" : 0 }}
      className={`rounded-lg p-4 ${
        type === "success"
          ? "bg-green-500/10 text-green-400 border border-green-500/20"
          : "bg-red-500/10 text-red-400 border border-red-500/20"
      }`}
    >
      {message}
    </motion.div>
  );
}
