"use client";
// components/Footer.tsx
import { motion } from "framer-motion";
import { AiFillGithub, AiFillInstagram, AiFillLinkedin } from "react-icons/ai";
import { FiArrowUpRight, FiMail, FiPhone } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa"; // Add this import
import { navigationLinks } from "@/constants";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const whatsappNumber = "233550735691";

  return (
    <footer className="relative mt-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background-dark/50 to-background-dark -z-10" />

      <div className="max-w-7xl mx-auto px-4 pt-16 pb-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <h3 className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-4">
              Emmanuel Lomotey
            </h3>
            <p className="text-gray-400 mb-6 max-w-md">
              Innovating one project at a time to transform the world through
              cutting-edge technology and creative solutions.
            </p>
            <div className="flex gap-4">
              {[
                {
                  icon: AiFillGithub,
                  href: "https://github.com/ProvLeon",
                  label: "GitHub",
                },
                {
                  icon: AiFillLinkedin,
                  href: "https://linkedin.com/in/emmanuellomotey",
                  label: "LinkedIn",
                },
                {
                  icon: AiFillInstagram,
                  href: "https://instagram.com/lomoteyokantah",
                  label: "Instagram",
                },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative p-2 bg-gray-800/50 rounded-full hover:bg-gray-700/50 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <social.icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2
                    opacity-0 group-hover:opacity-100 transition-opacity
                    text-xs text-gray-400 whitespace-nowrap">
                    {social.label}
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-sm font-semibold text-white mb-4">
              GET IN TOUCH
            </h4>
            <ul className="space-y-4">
              {[
                {
                  icon: FiPhone,
                  text: "(+233) 550 735 691",
                  href: "tel:233-550-735-691",
                },
                {
                  icon: FiMail,
                  text: "lomotey.eokantah@gmail.com",
                  href: "mailto:lomotey.eokantah@gmail.com",
                },
                {
                  icon: FaWhatsapp,
                  text: "WhatsApp Chat",
                  href:
                    `https://wa.me/${whatsappNumber}?text=Hi,%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20connect!`,
                  className: "hover:text-green-300", // Custom styling for WhatsApp
                },
              ].map((item) => (
                <motion.li key={item.href}>
                  <a
                    href={item.href}
                    target={item.icon === FaWhatsapp ? "_blank" : undefined}
                    rel={item.icon === FaWhatsapp
                      ? "noopener noreferrer"
                      : undefined}
                    className={`group flex items-center gap-2 text-gray-400 hover:text-white transition-colors ${
                      item.className || ""
                    }`}
                  >
                    <item.icon
                      className={`w-4 h-4 ${
                        item.icon === FaWhatsapp
                          ? "group-hover:text-green-400"
                          : ""
                      }`}
                    />
                    <span>{item.text}</span>
                    <FiArrowUpRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h4 className="text-sm font-semibold text-white mb-4">
              QUICK LINKS
            </h4>
            <ul className="space-y-4">
              {navigationLinks.map((link: any) => (
                <motion.li key={link.path}>
                  <a
                    href={link.path}
                    className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <span>{link.name}</span>
                    <FiArrowUpRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Footer Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="pt-8 border-t border-gray-800"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} Emmanuel Lomotey. All rights reserved.
            </p>
            <motion.a
              href="#top"
              className="group px-4 py-2 bg-gray-800/50 rounded-full hover:bg-gray-700/50 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-sm text-gray-400 group-hover:text-white transition-colors">
                Back to top ↑
              </span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
