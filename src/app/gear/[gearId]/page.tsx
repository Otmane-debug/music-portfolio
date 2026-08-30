import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Gear } from "@/lib/types";

export default async function GearDetailPage({
  params,
}: {
  params: Promise<{ gearId: string }>;
}) {
  const { gearId } = await params;
  const supabase = await createClient();

  const { data: item } = await supabase
    .from("gear")
    .select("*")
    .eq("id", gearId)
    .single();

  if (!item) {
    notFound();
  }

  const gear = item as Gear;
  const imageUrl = gear.image_path
    ? supabase.storage.from("gear").getPublicUrl(gear.image_path).data
        .publicUrl
    : null;

  return (
    <div className="py-14">
      <Link
        href="/gear"
        className="mb-8 inline-block font-mono text-xs uppercase tracking-wide text-foreground-dim transition hover:text-accent"
      >
        ← Back to gear
      </Link>

      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
        <div className="aspect-square w-full overflow-hidden rounded-xl border border-border bg-background-alt">
          {imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageUrl}
              alt={gear.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center font-mono text-xs uppercase tracking-wide text-foreground-dim">
              No photo yet
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            {gear.category && (
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
                {gear.category}
              </p>
            )}
            <h1 className="font-display text-3xl font-bold leading-tight tracking-tight">
              {gear.name}
            </h1>
          </div>

          {gear.description && (
            <p className="text-foreground-dim">{gear.description}</p>
          )}

          {gear.specs && gear.specs.length > 0 && (
            <dl className="divide-y divide-border border-t border-border">
              {gear.specs.map((spec) => (
                <div
                  key={spec.label}
                  className="flex items-start justify-between gap-4 py-3"
                >
                  <dt className="font-mono text-xs uppercase tracking-wide text-foreground-dim">
                    {spec.label}
                  </dt>
                  <dd className="text-right text-sm text-foreground">
                    {spec.value}
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </div>
    </div>
  );
}
