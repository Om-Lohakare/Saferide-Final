import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PARENT_PORTAL = 'http://localhost:5174';
const ADMIN_PORTAL  = 'http://localhost:5173';

const tags = [
  'Real-Time GPS', 'School Safety', 'Parent Alerts', 'Route Tracking',
  'Driver Auth', 'Fleet Management', 'Geofencing', 'Trip Analytics',
  'Push Notifications', 'Safe Boarding', 'AI Monitoring', 'Live Map',
];

export default function CTA() {
  const sectionRef = useRef(null);
  const marqueeRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.cta-inner > *',
        { opacity: 0, y: 36 },
        {
          opacity: 1, y: 0, duration: 0.75, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: '.cta-inner', start: 'top 86%' },
        }
      );

      if (marqueeRef.current) {
        gsap.to(marqueeRef.current, {
          xPercent: -50, duration: 28, ease: 'none', repeat: -1,
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{ borderTop: '1px solid var(--border)' }}
    >
      {/* Marquee strip */}
      <div style={{
        overflow: 'hidden',
        borderBottom: '1px solid var(--border)',
        padding: '12px 0',
        background: 'var(--bg-card2)',
      }}>
        <div ref={marqueeRef} style={{
          display: 'flex', gap: 30, whiteSpace: 'nowrap', width: 'max-content',
        }}>
          {[...tags, ...tags].map((tag, i) => (
            <span key={i} style={{
              fontSize: 11, fontWeight: 600,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              color: 'var(--text-muted)',
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              {tag}
              <span style={{
                display: 'inline-block', width: 3, height: 3,
                borderRadius: '50%', background: 'var(--border-md)',
              }} />
            </span>
          ))}
        </div>
      </div>

      {/* CTA block */}
      <div className="section" style={{ paddingBottom: 100 }}>
        <div className="container">
          <div className="cta-inner" style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto' }}>

            {/* Live badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 7,
              fontSize: 10.5, fontWeight: 600, letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
              marginBottom: 22,
              border: '1px solid var(--tag-border)',
              background: 'var(--tag-bg)',
              borderRadius: 99, padding: '5px 13px',
            }}>
              <span style={{
                width: 6, height: 6, borderRadius: '50%', background: '#4ade80',
                boxShadow: '0 0 8px #4ade80',
              }} />
              Live & Active
            </div>

            <h2 style={{
              fontSize: 'clamp(36px, 5.5vw, 68px)',
              fontWeight: 800, letterSpacing: '-0.035em', lineHeight: 1.02,
              color: 'var(--text-primary)', marginBottom: 22,
            }}>
              Keep your child<br />safe, every ride.
            </h2>

            <p style={{
              fontSize: 16, fontWeight: 400,
              color: 'var(--text-secondary)', lineHeight: 1.74, marginBottom: 40,
            }}>
              Join families and schools already using SafeRide to ensure
              every journey is tracked, secure, and stress-free.
            </p>

            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a
                href={PARENT_PORTAL}
                target="_blank" rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 9,
                  padding: '15px 32px',
                  background: 'var(--btn-primary-bg)',
                  color: 'var(--btn-primary-text)',
                  borderRadius: 12, fontWeight: 700, fontSize: 15,
                  textDecoration: 'none',
                  border: '1px solid var(--btn-primary-bg)',
                  transition: 'transform 0.2s, box-shadow 0.2s, background 0.2s',
                  letterSpacing: '-0.01em',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'var(--btn-primary-hover)';
                  e.currentTarget.style.borderColor = 'var(--btn-primary-hover)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 10px 36px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'var(--btn-primary-bg)';
                  e.currentTarget.style.borderColor = 'var(--btn-primary-bg)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                Parent Login
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
              <a
                href={ADMIN_PORTAL}
                target="_blank" rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 9,
                  padding: '15px 32px',
                  background: 'transparent',
                  color: 'var(--btn-ghost-text)',
                  border: '1px solid var(--btn-ghost-border)',
                  borderRadius: 12, fontWeight: 600, fontSize: 15,
                  textDecoration: 'none',
                  transition: 'all 0.2s', letterSpacing: '-0.01em',
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
                Admin Login
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
