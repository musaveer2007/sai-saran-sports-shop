import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { useAuthStore } from './useAuthStore';

// Helper to get/set local cart
const getLocalCart = () => JSON.parse(localStorage.getItem('cart') || '[]');
const setLocalCart = (cart) => localStorage.setItem('cart', JSON.stringify(cart));

export const useCartStore = create((set, get) => ({
  items: [],
  loading: false,

  fetchCart: async () => {
    set({ loading: true });
    try {
      const user = useAuthStore.getState().user;
      
      if (user) {
        const { data, error } = await supabase
          .from('cart_items')
          .select(`*, products(*)`)
          .eq('user_id', user.id);
          
        if (!error && data) {
          set({ items: data, loading: false });
        } else {
          set({ loading: false });
        }
      } else {
        set({ items: getLocalCart(), loading: false });
      }
    } catch (error) {
      console.error("Cart fetch error:", error);
      set({ loading: false });
    }
  },

  syncLocalToDb: async () => {
    const user = useAuthStore.getState().user;
    if (!user) return;

    const localCart = getLocalCart();
    if (localCart.length === 0) return;

    for (const item of localCart) {
      // Check for duplicate
      const { data: existing } = await supabase
        .from('cart_items')
        .select('id, quantity')
        .eq('user_id', user.id)
        .eq('product_id', item.product_id)
        .eq('selected_size', item.selected_size || '')
        .eq('selected_color', item.selected_color || '')
        .single();

      if (existing) {
        await supabase
          .from('cart_items')
          .update({ quantity: existing.quantity + item.quantity })
          .eq('id', existing.id);
      } else {
        await supabase
          .from('cart_items')
          .insert({
            user_id: user.id,
            product_id: item.product_id,
            quantity: item.quantity,
            selected_size: item.selected_size || '',
            selected_color: item.selected_color || '',
          });
      }
    }
    
    localStorage.removeItem('cart');
    get().fetchCart();
  },

  addToCart: async (product, qty = 1, size = '', color = '') => {
    const user = useAuthStore.getState().user;

    if (user) {
      // Check duplicate
      const { data: existing } = await supabase
        .from('cart_items')
        .select('id, quantity')
        .eq('user_id', user.id)
        .eq('product_id', product.id)
        .eq('selected_size', size)
        .eq('selected_color', color)
        .single();

      if (existing) {
        await supabase
          .from('cart_items')
          .update({ quantity: existing.quantity + qty })
          .eq('id', existing.id);
      } else {
        await supabase
          .from('cart_items')
          .insert({
            user_id: user.id,
            product_id: product.id,
            quantity: qty,
            selected_size: size,
            selected_color: color,
          });
      }
      get().fetchCart();
    } else {
      const current = getLocalCart();
      const existing = current.find(i => i.product_id === product.id && i.selected_size === size && i.selected_color === color);
      
      let updated;
      if (existing) {
        updated = current.map(i => 
          (i.product_id === product.id && i.selected_size === size && i.selected_color === color)
            ? { ...i, quantity: i.quantity + qty }
            : i
        );
      } else {
        updated = [...current, { product_id: product.id, products: product, quantity: qty, selected_size: size, selected_color: color, id: Date.now().toString() }];
      }
      
      setLocalCart(updated);
      set({ items: updated });
    }
  },

  removeFromCart: async (itemId) => {
    const user = useAuthStore.getState().user;
    if (user) {
      await supabase.from('cart_items').delete().eq('id', itemId);
      get().fetchCart();
    } else {
      const current = getLocalCart();
      const updated = current.filter(i => i.id !== itemId);
      setLocalCart(updated);
      set({ items: updated });
    }
  },

  updateQuantity: async (itemId, qty) => {
    if (qty < 1) return;
    const user = useAuthStore.getState().user;
    
    if (user) {
      await supabase.from('cart_items').update({ quantity: qty }).eq('id', itemId);
      get().fetchCart();
    } else {
      const current = getLocalCart();
      const updated = current.map(i => i.id === itemId ? { ...i, quantity: qty } : i);
      setLocalCart(updated);
      set({ items: updated });
    }
  },

  clearCart: async () => {
    const user = useAuthStore.getState().user;
    if (user) {
      await supabase.from('cart_items').delete().eq('user_id', user.id);
      get().fetchCart();
    } else {
      localStorage.removeItem('cart');
      set({ items: [] });
    }
  }
}));
