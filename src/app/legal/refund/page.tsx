// ═══════════════════════════════════════════════════════════════════════════════
// REFUND POLICY PAGE
// Strict 14-day refund policy for digital goods with Lemon Squeezy
// ═══════════════════════════════════════════════════════════════════════════════

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Refund Policy',
  description: 'Refund Policy for SidraOS - Digital goods refund terms',
};

export default function RefundPolicyPage(): React.ReactElement {
  const lastUpdated = 'January 11, 2026';
  const businessName = 'SidraOS Owner'; // Replace with your actual name
  const businessLocation = 'Mascara, Algeria';

  return (
    <article className="prose prose-neutral max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-p:text-neutral-600 prose-li:text-neutral-600">
      {/* Header */}
      <header className="mb-12 border-b border-neutral-200 pb-8 text-center not-prose">
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
          Refund Policy
        </h1>
        <p className="mt-4 text-neutral-500">
          Last updated: {lastUpdated}
        </p>
      </header>

      {/* Introduction */}
      <section className="mb-10">
        <p className="text-lg leading-relaxed">
          Thank you for choosing SidraOS. This Refund Policy outlines the terms and conditions 
          for refunds on our digital subscription service. Please read this policy carefully 
          before making a purchase.
        </p>
      </section>

      {/* Important Notice */}
      <section className="mb-10 rounded-xl border-2 border-amber-200 bg-amber-50 p-6 not-prose">
        <h3 className="text-lg font-semibold text-amber-900">⚠️ Important Notice</h3>
        <p className="mt-2 text-amber-800">
          SidraOS is a digital service. Due to the nature of digital goods, <strong>all sales 
          are generally final and non-refundable</strong> once you have accessed the Service. 
          We encourage you to take advantage of our free tier to evaluate the Service before 
          purchasing a paid subscription.
        </p>
      </section>

      {/* Section 1 */}
      <section className="mb-10">
        <h2>1. Digital Goods Policy</h2>
        <p>
          As a Software-as-a-Service (SaaS) provider, SidraOS delivers digital services that 
          are immediately accessible upon subscription. Unlike physical goods, digital services 
          cannot be &quot;returned&quot; in the traditional sense. Therefore:
        </p>
        <ul>
          <li>
            Subscriptions provide immediate access to premium features
          </li>
          <li>
            The value of the service is delivered instantly upon purchase
          </li>
          <li>
            We offer a generous free tier for evaluation purposes
          </li>
        </ul>
      </section>

      {/* Section 2 */}
      <section className="mb-10">
        <h2>2. When Refunds May Be Granted</h2>
        <p>
          While our general policy is no refunds, we may consider refund requests under the 
          following exceptional circumstances:
        </p>
        
        <h3>2.1 Technical Issues (14-Day Window)</h3>
        <p>
          If you experience significant technical issues that prevent you from using the core 
          features of the Service, and our support team is unable to resolve them within a 
          reasonable timeframe, you may request a refund within <strong>14 days</strong> of 
          your purchase date.
        </p>
        <p>To qualify:</p>
        <ul>
          <li>You must have contacted our support team and given us an opportunity to resolve the issue</li>
          <li>The issue must be on our end (not related to your device, browser, or internet connection)</li>
          <li>The request must be made within 14 days of the original purchase</li>
        </ul>

        <h3>2.2 Duplicate Charges</h3>
        <p>
          If you were accidentally charged multiple times for the same subscription period, 
          we will refund the duplicate charges upon verification.
        </p>

        <h3>2.3 Unauthorized Transactions</h3>
        <p>
          If you believe your payment method was used without your authorization, please 
          contact us immediately. We will work with Lemon Squeezy to investigate and resolve 
          the issue.
        </p>
      </section>

      {/* Section 3 */}
      <section className="mb-10">
        <h2>3. When Refunds Will NOT Be Granted</h2>
        <p>Refunds will not be provided in the following cases:</p>
        <ul>
          <li>
            <strong>Change of Mind:</strong> You simply decided you no longer want the Service
          </li>
          <li>
            <strong>Failure to Use:</strong> You paid but did not use the Service
          </li>
          <li>
            <strong>Feature Expectations:</strong> The Service doesn&apos;t have a feature you 
            expected (but wasn&apos;t advertised)
          </li>
          <li>
            <strong>Partial Month Usage:</strong> You used the Service for part of the billing 
            period before cancelling
          </li>
          <li>
            <strong>Violation of Terms:</strong> Your account was terminated for violating 
            our Terms of Service
          </li>
          <li>
            <strong>Outside 14-Day Window:</strong> Request made more than 14 days after purchase 
            (for technical issues)
          </li>
        </ul>
      </section>

      {/* Section 4 */}
      <section className="mb-10">
        <h2>4. How to Request a Refund</h2>
        <p>To request a refund:</p>
        <ol>
          <li>
            Email us at{' '}
            <a href="mailto:support@sidraos.com">support@sidraos.com</a>
          </li>
          <li>
            Include your account email address
          </li>
          <li>
            Provide your order ID or transaction reference (from your receipt)
          </li>
          <li>
            Describe the issue you experienced in detail
          </li>
          <li>
            Include any relevant screenshots or error messages
          </li>
        </ol>
        <p>
          We aim to respond to all refund requests within <strong>3 business days</strong>.
        </p>
      </section>

      {/* Section 5 */}
      <section className="mb-10">
        <h2>5. Refund Processing</h2>
        <p>
          All refunds are processed through <strong>Lemon Squeezy</strong>, our Merchant of Record.
        </p>
        <ul>
          <li>
            Approved refunds will be credited to your original payment method
          </li>
          <li>
            Processing time: 5-10 business days depending on your bank/card issuer
          </li>
          <li>
            Refunds are issued in the original currency of purchase
          </li>
          <li>
            We are not responsible for any fees charged by your bank for the refund transaction
          </li>
        </ul>
      </section>

      {/* Section 6 */}
      <section className="mb-10">
        <h2>6. Subscription Cancellation</h2>
        <p>
          Cancelling your subscription is different from requesting a refund:
        </p>
        <ul>
          <li>
            You can cancel your subscription at any time through your account settings
          </li>
          <li>
            When you cancel, you retain access to paid features until the end of your current 
            billing period
          </li>
          <li>
            No partial refunds are given for unused time in the current billing period
          </li>
          <li>
            After your subscription ends, your account will be downgraded to the free tier
          </li>
        </ul>
      </section>

      {/* Section 7 */}
      <section className="mb-10">
        <h2>7. Contact Us</h2>
        <p>
          If you have any questions about this Refund Policy or need assistance, please contact us:
        </p>
      </section>

      {/* Contact Section */}
      <section className="mt-8 rounded-xl border border-neutral-200 bg-neutral-50 p-6 not-prose">
        <h3 className="text-lg font-semibold text-neutral-900">Support Contact</h3>
        <ul className="mt-4 space-y-2 text-neutral-600">
          <li>
            <strong>Email:</strong>{' '}
            <a href="mailto:support@sidraos.com" className="text-emerald-600 hover:underline">
              support@sidraos.com
            </a>
          </li>
          <li>
            <strong>Response Time:</strong> Within 24-48 hours
          </li>
          <li>
            <strong>Business:</strong> {businessName} — Auto-Entrepreneur
          </li>
          <li>
            <strong>Location:</strong> {businessLocation}
          </li>
        </ul>
      </section>

      {/* Final Note */}
      <section className="mt-10 rounded-xl border border-emerald-200 bg-emerald-50 p-6 not-prose">
        <h3 className="text-lg font-semibold text-emerald-900">💡 Try Before You Buy</h3>
        <p className="mt-2 text-emerald-800">
          Not sure if SidraOS is right for you? Start with our <strong>free tier</strong> — 
          it includes all core features so you can evaluate the Service before committing to 
          a paid subscription. No credit card required.
        </p>
      </section>
    </article>
  );
}
