export function Hero() {
  return (
    <section 
      style={{ 
        position: 'relative', 
        width: '100%', 
        background: 'var(--cream)', 
        paddingTop: '160px', 
        paddingBottom: '96px', 
        overflow: 'hidden' 
      }}
    >
      {/* Subtle decorative geometric element */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '40vw',
          height: '40vw',
          background: 'var(--beige)',
          borderRadius: '50%',
          mixBlendMode: 'multiply',
          opacity: 0.3,
          filter: 'blur(100px)',
          transform: 'translate(33%, -33%)',
          pointerEvents: 'none'
        }}
      />

      <div 
        className="cont"
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '48px'
        }}
      >
        {/* Left Side: Typography & CTA */}
        <div 
          style={{
            flex: '1 1 45%',
            minWidth: '320px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            textAlign: 'left'
          }}
        >
          {/* Eyebrow */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <span style={{ height: '2px', width: '32px', background: 'var(--red)' }}></span>
            <span style={{ fontSize: '12px', letterSpacing: '0.2em', fontWeight: 600, color: 'var(--red)', textTransform: 'uppercase', fontFamily: 'var(--dm)' }}>
              Est. 2010 · Ponneri
            </span>
          </div>

          {/* Headline */}
          <h1 
            style={{
              fontSize: 'clamp(48px, 6vw, 80px)',
              lineHeight: 1.05,
              fontFamily: 'var(--play)',
              fontWeight: 500,
              color: 'var(--charcoal)',
              marginBottom: '24px'
            }}
          >
            GEAR UP.<br />
            PLAY <span style={{ color: 'var(--red)', fontStyle: 'italic', paddingRight: '8px' }}>HARDER.</span>
          </h1>

          {/* Supporting Text */}
          <p 
            style={{
              fontSize: 'clamp(16px, 1.5vw, 20px)',
              color: 'var(--charcoal)',
              opacity: 0.8,
              maxWidth: '450px',
              marginBottom: '40px',
              lineHeight: 1.6,
              fontFamily: 'var(--dm)',
              fontWeight: 300
            }}
          >
            Quality sports equipment and apparel built for every game, every team, and every ambition.
          </p>

          {/* Call to Action */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
            <a href="#products" className="btn-r" style={{ padding: '16px 32px', fontSize: '14px' }}>
              SHOP PRODUCTS
            </a>
            <a href="#contact" className="btn-ol" style={{ padding: '15px 32px', fontSize: '14px' }}>
              GET A QUOTE
            </a>
          </div>
        </div>

        {/* Right Side: Premium Sports Visual */}
        <div 
          style={{
            flex: '1 1 45%',
            minWidth: '320px',
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <div 
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '600px',
              aspectRatio: '4/3',
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: 'var(--sh-xl)'
            }}
          >
            <img 
              src="/images/hero-sports.png" 
              alt="Premium Sports Equipment" 
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center'
              }}
              loading="eager"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
