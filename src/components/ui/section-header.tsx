import { cn } from "@lib/util/tailwind"

interface SectionHeaderProps {
  title: string
  subtitle?: string
  description?: string
  centered?: boolean
  className?: string
}

export function SectionHeader({ title, subtitle, description, centered = true, className }: SectionHeaderProps) {
  return (
    <div className={cn("mb-16", centered && "text-center", className)}>
      {subtitle && (
        <div className="mb-4">
          <span className="inline-block px-4 py-2 rounded-full bg-soil-mustard-soil/20 text-soil-mustard-dark text-sm font-medium uppercase tracking-wider">
            {subtitle}
          </span>
        </div>
      )}
      <h2 className="text-soil-charcoal mb-6">{title}</h2>
      {description && <p className="text-muted text-lg max-w-3xl mx-auto leading-relaxed">{description}</p>}
    </div>
  )
}
