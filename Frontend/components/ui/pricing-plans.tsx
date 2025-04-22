"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { IconCheck, IconX } from "@tabler/icons-react";
import { Beam } from "@/components/ui/cover";

type PlanFeature = {
  title: string;
  included: boolean;
};

type Plan = {
  name: string;
  price: number;
  description: string;
  features: PlanFeature[];
  popular?: boolean;
  buttonText: string;
};

const plans: Plan[] = [
  {
    name: "Basic",
    price: 2000,
    description: "Perfect for individuals and small teams just getting started",
    buttonText: "Get Started",
    features: [
      { title: "Basic audience simulation", included: true },
      { title: "Up to 5 simulations per month", included: true },
      { title: "Standard analytics dashboard", included: true },
      { title: "Email support", included: true },
      { title: "Advanced sentiment analysis", included: false },
      { title: "Custom audience segments", included: false },
      { title: "API access", included: false },
      { title: "Priority support", included: false },
    ],
  },
  {
    name: "Pro",
    price: 5000,
    description: "Advanced features for professionals and growing businesses",
    buttonText: "Upgrade to Pro",
    popular: true,
    features: [
      { title: "Advanced audience simulation", included: true },
      { title: "Up to 20 simulations per month", included: true },
      { title: "Advanced analytics dashboard", included: true },
      { title: "Email and chat support", included: true },
      { title: "Advanced sentiment analysis", included: true },
      { title: "Custom audience segments", included: true },
      { title: "API access", included: false },
      { title: "Priority support", included: false },
    ],
  },
  {
    name: "Enterprise",
    price: 10000,
    description: "Maximum power and customization for large organizations",
    buttonText: "Contact Sales",
    features: [
      { title: "Enterprise-grade simulation", included: true },
      { title: "Unlimited simulations", included: true },
      { title: "Custom analytics dashboard", included: true },
      { title: "24/7 dedicated support", included: true },
      { title: "Advanced sentiment analysis", included: true },
      { title: "Custom audience segments", included: true },
      { title: "API access", included: true },
      { title: "Priority support", included: true },
    ],
  },
];

export function PricingPlans() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [hoveredPlan, setHoveredPlan] = useState<number | null>(null);


  const getAdjustedPrice = (price: number) => {
    if (billingCycle === "yearly") {
      return Math.round(price * 10 * 0.8); // 20% discount for yearly
    }
    return price;
  };

  return (
    <div className="w-full max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
          Choose Your Sim-Fluence Plan
        </h2>
        <p className="mt-4 text-xl text-gray-400 max-w-2xl mx-auto">
          Unlock the full potential of your content with our powerful simulation tools
        </p>
      </div>

      <div className="mt-12 flex justify-center">
        <div className="relative bg-gray-900 rounded-lg p-1 flex">
          <button
            onClick={() => setBillingCycle("monthly")}
            className={cn(
              "relative z-10 py-2 px-6 text-sm font-medium rounded-md focus:outline-none transition-all duration-200",
              billingCycle === "monthly" ? "text-white" : "text-gray-400 hover:text-white"
            )}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle("yearly")}
            className={cn(
              "relative z-10 py-2 px-6 text-sm font-medium rounded-md focus:outline-none transition-all duration-200",
              billingCycle === "yearly" ? "text-white" : "text-gray-400 hover:text-white"
            )}
          >
            Yearly
            <span className="absolute -top-2 -right-2 px-2 py-0.5 text-xs font-semibold rounded-full bg-blue-500 text-white">
              20% OFF
            </span>
          </button>
          <motion.div
            className="absolute inset-0 z-0 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600"
            initial={false}
            animate={{
              x: billingCycle === "monthly" ? 0 : "50%",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{ width: "50%" }}
          />
        </div>
      </div>

      <div className="mt-16 grid gap-8 lg:grid-cols-3 lg:gap-6">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            className={cn(
              "relative rounded-2xl border border-gray-800 bg-gray-900 shadow-xl transition-all duration-300",
              plan.popular ? "border-blue-500 lg:scale-110 z-10" : "",
              hoveredPlan === index ? "border-blue-400" : ""
            )}
            onMouseEnter={() => setHoveredPlan(index)}
            onMouseLeave={() => setHoveredPlan(null)}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            {plan.popular && (
              <div className="absolute -top-5 inset-x-0 flex justify-center">
                <span className="inline-flex rounded-full bg-blue-500 px-4 py-1 text-sm font-semibold text-white">
                  Most Popular
                </span>
              </div>
            )}

            <div className="p-8">
              <h3 className="text-xl font-semibold text-white">{plan.name}</h3>
              <div className="mt-4 flex items-baseline">
                <span className="text-5xl font-extrabold text-white">
                  ₹{getAdjustedPrice(plan.price).toLocaleString()}
                </span>
                <span className="ml-1 text-xl font-semibold text-gray-400">
                  /{billingCycle === "monthly" ? "mo" : "yr"}
                </span>
              </div>
              <p className="mt-5 text-gray-400">{plan.description}</p>

              <ul className="mt-8 space-y-4">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <div className="flex-shrink-0">
                      {feature.included ? (
                        <IconCheck className="h-6 w-6 text-green-500" />
                      ) : (
                        <IconX className="h-6 w-6 text-gray-500" />
                      )}
                    </div>
                    <p
                      className={cn(
                        "ml-3 text-base",
                        feature.included ? "text-gray-300" : "text-gray-500"
                      )}
                    >
                      {feature.title}
                    </p>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={cn(
                    "w-full rounded-lg py-3 px-4 text-center text-sm font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900",
                    plan.popular
                      ? "bg-blue-600 text-white hover:bg-blue-500"
                      : "bg-gray-800 text-white hover:bg-gray-700"
                  )}
                >
                  {plan.buttonText}
                </motion.button>
              </div>
            </div>

            {hoveredPlan === index && (
              <>
                <Beam
                  className="absolute top-0"
                  hovered={true}
                  width={300}
                  duration={1.5}
                />
                <Beam
                  className="absolute bottom-0"
                  hovered={true}
                  width={300}
                  duration={1.5}
                />
              </>
            )}
          </motion.div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <h3 className="text-2xl font-bold text-white">Need a custom solution?</h3>
        <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
          Contact our sales team for a tailored plan that meets your specific requirements
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-8 inline-flex items-center rounded-lg border border-transparent bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
        >
          Contact Sales
        </motion.button>
      </div>
      
      {/* FAQ section removed */}
    </div>
  );
}

export function PricingCard({
  plan,
  isPopular,
  isHovered,
  onMouseEnter,
  onMouseLeave,
  billingCycle,
}: {
  plan: Plan;
  isPopular?: boolean;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  billingCycle: "monthly" | "yearly";
}) {
  const getAdjustedPrice = (price: number) => {
    if (billingCycle === "yearly") {
      return Math.round(price * 10 * 0.8); // 20% discount for yearly
    }
    return price;
  };

  return (
    <motion.div
      className={cn(
        "relative rounded-2xl border border-gray-800 bg-gray-900 shadow-xl transition-all duration-300",
        isPopular ? "border-blue-500 lg:scale-110 z-10" : "",
        isHovered ? "border-blue-400" : ""
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      whileHover={{ y: -5 }}
    >
      {isPopular && (
        <div className="absolute -top-5 inset-x-0 flex justify-center">
          <span className="inline-flex rounded-full bg-blue-500 px-4 py-1 text-sm font-semibold text-white">
            Most Popular
          </span>
        </div>
      )}

      <div className="p-8">
        <h3 className="text-xl font-semibold text-white">{plan.name}</h3>
        <div className="mt-4 flex items-baseline">
          <span className="text-5xl font-extrabold text-white">
            ₹{getAdjustedPrice(plan.price).toLocaleString()}
          </span>
          <span className="ml-1 text-xl font-semibold text-gray-400">
            /{billingCycle === "monthly" ? "mo" : "yr"}
          </span>
        </div>
        <p className="mt-5 text-gray-400">{plan.description}</p>

        <ul className="mt-8 space-y-4">
          {plan.features.map((feature, featureIndex) => (
            <li key={featureIndex} className="flex items-start">
              <div className="flex-shrink-0">
                {feature.included ? (
                  <IconCheck className="h-6 w-6 text-green-500" />
                ) : (
                  <IconX className="h-6 w-6 text-gray-500" />
                )}
              </div>
              <p
                className={cn(
                  "ml-3 text-base",
                  feature.included ? "text-gray-300" : "text-gray-500"
                )}
              >
                {feature.title}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              "w-full rounded-lg py-3 px-4 text-center text-sm font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900",
              isPopular
                ? "bg-blue-600 text-white hover:bg-blue-500"
                : "bg-gray-800 text-white hover:bg-gray-700"
            )}
          >
            {plan.buttonText}
          </motion.button>
        </div>
      </div>

      {isHovered && (
        <>
          <Beam
            className="absolute top-0"
            hovered={true}
            width={300}
            duration={1.5}
          />
          <Beam
            className="absolute bottom-0"
            hovered={true}
            width={300}
            duration={1.5}
          />
        </>
      )}
    </motion.div>
  );
}