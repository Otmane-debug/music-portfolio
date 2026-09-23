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

type SortOption = "price-desc" | "price-asc" | "alphabetical";

const sortOptions: { id: SortOption; label: string }[] = [
  { id: "price-desc", label: "Prix décroissant" },
  { id: "price-asc", label: "Prix croissant" },
  { id: "alphabetical", label: "Alphabétique" },
];

export default function ShopGrid() {
  const [activeCategory, setActiveCategory] = useState<ShopCategory | "all">(
    "all",
  );
  const [sort, setSort] = useState<SortOption>("price-desc");

  const products = (
    activeCategory === "all"
      ? shopProducts
      : shopProducts.filter((product) => product.category === activeCategory)
  )
    .slice()
    .sort((a, b) => {
      if (sort === "alphabetical") return a.name.localeCompare(b.name);
      const diff = lowestPriceCents(a) - lowestPriceCents(b);
      return sort === "price-asc" ? diff : -diff;
    });

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
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

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortOption)}
          className="rounded-full border border-border bg-transparent px-4 py-1.5 font-mono text-xs uppercase tracking-wide text-foreground-dim focus:border-accent focus:outline-none"
        >
          {sortOptions.map((option) => (
            <option
              key={option.id}
              value={option.id}
              className="bg-background text-foreground"
            >
              {option.label}
            </option>
          ))}
        </select>
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
