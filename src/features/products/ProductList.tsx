import { products } from '../../data/products';
import { useFavoritesStore } from '../../stores/favoritesStore';
import type { Product } from '../../types/product';

const formatPrice = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
  maximumFractionDigits: 0,
});

export function ProductList() {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </ul>
  );
}

function ProductCard({ product }: { product: Product }) {
  const isFavorite = useFavoritesStore((state) =>
    state.items.some((item) => item.id === product.id),
  );
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

  return (
    <li className="grid gap-3 rounded-md border border-slate-200 bg-white p-3">
      <img src={product.image} alt="" className="h-36 w-full rounded-md bg-slate-200 object-cover" />
      <div className="grid gap-1">
        <h3 className="font-medium">{product.title}</h3>
        <p className="text-sm text-slate-600">{product.description}</p>
        <p className="text-sm tabular-nums text-slate-700">{formatPrice.format(product.price)}</p>
      </div>
      <button
        type="button"
        aria-pressed={isFavorite}
        className={
          isFavorite
            ? 'rounded-md border border-rose-300 bg-rose-50 px-3 py-1.5 text-sm text-rose-800 hover:bg-rose-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600'
            : 'rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-800 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
        }
        onClick={() => {
          toggleFavorite({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
          });
        }}
      >
        {isFavorite ? 'Bỏ khỏi yêu thích' : 'Thêm vào yêu thích'}
      </button>
    </li>
  );
}
