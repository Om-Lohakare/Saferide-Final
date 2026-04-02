import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useTheme } from '../context/ThemeContext';

const PARENT_PORTAL = 'http://localhost:5174';
const ADMIN_PORTAL  = 'http://localhost:5173';

/* ── Sun icon ── */
const SunIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

/* ── Moon icon ── */
const MoonIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
  </svg>
);

export default function Navbar() {
  const navRef    = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  /* ── Entry animation ── */
  useEffect(() => {
    gsap.fromTo(navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 }
    );
  }, []);

  /* ── Scroll shrink ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: 'Features',      href: '#features' },
    { label: 'How It Works',  href: '#how-it-works' },
    { label: 'Safety',        href: '#safety' },
    { label: 'About',         href: '#about' },
  ];

  const isDark = theme === 'dark';

  return (
    <header
      ref={navRef}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        transition: 'background 0.35s ease, border-color 0.35s ease, backdrop-filter 0.35s ease',
        background: scrolled ? 'var(--nav-scrolled-bg)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
        borderBottom: `1px solid ${scrolled ? 'var(--border)' : 'transparent'}`,
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', height: 68 }}>

        {/* ── Logo ── */}
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', flexShrink: 0 }}>
          <div style={{
            width: 32, height: 32,
            background: 'var(--btn-primary-bg)',
            borderRadius: 9,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7l-9-5z"
                fill={isDark ? '#000' : '#fff'} />
            </svg>
          </div>
          <span style={{
            fontWeight: 700, fontSize: 17,
            letterSpacing: '-0.035em',
            color: 'var(--text-primary)',
          }}>
            SafeRide<sup style={{
              fontSize: 9, fontWeight: 600, letterSpacing: 0,
              opacity: 0.4, verticalAlign: 'super',
            }}>™</sup>
          </span>
        </a>

        {/* ── Desktop nav links ── */}
        <nav className="desktop-nav" style={{ display: 'flex', gap: 4, marginLeft: 44, flex: 1 }}>
          {navLinks.map(l => (
            <a
              key={l.href}
              href={l.href}
              style={{
                fontSize: 13.5, fontWeight: 500,
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                padding: '6px 12px', borderRadius: 8,
                transition: 'color 0.2s, background 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = 'var(--text-primary)';
                e.currentTarget.style.background = 'var(--tag-bg)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = 'var(--text-secondary)';
                e.currentTarget.style.background = 'transparent';
              }}
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* ── Right controls ── */}
        <div className="desktop-ctas" style={{ display: 'flex', alignItems: 'center', gap: 10, marginLeft: 'auto' }}>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            style={{
              width: 38, height: 38,
              borderRadius: 10,
              border: '1px solid var(--border-md)',
              background: 'var(--tag-bg)',
              color: 'var(--text-secondary)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
              transition: 'background 0.2s, color 0.2s, border-color 0.2s',
              flexShrink: 0,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'var(--btn-ghost-hover-bg)';
              e.currentTarget.style.color = 'var(--text-primary)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'var(--tag-bg)';
              e.currentTarget.style.color = 'var(--text-secondary)';
            }}
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>

          {/* Parent Login */}
          <a
            href={PARENT_PORTAL}
            target="_blank" rel="noopener noreferrer"
            style={{
              fontSize: 13.5, fontWeight: 600,
              color: 'var(--btn-ghost-text)',
              textDecoration: 'none',
              padding: '8px 18px', borderRadius: 9,
              border: '1px solid var(--btn-ghost-border)',
              background: 'transparent',
              transition: 'all 0.2s',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'var(--btn-ghost-hover-bg)';
              e.currentTarget.style.color = 'var(--text-primary)';
              e.currentTarget.style.borderColor = 'var(--border-md)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = 'var(--btn-ghost-text)';
              e.currentTarget.style.borderColor = 'var(--btn-ghost-border)';
            }}
          >
            Parent Login
          </a>

          {/* Admin Login */}
          <a
            href={ADMIN_PORTAL}
            target="_blank" rel="noopener noreferrer"
            style={{
              fontSize: 13.5, fontWeight: 700,
              color: 'var(--btn-primary-text)',
              textDecoration: 'none',
              padding: '8px 20px', borderRadius: 9,
              background: 'var(--btn-primary-bg)',
              border: '1px solid var(--btn-primary-bg)',
              transition: 'all 0.2s',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'var(--btn-primary-hover)';
              e.currentTarget.style.borderColor = 'var(--btn-primary-hover)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'var(--btn-primary-bg)';
              e.currentTarget.style.borderColor = 'var(--btn-primary-bg)';
            }}
          >
            Admin Login
          </a>
        </div>

        {/* ── Mobile hamburger ── */}
        <div className="mobile-right" style={{ display: 'none', gap: 8, marginLeft: 'auto', alignItems: 'center' }}>
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            style={{
              width: 36, height: 36, borderRadius: 8,
              border: '1px solid var(--border-md)',
              background: 'transparent',
              color: 'var(--text-secondary)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>
          <button
            onClick={() => setMenuOpen(o => !o)}
            style={{
              width: 36, height: 36, borderRadius: 8,
              background: 'none',
              border: '1px solid var(--border-md)',
              cursor: 'pointer',
              color: 'var(--text-primary)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
            aria-label="Toggle menu"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5">
              {menuOpen
                ? <path d="M18 6L6 18M6 6l12 12" />
                : <path d="M3 12h18M3 6h18M3 18h18" />}
            </svg>
          </button>
        </div>
      </div>

      {/* ── Mobile menu panel ── */}
      {menuOpen && (
        <div style={{
          background: 'var(--nav-scrolled-bg)',
          backdropFilter: 'blur(20px)',
          borderTop: '1px solid var(--border)',
          padding: '14px 28px 24px',
        }}>
          {navLinks.map(l => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: 'block', fontSize: 15, fontWeight: 500,
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                padding: '12px 0',
                borderBottom: '1px solid var(--border)',
              }}
            >
              {l.label}
            </a>
          ))}
          <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
            <a href={PARENT_PORTAL} target="_blank" rel="noopener noreferrer"
              style={{
                flex: 1, textAlign: 'center', padding: '11px',
                borderRadius: 9, border: '1px solid var(--border-md)',
                color: 'var(--text-primary)', fontWeight: 600,
                fontSize: 14, textDecoration: 'none',
              }}>
              Parent Login
            </a>
            <a href={ADMIN_PORTAL} target="_blank" rel="noopener noreferrer"
              style={{
                flex: 1, textAlign: 'center', padding: '11px',
                borderRadius: 9, background: 'var(--btn-primary-bg)',
                color: 'var(--btn-primary-text)', fontWeight: 700,
                fontSize: 14, textDecoration: 'none',
              }}>
              Admin Login
            </a>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav  { display: none !important; }
          .desktop-ctas { display: none !important; }
          .mobile-right { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
