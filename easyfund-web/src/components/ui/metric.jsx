export function Metric({ title, value, subtitle, icon }) {
  return (
    <div className="rounded-lg border bg-card p-4 text-card-foreground shadow">
      <div className="flex items-center justify-between">
        {icon && <div className="text-muted-foreground">{icon}</div>}
        <h3 className="text-sm font-medium tracking-wide text-muted-foreground">{title}</h3>
      </div>
      <div className="mt-2">
        <p className="text-2xl font-bold">{value}</p>
        {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
      </div>
    </div>
  )
} 