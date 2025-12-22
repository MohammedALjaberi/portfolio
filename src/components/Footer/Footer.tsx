/**
 * Footer Component
 * Uses TailwindCSS and Material Icons
 */

import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import usePortfolioStore from "../../store/usePortfolioStore";
import { TRANS } from "../../constants/translations";

// Social links
const SOCIAL_LINKS = [
  {
    name: "GitHub",
    href: "https://github.com/MohammedALjaberi",
    icon: <GitHubIcon />,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/mohammed-aljaberi/",
    icon: <LinkedInIcon />,
  },
  {
    name: "Email",
    href: "mailto:aljabri606@gmail.com",
    icon: <EmailIcon />,
  },
];

const Footer = () => {
  const { language } = usePortfolioStore();
  const t = TRANS[language];
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-[var(--color-border)]">
      <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4">
        {/* Logo */}
        <span className="text-xl font-bold gradient-text">MA</span>

        {/* Copyright */}
        <p className="text-sm text-[#1ae66b] text-center">
          © {currentYear} Mohammed Aljaberi. {t.footer.rights}
        </p>

        {/* Social Links */}
        <div className="flex gap-3">
          {SOCIAL_LINKS.map((social, index) => (
            <a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-xl bg-transparent border border-gray-600 flex items-center justify-center text-[#1ae66b] transition-all duration-300 hover:border-[#1ae66b] hover:-translate-y-1"
              aria-label={social.name}
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
