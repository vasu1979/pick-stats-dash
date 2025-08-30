import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: "default" | "primary" | "success" | "warning";
}

export function MetricCard({ 
  title, 
  value, 
  subtitle, 
  icon, 
  trend, 
  variant = "default" 
}: MetricCardProps) {
  return (
    <Card className={cn(
      "transition-all duration-300 hover:shadow-md",
      variant === "primary" && "border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10",
      variant === "success" && "border-success/20 bg-gradient-to-br from-success/5 to-success/10",
      variant === "warning" && "border-warning/20 bg-gradient-to-br from-warning/5 to-warning/10"
    )}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 pt-4">
        <CardTitle className="text-xs font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon && (
          <div className={cn(
            "p-1.5 rounded-md",
            variant === "primary" && "bg-primary text-primary-foreground",
            variant === "success" && "bg-success text-success-foreground",
            variant === "warning" && "bg-warning text-warning-foreground",
            variant === "default" && "bg-muted text-muted-foreground"
          )}>
            {icon}
          </div>
        )}
      </CardHeader>
      <CardContent className="px-4 pb-4">
        <div className="text-xl font-bold text-foreground">{value}</div>
        <div className="flex items-center justify-between mt-1">
          {subtitle && (
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          )}
          {trend && (
            <div className={cn(
              "text-xs font-medium flex items-center",
              trend.isPositive ? "text-success" : "text-destructive"
            )}>
              <span className="mr-1">
                {trend.isPositive ? "↗" : "↘"}
              </span>
              {Math.abs(trend.value)}%
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}