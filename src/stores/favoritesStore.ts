import { create } from 'zustand';
import type { FavoriteProduct } from '../types/product';

/*
 * Nhận xét — Zustand (favoritesStore) so với Redux Toolkit
 *
 * Em chọn Zustand store riêng vì tính năng yêu thích chỉ có thêm/bỏ, state nhỏ,
 * không cần slice, action type, configureStore hay bọc <Provider> như RTK.
 * Ưu điểm: code ngắn, gọi hook + selector trực tiếp, TypeScript nằm trong 1 object,
 * tách favoritesStore khỏi phần state khác nên không gộp chung với giỏ hàng.
 * Nhược điểm so với RTK: chưa có DevTools/middleware sẵn, không chuẩn hoá
 * pending/fulfilled/rejected, team lớn dễ lệch convention khi thiếu 1 store trung tâm.
 * Nếu dùng RTK, favoritesSlice sẽ dễ debug và ghép vào store Buổi 3, nhưng boilerplate
 * nhiều hơn so với đúng 2 action add/remove của bài này.
 */

interface FavoritesState {
  items: FavoriteProduct[];
  addFavorite: (product: FavoriteProduct) => void;
  removeFavorite: (id: number) => void;
  toggleFavorite: (product: FavoriteProduct) => void;
}

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  items: [],
  addFavorite: (product) =>
    set((state) => {
      if (state.items.some((item) => item.id === product.id)) return state;
      return { items: [...state.items, product] };
    }),
  removeFavorite: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),
  toggleFavorite: (product) => {
    const exists = get().items.some((item) => item.id === product.id);
    if (exists) {
      get().removeFavorite(product.id);
      return;
    }
    get().addFavorite(product);
  },
}));
