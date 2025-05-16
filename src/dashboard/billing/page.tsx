"use client";

import { useState } from "react";
import { DashboardLayout } from "@/src/components/dashboard-layout";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
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
import { Badge } from "@/src/components/ui/badge";
import { Separator } from "@/src/components/ui/separator";
import {
  CreditCard,
  Download,
  FileText,
  Plus,
  Trash2,
  CheckCircle,
  AlertCircle,
  DollarSign,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";

export default function Billing() {
  const [isAddCardDialogOpen, setIsAddCardDialogOpen] = useState(false);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Billing</h1>
          <p className="text-muted-foreground">
            Manage your payment methods and view your billing history.
          </p>
        </div>

        <Tabs defaultValue="payment-methods" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="payment-methods">Payment Methods</TabsTrigger>
            <TabsTrigger value="billing-history">Billing History</TabsTrigger>
            <TabsTrigger value="usage">Usage & Plans</TabsTrigger>
          </TabsList>

          <TabsContent value="payment-methods" className="space-y-6 pt-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Payment Methods</CardTitle>
                    <CardDescription>
                      Manage your saved payment methods.
                    </CardDescription>
                  </div>
                  <Dialog
                    open={isAddCardDialogOpen}
                    onOpenChange={setIsAddCardDialogOpen}
                  >
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Payment Method
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Add Payment Method</DialogTitle>
                        <DialogDescription>
                          Add a new credit card or debit card to your account.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="cardName">Name on Card</Label>
                          <Input id="cardName" placeholder="John Doe" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input
                            id="cardNumber"
                            placeholder="4242 4242 4242 4242"
                          />
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="expMonth">Expiration Month</Label>
                            <Select>
                              <SelectTrigger id="expMonth">
                                <SelectValue placeholder="MM" />
                              </SelectTrigger>
                              <SelectContent>
                                {Array.from({ length: 12 }, (_, i) => (
                                  <SelectItem
                                    key={i + 1}
                                    value={(i + 1).toString().padStart(2, "0")}
                                  >
                                    {(i + 1).toString().padStart(2, "0")}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="expYear">Expiration Year</Label>
                            <Select>
                              <SelectTrigger id="expYear">
                                <SelectValue placeholder="YY" />
                              </SelectTrigger>
                              <SelectContent>
                                {Array.from({ length: 10 }, (_, i) => (
                                  <SelectItem
                                    key={i}
                                    value={(new Date().getFullYear() + i)
                                      .toString()
                                      .slice(-2)}
                                  >
                                    {(new Date().getFullYear() + i)
                                      .toString()
                                      .slice(-2)}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cvc">CVC</Label>
                            <Input id="cvc" placeholder="123" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="billingAddress">
                            Billing Address
                          </Label>
                          <Select defaultValue="default">
                            <SelectTrigger id="billingAddress">
                              <SelectValue placeholder="Select address" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="default">
                                Same as shipping address
                              </SelectItem>
                              <SelectItem value="new">
                                Add new address
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={() => setIsAddCardDialogOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button onClick={() => setIsAddCardDialogOpen(false)}>
                          Add Card
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <CreditCard className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Visa ending in 4242</p>
                        <p className="text-sm text-muted-foreground">
                          Expires 12/25
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge>Default</Badge>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <CreditCard className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Mastercard ending in 5678</p>
                        <p className="text-sm text-muted-foreground">
                          Expires 09/24
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        Set as Default
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Billing Address</CardTitle>
                <CardDescription>
                  The address used for your billing statements.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">John Doe</p>
                      <p className="text-sm text-muted-foreground">
                        123 Main St
                      </p>
                      <p className="text-sm text-muted-foreground">
                        New York, NY 10001
                      </p>
                      <p className="text-sm text-muted-foreground">
                        United States
                      </p>
                    </div>
                    <div>
                      <Button variant="outline">Edit</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="billing-history" className="space-y-6 pt-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Billing History</CardTitle>
                    <CardDescription>
                      View and download your past invoices.
                    </CardDescription>
                  </div>
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Export All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Invoice</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invoices.map((invoice) => (
                      <TableRow key={invoice.id}>
                        <TableCell className="font-medium">
                          {invoice.invoice}
                        </TableCell>
                        <TableCell>{invoice.date}</TableCell>
                        <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              invoice.status === "Paid" ? "default" : "outline"
                            }
                            className={
                              invoice.status === "Paid"
                                ? "bg-green-100 text-green-800 hover:bg-green-100"
                                : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                            }
                          >
                            {invoice.status === "Paid" ? (
                              <CheckCircle className="mr-1 h-3 w-3" />
                            ) : (
                              <AlertCircle className="mr-1 h-3 w-3" />
                            )}
                            {invoice.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            <FileText className="mr-2 h-4 w-4" />
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="usage" className="space-y-6 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Current Plan</CardTitle>
                <CardDescription>
                  You are currently on the Pay-as-you-go plan.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border p-4 bg-primary/5">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-bold">Pay-as-you-go</h3>
                      <p className="text-sm text-muted-foreground">
                        Only pay for the labels you create. No monthly fees or
                        minimums.
                      </p>
                    </div>
                    <Badge className="w-fit">Current Plan</Badge>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Plan Features</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-5 w-5 text-green-500 flex-shrink-0" />
                      <span>Access to discounted USPS and UPS rates</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-5 w-5 text-green-500 flex-shrink-0" />
                      <span>Unlimited shipping labels</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-5 w-5 text-green-500 flex-shrink-0" />
                      <span>Free address verification</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-5 w-5 text-green-500 flex-shrink-0" />
                      <span>Batch shipping capabilities</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-5 w-5 text-green-500 flex-shrink-0" />
                      <span>Email support</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Usage Summary</CardTitle>
                <CardDescription>
                  Your shipping activity for the current billing period.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="rounded-lg border p-4">
                    <div className="flex flex-col items-center text-center">
                      <div className="bg-primary/10 p-2 rounded-full mb-2">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Labels Created
                      </p>
                      <p className="text-2xl font-bold">127</p>
                    </div>
                  </div>
                  <div className="rounded-lg border p-4">
                    <div className="flex flex-col items-center text-center">
                      <div className="bg-primary/10 p-2 rounded-full mb-2">
                        <DollarSign className="h-5 w-5 text-primary" />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Total Spent
                      </p>
                      <p className="text-2xl font-bold">$952.18</p>
                    </div>
                  </div>
                  <div className="rounded-lg border p-4">
                    <div className="flex flex-col items-center text-center">
                      <div className="bg-primary/10 p-2 rounded-full mb-2">
                        <DollarSign className="h-5 w-5 text-primary" />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Total Saved
                      </p>
                      <p className="text-2xl font-bold">$1,294.32</p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium mb-4">Monthly Usage</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Month</TableHead>
                        <TableHead>Labels</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Savings</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>May 2025</TableCell>
                        <TableCell>42</TableCell>
                        <TableCell>$312.75</TableCell>
                        <TableCell>$428.16</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>April 2025</TableCell>
                        <TableCell>38</TableCell>
                        <TableCell>$285.64</TableCell>
                        <TableCell>$389.42</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>March 2025</TableCell>
                        <TableCell>47</TableCell>
                        <TableCell>$353.79</TableCell>
                        <TableCell>$476.74</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}

// Sample invoice data
const invoices = [
  {
    id: 1,
    invoice: "INV-001",
    date: "May 8, 2025",
    amount: 127.85,
    status: "Paid",
  },
  {
    id: 2,
    invoice: "INV-002",
    date: "April 15, 2025",
    amount: 95.4,
    status: "Paid",
  },
  {
    id: 3,
    invoice: "INV-003",
    date: "March 22, 2025",
    amount: 112.3,
    status: "Paid",
  },
  {
    id: 4,
    invoice: "INV-004",
    date: "February 18, 2025",
    amount: 78.65,
    status: "Paid",
  },
  {
    id: 5,
    invoice: "INV-005",
    date: "January 29, 2025",
    amount: 143.2,
    status: "Pending",
  },
];
