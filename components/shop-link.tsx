"use client";

import type { ReactNode } from "react";
import { useStore, type Panel } from "./store-provider";

export function ShopLink({ children, panel = { kind: "catalog", category: "All Jewelry" }, className = "text-link" }: { children: ReactNode; panel?: Panel; className?: string }) {
  const { open } = useStore();
  return <button className={className} onClick={() => open(panel)}>{children}</button>;
}
