import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, Package, Weight, CheckCircle, Clock } from "lucide-react";

export interface PickerStats {
  name: string;
  completionRate: number;
  totalTasks: number;
  completedTasks: number;
  activeTasks: number;
  totalItems: number;
  totalWeight: number;
  averageProgress: number;
  performanceStatus: "excellent" | "good" | "needs-attention";
}

interface PickerPerformanceCardProps {
  picker: PickerStats;
  rank: number;
}

export function PickerPerformanceCard({ picker, rank }: PickerPerformanceCardProps) {
  const getPerformanceColor = (status: string) => {
    switch (status) {
      case "excellent": return "bg-emerald-500/10 text-emerald-700 border-emerald-500/20";
      case "good": return "bg-blue-500/10 text-blue-700 border-blue-500/20";
      case "needs-attention": return "bg-amber-500/10 text-amber-700 border-amber-500/20";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getPerformanceLabel = (status: string) => {
    switch (status) {
      case "excellent": return "Excellent";
      case "good": return "Good";
      case "needs-attention": return "Needs Attention";
      default: return "Unknown";
    }
  };

  return (
    <Card className="relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                {picker.name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-lg">{picker.name}</h3>
                {rank === 1 && (
                  <Badge variant="secondary" className="bg-gradient-to-r from-amber-400/20 to-yellow-400/20 text-amber-700 border-amber-400/30">
                    Top Performer
                  </Badge>
                )}
              </div>
              <Badge 
                variant="outline" 
                className={getPerformanceColor(picker.performanceStatus)}
              >
                {getPerformanceLabel(picker.performanceStatus)}
              </Badge>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">{picker.completionRate}%</div>
            <div className="text-sm text-muted-foreground">Completion Rate</div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span>Progress</span>
            <span>{picker.completionRate}%</span>
          </div>
          <Progress value={picker.completionRate} className="h-2" />
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-emerald-600" />
              <div>
                <div className="font-medium">{picker.completedTasks}</div>
                <div className="text-muted-foreground">Completed</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-primary" />
              <div>
                <div className="font-medium">{picker.totalItems.toLocaleString()}</div>
                <div className="text-muted-foreground">Items</div>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-amber-600" />
              <div>
                <div className="font-medium">{picker.activeTasks}</div>
                <div className="text-muted-foreground">Active</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Weight className="h-4 w-4 text-purple-600" />
              <div>
                <div className="font-medium">{picker.totalWeight.toFixed(1)} kg</div>
                <div className="text-muted-foreground">Weight</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}