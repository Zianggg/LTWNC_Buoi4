import { useFavoritesStore } from '../../stores/favoritesStore';

const formatPrice = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
  maximumFractionDigits: 0,
});

export function FavoritesList() {
  const items = useFavoritesStore((state) => state.items);
  const removeFavorite = useFavoritesStore((state) => state.removeFavorite);

  if (items.length === 0) {
    return (
      <p className="text-sm text-slate-600">
        Chưa có sản phẩm yêu thích. Bấm nút trên thẻ sản phẩm để thêm.
      </p>
    );
  }

  return (
    <ul className="grid gap-3">
      {items.map((item) => (
        <li key={item.id} className="grid grid-cols-[4rem_1fr_auto] items-center gap-3">
          <img src={item.image} alt="" className="h-16 w-16 rounded-md bg-slate-200 object-cover" />
          <div className="min-w-0">
            <p className="truncate font-medium">{item.title}</p>
            <p className="text-sm tabular-nums text-slate-600">{formatPrice.format(item.price)}</p>
          </div>
          <button
            type="button"
            className="rounded-md border border-slate-300 bg-white px-2.5 py-1.5 text-sm hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            onClick={() => {
              removeFavorite(item.id);
            }}
          >
            Bỏ
          </button>
        </li>
      ))}
    </ul>
  );
}
