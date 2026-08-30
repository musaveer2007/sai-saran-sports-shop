import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useCartStore } from '../../store/useCartStore';
import { PRODUCTS } from '../../data/constants';
import { ShoppingCart, Heart, Eye } from 'lucide-react';

/**
 * SportShowcase - Merged component
 * Combines the 3D website's ShopSection layout (glassmorphism cards, scroll-synced animation)
 * with the Sai Saran website's real product data from Supabase.
 * Falls back to static PRODUCTS from constants.js when Supabase is unavailable.
 * 
 * Reuses: Sai Saran's supabase client, useCartStore, product data model, PRODUCTS constants
 * Extends: 3D website's ShopSection glassmorphism aesthetic  
 */

const SPORT_CONFIG = {
  Football: {
    title: 'Football Collection',
    subtitle: 'Precision gear for the modern player.',
    gradient: 'linear-gradient(135deg, #10b981, #059669)',
    accentColor: '#10b981',
    filterKey: 'Football',
  },
  Volleyball: {
    title: 'Volleyball Pro Shop',
    subtitle: 'Dominate the net with elite equipment.',
    gradient: 'linear-gradient(135deg, #3b82f6, #2563eb)',
    accentColor: '#3b82f6',
    filterKey: 'Volleyball',
  },
  Badminton: {
    title: 'Badminton Essentials',
    subtitle: 'Lightweight power for rapid rallies.',
    gradient: 'linear-gradient(135deg, #6366f1, #4f46e5)',
    accentColor: '#6366f1',
    filterKey: 'Badminton',
  },
  Cricket: {
    title: 'Cricket Armory',
    subtitle: 'Unleash your batting potential.',
    gradient: 'linear-gradient(135deg, #ef4444, #dc2626)',
    accentColor: '#ef4444',
    filterKey: 'Cricket',
  },
};

const ALIGN_MAP = {
  Football: 'left',
  Volleyball: 'left',
  Badminton: 'left',
  Cricket: 'center',
};

function ProductCard({ product, accentColor }) {
  const { addToCart } = useCartStore();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="shop-animate-item shop-animate-item-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        width: 220,
        height: 290,
        borderRadius: 16,
        overflow: 'hidden',
        border: `1px solid ${isHovered ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)'}`,
        background: 'rgba(255,255,255,0.05)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        boxShadow: isHovered
          ? `0 8px 32px rgba(0,0,0,0.5), 0 0 20px ${accentColor}22`
          : '0 4px 30px rgba(0,0,0,0.5)',
        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: isHovered ? 'translateY(-8px) scale(1.02)' : 'none',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
      }}
    >
      {/* Product Image */}
      <div
        style={{
          width: '100%',
          height: '60%',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <img
          src={product.thumbnail_url || product.img}
          alt={product.title}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: isHovered ? 1 : 0.85,
            transition: 'all 0.5s',
            transform: isHovered ? 'scale(1.07)' : 'scale(1)',
          }}
        />
        {/* Shine effect */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, transparent, rgba(255,255,255,0.2), transparent)',
            transform: isHovered ? 'translateX(100%)' : 'translateX(-100%)',
            transition: 'transform 1s',
          }}
        />
        {/* Tag */}
        {product.tag && (
          <span
            style={{
              position: 'absolute',
              top: 10,
              left: 10,
              padding: '3px 10px',
              background: accentColor,
              color: '#fff',
              borderRadius: 999,
              fontFamily: 'var(--dm)',
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: '.04em',
            }}
          >
            {product.tag}
          </span>
        )}
      </div>

      {/* Quick Actions */}
      <div
        style={{
          position: 'absolute',
          top: 12,
          right: 12,
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          opacity: isHovered ? 1 : 0,
          transform: isHovered ? 'translateX(0)' : 'translateX(16px)',
          transition: 'all 0.3s ease',
        }}
      >
        <button
          style={{
            padding: 8,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(8px)',
            border: 'none',
            color: '#fff',
            cursor: 'pointer',
            transition: 'background 0.2s',
          }}
        >
          <Heart size={16} />
        </button>
        <button
          style={{
            padding: 8,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(8px)',
            border: 'none',
            color: '#fff',
            cursor: 'pointer',
            transition: 'background 0.2s',
          }}
        >
          <Eye size={16} />
        </button>
      </div>

      {/* Product Info */}
      <div
        style={{
          padding: '14px 16px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          flex: 1,
          background: 'rgba(0,0,0,0.4)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <div>
          <div
            style={{
              fontFamily: 'var(--dm)',
              fontSize: 10,
              color: 'rgba(255,255,255,0.4)',
              letterSpacing: '.1em',
              textTransform: 'uppercase',
              marginBottom: 4,
            }}
          >
            {product.sport || 'General'} · {product.category || product.cat}
          </div>
          <h3
            style={{
              fontFamily: 'var(--dm)',
              fontSize: 16,
              fontWeight: 600,
              color: '#fff',
              marginBottom: 4,
              lineHeight: 1.2,
            }}
          >
            {product.title}
          </h3>
          <p
            style={{
              fontFamily: 'var(--dm)',
              fontSize: 20,
              fontWeight: 500,
              color: accentColor,
            }}
          >
            ₹{product.price}
          </p>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={() => {
            addToCart(product, 1, '', '');
          }}
          style={{
            width: '100%',
            padding: '8px 0',
            marginTop: 6,
            borderRadius: 8,
            background: isHovered ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.1)',
            color: isHovered ? '#000' : '#fff',
            fontFamily: 'var(--dm)',
            fontWeight: 600,
            fontSize: 12,
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            transition: 'all 0.3s',
            transform: isHovered ? 'translateY(0)' : 'translateY(4px)',
            opacity: isHovered ? 1 : 0,
          }}
        >
          <ShoppingCart size={14} /> Add to Cart
        </button>
      </div>
    </div>
  );
}

// Helper: filter static products by sport
function getStaticProducts(sport) {
  const sportLower = sport.toLowerCase();
  const filtered = PRODUCTS.filter(p =>
    (p.sport || '').toLowerCase() === sportLower ||
    (p.sport || '').toLowerCase() === 'multi'
  );
  return filtered.length > 0 ? filtered : PRODUCTS.slice(0, 3);
}

export function SportShowcase({ sport, align }) {
  const [products, setProducts] = useState(() => getStaticProducts(sport));
  const config = SPORT_CONFIG[sport] || SPORT_CONFIG.Football;
  const alignment = align || ALIGN_MAP[sport] || 'left';

  // Supabase fetch removed as per user request to keep uploaded products out of animation region.

  const getAlignStyle = () => {
    if (alignment === 'right') return { alignItems: 'flex-end', textAlign: 'right', marginLeft: 'auto' };
    if (alignment === 'center') return { alignItems: 'center', textAlign: 'center', margin: '0 auto' };
    return { alignItems: 'flex-start', textAlign: 'left', marginRight: 'auto' };
  };

  const alignStyle = getAlignStyle();

  return (
    <div
      className="sport-showcase-container"
      style={{
        ...alignStyle,
      }}
    >
      <h2
        className="shop-animate-item"
        style={{
          fontFamily: 'var(--play)',
          fontSize: 'clamp(36px, 5vw, 64px)',
          fontWeight: 500,
          backgroundImage: 'linear-gradient(to right, #fff, rgba(255,255,255,0.6))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          letterSpacing: '-0.02em',
          textTransform: 'uppercase',
          marginBottom: 8,
          lineHeight: 1,
        }}
      >
        {config.title}
      </h2>
      <p
        className="shop-animate-item"
        style={{
          fontFamily: 'var(--dm)',
          fontSize: 'clamp(16px, 2vw, 22px)',
          color: 'rgba(255,255,255,0.5)',
          fontWeight: 300,
          letterSpacing: '0.02em',
          marginBottom: 36,
        }}
      >
        {config.subtitle}
      </p>

      <div
        className="sport-product-grid"
        style={{
          justifyContent:
            alignment === 'center' ? 'center' :
            alignment === 'right' ? 'flex-end' : 'flex-start',
        }}
      >
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            accentColor={config.accentColor}
          />
        ))}
      </div>
    </div>
  );
}
