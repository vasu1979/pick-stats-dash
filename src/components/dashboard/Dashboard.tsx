import { MetricCard } from "./MetricCard";
import { PickingTable } from "./PickingTable";
import { PickerPerformanceCard, PickerStats } from "./PickerPerformanceCard";
import { CompactMetricCard } from "./CompactMetricCard";
import { samplePickingData } from "@/data/pickingData";
import { Package, Truck, Users, TrendingUp, Clock, CheckCircle, Scale } from "lucide-react";

function calculateMetrics() {
  const totalShipments = samplePickingData.length;
  const completedPickings = samplePickingData.filter(
    item => item.pickingStatus && item.pickingStatus.includes("100%")
  ).length;
  const inProgressPickings = samplePickingData.filter(
    item => item.pickingStatus && item.pickingStatus.includes("%") && !item.pickingStatus.includes("100%")
  ).length;
  const arrivedVehicles = samplePickingData.filter(
    item => item.vehicleStatus && item.vehicleStatus.toLowerCase().includes("arrived")
  ).length;
  const onTheWayVehicles = samplePickingData.filter(
    item => item.vehicleStatus && item.vehicleStatus.toLowerCase().includes("on the way")
  ).length;
  const activePickers = new Set(
    samplePickingData.filter(item => item.picker).map(item => item.picker)
  ).size;
  
  // Daily picking metrics
  const totalWeight = samplePickingData.reduce((sum, item) => sum + item.weight, 0);
  const totalQuantity = samplePickingData.reduce((sum, item) => sum + item.qty, 0);
  
  const completedItems = samplePickingData.filter(item => 
    item.pickingStatus && item.pickingStatus.includes("100%")
  );
  const pickedWeight = completedItems.reduce((sum, item) => sum + item.weight, 0);
  const pickedQuantity = completedItems.reduce((sum, item) => sum + item.qty, 0);
  
  const remainingWeight = totalWeight - pickedWeight;
  const remainingQuantity = totalQuantity - pickedQuantity;
  
  const completionRate = totalShipments > 0 ? Math.round((completedPickings / totalShipments) * 100) : 0;
  const weightCompletionRate = totalWeight > 0 ? Math.round((pickedWeight / totalWeight) * 100) : 0;
  const quantityCompletionRate = totalQuantity > 0 ? Math.round((pickedQuantity / totalQuantity) * 100) : 0;
  
  return {
    totalShipments,
    completedPickings,
    inProgressPickings,
    arrivedVehicles,
    onTheWayVehicles,
    activePickers,
    totalWeight: Math.round(totalWeight * 100) / 100,
    totalQuantity,
    pickedWeight: Math.round(pickedWeight * 100) / 100,
    pickedQuantity,
    remainingWeight: Math.round(remainingWeight * 100) / 100,
    remainingQuantity,
    completionRate,
    weightCompletionRate,
    quantityCompletionRate
  };
}

function calculatePickerStats(): PickerStats[] {
  const pickerMap = new Map<string, any[]>();
  
  // Group data by picker
  samplePickingData.forEach(item => {
    if (item.picker) {
      if (!pickerMap.has(item.picker)) {
        pickerMap.set(item.picker, []);
      }
      pickerMap.get(item.picker)!.push(item);
    }
  });
  
  const pickerStats: PickerStats[] = [];
  
  pickerMap.forEach((tasks, pickerName) => {
    const completedTasks = tasks.filter(task => 
      task.pickingStatus && task.pickingStatus.includes("100%")
    ).length;
    
    const totalTasks = tasks.length;
    const activeTasks = totalTasks - completedTasks;
    const totalItems = tasks.reduce((sum, task) => sum + task.qty, 0);
    const totalWeight = tasks.reduce((sum, task) => sum + task.weight, 0);
    
    // Calculate average progress
    const progressValues = tasks.map(task => {
      if (!task.pickingStatus) return 0;
      const match = task.pickingStatus.match(/(\d+)%/);
      return match ? parseInt(match[1]) : 0;
    });
    const averageProgress = progressValues.length > 0 
      ? Math.round(progressValues.reduce((sum, val) => sum + val, 0) / progressValues.length)
      : 0;
    
    const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
    
    // Determine performance status
    let performanceStatus: "excellent" | "good" | "needs-attention";
    if (completionRate >= 80) {
      performanceStatus = "excellent";
    } else if (completionRate >= 50) {
      performanceStatus = "good";
    } else {
      performanceStatus = "needs-attention";
    }
    
    pickerStats.push({
      name: pickerName,
      completionRate,
      totalTasks,
      completedTasks,
      activeTasks,
      totalItems,
      totalWeight,
      averageProgress,
      performanceStatus
    });
  });
  
  // Sort by completion rate (descending)
  return pickerStats.sort((a, b) => b.completionRate - a.completionRate);
}

export function Dashboard() {
  const metrics = calculateMetrics();
  const pickerStats = calculatePickerStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Warehouse Management Dashboard
          </h1>
          <p className="text-muted-foreground text-lg">
            Real-time monitoring of warehouse picking operations and performance metrics
          </p>
        </div>

        {/* Daily Picking Progress */}
        <div className="space-y-4">
          <div className="text-center space-y-2">
            <h2 className="text-xl font-bold text-foreground">Today's Picking Progress</h2>
            <p className="text-muted-foreground text-sm">Real-time tracking of daily picking targets</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CompactMetricCard
              title="Quantity Progress"
              total={metrics.totalQuantity.toLocaleString()}
              picked={metrics.pickedQuantity.toLocaleString()}
              remaining={metrics.remainingQuantity.toLocaleString()}
              completionRate={metrics.quantityCompletionRate}
              icon={<Package className="h-4 w-4" />}
              variant="primary"
            />
            
            <CompactMetricCard
              title="Weight Progress"
              total={`${metrics.totalWeight.toLocaleString()} kg`}
              picked={`${metrics.pickedWeight.toLocaleString()} kg`}
              remaining={`${metrics.remainingWeight.toLocaleString()} kg`}
              completionRate={metrics.weightCompletionRate}
              icon={<Scale className="h-4 w-4" />}
              variant="success"
            />
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <MetricCard
            title="Active Pickers"
            value={metrics.activePickers}
            subtitle="Currently working"
            icon={<Users className="h-4 w-4" />}
            variant="default"
          />
          
          <MetricCard
            title="Shipments"
            value={`${metrics.completedPickings}/${metrics.totalShipments}`}
            subtitle="Completed/Total"
            icon={<CheckCircle className="h-4 w-4" />}
            variant="success"
          />
          
          <MetricCard
            title="In Progress"
            value={metrics.inProgressPickings}
            subtitle="Currently picking"
            icon={<Clock className="h-4 w-4" />}
            variant="warning"
          />
          
          <MetricCard
            title="Vehicles"
            value={`${metrics.arrivedVehicles}/${metrics.arrivedVehicles + metrics.onTheWayVehicles}`}
            subtitle="Arrived/Expected"
            icon={<Truck className="h-4 w-4" />}
            variant="primary"
          />
        </div>

        {/* Picker Performance Section */}
        {pickerStats.length > 0 && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-foreground">Picker Performance</h2>
              <p className="text-muted-foreground">Individual picker statistics and performance metrics</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {pickerStats.map((picker, index) => (
                <PickerPerformanceCard
                  key={picker.name}
                  picker={picker}
                  rank={index + 1}
                />
              ))}
            </div>
          </div>
        )}

        {/* Main Table */}
        <PickingTable data={samplePickingData} />
      </div>
    </div>
  );
}