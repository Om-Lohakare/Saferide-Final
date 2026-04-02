import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
        <path d="M12 6v2M12 16v2M6 12H4M20 12h-2" />
      </svg>
    ),
    title: 'Live GPS Tracking',
    desc: 'Follow your child\'s bus on an interactive map in real time. See exact position, speed, and estimated arrival time updated every second.',
    tag: 'Real-Time',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    ),
    title: 'Instant Alerts',
    desc: 'Receive push notifications the moment your child boards or exits the bus. Emergency alerts reach you in under one second.',
    tag: 'Push Notifications',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: 'Safe Zone Geofencing',
    desc: 'Define virtual perimeters around home, school, and bus stops. Get notified the instant a boundary is crossed.',
    tag: 'Geofencing',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
    title: 'Admin Dashboard',
    desc: 'Fleet managers get a unified control panel to oversee all buses, drivers, students, and routes from a single screen.',
    tag: 'Fleet Management',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
      </svg>
    ),
    title: 'Driver Verification',
    desc: 'Every driver is verified and authenticated before each trip. Your child never rides with an unregistered operator.',
    tag: 'Authentication',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    title: 'Trip Analytics',
    desc: 'View historical trip data, route efficiency, punctuality scores, and attendance records — all visualized in clean charts.',
    tag: 'Insights',
  },
];

export default function Features() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.feat-header > *',
        { opacity: 0, y: 28 },
        {
          opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: '.feat-header', start: 'top 86%' },
        }
      );
      gsap.fromTo('.feat-card',
        { opacity: 0, y: 44, scale: 0.97 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.09, ease: 'power3.out',
          scrollTrigger: { trigger: '.feat-grid', start: 'top 82%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="features"
      ref={sectionRef}
      className="section"
      style={{ borderTop: '1px solid var(--border)' }}
    >
      <div className="container">
        {/* Header */}
        <div className="feat-header" style={{ marginBottom: 56 }}>
          <div className="section-label">Features</div>
          <h2 className="section-title">
            Everything you need<br />to stay in the loop.
          </h2>
          <p className="section-sub">
            Built for parents who want certainty, and administrators who need control —
            all in one platform.
          </p>
        </div>

        {/* Grid */}
        <div
          className="feat-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
            border: '1px solid var(--border)',
            borderRadius: 18,
            overflow: 'hidden',
          }}
        >
          {features.map((f, i) => (
            <FeatureCard key={i} {...f} index={i} total={features.length} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ icon, title, desc, tag, index }) {
  const cardRef = useRef(null);

  return (
    <div
      ref={cardRef}
      className="feat-card"
      onMouseEnter={() => {
        gsap.to(cardRef.current, { background: 'var(--tag-bg)', duration: 0.22, ease: 'power2.out' });
      }}
      onMouseLeave={() => {
        gsap.to(cardRef.current, { background: 'transparent', duration: 0.22, ease: 'power2.out' });
      }}
      style={{
        padding: '32px 28px',
        borderRight: (index + 1) % 3 !== 0 ? '1px solid var(--border)' : 'none',
        borderBottom: index < 3 ? '1px solid var(--border)' : 'none',
        cursor: 'default',
        transition: 'background 0.22s',
      }}
    >
      {/* Icon */}
      <div style={{
        width: 42, height: 42, borderRadius: 11,
        background: 'var(--icon-bg)',
        border: '1px solid var(--icon-border)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'var(--icon-color)',
        marginBottom: 18,
      }}>
        {icon}
      </div>

      {/* Tag */}
      <div style={{
        fontSize: 10.5, fontWeight: 700, letterSpacing: '0.12em',
        textTransform: 'uppercase', color: 'var(--text-label)',
        marginBottom: 8,
      }}>
        {tag}
      </div>

      {/* Title */}
      <h3 style={{
        fontSize: 16, fontWeight: 600,
        color: 'var(--text-primary)',
        letterSpacing: '-0.015em', marginBottom: 9,
      }}>
        {title}
      </h3>

      {/* Desc */}
      <p style={{
        fontSize: 13.5, fontWeight: 400,
        color: 'var(--text-secondary)', lineHeight: 1.72,
      }}>
        {desc}
      </p>
    </div>
  );
}
