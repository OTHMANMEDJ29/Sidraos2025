// ═══════════════════════════════════════════════════════════════════════════════
// TERMS OF SERVICE PAGE
// Professional Terms for Algerian Auto-Entrepreneur with Lemon Squeezy
// ═══════════════════════════════════════════════════════════════════════════════

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for SidraOS - Life Operating System',
};

export default function TermsOfServicePage(): React.ReactElement {
  const lastUpdated = 'January 11, 2026';
  const businessName = 'SidraOS Owner'; // Replace with your actual name
  const businessLocation = 'Mascara, Algeria';

  return (
    <article className="prose prose-neutral max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-p:text-neutral-600 prose-li:text-neutral-600">
      {/* Header */}
      <header className="mb-12 border-b border-neutral-200 pb-8 text-center not-prose">
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
          Terms of Service
        </h1>
        <p className="mt-4 text-neutral-500">
          Last updated: {lastUpdated}
        </p>
      </header>

      {/* Introduction */}
      <section className="mb-10">
        <p className="text-lg leading-relaxed">
          Welcome to SidraOS. These Terms of Service (&quot;Terms&quot;) govern your access to and use of 
          the SidraOS platform, website, and services (collectively, the &quot;Service&quot;) operated by 
          <strong> {businessName}</strong>, an Auto-Entrepreneur registered in {businessLocation}, Algeria 
          (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;).
        </p>
        <p>
          By accessing or using our Service, you agree to be bound by these Terms. If you do not 
          agree to these Terms, please do not use the Service.
        </p>
      </section>

      {/* Section 1 */}
      <section className="mb-10">
        <h2>1. Acceptance of Terms</h2>
        <p>
          By creating an account or using the Service, you confirm that you are at least 18 years 
          old (or the age of legal majority in your jurisdiction) and have the legal capacity to 
          enter into a binding agreement. If you are using the Service on behalf of an organization, 
          you represent that you have the authority to bind that organization to these Terms.
        </p>
      </section>

      {/* Section 2 */}
      <section className="mb-10">
        <h2>2. Description of Service</h2>
        <p>
          SidraOS is a &quot;Life Operating System&quot; — a Software-as-a-Service (SaaS) platform designed 
          to help you manage your productivity, finances, and personal knowledge. Features include:
        </p>
        <ul>
          <li>Task and project management</li>
          <li>Calendar and habit tracking</li>
          <li>Personal finance tracking and budgeting</li>
          <li>Note-taking and bookmarking</li>
          <li>Personal journaling</li>
        </ul>
        <p>
          We reserve the right to modify, suspend, or discontinue any part of the Service at any 
          time, with or without notice.
        </p>
      </section>

      {/* Section 3 */}
      <section className="mb-10">
        <h2>3. User Accounts</h2>
        <p>
          To access certain features, you must create an account. You are responsible for:
        </p>
        <ul>
          <li>Providing accurate and complete registration information</li>
          <li>Maintaining the security of your account credentials</li>
          <li>All activities that occur under your account</li>
          <li>Notifying us immediately of any unauthorized access</li>
        </ul>
        <p>
          We reserve the right to suspend or terminate accounts that violate these Terms or 
          remain inactive for extended periods.
        </p>
      </section>

      {/* Section 4 - Payment */}
      <section className="mb-10">
        <h2>4. Payment and Subscription</h2>
        <p>
          SidraOS offers both free and paid subscription plans.
        </p>
        <h3>4.1 Payment Processing</h3>
        <p>
          All payments are processed by <strong>Lemon Squeezy</strong>, our Merchant of Record. 
          Lemon Squeezy handles all payment processing, billing, and related customer service 
          on our behalf. By making a purchase, you agree to Lemon Squeezy&apos;s{' '}
          <a href="https://www.lemonsqueezy.com/terms" target="_blank" rel="noopener noreferrer">
            Terms of Service
          </a>.
        </p>
        <h3>4.2 Subscription Terms</h3>
        <ul>
          <li>Subscriptions automatically renew unless cancelled before the renewal date</li>
          <li>You may cancel your subscription at any time through your account settings</li>
          <li>Cancellation takes effect at the end of the current billing period</li>
          <li>We may change pricing with 30 days&apos; notice to existing subscribers</li>
        </ul>
        <h3>4.3 Taxes</h3>
        <p>
          Prices may be subject to applicable taxes (VAT, sales tax, etc.) depending on your 
          location. Lemon Squeezy will calculate and collect applicable taxes at checkout.
        </p>
      </section>

      {/* Section 5 - Refund Policy */}
      <section className="mb-10">
        <h2>5. Refund Policy</h2>
        <p>
          <strong>Due to the digital nature of our Service, all sales are generally final and 
          non-refundable.</strong> However, we may consider refund requests under the following 
          circumstances:
        </p>
        <ul>
          <li>
            <strong>Technical Issues:</strong> If you experience significant technical issues that 
            prevent you from using the Service, and we are unable to resolve them within a 
            reasonable timeframe, you may request a refund within <strong>14 days</strong> of 
            your purchase.
          </li>
          <li>
            <strong>Duplicate Charges:</strong> If you were accidentally charged multiple times 
            for the same subscription.
          </li>
        </ul>
        <p>
          To request a refund, contact us at{' '}
          <a href="mailto:support@sidraos.com">support@sidraos.com</a> with your order details 
          and a description of the issue. Refund requests are reviewed on a case-by-case basis.
        </p>
        <p>
          For more details, please see our <a href="/legal/refund">Refund Policy</a>.
        </p>
      </section>

      {/* Section 6 */}
      <section className="mb-10">
        <h2>6. Acceptable Use</h2>
        <p>You agree not to use the Service to:</p>
        <ul>
          <li>Violate any applicable laws or regulations</li>
          <li>Infringe on intellectual property or privacy rights of others</li>
          <li>Transmit malware, spam, or harmful content</li>
          <li>Attempt to gain unauthorized access to the Service or its systems</li>
          <li>Interfere with or disrupt the Service or servers</li>
          <li>Use automated means to access the Service without permission</li>
          <li>Engage in any activity that could harm our reputation or other users</li>
        </ul>
      </section>

      {/* Section 7 */}
      <section className="mb-10">
        <h2>7. Intellectual Property</h2>
        <p>
          The Service, including its design, code, features, and content (excluding user-generated 
          content), is owned by us and protected by copyright, trademark, and other intellectual 
          property laws.
        </p>
        <p>
          You retain ownership of any content you create using the Service. By using the Service, 
          you grant us a limited license to store, process, and display your content solely to 
          provide the Service to you.
        </p>
      </section>

      {/* Section 8 */}
      <section className="mb-10">
        <h2>8. Limitation of Liability</h2>
        <p>TO THE MAXIMUM EXTENT PERMITTED BY LAW:</p>
        <ul>
          <li>
            The Service is provided &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; without warranties of any kind
          </li>
          <li>
            We are not liable for any indirect, incidental, special, consequential, or punitive damages
          </li>
          <li>
            Our total liability shall not exceed the amount you paid us in the 12 months preceding the claim
          </li>
          <li>
            We are not responsible for data loss; you should maintain your own backups
          </li>
        </ul>
      </section>

      {/* Section 9 */}
      <section className="mb-10">
        <h2>9. Indemnification</h2>
        <p>
          You agree to indemnify, defend, and hold harmless SidraOS and its operator from any 
          claims, damages, losses, or expenses (including legal fees) arising from your use of 
          the Service or violation of these Terms.
        </p>
      </section>

      {/* Section 10 */}
      <section className="mb-10">
        <h2>10. Termination</h2>
        <p>
          Either party may terminate this agreement at any time. Upon termination:
        </p>
        <ul>
          <li>Your access to the Service will be suspended</li>
          <li>You may request a copy of your data within 30 days</li>
          <li>We may delete your data after 30 days unless legally required to retain it</li>
          <li>Provisions that should survive termination (such as limitation of liability) will remain in effect</li>
        </ul>
      </section>

      {/* Section 11 - Governing Law */}
      <section className="mb-10">
        <h2>11. Governing Law and Jurisdiction</h2>
        <p>
          These Terms are governed by and construed in accordance with the laws of the 
          People&apos;s Democratic Republic of Algeria. Any disputes arising from these Terms or 
          the Service shall be subject to the exclusive jurisdiction of the courts located 
          in <strong>{businessLocation}</strong>, Algeria.
        </p>
        <p>
          For customers within the European Union, nothing in these Terms affects your rights 
          under mandatory consumer protection laws in your country of residence.
        </p>
      </section>

      {/* Section 12 */}
      <section className="mb-10">
        <h2>12. Changes to Terms</h2>
        <p>
          We may update these Terms from time to time. We will notify you of material changes by 
          posting the updated Terms on our website and/or sending you an email. Your continued use 
          of the Service after such changes constitutes acceptance of the new Terms.
        </p>
      </section>

      {/* Contact Section */}
      <section className="mt-12 rounded-xl border border-neutral-200 bg-neutral-50 p-6 not-prose">
        <h3 className="text-lg font-semibold text-neutral-900">Contact Us</h3>
        <p className="mt-2 text-neutral-600">
          If you have any questions about these Terms of Service, please contact us:
        </p>
        <ul className="mt-4 space-y-2 text-neutral-600">
          <li>
            <strong>Email:</strong>{' '}
            <a href="mailto:legal@sidraos.com" className="text-emerald-600 hover:underline">
              legal@sidraos.com
            </a>
          </li>
          <li>
            <strong>Business Name:</strong> {businessName} — Auto-Entrepreneur
          </li>
          <li>
            <strong>Location:</strong> {businessLocation}
          </li>
        </ul>
      </section>
    </article>
  );
}
