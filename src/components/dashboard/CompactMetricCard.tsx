import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface CompactMetricCardProps {
  title: string;
  total: string | number;
  picked: string | number;
  remaining: string | number;
  completionRate: number;
  icon: React.ReactNode;
  variant?: "default" | "primary" | "success" | "warning";
}

export function CompactMetricCard({ 
  title, 
  total, 
  picked, 
  remaining, 
  completionRate, 
  icon, 
  variant = "default" 
}: CompactMetricCardProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return "border-primary/20 bg-primary/5";
      case "success":
        return "border-emerald-500/20 bg-emerald-500/5";
      case "warning":
        return "border-amber-500/20 bg-amber-500/5";
      default:
        return "border-border bg-card";
    }
  };

  return (
    <Card className={cn("transition-all duration-300 hover:shadow-md", getVariantStyles())}>
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="text-primary">{icon}</div>
            <h3 className="font-semibold text-sm text-foreground">{title}</h3>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-primary">{completionRate}%</div>
          </div>
        </div>
        
        <Progress value={completionRate} className="h-1.5" />
        
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="text-center">
            <div className="font-medium text-foreground">{total}</div>
            <div className="text-muted-foreground">Total</div>
          </div>
          <div className="text-center">
            <div className="font-medium text-emerald-600">{picked}</div>
            <div className="text-muted-foreground">Picked</div>
          </div>
          <div className="text-center">
            <div className="font-medium text-amber-600">{remaining}</div>
            <div className="text-muted-foreground">Remaining</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}