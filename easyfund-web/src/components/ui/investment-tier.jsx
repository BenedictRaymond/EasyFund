import { Card } from "./card"
import { Progress } from "./progress"
import { Button } from "./button"

export function InvestmentTier({ title, amount, benefits, available, estimatedDelivery }) {
  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <span className="text-xl font-bold">${amount.toLocaleString()}</span>
      </div>
      <p className="text-sm text-muted-foreground mb-4">{benefits}</p>
      <Progress value={(available.current / available.total) * 100} />
      <p className="text-sm text-muted-foreground mt-2">
        {available.current} of {available.total} available
      </p>
      <div className="mt-4">
        <p className="text-sm text-muted-foreground">Estimated Delivery</p>
        <p className="font-medium">{estimatedDelivery}</p>
      </div>
      <Button className="w-full mt-4">Select Investment</Button>
    </Card>
  )
} 