"use client";

import { useState } from "react";
import Link from "next/link";
import {
  shopCategories,
  shopProducts,
  lowestPriceCents,
  type ShopCategory,
} from "@/lib/shop/products";
import { formatPrice } from "@/lib/format";

export default function ShopGrid() {
  const [activeCategory, setActiveCategory] = useState<ShopCategory | "all">(
    "all",
  );

  const products =
    activeCategory === "all"
      ? shopProducts
      : shopProducts.filter((product) => product.category === activeCategory);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveCategory("all")}
          className={`rounded-full border px-4 py-1.5 font-mono text-xs uppercase tracking-wide transition ${
            activeCategory === "all"
              ? "border-accent bg-accent text-background"
              : "border-border text-foreground-dim hover:border-accent hover:text-accent"
          }`}
        >
          Tout
        </button>
        {shopCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`rounded-full border px-4 py-1.5 font-mono text-xs uppercase tracking-wide transition ${
              activeCategory === category.id
                ? "border-accent bg-accent text-background"
                : "border-border text-foreground-dim hover:border-accent hover:text-accent"
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {products.map((product) => (
          <li key={product.id}>
            <Link
              href={`/shop/${product.id}`}
              className="group block w-full overflow-hidden rounded-xl border border-border text-left transition hover:border-accent"
            >
              <div className="aspect-square w-full overflow-hidden bg-background-alt">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />
              </div>
              <div className="space-y-1 p-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
                  {product.tagline}
                </p>
                <h3 className="font-display text-lg text-foreground">
                  {product.name}
                </h3>
                <p className="font-mono text-sm text-foreground-dim">
                  {product.variants.length > 1 ? "À partir de " : ""}
                  {formatPrice(lowestPriceCents(product))}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
