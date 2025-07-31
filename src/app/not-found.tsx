import type { Metadata } from "next"
import { NotFoundContent } from "@components/not-found-content"

export const metadata: Metadata = {
  title: "Page Not Found | SoilStories",
  description: "The story you seek is still being woven. Explore our collection of handcrafted fashion pieces.",
}

export default function NotFound() {
  return <NotFoundContent />
}
