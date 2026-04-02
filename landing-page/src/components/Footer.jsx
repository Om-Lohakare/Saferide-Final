export default function Footer() {
  const PARENT_PORTAL = 'http://localhost:5174';
  const ADMIN_PORTAL  = 'http://localhost:5173';

  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      padding: '44px 0 28px',
      background: 'var(--bg-card)',
    }}>
      <div className="container">
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'flex-start', flexWrap: 'wrap', gap: 40, marginBottom: 44,
        }}>
          {/* Brand */}
          <div style={{ maxWidth: 260 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 12 }}>
              <div style={{
                width: 28, height: 28, background: 'var(--btn-primary-bg)',
                borderRadius: 8,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7l-9-5z"
                    fill="var(--btn-primary-text)" />
                </svg>
              </div>
              <span style={{
                fontWeight: 700, fontSize: 15,
                letterSpacing: '-0.035em',
                color: 'var(--text-primary)',
              }}>
                SafeRide™
              </span>
            </div>
            <p style={{
              fontSize: 13, fontWeight: 400,
              color: 'var(--text-muted)', lineHeight: 1.72,
            }}>
              The school transport safety platform for parents, drivers, and administrators.
            </p>
          </div>

          {/* Links */}
          <div style={{ display: 'flex', gap: 60, flexWrap: 'wrap' }}>
            <div>
              <div style={{
                fontSize: 10.5, fontWeight: 700, letterSpacing: '0.12em',
                textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 14,
              }}>
                Portals
              </div>
              {[
                { label: 'Parent Login',    href: PARENT_PORTAL },
                { label: 'Admin Dashboard', href: ADMIN_PORTAL },
              ].map(l => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank" rel="noopener noreferrer"
                  style={{
                    display: 'block', fontSize: 13.5, fontWeight: 400,
                    color: 'var(--text-secondary)',
                    textDecoration: 'none', marginBottom: 9,
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
                >
                  {l.label}
                </a>
              ))}
            </div>

            <div>
              <div style={{
                fontSize: 10.5, fontWeight: 700, letterSpacing: '0.12em',
                textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 14,
              }}>
                Platform
              </div>
              {['Features', 'How It Works', 'Safety', 'About'].map(l => (
                <a
                  key={l}
                  href={`#${l.toLowerCase().replace(/\s+/g, '-')}`}
                  style={{
                    display: 'block', fontSize: 13.5, fontWeight: 400,
                    color: 'var(--text-secondary)',
                    textDecoration: 'none', marginBottom: 9,
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
                >
                  {l}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid var(--border)',
          paddingTop: 24,
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', flexWrap: 'wrap', gap: 10,
        }}>
          <p style={{
            fontSize: 12, fontWeight: 400,
            color: 'var(--text-muted)',
          }}>
            © {new Date().getFullYear()} SafeRide. All rights reserved.
          </p>
          <p style={{
            fontSize: 12, fontWeight: 400,
            color: 'var(--text-muted)',
          }}>
            Built with React + GSAP
          </p>
        </div>
      </div>
    </footer>
  );
}
