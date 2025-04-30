import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} SPENGU. All rights reserved.
        </p>
        <div className="flex gap-4 text-sm">
          <Link href="/privacy-policy" className="hover:underline">
            Privacy Policy
          </Link>
          <Link href="/terms-and-conditions" className="hover:underline">
            Terms & Conditions
          </Link>
          <Link href="/contact-us" className="hover:underline">
            Contact Us
          </Link>
          <Link href="/cancellation-and-refund" className="hover:underline">
            Cancellation & Refund
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
