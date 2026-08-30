import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Link } from 'react-router-dom';
import { Plus, Edit2, Trash2, Image as ImageIcon } from 'lucide-react';

export function ProductsAdmin() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    const { data } = await supabase.from('ss_products').select('*').order('created_at', { ascending: false });
    if (data) setProducts(data);
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this product?')) {
      await supabase.from('ss_products').delete().eq('id', id);
      fetchProducts();
    }
  };

  return (
    <div style={{ paddingBottom: '100px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <h2 style={{ fontSize: '28px', color: '#fff', fontFamily: 'var(--play)' }}>Your Products</h2>
        <Link to="/admin/products/new" className="btn-r">
          <Plus size={18} /> Add New Product
        </Link>
      </div>

      {loading ? (
        <div style={{ color: 'var(--dim)', textAlign: 'center', padding: '100px 0' }}>Loading products...</div>
      ) : (
        <div className="g3">
          {products.map(p => (
            <div key={p.id} className="pc" style={{ background: 'var(--ink2)', borderColor: 'rgba(255,255,255,0.1)' }}>
              <div className="iw" style={{ height: '260px', background: 'var(--ink)' }}>
                {p.thumbnail_url ? (
                  <img src={p.thumbnail_url} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--dim)' }}>
                    <ImageIcon size={40} />
                  </div>
                )}
              </div>
              <div style={{ padding: '24px' }}>
                <h3 style={{ color: '#fff', fontSize: '18px', fontFamily: 'var(--play)', marginBottom: '8px' }}>{p.title}</h3>
                <p style={{ color: 'var(--red)', fontSize: '20px', fontWeight: 'bold' }}>₹{p.price}</p>
                <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                  <Link to={`/admin/products/${p.id}/edit`} className="btn-ol" style={{ flex: 1, justifyContent: 'center', borderColor: 'var(--dim)', color: 'var(--cream)' }}>
                    <Edit2 size={14} /> Edit
                  </Link>
                  <button onClick={() => handleDelete(p.id)} className="btn-ol" style={{ flex: 1, justifyContent: 'center', borderColor: 'var(--red)', color: 'var(--red)' }}>
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
          {products.length === 0 && (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', color: 'var(--dim)', padding: '100px 0', background: 'var(--ink2)', borderRadius: '16px', border: '1px dashed rgba(255,255,255,0.1)' }}>
              <p style={{ fontSize: '18px', marginBottom: '16px' }}>No products found.</p>
              <Link to="/admin/products/new" className="btn-ol" style={{ borderColor: 'var(--dim)', color: '#fff' }}>
                Create your first product
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
