import React from "react";

const CancellationAndRefund = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Cancellation & Refund Policy</h1>
      <p className="mb-4">Last updated on Apr 23rd 2025</p>

      <div className="space-y-5">
        <p>
          <strong>RAHUL SINGH</strong> believes in helping its customers as far
          as possible, and has therefore a liberal cancellation policy. Under
          this policy:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            Cancellations will be considered only if the request is made within
            1-2 days of placing the order. However, the cancellation request may
            not be entertained if the orders have been communicated to the
            vendors/merchants and they have initiated the process of shipping
            them.
          </li>
          <li>
            <strong>RAHUL SINGH</strong> does not accept cancellation requests
            for perishable items like flowers, eatables etc. However,
            refund/replacement can be made if the customer establishes that the
            quality of product delivered is not good.
          </li>
          <li>
            In case of receipt of damaged or defective items, please report the
            same to our Customer Service team within 1-2 days of receiving the
            product. The request will be entertained after merchant
            verification.
          </li>
          <li>
            If the product received is not as shown on the site or not as per
            expectations, inform our Customer Service team within 1-2 days. We
            will investigate and take appropriate action.
          </li>
          <li>
            For items with manufacturer warranties, please refer the issue
            directly to the manufacturer.
          </li>
          <li>
            For refunds approved by <strong>RAHUL SINGH</strong>, it will take
            1-2 days to process the refund to the customer.
          </li>
        </ul>
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

export default CancellationAndRefund;
