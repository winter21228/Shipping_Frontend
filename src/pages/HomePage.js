import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  ArrowRight,
  Check,
  Package,
  Truck,
  DollarSign,
  Clock,
} from "lucide-react";
import { PATH_AUTH } from "../routes/paths";

export default function Home() {
  return (
    <div className="w-full">
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-40 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-yellow h-10 rounded-t-3xl rounded-b-3xl">
              Save up to 89%
            </span>{" "}
            off USPS® & UPS® rates with our free shipping software
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto">
            Our free shipping software helps you save money and time on every
            package you send.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <Button
              size="lg"
              asChild
              className="text-3xl font-bold text-white cursor-pointer"
            >
              <Link to={PATH_AUTH.register} className="bg-green py-10">
                Create your FREE account <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg max-w-screen-xl mx-auto">
            <img
              src="/assets/images/home/home.png"
              alt="ShipSaver Dashboard Preview"
              className="rounded-lg w-full border shadow-sm"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-grey90">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-16">
            Everything you need to ship like a pro
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<DollarSign className="h-10 w-10 text-primary" />}
              title="Save on Shipping Costs"
              description="Access commercial Plus Pricing for USPS and UPS without any monthly fees or minimums."
            />
            <FeatureCard
              icon={<Truck className="h-10 w-10 text-primary" />}
              title="Compare Carriers Instantly"
              description="See USPS and UPS rates side-by-side to find the best option for every package."
            />
            <FeatureCard
              icon={<Clock className="h-10 w-10 text-primary" />}
              title="Save Time with Automation"
              description="Batch process orders, import from CSV, and integrate with your e-commerce platform."
            />
            <FeatureCard
              icon={<Package className="h-10 w-10 text-primary" />}
              title="Address Book"
              description="Save frequently used addresses for quick and easy shipping label creation."
            />
            <FeatureCard
              icon={<Check className="h-10 w-10 text-primary" />}
              title="Address Verification"
              description="Automatically verify and correct addresses to avoid delivery issues."
            />
            <FeatureCard
              icon={<Package className="h-10 w-10 text-primary" />}
              title="Label Printing"
              description="Print shipping labels directly or save as PDF for later use."
            />
          </div>
        </div>
      </section>

      {/* Shipping Process Visualization */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            The Complete Shipping Solution
          </h2>

          <div className="grid md:grid-cols-2 gap-8 items-center mb-16">
            <div className="order-2 md:order-1">
              <h3 className="text-2xl font-bold mb-4">
                Compare Carriers & Save
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                Get instant access to discounted USPS and UPS rates. Compare
                options side-by-side to find the best shipping solution for
                every package.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 mt-1" />
                  <span>Up to 89% off retail rates</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 mt-1" />
                  <span>See delivery estimates and transit times</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 mt-1" />
                  <span>Insurance and signature options</span>
                </li>
              </ul>
            </div>
            <div className="order-1 md:order-2 flex justify-center">
              <div>
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/63b58928d95cb83293ec8c2a_TT_white_2819_2_Lft--packages_ups_express_box_small-r-sharpen-p-500-TpG6BbAX4QzwI2jPUWy5kDxHrEVux1.webp"
                  alt="UPS Express Shipping Box"
                  className="rounded-lg shadow-lg max-w-xs"
                />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center mb-16">
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute -top-3 -right-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  ECO-FRIENDLY
                </div>
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/63b43e5f3f4615f15fa0e889_mTT_w_Plants_0Y8A8384_r3-r-p-500-zlnWForhrizS9AAZD5D9pYLJmnj12L.webp"
                  alt="Eco-friendly Shipping"
                  className="rounded-lg shadow-lg max-w-xs"
                />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">
                Sustainable Shipping Options
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                Make environmentally conscious shipping choices with our
                eco-friendly options and carbon offset programs.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 mt-1" />
                  <span>Recyclable packaging recommendations</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 mt-1" />
                  <span>Carbon-neutral shipping options</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 mt-1" />
                  <span>Minimize environmental impact</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center mb-16">
            <div className="order-2 md:order-1">
              <h3 className="text-2xl font-bold mb-4">
                Streamlined Shipping Process
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                From address verification to label creation, we make the entire
                shipping process fast and efficient.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 mt-1" />
                  <span>Automatic address verification</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 mt-1" />
                  <span>Batch processing for multiple shipments</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 mt-1" />
                  <span>Save frequent addresses and preferences</span>
                </li>
              </ul>
            </div>
            <div className="order-1 md:order-2 flex justify-center">
              <div className="relative">
                <div className="absolute -top-3 -left-3 bg-sky-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  EASY TRACKING
                </div>
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/63b589ac6afec60291eae99e_shipping_materials_packing_peanuts-p-800-a0j3cmHhQkwwqO4wPJMIYjPupzf0YI.webp"
                  alt="Shipping Boxes with Labels"
                  className="rounded-lg shadow-lg max-w-xs"
                />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute -top-3 -right-3 bg-purple-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  INSTANT LABELS
                </div>
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/6679c6db5f9db913bbb9d2a3_mTT_w_Printers_0Y8A8361-desktop_printer-r_still-p-800.jpg-4N40HS5COrV7YNtefSTmv2tO3Llw3V.jpeg"
                  alt="Label Printer"
                  className="rounded-lg shadow-lg max-w-xs"
                />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">
                Print Professional Labels
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                Create and print professional shipping labels directly from your
                computer. No special equipment required.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 mt-1" />
                  <span>Print on regular paper or label sheets</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 mt-1" />
                  <span>Compatible with thermal label printers</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 mt-1" />
                  <span>Save as PDF for later printing</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="py-20 bg-grey90">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl text-white font-bold text-center mb-6">
            See ShipSaver in Action
          </h2>
          <p className="text-xl text-gray-400 text-center mb-16 max-w-3xl mx-auto">
            Our intuitive interface makes shipping packages quick and easy
          </p>

          <div className="relative max-w-5xl mx-auto">
            {/* Central Dashboard Image */}
            <div className="bg-white p-4 rounded-xl shadow-lg mb-8 z-10 relative">
              <img
                src="/assets/images/home/home.png"
                alt="ShipSaver Dashboard Interface"
                className="rounded-lg w-full border shadow-sm"
              />
            </div>

            {/* Surrounding Images with Captions */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              <div className="bg-white p-3 rounded-lg shadow-md">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/63b58928d95cb83293ec8c2a_TT_white_2819_2_Lft--packages_ups_express_box_small-r-sharpen-p-500-TpG6BbAX4QzwI2jPUWy5kDxHrEVux1.webp"
                  alt="UPS Express Shipping Box"
                  className="rounded-lg w-full h-48 object-contain"
                />
                <p className="text-center mt-2 font-medium">
                  Compare UPS & USPS rates
                </p>
              </div>

              <div className="bg-white p-3 rounded-lg shadow-md">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/63b43e5f3f4615f15fa0e889_mTT_w_Plants_0Y8A8384_r3-r-p-500-zlnWForhrizS9AAZD5D9pYLJmnj12L.webp"
                  alt="Eco-friendly Shipping"
                  className="rounded-lg w-full h-48 object-contain"
                />
                <p className="text-center mt-2 font-medium">
                  Eco-friendly options
                </p>
              </div>

              <div className="bg-white p-3 rounded-lg shadow-md">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/63b589ac6afec60291eae99e_shipping_materials_packing_peanuts-p-800-a0j3cmHhQkwwqO4wPJMIYjPupzf0YI.webp"
                  alt="Shipping Boxes with Labels"
                  className="rounded-lg w-full h-48 object-contain"
                />
                <p className="text-center mt-2 font-medium">
                  Track your shipments
                </p>
              </div>

              <div className="bg-white p-3 rounded-lg shadow-md">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/6679c6db5f9db913bbb9d2a3_mTT_w_Printers_0Y8A8361-desktop_printer-r_still-p-800.jpg-4N40HS5COrV7YNtefSTmv2tO3Llw3V.jpeg"
                  alt="Label Printer"
                  className="rounded-lg w-full h-48 object-contain"
                />
                <p className="text-center mt-2 font-medium">
                  Print labels instantly
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 mb-16 max-w-3xl mx-auto">
            No monthly fees, no hidden costs. Only pay for the labels you
            create.
          </p>
          <div className="bg-white p-8 rounded-xl shadow-lg max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-6">100% Free to Use</h3>
            <ul className="space-y-4 text-left mb-8">
              <PricingItem text="No monthly subscription fees" />
              <PricingItem text="No markup on shipping rates" />
              <PricingItem text="No minimum volume requirements" />
              <PricingItem text="Free address verification" />
              <PricingItem text="Unlimited labels and shipments" />
            </ul>
            <Button size="lg" className="w-full sm:w-auto" asChild>
              <Link to={PATH_AUTH.register}>Create Your Free Account</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-grey90">
        <div className="container px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-16">
            How ShipSaver Works
          </h2>
          <div className="w-full grid md:grid-cols-2 gap-16 items-center">
            <div>
              <ol className="space-y-8">
                <StepItem
                  number="1"
                  title="Enter package details"
                  description="Input your package dimensions, weight, and addresses."
                />
                <StepItem
                  number="2"
                  title="Compare shipping rates"
                  description="See all available shipping options and prices side-by-side."
                />
                <StepItem
                  number="3"
                  title="Purchase and print"
                  description="Select your preferred carrier and print your shipping label."
                />
                <StepItem
                  number="4"
                  title="Track your shipment"
                  description="Monitor delivery status and access shipping history anytime."
                />
              </ol>
            </div>
            <div className="bg-white rounded-xl shadow-lg">
              <img
                src="/assets/images/home/home.png"
                alt="ShipSaver Dashboard Interface"
                className="rounded-lg w-full border shadow-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pt-20 bg-primary text-grey90">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to start saving on shipping?
          </h2>
          <p className="text-xl mb-10 max-w-3xl mx-auto opacity-90">
            Join thousands of businesses and individuals who save time and money
            with ShipSaver.
          </p>
          <Button
            size="lg"
            asChild
            className="text-2xl font-bold text-white cursor-pointer"
          >
            <Link to={PATH_AUTH.register} className="bg-green py-10">
              Create your FREE account <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function PricingItem({ text }) {
  return (
    <li className="flex items-start">
      <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
      <span>{text}</span>
    </li>
  );
}

function StepItem({ number, title, description }) {
  return (
    <li className="flex">
      <div className="flex-shrink-0 mr-4">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white font-bold">
          {number}
        </div>
      </div>
      <div>
        <h3 className="text-xl font-bold mb-1 text-white">{title}</h3>
        <p className="text-gray-500">{description}</p>
      </div>
    </li>
  );
}
