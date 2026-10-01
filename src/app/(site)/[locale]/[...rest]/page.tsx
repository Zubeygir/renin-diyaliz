import { notFound } from "next/navigation";

export const dynamicParams = true;

// Unmatched URLs under a valid locale would otherwise skip the locale layout
// and fall through to the root not-found page.
export default function CatchAllPage() {
  notFound();
}
