"use client";

import { useState } from "react";
import { DashboardLayout } from "@/src/components/dashboard-layout";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/src/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Separator } from "@/src/components/ui/separator";
import { ArrowRight, Truck, Clock, DollarSign } from "lucide-react";

export default function CreateShipment() {
  const [step, setStep] = useState(1);
  const [selectedRate, setSelectedRate] = useState<string | null>(null);

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Create Shipment</h1>
          <p className="text-muted-foreground">
            Enter your shipment details to get the best rates
          </p>
        </div>

        <div className="flex items-center justify-between">
          <StepIndicator currentStep={step} totalSteps={3} />
        </div>

        {step === 1 && <ShipmentDetailsForm onNext={handleNext} />}

        {step === 2 && (
          <RateSelection
            onBack={handleBack}
            onNext={handleNext}
            selectedRate={selectedRate}
            setSelectedRate={setSelectedRate}
          />
        )}

        {step === 3 && <PaymentAndConfirmation onBack={handleBack} />}
      </div>
    </DashboardLayout>
  );
}

function StepIndicator({
  currentStep,
  totalSteps,
}: {
  currentStep: number;
  totalSteps: number;
}) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-sm text-muted-foreground">
          {currentStep === 1 && "Shipment Details"}
          {currentStep === 2 && "Select Rate"}
          {currentStep === 3 && "Payment & Confirmation"}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-primary h-2 rounded-full transition-all"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        ></div>
      </div>
    </div>
  );
}

function ShipmentDetailsForm({ onNext }: { onNext: () => void }) {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="domestic" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="domestic">Domestic</TabsTrigger>
          <TabsTrigger value="international">International</TabsTrigger>
        </TabsList>
        <TabsContent value="domestic" className="space-y-6 pt-4">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>From Address</CardTitle>
                <CardDescription>Enter the sender's address</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fromName">Full Name</Label>
                  <Input id="fromName" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fromCompany">Company (Optional)</Label>
                  <Input id="fromCompany" placeholder="Acme Inc." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fromStreet1">Street Address</Label>
                  <Input id="fromStreet1" placeholder="123 Main St" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fromStreet2">Apt/Suite (Optional)</Label>
                  <Input id="fromStreet2" placeholder="Apt 4B" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fromCity">City</Label>
                    <Input id="fromCity" placeholder="New York" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fromState">State</Label>
                    <Select>
                      <SelectTrigger id="fromState">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ny">New York</SelectItem>
                        <SelectItem value="ca">California</SelectItem>
                        <SelectItem value="tx">Texas</SelectItem>
                        <SelectItem value="fl">Florida</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fromZip">ZIP Code</Label>
                    <Input id="fromZip" placeholder="10001" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fromPhone">Phone</Label>
                    <Input id="fromPhone" placeholder="(555) 123-4567" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>To Address</CardTitle>
                <CardDescription>Enter the recipient's address</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="toName">Full Name</Label>
                  <Input id="toName" placeholder="Jane Smith" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="toCompany">Company (Optional)</Label>
                  <Input id="toCompany" placeholder="XYZ Corp" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="toStreet1">Street Address</Label>
                  <Input id="toStreet1" placeholder="456 Oak Ave" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="toStreet2">Apt/Suite (Optional)</Label>
                  <Input id="toStreet2" placeholder="Suite 101" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="toCity">City</Label>
                    <Input id="toCity" placeholder="Los Angeles" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="toState">State</Label>
                    <Select>
                      <SelectTrigger id="toState">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ny">New York</SelectItem>
                        <SelectItem value="ca">California</SelectItem>
                        <SelectItem value="tx">Texas</SelectItem>
                        <SelectItem value="fl">Florida</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="toZip">ZIP Code</Label>
                    <Input id="toZip" placeholder="90001" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="toPhone">Phone</Label>
                    <Input id="toPhone" placeholder="(555) 987-6543" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Package Details</CardTitle>
              <CardDescription>
                Enter the package dimensions and weight
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="packageType">Package Type</Label>
                    <Select defaultValue="custom">
                      <SelectTrigger id="packageType">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="custom">Custom Box</SelectItem>
                        <SelectItem value="usps-small">
                          USPS Small Flat Rate Box
                        </SelectItem>
                        <SelectItem value="usps-medium">
                          USPS Medium Flat Rate Box
                        </SelectItem>
                        <SelectItem value="usps-large">
                          USPS Large Flat Rate Box
                        </SelectItem>
                        <SelectItem value="envelope">Envelope</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight (lbs)</Label>
                    <Input id="weight" type="number" placeholder="2.5" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="length">Length (in)</Label>
                      <Input id="length" type="number" placeholder="12" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="width">Width (in)</Label>
                      <Input id="width" type="number" placeholder="9" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="height">Height (in)</Label>
                      <Input id="height" type="number" placeholder="6" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contents">Package Contents</Label>
                    <Input id="contents" placeholder="Clothing, books, etc." />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={onNext}>
                Get Rates <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="international" className="pt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-center h-40">
                <p className="text-muted-foreground">
                  International shipping coming soon!
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function RateSelection({
  onBack,
  onNext,
  selectedRate,
  setSelectedRate,
}: {
  onBack: () => void;
  onNext: () => void;
  selectedRate: string | null;
  setSelectedRate: (rate: string) => void;
}) {
  // Sample shipping rates
  const shippingRates = [
    {
      id: "usps-priority",
      carrier: "USPS",
      service: "Priority Mail",
      deliveryDays: "1-3 business days",
      price: 7.82,
      features: [
        "Tracking included",
        "Insurance up to $50",
        "Free pickup available",
      ],
    },
    {
      id: "usps-express",
      carrier: "USPS",
      service: "Priority Mail Express",
      deliveryDays: "1-2 business days",
      price: 26.35,
      features: [
        "Tracking included",
        "Insurance up to $100",
        "Money-back guarantee",
      ],
    },
    {
      id: "ups-ground",
      carrier: "UPS",
      service: "Ground",
      deliveryDays: "1-5 business days",
      price: 10.2,
      features: [
        "Tracking included",
        "Insurance up to $100",
        "Scheduled delivery",
      ],
    },
    {
      id: "ups-3day",
      carrier: "UPS",
      service: "3 Day Select",
      deliveryDays: "3 business days",
      price: 15.75,
      features: [
        "Tracking included",
        "Insurance up to $100",
        "Guaranteed delivery",
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Select Shipping Rate</CardTitle>
          <CardDescription>
            Choose the shipping service that best fits your needs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={selectedRate || ""}
            onValueChange={setSelectedRate}
          >
            <div className="space-y-4">
              {shippingRates.map((rate) => (
                <div
                  key={rate.id}
                  className={`flex items-start space-x-4 rounded-lg border p-4 ${
                    selectedRate === rate.id
                      ? "border-primary bg-primary/5"
                      : ""
                  }`}
                >
                  <RadioGroupItem
                    value={rate.id}
                    id={rate.id}
                    className="mt-1"
                  />
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <Label
                        htmlFor={rate.id}
                        className="text-base font-medium cursor-pointer"
                      >
                        {rate.carrier} {rate.service}
                      </Label>
                      <span className="font-bold text-lg">
                        ${rate.price.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="mr-1 h-4 w-4" />
                      {rate.deliveryDays}
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {rate.features.map((feature, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </RadioGroup>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button onClick={onNext} disabled={!selectedRate}>
            Continue to Payment
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Shipment Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium mb-2">From:</h3>
                <p className="text-sm">John Doe</p>
                <p className="text-sm">123 Main St</p>
                <p className="text-sm">New York, NY 10001</p>
              </div>
              <div>
                <h3 className="font-medium mb-2">To:</h3>
                <p className="text-sm">Jane Smith</p>
                <p className="text-sm">456 Oak Ave</p>
                <p className="text-sm">Los Angeles, CA 90001</p>
              </div>
            </div>
            <Separator />
            <div>
              <h3 className="font-medium mb-2">Package Details:</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <p>Weight: 2.5 lbs</p>
                <p>Dimensions: 12" × 9" × 6"</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function PaymentAndConfirmation({ onBack }: { onBack: () => void }) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Payment</CardTitle>
          <CardDescription>
            Complete your purchase to generate the shipping label
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border p-4 bg-gray-50">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <Truck className="h-5 w-5 mr-2 text-primary" />
                <span className="font-medium">USPS Priority Mail</span>
              </div>
              <span className="font-bold">$7.82</span>
            </div>
            <div className="space-y-1 text-sm text-muted-foreground">
              <p>Delivery: 1-3 business days</p>
              <p>Tracking and insurance included</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input id="cardNumber" placeholder="4242 4242 4242 4242" />
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
                        {(new Date().getFullYear() + i).toString().slice(-2)}
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
              <Label htmlFor="nameOnCard">Name on Card</Label>
              <Input id="nameOnCard" placeholder="John Doe" />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button>
            Pay and Create Label <DollarSign className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Shipping Cost</span>
              <span>$7.82</span>
            </div>
            <div className="flex justify-between">
              <span>Insurance</span>
              <span>Included</span>
            </div>
            <div className="flex justify-between">
              <span>Tracking</span>
              <span>Included</span>
            </div>
            <Separator />
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>$7.82</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
