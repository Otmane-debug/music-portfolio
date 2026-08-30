import { createClient } from "@/lib/supabase/server";
import type { Gear } from "@/lib/types";

export default async function GearGrid() {
  const supabase = await createClient();

  const { data: gear } = await supabase
    .from("gear")
    .select("*")
    .order("sort_order", { ascending: true });

  if (!gear || gear.length === 0) {
    return (
      <p className="font-mono text-sm text-foreground-dim">
        Gear list coming soon.
      </p>
    );
  }

  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      {(gear as Gear[]).map((item) => {
        const imageUrl = item.image_path
          ? supabase.storage.from("gear").getPublicUrl(item.image_path).data
              .publicUrl
          : null;

        return (
          <li
            key={item.id}
            className="group overflow-hidden rounded-xl border border-border transition hover:border-accent"
          >
            <div className="aspect-[4/3] w-full overflow-hidden bg-background-alt">
              {imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={imageUrl}
                  alt={item.name}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center font-mono text-xs uppercase tracking-wide text-foreground-dim">
                  No photo yet
                </div>
              )}
            </div>
            <div className="space-y-1 p-4">
              {item.category && (
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
                  {item.category}
                </p>
              )}
              <h3 className="font-display text-lg text-foreground">
                {item.name}
              </h3>
              {item.description && (
                <p className="text-sm text-foreground-dim">
                  {item.description}
                </p>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
