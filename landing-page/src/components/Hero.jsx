import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useTheme } from '../context/ThemeContext';

const PARENT_PORTAL = 'http://localhost:5174';

export default function Hero() {
  const sectionRef = useRef(null);
  const tagRef     = useRef(null);
  const subRef     = useRef(null);
  const ctaRef     = useRef(null);
  const { theme }  = useTheme();
  const isDark     = theme === 'dark';

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.5 });

      tl.fromTo('.hero-grid-line',
        { scaleX: 0, transformOrigin: 'left' },
        { scaleX: 1, duration: 1.4, ease: 'power3.inOut', stagger: 0.08 }
      );

      tl.fromTo(tagRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
        '-=0.8'
      );

      tl.fromTo('.hero-word',
        { opacity: 0, y: 60, skewY: 3 },
        { opacity: 1, y: 0, skewY: 0, duration: 0.75, ease: 'power4.out', stagger: 0.09 },
        '-=0.3'
      );

      tl.fromTo(subRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' },
        '-=0.35'
      );

      tl.fromTo(ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
        '-=0.35'
      );

      tl.fromTo('.hero-stat',
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', stagger: 0.1 },
        '-=0.3'
      );

      gsap.to('.hero-badge', {
        y: -8, duration: 2.4, ease: 'sine.inOut', repeat: -1, yoyo: true,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const words = ['School', 'Transport,', 'Secured.'];

  const stats = [
    { value: '100%', label: 'Real-time GPS' },
    { value: '<1s',  label: 'Alert Latency' },
    { value: '24/7', label: 'Monitoring' },
    { value: '99.9%', label: 'Uptime' },
  ];

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: '155px 0 100px',
        overflow: 'hidden',
      }}
    >
      {/* ── Animated grid bg ── */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        {[...Array(6)].map((_, i) => (
          <div key={i} className="hero-grid-line" style={{
            position: 'absolute', left: 0, right: 0,
            height: '1px', top: `${16 + i * 14}%`,
            background: 'var(--grid-line)',
            transformOrigin: 'left',
          }} />
        ))}

        {/* Glow orb */}
        <div style={{
          position: 'absolute', top: '-15%', right: '-5%',
          width: '55vw', height: '55vw', borderRadius: '50%',
          background: isDark
            ? 'radial-gradient(circle, rgba(255,255,255,0.035) 0%, transparent 65%)'
            : 'radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 65%)',
          pointerEvents: 'none',
        }} />

        {/* Light mode warm patch */}
        {!isDark && (
          <div style={{
            position: 'absolute', bottom: '10%', left: '-5%',
            width: '40vw', height: '40vw', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(245,158,11,0.05) 0%, transparent 65%)',
            pointerEvents: 'none',
          }} />
        )}
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>

        {/* ── Tag line ── */}
        <div ref={tagRef} style={{ marginBottom: 28, opacity: 0 }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            fontSize: 11, fontWeight: 600, letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'var(--text-label)',
            border: '1px solid var(--tag-border)',
            background: 'var(--tag-bg)',
            borderRadius: 99, padding: '6px 14px',
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: '50%',
              background: '#4ade80',
              boxShadow: '0 0 8px #4ade80',
              animation: 'pulseDot 2s infinite',
            }} />
            Live Tracking Platform
          </span>
        </div>

        {/* ── Headline ── */}
        <h1 style={{
          fontSize: 'clamp(48px, 8.5vw, 112px)',
          fontWeight: 800,
          lineHeight: 0.97,
          letterSpacing: '-0.038em',
          color: 'var(--text-primary)',
          marginBottom: 32,
          overflow: 'hidden',
        }}>
          {words.map((w, i) => (
            <span key={i} className="hero-word" style={{
              display: 'block', opacity: 0, willChange: 'transform, opacity',
            }}>
              {w}
            </span>
          ))}
        </h1>

        {/* ── Sub ── */}
        <p ref={subRef} style={{
          fontSize: 'clamp(15px, 1.6vw, 18px)',
          fontWeight: 400,
          color: 'var(--text-secondary)',
          lineHeight: 1.75,
          maxWidth: 480,
          marginBottom: 40,
          opacity: 0,
        }}>
          SafeRide gives parents live GPS visibility, instant alerts, and full
          peace of mind over every school bus journey — in real time.
        </p>

        {/* ── CTAs ── */}
        <div ref={ctaRef} style={{ display: 'flex', gap: 12, flexWrap: 'wrap', opacity: 0 }}>
          <a
            href={PARENT_PORTAL}
            target="_blank" rel="noopener noreferrer"
            className="btn-primary"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 9,
              padding: '14px 28px',
              background: 'var(--btn-primary-bg)',
              color: 'var(--btn-primary-text)',
              borderRadius: 11, fontWeight: 700, fontSize: 14.5,
              textDecoration: 'none',
              transition: 'transform 0.2s, box-shadow 0.2s, background 0.2s',
              border: '1px solid var(--btn-primary-bg)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.background = 'var(--btn-primary-hover)';
              e.currentTarget.style.borderColor = 'var(--btn-primary-hover)';
              e.currentTarget.style.boxShadow = isDark
                ? '0 8px 30px rgba(255,255,255,0.12)'
                : '0 8px 30px rgba(15,15,15,0.18)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.background = 'var(--btn-primary-bg)';
              e.currentTarget.style.borderColor = 'var(--btn-primary-bg)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Track My Child
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <a
            href="#features"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 9,
              padding: '14px 28px',
              background: 'transparent',
              color: 'var(--btn-ghost-text)',
              borderRadius: 11,
              border: '1px solid var(--btn-ghost-border)',
              fontWeight: 600, fontSize: 14.5,
              textDecoration: 'none',
              transition: 'all 0.2s',
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
            Learn More
          </a>
        </div>

        {/* ── Stats ── */}
        <div style={{
          display: 'flex', gap: 0, flexWrap: 'wrap',
          marginTop: 72,
          borderTop: '1px solid var(--stat-border)',
          paddingTop: 32,
        }}>
          {stats.map((s, i) => (
            <div
              key={i}
              className="hero-stat"
              style={{
                flex: '1 1 110px',
                paddingRight: 28, marginRight: 28,
                borderRight: i < stats.length - 1 ? '1px solid var(--stat-border)' : 'none',
                opacity: 0,
              }}
            >
              <div style={{
                fontSize: 'clamp(22px, 2.8vw, 32px)',
                fontWeight: 700,
                letterSpacing: '-0.025em',
                color: 'var(--text-primary)',
              }}>
                {s.value}
              </div>
              <div style={{
                fontSize: 11.5, fontWeight: 500,
                color: 'var(--text-muted)',
                letterSpacing: '0.04em',
                marginTop: 4,
              }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div className="hero-badge" style={{
        position: 'absolute', bottom: 32, left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
        color: 'var(--text-muted)',
      }}>
        <span style={{
          fontSize: 9.5, letterSpacing: '0.14em',
          textTransform: 'uppercase', fontWeight: 600,
        }}>
          Scroll
        </span>
        <svg width="1" height="30" viewBox="0 0 1 30">
          <line x1="0.5" y1="0" x2="0.5" y2="30"
            stroke="currentColor" strokeWidth="1" opacity="0.4" />
        </svg>
      </div>

      <style>{`
        @keyframes pulseDot {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.35; }
        }
      `}</style>
    </section>
  );
}
