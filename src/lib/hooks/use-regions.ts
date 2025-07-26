// /modules/layout/hooks/use-regions.ts
import { useEffect, useState } from "react"
import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"

export const useRegions = () => {
  const [regions, setRegions] = useState<StoreRegion[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    listRegions()
      .then(setRegions)
      .finally(() => setLoading(false))
  }, [])

  return { regions, loading }
}
