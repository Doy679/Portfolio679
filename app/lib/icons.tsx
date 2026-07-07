import type { CSSProperties } from 'react';
import type { IconType } from 'react-icons';
import {
    FaBriefcase, FaCheckCircle, FaCode, FaCss3Alt, FaDesktop, FaDownload,
    FaEnvelope, FaExclamationCircle, FaFacebookF, FaFileCode, FaFilePdf,
    FaFillDrip, FaGitAlt, FaGithub, FaGlobe, FaHtml5, FaInstagram, FaJsSquare,
    FaLayerGroup, FaLightbulb, FaLinkedinIn, FaLinux, FaNodeJs, FaNpm, FaPenNib,
    FaPhoneAlt, FaReact, FaRobot, FaSyncAlt, FaTerminal, FaTools, FaUsers, FaWindows,
} from 'react-icons/fa';
import {
    FaArrowsTurnToDots, FaArrowUpRightFromSquare, FaLocationDot, FaPeopleGroup,
    FaShareNodes,
} from 'react-icons/fa6';

// Maps the existing Font Awesome class tokens (kept in component/data files) to
// tree-shaken react-icons components. Only these ~38 icons ship — replacing the
// full ~1.3MB Font Awesome CDN bundle.
const iconMap: Record<string, IconType> = {
    'fa-briefcase': FaBriefcase,
    'fa-check-circle': FaCheckCircle,
    'fa-code': FaCode,
    'fa-css3-alt': FaCss3Alt,
    'fa-desktop': FaDesktop,
    'fa-download': FaDownload,
    'fa-envelope': FaEnvelope,
    'fa-exclamation-circle': FaExclamationCircle,
    'fa-facebook-f': FaFacebookF,
    'fa-file-code': FaFileCode,
    'fa-file-pdf': FaFilePdf,
    'fa-fill-drip': FaFillDrip,
    'fa-git-alt': FaGitAlt,
    'fa-github': FaGithub,
    'fa-globe': FaGlobe,
    'fa-html5': FaHtml5,
    'fa-instagram': FaInstagram,
    'fa-js-square': FaJsSquare,
    'fa-layer-group': FaLayerGroup,
    'fa-lightbulb': FaLightbulb,
    'fa-linkedin-in': FaLinkedinIn,
    'fa-linux': FaLinux,
    'fa-node-js': FaNodeJs,
    'fa-npm': FaNpm,
    'fa-pen-nib': FaPenNib,
    'fa-phone-alt': FaPhoneAlt,
    'fa-react': FaReact,
    'fa-robot': FaRobot,
    'fa-sync-alt': FaSyncAlt,
    'fa-terminal': FaTerminal,
    'fa-tools': FaTools,
    'fa-users': FaUsers,
    'fa-windows': FaWindows,
    'fa-arrows-turn-to-dots': FaArrowsTurnToDots,
    'fa-arrow-up-right-from-square': FaArrowUpRightFromSquare,
    'fa-location-dot': FaLocationDot,
    'fa-people-group': FaPeopleGroup,
    'fa-share-nodes': FaShareNodes,
};

// Style-family tokens that are not the icon name itself.
const STYLE_TOKENS = new Set(['fa-brands', 'fa-solid', 'fa-regular']);

interface IconProps {
    /** A Font Awesome-style string, e.g. "fas fa-github" or "fa-brands fa-github". */
    name: string;
    className?: string;
    style?: CSSProperties;
}

/**
 * Renders a react-icons component from a Font Awesome-style class string.
 * Extracts the `fa-<name>` token (ignoring style families and `fab/fas/far`)
 * and looks it up in iconMap. Decorative by default (aria-hidden).
 */
export function Icon({ name, className, style }: IconProps) {
    const token = name
        .split(/\s+/)
        .find((c) => c.startsWith('fa-') && !STYLE_TOKENS.has(c));
    const Cmp = token ? iconMap[token] : undefined;
    if (!Cmp) return null;
    return <Cmp className={className} style={style} aria-hidden />;
}
