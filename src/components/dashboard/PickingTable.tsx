import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface PickingData {
  sNo: number;
  invoiceNumber: string;
  invoiceDate: string;
  shipToParty: string;
  shipToPartyName: string;
  destination: string;
  qty: number;
  weight: number;
  planId: string;
  transportName: string;
  vehicleNo: string;
  vehicleStatus: string;
  picker: string;
  pickingStatus: string;
}

interface PickingTableProps {
  data: PickingData[];
}

function getStatusVariant(status: string) {
  const normalizedStatus = status.toLowerCase();
  if (normalizedStatus.includes("arrived") || normalizedStatus.includes("100%")) {
    return "success";
  }
  if (normalizedStatus.includes("on the way") || normalizedStatus.includes("%")) {
    return "warning";
  }
  return "secondary";
}

function getPickingStatusVariant(status: string) {
  const normalizedStatus = status.toLowerCase();
  if (normalizedStatus.includes("100%")) {
    return "success";
  }
  if (normalizedStatus.includes("%")) {
    return "warning";
  }
  return "secondary";
}

export function PickingTable({ data }: PickingTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Warehouse Picking Status</CardTitle>
        <CardDescription>
          Real-time monitoring of shipment picking operations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-12">S.No</TableHead>
                <TableHead className="min-w-32">Invoice Number</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Ship-To-Party</TableHead>
                <TableHead className="min-w-40">Destination</TableHead>
                <TableHead className="text-right">Qty</TableHead>
                <TableHead className="text-right">Weight</TableHead>
                <TableHead>Plan ID</TableHead>
                <TableHead className="min-w-32">Transport</TableHead>
                <TableHead>Vehicle No</TableHead>
                <TableHead>Vehicle Status</TableHead>
                <TableHead>Picker</TableHead>
                <TableHead className="min-w-24">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row, index) => (
                <TableRow 
                  key={row.invoiceNumber} 
                  className={cn(
                    "hover:bg-muted/50 transition-colors",
                    index % 2 === 0 && "bg-card"
                  )}
                >
                  <TableCell className="font-medium">{row.sNo}</TableCell>
                  <TableCell className="font-mono text-sm">{row.invoiceNumber}</TableCell>
                  <TableCell className="text-sm">{row.invoiceDate}</TableCell>
                  <TableCell className="text-sm">{row.shipToPartyName}</TableCell>
                  <TableCell className="font-medium">{row.destination}</TableCell>
                  <TableCell className="text-right font-medium">{row.qty}</TableCell>
                  <TableCell className="text-right">{row.weight}</TableCell>
                  <TableCell className="font-mono text-xs">{row.planId}</TableCell>
                  <TableCell className="text-sm">{row.transportName}</TableCell>
                  <TableCell className="font-mono text-xs">{row.vehicleNo}</TableCell>
                  <TableCell>
                    {row.vehicleStatus && (
                      <Badge variant={getStatusVariant(row.vehicleStatus)} className="text-xs">
                        {row.vehicleStatus}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="font-medium">{row.picker}</TableCell>
                  <TableCell>
                    {row.pickingStatus && (
                      <Badge variant={getPickingStatusVariant(row.pickingStatus)} className="text-xs">
                        {row.pickingStatus}
                      </Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}