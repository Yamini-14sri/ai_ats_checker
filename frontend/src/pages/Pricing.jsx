import React from "react";

export default function Pricing() {
  return (
    <div className="py-16 text-center">

      <h2 className="text-4xl font-bold mb-10">
        Pricing Plans
      </h2>

      <div className="grid md:grid-cols-3 gap-8">

        <div className="p-6 bg-white rounded-xl shadow">
          <h3 className="text-xl font-semibold">Free</h3>
          <p>Basic ATS checks</p>
        </div>

        <div className="p-6 bg-blue-600 text-white rounded-xl shadow">
          <h3 className="text-xl font-semibold">Pro</h3>
          <p>Unlimited analyses</p>
        </div>

        <div className="p-6 bg-white rounded-xl shadow">
          <h3 className="text-xl font-semibold">Enterprise</h3>
          <p>Team features</p>
        </div>

      </div>
    </div>
  );
}