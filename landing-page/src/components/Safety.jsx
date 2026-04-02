import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const safetyItems = [
  {
    title: 'End-to-End Encryption',
    desc: 'All location data is encrypted in transit using TLS 1.3 and stored with AES-256 at rest.',
    icon: '🔐',
  },
  {
    title: 'Role-Based Access Control',
    desc: 'Granular permissions ensure parents see only their children, drivers see only their routes.',
    icon: '🛡',
  },
  {
    title: 'Zero-Retention Policy',
    desc: 'Trip data is automatically purged after 90 days unless the institution opts into long-term analytics.',
    icon: '🗑',
  },
  {
    title: 'SOC 2 Compliant Architecture',
    desc: 'Infrastructure designed around industry-standard security controls with continuous monitoring.',
    icon: '✅',
  },
];

export default function Safety() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.safety-header > *',
        { opacity: 0, y: 28 },
        {
          opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: '.safety-header', start: 'top 86%' },
        }
      );
      gsap.fromTo('.safety-item',
        { opacity: 0, y: 36 },
        {
          opacity: 1, y: 0, duration: 0.6, stagger: 0.11, ease: 'power3.out',
          scrollTrigger: { trigger: '.safety-grid', start: 'top 83%' },
        }
      );
      gsap.fromTo('.safety-trust',
        { opacity: 0, scale: 0.96 },
        {
          opacity: 1, scale: 1, duration: 0.7, ease: 'back.out(1.5)',
          scrollTrigger: { trigger: '.safety-trust', start: 'top 88%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="safety"
      ref={sectionRef}
      className="section"
      style={{ borderTop: '1px solid var(--border)' }}
    >
      <div className="container">
        {/* Header */}
        <div className="safety-header" style={{ textAlign: 'center', marginBottom: 60 }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>
            Trust & Safety
          </div>
          <h2 className="section-title" style={{ textAlign: 'center' }}>
            Security is non-negotiable.
          </h2>
          <p className="section-sub" style={{ margin: '14px auto 0', textAlign: 'center' }}>
            Every layer of SafeRide is built with your child's privacy and safety as the primary concern.
          </p>
        </div>

        {/* Cards */}
        <div className="safety-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: 16, marginBottom: 52,
        }}>
          {safetyItems.map((item, i) => (
            <div
              key={i}
              className="safety-item"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 16, padding: '26px 22px',
                transition: 'border-color 0.25s, box-shadow 0.25s, transform 0.25s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--border-md)';
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 6px 24px rgba(0,0,0,0.07)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ fontSize: 24, marginBottom: 14 }}>{item.icon}</div>
              <h3 style={{
                fontSize: 15, fontWeight: 600,
                color: 'var(--text-primary)',
                letterSpacing: '-0.01em', marginBottom: 7,
              }}>
                {item.title}
              </h3>
              <p style={{
                fontSize: 13.5, fontWeight: 400,
                color: 'var(--text-secondary)', lineHeight: 1.72,
              }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Trust banner */}
        <div className="safety-trust" style={{
          border: '1px solid var(--border)',
          borderRadius: 20, padding: '52px 32px',
          textAlign: 'center',
          background: 'var(--bg-card2)',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse at 50% 0%, var(--tag-bg) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />
          <div style={{ fontSize: 44, marginBottom: 14 }}>🔒</div>
          <h3 style={{
            fontSize: 'clamp(22px, 3vw, 32px)',
            fontWeight: 700, letterSpacing: '-0.025em',
            color: 'var(--text-primary)', marginBottom: 12,
          }}>
            Your child's location, only for you.
          </h3>
          <p style={{
            fontSize: 15, fontWeight: 400,
            color: 'var(--text-secondary)',
            maxWidth: 480, margin: '0 auto', lineHeight: 1.74,
          }}>
            We never sell data, never share with third parties, and never store
            identifiable location history without explicit consent.
          </p>
        </div>
      </div>
    </section>
  );
}
