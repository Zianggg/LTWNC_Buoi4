import { FavoritesList } from './features/favorites/FavoritesList';
import { ProductList } from './features/products/ProductList';
import { useFavoritesStore } from './stores/favoritesStore';

export default function App() {
  const favoriteCount = useFavoritesStore((state) => state.items.length);

  return (
    <div className="mx-auto grid max-w-5xl gap-8 px-5 pt-10 pb-16">
      <header className="grid gap-1 border-b border-slate-200 pb-5">
        <h1 className="text-2xl font-semibold">Bài tập về nhà — Buổi 4</h1>
        <p className="text-sm text-slate-600">
          Tính năng sản phẩm yêu thích dùng Zustand store riêng{' '}
          <code className="rounded bg-slate-200 px-1">favoritesStore</code>, không bọc Provider.
        </p>
        <p className="text-sm text-slate-700">
          Đang có <span className="font-medium tabular-nums">{favoriteCount}</span> sản phẩm yêu thích
        </p>
      </header>

      <div className="grid items-start gap-6 lg:grid-cols-[1fr_20rem]">
        <section className="rounded-md border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-semibold">Sản phẩm</h2>
          <p className="mt-1 mb-4 text-sm text-slate-600">
            Thêm hoặc bỏ khỏi danh sách yêu thích. Mỗi thẻ chỉ subscribe trạng thái của đúng sản phẩm đó.
          </p>
          <ProductList />
        </section>

        <section className="rounded-md border border-slate-200 bg-white p-6 lg:sticky lg:top-6">
          <h2 className="text-lg font-semibold">Yêu thích</h2>
          <p className="mt-1 mb-4 text-sm text-slate-600">Danh sách lấy từ favoritesStore.</p>
          <FavoritesList />
        </section>
      </div>

      <aside className="rounded-md border border-slate-200 bg-white p-6 text-sm leading-relaxed text-slate-700">
        <h2 className="mb-2 text-base font-semibold text-slate-900">
          Nhận xét: Zustand so với Redux Toolkit
        </h2>
        <p>
          Em chọn Zustand store riêng vì tính năng yêu thích chỉ có thêm/bỏ, state nhỏ, không cần
          slice, action type, configureStore hay bọc Provider như RTK. Ưu điểm: code ngắn, gọi hook
          và selector trực tiếp, TypeScript nằm trong một object, tách favoritesStore khỏi phần state
          khác nên không gộp chung với giỏ hàng. Nhược điểm so với RTK: chưa có DevTools hay
          middleware sẵn, không chuẩn hoá pending/fulfilled/rejected, team lớn dễ lệch convention khi
          thiếu một store trung tâm. Nếu dùng RTK, favoritesSlice sẽ dễ debug và ghép vào store Buổi
          3, nhưng boilerplate nhiều hơn so với đúng hai action add/remove của bài này.
        </p>
      </aside>
    </div>
  );
}
