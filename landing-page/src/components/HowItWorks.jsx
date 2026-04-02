import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: '01',
    title: 'Register & Set Up',
    desc: 'School admins onboard the fleet — adding buses, drivers, routes, and students in minutes via the admin dashboard.',
  },
  {
    num: '02',
    title: 'Driver Authenticates',
    desc: 'At trip start, the driver logs into the SafeRide driver app. GPS tracking activates automatically for the route.',
  },
  {
    num: '03',
    title: 'Parents Track Live',
    desc: 'Parents open the parent portal and watch the bus move in real time on the map. ETAs update every second.',
  },
  {
    num: '04',
    title: 'AI Alerts & Reports',
    desc: 'The AI service monitors for anomalies — delays, route deviations, overspeeding — and fires instant push alerts.',
  },
];

export default function HowItWorks() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.hiw-header > *',
        { opacity: 0, y: 28 },
        {
          opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: '.hiw-header', start: 'top 86%' },
        }
      );
      gsap.fromTo('.hiw-step',
        { opacity: 0, x: -36 },
        {
          opacity: 1, x: 0, duration: 0.7, stagger: 0.14, ease: 'power3.out',
          scrollTrigger: { trigger: '.hiw-steps', start: 'top 80%' },
        }
      );
      gsap.fromTo('.hiw-vline',
        { scaleY: 0, transformOrigin: 'top' },
        {
          scaleY: 1, duration: 1.4, ease: 'power2.inOut',
          scrollTrigger: { trigger: '.hiw-steps', start: 'top 80%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="section"
      style={{ borderTop: '1px solid var(--border)', background: 'var(--bg-card2)' }}
    >
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 72, alignItems: 'start',
        }} className="hiw-grid">

          {/* Left sticky */}
          <div className="hiw-header" style={{ position: 'sticky', top: 110 }}>
            <div className="section-label">How It Works</div>
            <h2 className="section-title">
              From routes to real-time,<br />in four steps.
            </h2>
            <p className="section-sub">
              SafeRide connects school administrators, drivers, and parents
              into one seamless, always-on safety network.
            </p>

            {/* Terminal block */}
            <div style={{
              marginTop: 40,
              background: 'var(--terminal-bg)',
              border: '1px solid var(--terminal-border)',
              borderRadius: 14,
              padding: '18px 22px',
              fontFamily: 'monospace',
              fontSize: 12.5,
            }}>
              <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
                {['#ff5f56','#ffbd2e','#27c93f'].map(c => (
                  <div key={c} style={{ width: 9, height: 9, borderRadius: '50%', background: c }} />
                ))}
              </div>
              <div style={{ color: 'var(--terminal-dim)', lineHeight: 1.85 }}>
                <span style={{ color: 'var(--terminal-mid)' }}>$</span> saferide status<br/>
                <span style={{ color: '#4ade80' }}>✓</span> GPS active — <span style={{ color: 'var(--terminal-mid)' }}>Bus #3</span><br/>
                <span style={{ color: '#4ade80' }}>✓</span> Driver authenticated<br/>
                <span style={{ color: '#4ade80' }}>✓</span> 12 students on board<br/>
                <span style={{ color: 'var(--text-muted)' }}>→</span> ETA: <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>8 min</span>
              </div>
            </div>
          </div>

          {/* Right steps */}
          <div className="hiw-steps" style={{ display: 'flex', flexDirection: 'column' }}>
            {steps.map((s, i) => (
              <div key={i} style={{ display: 'flex', gap: 22 }}>
                {/* Number + line */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{
                    width: 42, height: 42, borderRadius: '50%',
                    border: '1px solid var(--border-md)',
                    background: 'var(--bg-card)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 11.5, fontWeight: 700, letterSpacing: '0.04em',
                    color: 'var(--text-muted)',
                    flexShrink: 0,
                  }}>
                    {s.num}
                  </div>
                  {i < steps.length - 1 && (
                    <div className="hiw-vline" style={{
                      width: 1, flex: 1,
                      background: 'var(--border)',
                      minHeight: 56, marginTop: 4,
                    }} />
                  )}
                </div>

                {/* Text */}
                <div className="hiw-step" style={{
                  paddingBottom: i < steps.length - 1 ? 44 : 0,
                  paddingTop: 7,
                }}>
                  <h3 style={{
                    fontSize: 17, fontWeight: 600,
                    letterSpacing: '-0.02em',
                    color: 'var(--text-primary)', marginBottom: 9,
                  }}>
                    {s.title}
                  </h3>
                  <p style={{
                    fontSize: 14, fontWeight: 400,
                    color: 'var(--text-secondary)', lineHeight: 1.74,
                  }}>
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hiw-grid { grid-template-columns: 1fr !important; gap: 44px !important; }
          .hiw-header { position: static !important; }
        }
      `}</style>
    </section>
  );
}
