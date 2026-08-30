import { createClient } from "@/lib/supabase/server";
import type { Gear } from "@/lib/types";
import GearCards from "@/components/GearCards";

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

  const items = (gear as Gear[]).map((item) => ({
    id: item.id,
    name: item.name,
    category: item.category,
    description: item.description,
    imageUrl: item.image_path
      ? supabase.storage.from("gear").getPublicUrl(item.image_path).data
          .publicUrl
      : null,
  }));

  return <GearCards items={items} />;
}
