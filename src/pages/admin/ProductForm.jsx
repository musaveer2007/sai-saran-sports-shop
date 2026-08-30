import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, UploadCloud, Save, ChevronDown } from 'lucide-react';

export function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    category: 'Football',
    thumbnail_url: ''
  });

  useEffect(() => {
    if (isEdit) {
      const fetchProduct = async () => {
        const { data } = await supabase.from('ss_products').select('*').eq('id', id).single();
        if (data) {
          setFormData({
            title: data.title || '',
            price: data.price || '',
            category: data.category || 'Football',
            thumbnail_url: data.thumbnail_url || ''
          });
        }
      };
      fetchProduct();
    }
  }, [id]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Reset file input so same file can be selected again if needed
    e.target.value = null;

    try {
      setIsUploading(true);
      setErrorMsg('');
      
      // Check if file is an image
      if (!file.type.startsWith('image/')) {
        throw new Error('Please select a valid image file (JPG, PNG, etc).');
      }

      // Check if file is too large (> 10MB) to prevent browser freeze
      if (file.size > 10 * 1024 * 1024) {
        throw new Error('Image is too large. Please select an image under 10MB.');
      }

      const uploadProcess = async () => {
        const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '');
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}_${safeName}`;
        const { error, data } = await supabase.storage.from('ss_media').upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });
        if (error) throw error;
        return fileName;
      };

      const fileName = await uploadProcess();
      const { data } = supabase.storage.from('ss_media').getPublicUrl(fileName);
      setFormData(prev => ({ ...prev, thumbnail_url: data.publicUrl }));
    } catch (err) {
      console.error('Image Upload Error:', err);
      setErrorMsg(err.message || 'Unknown upload error');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setErrorMsg('');
      setIsSaving(true);
      const payload = { ...formData, price: parseFloat(formData.price || 0) };
      
      let dbError = null;
      const dbPromise = isEdit 
        ? supabase.from('ss_products').update(payload).eq('id', id)
        : supabase.from('ss_products').insert([payload]);
        
      const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error("Database save timed out after 10 seconds")), 10000));
      
      const { error } = await Promise.race([dbPromise, timeoutPromise]);
      dbError = error;
      
      if (dbError) throw dbError;
      
      navigate('/admin/products');
    } catch (err) {
      console.error('Save Error:', err);
      setErrorMsg('Save failed: ' + (err.message || JSON.stringify(err) || 'Unknown error'));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', paddingBottom: '100px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '40px' }}>
        <Link to="/admin/products" style={{ color: '#fff', textDecoration: 'none' }}>
          <ArrowLeft size={24} />
        </Link>
        <h2 style={{ fontSize: '28px', color: '#fff', fontFamily: 'var(--play)' }}>
          {isEdit ? 'Edit Product' : 'Add New Product'}
        </h2>
      </div>

      <form onSubmit={handleSave} style={{ background: 'var(--ink2)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', padding: '32px', boxShadow: 'var(--sh-md)' }}>
        
        {errorMsg && (
          <div style={{ background: 'rgba(220, 38, 38, 0.1)', border: '1px solid var(--red)', color: '#fca5a5', padding: '16px', borderRadius: '8px', marginBottom: '24px', fontFamily: 'var(--dm)', fontSize: '14px' }}>
            {errorMsg}
          </div>
        )}

        <div style={{ marginBottom: '32px' }}>
          <label className="fl" style={{ color: 'var(--dim)' }}>Product Image</label>
          {formData.thumbnail_url ? (
            <div style={{ position: 'relative', width: '100%', height: '300px', borderRadius: '12px', overflow: 'hidden', marginBottom: '16px' }}>
              <img src={formData.thumbnail_url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Preview" />
              <label className="btn-dk" style={{ position: 'absolute', bottom: '20px', right: '20px', cursor: 'pointer' }}>
                Change Image
                <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
              </label>
            </div>
          ) : (
            <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '240px', border: '2px dashed rgba(255,255,255,0.2)', borderRadius: '12px', cursor: 'pointer', color: 'var(--dim)', background: 'rgba(0,0,0,0.2)' }}>
              <UploadCloud size={48} style={{ marginBottom: '16px', color: 'var(--dim)' }} />
              <span style={{ fontSize: '16px', fontFamily: 'var(--dm)' }}>{isUploading ? 'Uploading...' : 'Click to upload image'}</span>
              <input type="file" hidden accept="image/*" onChange={handleImageUpload} disabled={isUploading} />
            </label>
          )}
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label className="fl" style={{ color: 'var(--dim)' }}>Product Title</label>
          <input required type="text" name="title" value={formData.title} onChange={handleChange} className="fi" style={{ background: 'var(--ink)', borderColor: 'rgba(255,255,255,0.1)', color: '#fff' }} placeholder="e.g. Premium Football Jersey" />
        </div>

        <div className="gc" style={{ marginBottom: '40px', gap: '24px' }}>
          <div>
            <label className="fl" style={{ color: 'var(--dim)' }}>Price (₹)</label>
            <input required type="number" name="price" value={formData.price} onChange={handleChange} className="fi" style={{ background: 'var(--ink)', borderColor: 'rgba(255,255,255,0.1)', color: '#fff' }} />
          </div>
          <div style={{ position: 'relative' }}>
            <label className="fl" style={{ color: 'var(--dim)' }}>Category</label>
            <select required name="category" value={formData.category} onChange={handleChange} className="fi" style={{ background: 'var(--ink)', borderColor: 'rgba(255,255,255,0.1)', color: '#fff', appearance: 'none', paddingRight: '40px' }}>
              <option value="Football">Football</option>
              <option value="Volleyball">Volleyball</option>
              <option value="Football Boots">Football Boots</option>
              <option value="Cricket Shoes">Cricket Shoes</option>
              <option value="Cricket Bats">Cricket Bats</option>
              <option value="Cricket White Jersey">Cricket White Jersey</option>
              <option value="Badminton Rackets">Badminton Rackets</option>
              <option value="Other Products">Other Products</option>
            </select>
            <ChevronDown size={18} style={{ position: 'absolute', right: '14px', bottom: '13px', color: 'var(--dim)', pointerEvents: 'none' }} />
          </div>
        </div>

        <button type="submit" disabled={isSaving || isUploading} className="btn-r" style={{ width: '100%', justifyContent: 'center', padding: '16px', fontSize: '15px' }}>
          <Save size={18} /> {isSaving ? 'Saving...' : 'Save Product'}
        </button>
      </form>
    </div>
  );
}
