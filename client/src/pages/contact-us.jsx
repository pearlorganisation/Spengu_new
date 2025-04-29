import React from "react";

const ContactUs = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
      <p className="mb-4">Last updated on Apr 23rd 2025</p>

      <div className="space-y-4">
        <p>
          <strong>Merchant Legal Entity Name:</strong> RAHUL SINGH
        </p>
        <p>
          <strong>Registered Address:</strong>
          <br />
          2ND FLOOR D3, Dehradun, UTTARAKHAND 248001
        </p>
        <p>
          <strong>Operational Address:</strong>
          <br />
          2nd Floor, Spengu Ed Tech Pvt Ltd, near Tata Motors, Transport Nagar,
          Dehradun, Uttarakhand
        </p>
        <p>
          <strong>Email:</strong>{" "}
          <a
            href="mailto:95workwithrahul@gmail.com"
            className="text-blue-600 hover:underline"
          >
            95workwithrahul@gmail.com
          </a>
        </p>
      </div>

      <div className="mt-8 border-t pt-6 text-sm text-gray-600">
        <p>
          <strong>Disclaimer:</strong> The above content is created at{" "}
          <strong>RAHUL SINGH's</strong> sole discretion. Razorpay shall not be
          liable for any content provided here and shall not be responsible for
          any claims or liability that may arise due to the merchant’s
          non-adherence to it.
        </p>
      </div>
    </div>
  );
};

export default ContactUs;
