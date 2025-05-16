"use client";

import { useState } from "react";
import { DashboardLayout } from "@/src/components/dashboard-layout";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Switch } from "@/src/components/ui/switch";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Separator } from "@/src/components/ui/separator";

export default function Settings() {
  const [notificationSettings, setNotificationSettings] = useState({
    emailShipmentUpdates: true,
    emailPromotions: false,
    emailNewFeatures: true,
    browserNotifications: true,
  });

  const [printSettings, setPrintSettings] = useState({
    defaultPrinter: "default",
    paperSize: "4x6",
    printReceipt: true,
    openPdfAfterCreation: true,
  });

  const handleNotificationChange = (key: string) => {
    setNotificationSettings({
      ...notificationSettings,
      [key]: !notificationSettings[key as keyof typeof notificationSettings],
    });
  };

  const handlePrintSettingChange = (key: string, value: any) => {
    setPrintSettings({
      ...printSettings,
      [key]: value,
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences.
          </p>
        </div>

        <Tabs defaultValue="account" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="printing">Printing</TabsTrigger>
            <TabsTrigger value="shipping">Shipping</TabsTrigger>
          </TabsList>

          <TabsContent value="account" className="space-y-6 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>
                  Update your account details and personal information.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue="Doe" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue="john.doe@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" defaultValue="(555) 123-4567" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company Name (Optional)</Label>
                  <Input id="company" defaultValue="Acme Inc." />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>
                  Change your password to keep your account secure.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input id="confirmPassword" type="password" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Update Password</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Delete Account</CardTitle>
                <CardDescription>
                  Permanently delete your account and all associated data. This
                  action cannot be undone.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Once you delete your account, all of your shipping history,
                  saved addresses, and other data will be permanently removed.
                  This action cannot be reversed.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="destructive">Delete Account</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Email Notifications</CardTitle>
                <CardDescription>
                  Manage how you receive email notifications.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Shipment Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive email notifications about your shipment status
                      changes.
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.emailShipmentUpdates}
                    onCheckedChange={() =>
                      handleNotificationChange("emailShipmentUpdates")
                    }
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Promotional Emails</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive emails about promotions, discounts, and special
                      offers.
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.emailPromotions}
                    onCheckedChange={() =>
                      handleNotificationChange("emailPromotions")
                    }
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">New Features & Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive emails about new features, updates, and
                      improvements.
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.emailNewFeatures}
                    onCheckedChange={() =>
                      handleNotificationChange("emailNewFeatures")
                    }
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Browser Notifications</CardTitle>
                <CardDescription>
                  Manage browser notifications for shipment updates.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">
                      Enable Browser Notifications
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications in your browser when shipment status
                      changes.
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.browserNotifications}
                    onCheckedChange={() =>
                      handleNotificationChange("browserNotifications")
                    }
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Notification Settings</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="printing" className="space-y-6 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Printing Preferences</CardTitle>
                <CardDescription>
                  Configure how your shipping labels are printed.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="defaultPrinter">Default Printer</Label>
                  <Select
                    value={printSettings.defaultPrinter}
                    onValueChange={(value) =>
                      handlePrintSettingChange("defaultPrinter", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select printer" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">
                        System Default Printer
                      </SelectItem>
                      <SelectItem value="zebra">Zebra ZP 450</SelectItem>
                      <SelectItem value="dymo">DYMO LabelWriter 4XL</SelectItem>
                      <SelectItem value="brother">
                        Brother QL-1110NWB
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="paperSize">Label Size</Label>
                  <Select
                    value={printSettings.paperSize}
                    onValueChange={(value) =>
                      handlePrintSettingChange("paperSize", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="4x6">
                        4" x 6" (Standard Shipping Label)
                      </SelectItem>
                      <SelectItem value="8.5x11">
                        8.5" x 11" (Letter)
                      </SelectItem>
                      <SelectItem value="thermal">
                        2.25" x 4" (Thermal Label)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">
                      Print Receipt with Label
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Include a receipt when printing shipping labels.
                    </p>
                  </div>
                  <Switch
                    checked={printSettings.printReceipt}
                    onCheckedChange={(checked) =>
                      handlePrintSettingChange("printReceipt", checked)
                    }
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Open PDF After Creation</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically open PDF files after they are created.
                    </p>
                  </div>
                  <Switch
                    checked={printSettings.openPdfAfterCreation}
                    onCheckedChange={(checked) =>
                      handlePrintSettingChange("openPdfAfterCreation", checked)
                    }
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Printing Settings</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="shipping" className="space-y-6 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Default Shipping Preferences</CardTitle>
                <CardDescription>
                  Set your default shipping options for faster label creation.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="defaultCarrier">Preferred Carrier</Label>
                  <Select defaultValue="usps">
                    <SelectTrigger>
                      <SelectValue placeholder="Select carrier" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usps">USPS</SelectItem>
                      <SelectItem value="ups">UPS</SelectItem>
                      <SelectItem value="fedex">FedEx</SelectItem>
                      <SelectItem value="dhl">DHL</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="defaultService">Preferred Service</Label>
                  <Select defaultValue="priority">
                    <SelectTrigger>
                      <SelectValue placeholder="Select service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="priority">
                        USPS Priority Mail
                      </SelectItem>
                      <SelectItem value="express">
                        USPS Priority Mail Express
                      </SelectItem>
                      <SelectItem value="first-class">
                        USPS First Class Package
                      </SelectItem>
                      <SelectItem value="ground">UPS Ground</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="defaultPackage">Default Package Type</Label>
                  <Select defaultValue="custom">
                    <SelectTrigger>
                      <SelectValue placeholder="Select package" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="custom">Custom Box</SelectItem>
                      <SelectItem value="flat-rate-small">
                        USPS Small Flat Rate Box
                      </SelectItem>
                      <SelectItem value="flat-rate-medium">
                        USPS Medium Flat Rate Box
                      </SelectItem>
                      <SelectItem value="flat-rate-large">
                        USPS Large Flat Rate Box
                      </SelectItem>
                      <SelectItem value="envelope">Envelope</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Include Insurance</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically add insurance to all shipments by default.
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Signature Confirmation</Label>
                    <p className="text-sm text-muted-foreground">
                      Require signature confirmation for all shipments by
                      default.
                    </p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Shipping Settings</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>International Shipping</CardTitle>
                <CardDescription>
                  Configure your international shipping preferences.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="defaultContents">
                    Default Contents Description
                  </Label>
                  <Input
                    id="defaultContents"
                    placeholder="e.g., Clothing, Merchandise, Gifts"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Commercial Invoice</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically generate commercial invoices for
                      international shipments.
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save International Settings</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
