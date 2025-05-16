"use client";

import { useState } from "react";
import { DashboardLayout } from "@/src/components/dashboard-layout";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/src/components/ui/pagination";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  Download,
  FileText,
  MoreHorizontal,
  Search,
  Truck,
  Filter,
  ArrowUpDown,
} from "lucide-react";

export default function ShipmentHistory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");

  // Sample shipment data
  const shipments = [
    {
      id: "1",
      trackingNumber: "9400 1234 5678 9000 0000 01",
      carrier: "USPS",
      service: "Priority Mail",
      date: "May 8, 2025",
      destination: "New York, NY",
      status: "Delivered",
      cost: 7.82,
    },
    {
      id: "2",
      trackingNumber: "9400 1234 5678 9000 0000 02",
      carrier: "USPS",
      service: "Priority Mail Express",
      date: "May 7, 2025",
      destination: "Los Angeles, CA",
      status: "In Transit",
      cost: 26.35,
    },
    {
      id: "3",
      trackingNumber: "1Z999AA10123456784",
      carrier: "UPS",
      service: "Ground",
      date: "May 6, 2025",
      destination: "Chicago, IL",
      status: "In Transit",
      cost: 10.2,
    },
    {
      id: "4",
      trackingNumber: "9400 1234 5678 9000 0000 04",
      carrier: "USPS",
      service: "First Class Package",
      date: "May 5, 2025",
      destination: "Miami, FL",
      status: "Delivered",
      cost: 4.5,
    },
    {
      id: "5",
      trackingNumber: "1Z999AA10123456785",
      carrier: "UPS",
      service: "3 Day Select",
      date: "May 4, 2025",
      destination: "Seattle, WA",
      status: "Delivered",
      cost: 15.75,
    },
    {
      id: "6",
      trackingNumber: "9400 1234 5678 9000 0000 06",
      carrier: "USPS",
      service: "Priority Mail",
      date: "May 3, 2025",
      destination: "Boston, MA",
      status: "Delivered",
      cost: 8.3,
    },
    {
      id: "7",
      trackingNumber: "1Z999AA10123456787",
      carrier: "UPS",
      service: "Ground",
      date: "May 2, 2025",
      destination: "Denver, CO",
      status: "Delivered",
      cost: 11.45,
    },
    {
      id: "8",
      trackingNumber: "9400 1234 5678 9000 0000 08",
      carrier: "USPS",
      service: "Priority Mail",
      date: "May 1, 2025",
      destination: "Austin, TX",
      status: "Delivered",
      cost: 7.95,
    },
  ];

  // Filter shipments based on search term and filters
  const filteredShipments = shipments.filter((shipment) => {
    const matchesSearch =
      shipment.trackingNumber
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      shipment.destination.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      shipment.status.toLowerCase() === statusFilter.toLowerCase();

    const matchesDate = dateFilter === "all"; // Simplified for demo

    return matchesSearch && matchesStatus && matchesDate;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Shipment History
            </h1>
            <p className="text-muted-foreground">
              View and manage your past shipments
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
            <Button>
              <Truck className="mr-2 h-4 w-4" />
              New Shipment
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Shipments</CardTitle>
            <CardDescription>
              A list of all your shipments including tracking information and
              status.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by tracking number or destination..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <div className="w-[180px]">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <Filter className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                      <SelectItem value="in transit">In Transit</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-[180px]">
                  <Select value={dateFilter} onValueChange={setDateFilter}>
                    <SelectTrigger>
                      <Filter className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Date" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Dates</SelectItem>
                      <SelectItem value="last7">Last 7 Days</SelectItem>
                      <SelectItem value="last30">Last 30 Days</SelectItem>
                      <SelectItem value="last90">Last 90 Days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">
                      <div className="flex items-center">
                        Tracking Number
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead>Carrier</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Destination</TableHead>
                    <TableHead>
                      <div className="flex items-center">
                        Status
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead className="text-right">Cost</TableHead>
                    <TableHead className="w-[80px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredShipments.map((shipment) => (
                    <TableRow key={shipment.id}>
                      <TableCell className="font-medium">
                        {shipment.trackingNumber}
                      </TableCell>
                      <TableCell>
                        {shipment.carrier} {shipment.service}
                      </TableCell>
                      <TableCell>{shipment.date}</TableCell>
                      <TableCell>{shipment.destination}</TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            shipment.status === "Delivered"
                              ? "bg-green-100 text-green-800"
                              : shipment.status === "In Transit"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {shipment.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        ${shipment.cost.toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>
                              <FileText className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="mr-2 h-4 w-4" />
                              Download Label
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Truck className="mr-2 h-4 w-4" />
                              Track Package
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="mt-4">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>
                      1
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
