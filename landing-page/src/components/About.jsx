import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PARENT_PORTAL = 'http://localhost:5174';
const ADMIN_PORTAL  = 'http://localhost:5173';

const techStack = [
  { label: 'React',      desc: 'Parent & Admin portals' },
  { label: 'Node.js',    desc: 'API Gateway & Services' },
  { label: 'Socket.IO',  desc: 'Real-time GPS streaming' },
  { label: 'Leaflet',    desc: 'Interactive map rendering' },
  { label: 'JWT Auth',   desc: 'Secure role-based access' },
  { label: 'AI Service', desc: 'Anomaly & alert engine' },
];

export default function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.about-content > *',
        { opacity: 0, y: 36 },
        {
          opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: '.about-content', start: 'top 83%' },
        }
      );
      gsap.fromTo('.about-card',
        { opacity: 0, y: 44, scale: 0.96 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.65, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: '.about-cards', start: 'top 83%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section"
      style={{ borderTop: '1px solid var(--border)', background: 'var(--bg-card2)' }}
    >
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 72, alignItems: 'center',
        }} className="about-grid">

          {/* Left */}
          <div className="about-content" style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            <div className="section-label">About SafeRide</div>
            <h2 className="section-title" style={{ marginBottom: 18 }}>
              Built by students,<br />trusted by schools.
            </h2>
            <p style={{
              fontSize: 15, fontWeight: 400,
              color: 'var(--text-secondary)', lineHeight: 1.78, marginBottom: 14,
            }}>
              SafeRide was created to solve a real problem: parents who have no
              visibility into whether their child's school bus is on time, on route,
              or safe.
            </p>
            <p style={{
              fontSize: 15, fontWeight: 400,
              color: 'var(--text-secondary)', lineHeight: 1.78, marginBottom: 32,
            }}>
              We built a full-stack multi-service platform — real-time GPS, AI anomaly
              detection, role-based dashboards — designed to be reliable, fast, and
              respectful of privacy.
            </p>

            <div style={{ display: 'flex', gap: 11, flexWrap: 'wrap' }}>
              <a
                href={PARENT_PORTAL}
                target="_blank" rel="noopener noreferrer"
                style={{
                  padding: '11px 22px',
                  background: 'var(--btn-primary-bg)', color: 'var(--btn-primary-text)',
                  borderRadius: 10, fontWeight: 700, fontSize: 13.5,
                  textDecoration: 'none', transition: 'opacity 0.2s, background 0.2s',
                  border: '1px solid var(--btn-primary-bg)',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--btn-primary-hover)'}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--btn-primary-bg)'}
              >
                Parent Portal →
              </a>
              <a
                href={ADMIN_PORTAL}
                target="_blank" rel="noopener noreferrer"
                style={{
                  padding: '11px 22px',
                  background: 'transparent', color: 'var(--btn-ghost-text)',
                  border: '1px solid var(--btn-ghost-border)',
                  borderRadius: 10, fontWeight: 600, fontSize: 13.5,
                  textDecoration: 'none', transition: 'all 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'var(--btn-ghost-hover-bg)';
                  e.currentTarget.style.color = 'var(--text-primary)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = 'var(--btn-ghost-text)';
                }}
              >
                Admin Dashboard →
              </a>
            </div>
          </div>

          {/* Right: tech stack */}
          <div className="about-cards" style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12,
          }}>
            {techStack.map((t, i) => (
              <div
                key={i}
                className="about-card"
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: 12, padding: '17px 18px',
                  transition: 'border-color 0.2s, transform 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--border-md)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{
                  fontSize: 13, fontWeight: 700,
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.01em', marginBottom: 4,
                }}>
                  {t.label}
                </div>
                <div style={{
                  fontSize: 12, fontWeight: 400,
                  color: 'var(--text-muted)', lineHeight: 1.5,
                }}>
                  {t.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 44px !important;
          }
        }
      `}</style>
    </section>
  );
}
