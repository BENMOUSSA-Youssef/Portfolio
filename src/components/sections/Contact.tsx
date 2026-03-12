"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  Github,
  Linkedin,
  Copy,
  Check,
  Terminal,
  ArrowUpRight
} from "lucide-react";
import { contact } from "@/data/portfolio";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.01,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 15 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 400, damping: 25 } },
};

function ContactCard({
  label,
  value,
  href,
  icon: Icon,
  ariaLabel,
  colorClassName,
}: {
  label: string;
  value: string;
  href?: string;
  icon: React.ElementType;
  ariaLabel: string;
  colorClassName: string;
}) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback((e: React.MouseEvent) => {
    if (href) return;
    e.preventDefault();
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [value, href]);

  const innerContent = (
    <div className="group relative flex h-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-surface-800/40 p-3 sm:p-6 text-center shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-surface-800/80 hover:shadow-xl">
      <div className={`absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${colorClassName}`} />

      {/* Action Icon for Mobile (Top Right) or Desktop (Bottom) */}
      <div className="absolute right-3 top-3 sm:static sm:mt-2 flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-white/5 text-zinc-400 opacity-100 sm:opacity-0 transition-all duration-300 sm:group-hover:opacity-100 group-hover:bg-white/10 group-hover:text-white sm:order-last">
        {href ? (
          <ArrowUpRight className="h-3 w-3 sm:h-4 sm:w-4" />
        ) : copied ? (
          <Check className="h-3 w-3 sm:h-4 sm:w-4 text-green-400" />
        ) : (
          <Copy className="h-3 w-3 sm:h-4 sm:w-4" />
        )}
      </div>

      <div className="relative z-10 flex w-full flex-col items-center gap-2 sm:gap-4">
        <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/5 text-zinc-300 ring-1 ring-white/10 transition-transform duration-300 group-hover:scale-110 group-hover:bg-white/10 group-hover:text-white">
          <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
        </div>

        <div className="w-full">
          <h3 className="text-xs sm:text-sm font-medium text-zinc-400 transition-colors group-hover:text-zinc-300">{label}</h3>
          <p className="mt-1 text-xs sm:text-sm lg:text-base font-semibold text-white truncate w-full px-1" title={value}>{value}</p>
        </div>
      </div>
    </div>
  );

  return (
    <motion.div variants={itemVariants} className="h-full">
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="block h-full w-full outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-2xl"
          aria-label={ariaLabel}
        >
          {innerContent}
        </a>
      ) : (
        <button
          type="button"
          onClick={copy}
          className="block h-full w-full outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-2xl"
          aria-label={ariaLabel}
        >
          {innerContent}
        </button>
      )}
    </motion.div>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="relative scroll-mt-20 py-24 sm:py-32 overflow-hidden">
      {/* Decorative background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-zinc-800/30 blur-[120px]" />

      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium tracking-wide text-zinc-300 backdrop-blur-sm">
            <Terminal className="h-4 w-4 text-zinc-400" aria-hidden />
            <span className="uppercase">Contact & Links</span>
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
            Let&apos;s build something <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 to-zinc-500">incredible</span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400">
            I&apos;m currently open for internships and collaborative projects. Feel free to reach out through any of the channels below!
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          <ContactCard
            label="Email"
            value={contact.email}
            icon={Mail}
            ariaLabel="Copy email"
            colorClassName="bg-gradient-to-b from-blue-500/10 via-transparent to-transparent"
          />
          <ContactCard
            label="Phone"
            value={contact.phone}
            icon={Phone}
            ariaLabel="Copy phone number"
            colorClassName="bg-gradient-to-b from-emerald-500/10 via-transparent to-transparent"
          />
          <ContactCard
            label="GitHub"
            value={contact.github}
            href={contact.githubUrl}
            icon={Github}
            ariaLabel="Open GitHub profile"
            colorClassName="bg-gradient-to-b from-zinc-500/10 via-transparent to-transparent"
          />
          <ContactCard
            label="LinkedIn"
            value="LinkedIn"
            href={contact.linkedInUrl}
            icon={Linkedin}
            ariaLabel="Open LinkedIn profile"
            colorClassName="bg-gradient-to-b from-sky-500/10 via-transparent to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}