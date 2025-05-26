'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ProductItem from '../product/ProductItem';

export default function AllProductMenu({ platform }) {
  const [products, setProducts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('/api/product');
        if (res.ok) {
          const data = await res.json();
          setProducts(data);
        } else {
          console.error('Failed to fetch products');
        }
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    }

    fetchProducts();
  }, []);

  const handleFilterClick = (platform) => {
    const path = platform === 'All' ? '/product' : `/product/${platform}`;
    router.push(path);
  };

  const filteredProducts = platform
    ? products.filter((p) => p.platform === platform)
    : products;

  return (
    <section>
      <div className="text-center mt-6">
        <h3 className="uppercase text-gray-600 font-semibold text-2xl italic mb-6">
          Our Product
        </h3>

        {/* Platform Filter Buttons */}
        <div className="flex justify-center gap-4 mb-6">
          {['All', 'Intel', 'Qualcomm', 'Nvidia'].map((p) => (
            <button
              key={p}
              onClick={() => handleFilterClick(p)}
              className={`px-4 py-2 rounded-lg font-medium ${
                (platform === p) || (p === 'All' && !platform)
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-4">
        {filteredProducts.map((product) => (
          <ProductItem
            key={product._id}
            name={product.name}
            image={product.imageUrl}
            description={`Chip: ${product.chip}\nSupport: ${(product.support || []).join(', ')}\nTOPS: ${product.tops}`}
            downloadUrl={product.downloadUrl}
            detailPage={product.detailPage}
          />
        ))}
      </div>
    </section>
  );
}
