import { useScrollReveal, useInView } from '../../lib/useScrollReveal'

const ENTRIES = [
  {
    org: 'PANTEX CORPORATION',
    role: 'Data Analyst Intern',
    period: 'May 2025 – Present',
    tag: 'ACTIVE QUEST',
    tagColor: 'var(--jade,#3ee8b5)',
    bullets: [
      'Built scalable automated pipelines in Python consolidating 4 data sources across 12+ departments — eliminated manual processing and achieved a 99% reduction in reporting time',
      'Developing ML forecasting model using Python, scikit-learn, and Pandas to model attrition patterns across 4,500 employees; iterating on feature engineering and model validation',
      'Designing executive Tableau dashboard integrating live data sources, surfacing real-time KPIs and trend analysis for directors and senior leadership',
    ],
    tech: ['Python', 'scikit-learn', 'Pandas', 'Tableau', 'SQL'],
  },
]

export default function Chronicles() {
  const [sectionRef, inView] = useInView<HTMLElement>(0.15)
  const headingRef = useScrollReveal<HTMLDivElement>()

  return (
    <section ref={sectionRef} id="scene-chronicles" style={{
      width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden',
      background: 'linear-gradient(180deg, #0A0E1A 0%, #0D1525 50%, #080C18 100%)',
    }}>
      {/* Grid lines background */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(92,225,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(92,225,255,0.04) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      {/* Glow orb */}
      <div style={{
        position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)',
        width: 600, height: 300, borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(122,75,255,0.08), transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Heading */}
      <div ref={headingRef} className="reveal reveal--slide-up" style={{
        position: 'absolute', top: '6%', left: '50%', transform: 'translateX(-50%)',
        textAlign: 'center', zIndex: 5,
      }}>
        <div className="font-cinzel" style={{ color: 'var(--paper)', fontSize: 'clamp(16px, 2.5vw, 28px)', fontWeight: 700, letterSpacing: '0.2em', textShadow: '0 0 20px rgba(92,225,255,0.5)' }}>
          CHRONICLES
        </div>
        <div className="font-grotesk" style={{ color: 'rgba(92,225,255,0.5)', fontSize: 10, letterSpacing: '0.2em', marginTop: 3 }}>
          FIELD ASSIGNMENTS · ACTIVE CAMPAIGNS
        </div>
      </div>

      {/* Timeline */}
      <div style={{
        position: 'absolute', top: '18%', left: '50%', transform: 'translateX(-50%)',
        width: 'min(720px, 90vw)', zIndex: 10,
        opacity: inView ? 1 : 0, transition: 'opacity 0.7s',
      }}>
        {/* Vertical line */}
        <div style={{
          position: 'absolute', left: 28, top: 0, bottom: 0, width: 2,
          background: 'linear-gradient(180deg, rgba(92,225,255,0.6), rgba(122,75,255,0.2))',
        }} />

        {ENTRIES.map((e, i) => (
          <div key={i} style={{ display: 'flex', gap: 32, marginBottom: 32, position: 'relative' }}>
            {/* Node */}
            <div style={{ flexShrink: 0, width: 58, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 18 }}>
              <div style={{
                width: 14, height: 14, borderRadius: '50%',
                background: 'var(--electric,#5CE1FF)',
                boxShadow: '0 0 16px rgba(92,225,255,0.8)',
                border: '2px solid rgba(92,225,255,0.4)',
              }} />
            </div>

            {/* Card */}
            <div className="parchment-card" style={{ flex: 1, padding: '20px 24px' }}>
              {/* Header row */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
                <div>
                  <div className="font-cinzel" style={{ color: 'var(--ink-text)', fontWeight: 700, fontSize: 13, letterSpacing: '0.12em' }}>
                    {e.org}
                  </div>
                  <div className="font-grotesk" style={{ color: '#8B6B44', fontSize: 11, marginTop: 2 }}>
                    {e.role}
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                  <span className="font-cinzel" style={{
                    color: e.tagColor, fontSize: 9, letterSpacing: '0.15em',
                    border: `1px solid ${e.tagColor}`, padding: '2px 8px', borderRadius: 2,
                  }}>{e.tag}</span>
                  <span className="font-grotesk" style={{ color: '#8B6B44', fontSize: 10 }}>{e.period}</span>
                </div>
              </div>

              {/* Divider */}
              <div style={{ height: 1, background: 'linear-gradient(90deg, #8B6B44, transparent)', marginBottom: 12 }} />

              {/* Bullets */}
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {e.bullets.map((b, bi) => (
                  <li key={bi} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <span style={{ color: 'var(--amber,#FFB347)', fontSize: 10, marginTop: 2, flexShrink: 0 }}>▸</span>
                    <span className="font-grotesk" style={{ color: 'var(--ink-text)', fontSize: 11, lineHeight: 1.6 }}>{b}</span>
                  </li>
                ))}
              </ul>

              {/* Tech tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 14 }}>
                {e.tech.map(t => (
                  <span key={t} className="font-mono-code" style={{
                    color: 'rgba(92,225,255,0.8)', fontSize: 9, letterSpacing: '0.1em',
                    background: 'rgba(92,225,255,0.07)', border: '1px solid rgba(92,225,255,0.2)',
                    padding: '2px 8px', borderRadius: 2,
                  }}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Chapter label */}
      <div style={{ position: 'absolute', bottom: '2%', left: '5%', zIndex: 10 }}>
        <div className="font-cinzel" style={{ fontSize: 'clamp(12px, 1.5vw, 18px)', fontWeight: 700, letterSpacing: '0.25em', color: 'var(--paper)', textTransform: 'uppercase' }}>CHRONICLES</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 3 }}>
          <div style={{ width: 24, height: 1, background: 'var(--electric,#5CE1FF)' }} />
          <span className="font-grotesk" style={{ color: 'var(--electric,#5CE1FF)', fontSize: 11, letterSpacing: '0.15em' }}>Chapter III</span>
        </div>
      </div>
    </section>
  )
}
