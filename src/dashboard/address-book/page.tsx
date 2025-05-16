"use client";

import type React from "react";

import { useState } from "react";
import { DashboardLayout } from "@/src/components/dashboard-layout";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import {
  Home,
  Building2,
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Copy,
} from "lucide-react";

export default function AddressBook() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [addressType, setAddressType] = useState("sender");
  const [addresses, setAddresses] = useState([
    {
      id: "1",
      type: "sender",
      name: "John Doe",
      company: "Acme Inc.",
      street1: "123 Main St",
      street2: "Apt 4B",
      city: "New York",
      state: "NY",
      zip: "10001",
      phone: "(555) 123-4567",
      isDefault: true,
    },
    {
      id: "2",
      type: "recipient",
      name: "Jane Smith",
      company: "XYZ Corp",
      street1: "456 Oak Ave",
      street2: "Suite 101",
      city: "Los Angeles",
      state: "CA",
      zip: "90001",
      phone: "(555) 987-6543",
      isDefault: true,
    },
    {
      id: "3",
      type: "sender",
      name: "Robert Johnson",
      company: "Johnson LLC",
      street1: "789 Pine St",
      street2: "",
      city: "Chicago",
      state: "IL",
      zip: "60601",
      phone: "(555) 456-7890",
      isDefault: false,
    },
    {
      id: "4",
      type: "recipient",
      name: "Sarah Williams",
      company: "",
      street1: "321 Elm St",
      street2: "Apt 7C",
      city: "Miami",
      state: "FL",
      zip: "33101",
      phone: "(555) 234-5678",
      isDefault: false,
    },
  ]);

  const [newAddress, setNewAddress] = useState({
    name: "",
    company: "",
    street1: "",
    street2: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    isDefault: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddAddress = () => {
    const id = (addresses.length + 1).toString();
    setAddresses([...addresses, { ...newAddress, id, type: addressType }]);
    setNewAddress({
      name: "",
      company: "",
      street1: "",
      street2: "",
      city: "",
      state: "",
      zip: "",
      phone: "",
      isDefault: false,
    });
    setIsAddDialogOpen(false);
  };

  const filteredAddresses = addresses.filter((address) => {
    const matchesSearch =
      address.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      address.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      address.street1.toLowerCase().includes(searchTerm.toLowerCase()) ||
      address.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      address.zip.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  const senderAddresses = filteredAddresses.filter(
    (address) => address.type === "sender"
  );
  const recipientAddresses = filteredAddresses.filter(
    (address) => address.type === "recipient"
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Address Book</h1>
            <p className="text-muted-foreground">
              Manage your saved addresses for faster shipping
            </p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add New Address
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>Add New Address</DialogTitle>
                <DialogDescription>
                  Fill in the details for your new address. Click save when
                  you're done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="addressType" className="text-right">
                    Address Type
                  </Label>
                  <Select value={addressType} onValueChange={setAddressType}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sender">Sender</SelectItem>
                      <SelectItem value="recipient">Recipient</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={newAddress.name}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="company" className="text-right">
                    Company
                  </Label>
                  <Input
                    id="company"
                    name="company"
                    value={newAddress.company}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="street1" className="text-right">
                    Street Address
                  </Label>
                  <Input
                    id="street1"
                    name="street1"
                    value={newAddress.street1}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="street2" className="text-right">
                    Apt/Suite
                  </Label>
                  <Input
                    id="street2"
                    name="street2"
                    value={newAddress.street2}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="city" className="text-right">
                    City
                  </Label>
                  <Input
                    id="city"
                    name="city"
                    value={newAddress.city}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="state" className="text-right">
                    State
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ny">New York</SelectItem>
                      <SelectItem value="ca">California</SelectItem>
                      <SelectItem value="tx">Texas</SelectItem>
                      <SelectItem value="fl">Florida</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="zip" className="text-right">
                    ZIP Code
                  </Label>
                  <Input
                    id="zip"
                    name="zip"
                    value={newAddress.zip}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="phone" className="text-right">
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={newAddress.phone}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsAddDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleAddAddress}>Save Address</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search addresses..."
            className="pl-8 mb-6"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All Addresses</TabsTrigger>
            <TabsTrigger value="sender">Sender Addresses</TabsTrigger>
            <TabsTrigger value="recipient">Recipient Addresses</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="space-y-4 pt-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredAddresses.map((address) => (
                <AddressCard key={address.id} address={address} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="sender" className="space-y-4 pt-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {senderAddresses.map((address) => (
                <AddressCard key={address.id} address={address} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="recipient" className="space-y-4 pt-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recipientAddresses.map((address) => (
                <AddressCard key={address.id} address={address} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}

function AddressCard({ address }: { address: any }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center">
            {address.type === "sender" ? (
              <Home className="h-4 w-4 mr-2 text-primary" />
            ) : (
              <Building2 className="h-4 w-4 mr-2 text-primary" />
            )}
            <CardTitle className="text-lg">{address.name}</CardTitle>
          </div>
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
                <Edit className="mr-2 h-4 w-4" />
                Edit Address
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Copy className="mr-2 h-4 w-4" />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Address
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {address.isDefault && (
          <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
            Default
          </span>
        )}
        {address.company && (
          <CardDescription>{address.company}</CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-1 text-sm">
          <p>{address.street1}</p>
          {address.street2 && <p>{address.street2}</p>}
          <p>
            {address.city}, {address.state} {address.zip}
          </p>
          <p>{address.phone}</p>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button variant="outline" size="sm" className="w-full">
          Use This Address
        </Button>
      </CardFooter>
    </Card>
  );
}
