import { MetricCard } from "./MetricCard";
import { PickingTable } from "./PickingTable";
import { samplePickingData } from "@/data/pickingData";
import { Package, Truck, Users, TrendingUp, Clock, CheckCircle } from "lucide-react";

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
  const totalWeight = samplePickingData.reduce((sum, item) => sum + item.weight, 0);
  const totalQuantity = samplePickingData.reduce((sum, item) => sum + item.qty, 0);
  
  const completionRate = totalShipments > 0 ? Math.round((completedPickings / totalShipments) * 100) : 0;
  
  return {
    totalShipments,
    completedPickings,
    inProgressPickings,
    arrivedVehicles,
    onTheWayVehicles,
    activePickers,
    totalWeight: Math.round(totalWeight * 100) / 100,
    totalQuantity,
    completionRate
  };
}

export function Dashboard() {
  const metrics = calculateMetrics();

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

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Total Shipments"
            value={metrics.totalShipments}
            subtitle="Active shipments"
            icon={<Package className="h-5 w-5" />}
            variant="primary"
            trend={{ value: 12, isPositive: true }}
          />
          
          <MetricCard
            title="Completion Rate"
            value={`${metrics.completionRate}%`}
            subtitle="Picking completed"
            icon={<CheckCircle className="h-5 w-5" />}
            variant="success"
            trend={{ value: 8, isPositive: true }}
          />
          
          <MetricCard
            title="Active Pickers"
            value={metrics.activePickers}
            subtitle="Currently working"
            icon={<Users className="h-5 w-5" />}
            variant="default"
          />
          
          <MetricCard
            title="Vehicles Arrived"
            value={metrics.arrivedVehicles}
            subtitle={`${metrics.onTheWayVehicles} on the way`}
            icon={<Truck className="h-5 w-5" />}
            variant="warning"
          />
        </div>

        {/* Additional Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricCard
            title="Total Weight"
            value={`${metrics.totalWeight.toLocaleString()} kg`}
            subtitle="Across all shipments"
            icon={<TrendingUp className="h-5 w-5" />}
            variant="default"
          />
          
          <MetricCard
            title="Total Quantity"
            value={metrics.totalQuantity.toLocaleString()}
            subtitle="Items to pick"
            icon={<Package className="h-5 w-5" />}
            variant="primary"
          />
          
          <MetricCard
            title="In Progress"
            value={metrics.inProgressPickings}
            subtitle="Currently being picked"
            icon={<Clock className="h-5 w-5" />}
            variant="warning"
          />
        </div>

        {/* Main Table */}
        <PickingTable data={samplePickingData} />
      </div>
    </div>
  );
}