// ═══════════════════════════════════════════════════════════════════════════════
// PRIVACY POLICY PAGE
// Professional Privacy Policy for Algerian Auto-Entrepreneur with Lemon Squeezy
// ═══════════════════════════════════════════════════════════════════════════════

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for SidraOS - How we protect your data',
};

export default function PrivacyPolicyPage(): React.ReactElement {
  const lastUpdated = 'January 11, 2026';
  const businessName = 'SidraOS Owner'; // Replace with your actual name
  const businessLocation = 'Mascara, Algeria';

  return (
    <article className="prose prose-neutral max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-p:text-neutral-600 prose-li:text-neutral-600">
      {/* Header */}
      <header className="mb-12 border-b border-neutral-200 pb-8 text-center not-prose">
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-4 text-neutral-500">
          Last updated: {lastUpdated}
        </p>
      </header>

      {/* Introduction */}
      <section className="mb-10">
        <p className="text-lg leading-relaxed">
          At SidraOS, we take your privacy seriously. This Privacy Policy explains how 
          <strong> {businessName}</strong>, an Auto-Entrepreneur based in {businessLocation}, Algeria 
          (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), collects, uses, discloses, and protects your personal 
          information when you use our Service.
        </p>
        <p>
          By using SidraOS, you consent to the data practices described in this policy. 
          If you do not agree with these practices, please do not use our Service.
        </p>
      </section>

      {/* Section 1 */}
      <section className="mb-10">
        <h2>1. Information We Collect</h2>
        
        <h3>1.1 Information You Provide</h3>
        <ul>
          <li>
            <strong>Account Information:</strong> When you create an account, we collect your 
            name, email address, and password (stored in encrypted form).
          </li>
          <li>
            <strong>Profile Information:</strong> Display name, profile picture, language preference, 
            and timezone settings.
          </li>
          <li>
            <strong>User Content:</strong> Tasks, notes, journal entries, financial data, habits, 
            and other content you create within the Service.
          </li>
          <li>
            <strong>Communications:</strong> Messages you send to our support team or through 
            our contact forms.
          </li>
        </ul>

        <h3>1.2 Payment Information</h3>
        <p>
          <strong>We do not store your credit card details.</strong> All payment processing is 
          handled by <strong>Lemon Squeezy</strong>, our Merchant of Record. When you make a 
          purchase, your payment information is collected and processed directly by Lemon Squeezy 
          in accordance with their{' '}
          <a href="https://www.lemonsqueezy.com/privacy" target="_blank" rel="noopener noreferrer">
            Privacy Policy
          </a>.
        </p>
        <p>
          We only receive limited information from Lemon Squeezy, such as your subscription status, 
          order ID, and billing email for account management purposes.
        </p>

        <h3>1.3 Information Collected Automatically</h3>
        <ul>
          <li><strong>Device Information:</strong> Browser type, operating system, device type</li>
          <li><strong>Usage Data:</strong> Pages visited, features used, time spent on the Service</li>
          <li><strong>Log Data:</strong> IP address, access times, referring URLs</li>
          <li><strong>Cookies:</strong> Small data files stored on your device (see Section 7)</li>
        </ul>
      </section>

      {/* Section 2 */}
      <section className="mb-10">
        <h2>2. How We Use Your Information</h2>
        <p>We use the collected information to:</p>
        <ul>
          <li>Provide, maintain, and improve the Service</li>
          <li>Process transactions and send related notifications</li>
          <li>Respond to your comments, questions, and support requests</li>
          <li>Send you technical notices, updates, and security alerts</li>
          <li>Monitor and analyze usage trends to improve user experience</li>
          <li>Detect, prevent, and address technical issues or fraud</li>
          <li>Comply with legal obligations</li>
        </ul>
        <p>
          <strong>We will never sell your personal information to third parties.</strong>
        </p>
      </section>

      {/* Section 3 */}
      <section className="mb-10">
        <h2>3. Data Sharing and Disclosure</h2>
        <p>We may share your information only in the following circumstances:</p>
        <ul>
          <li>
            <strong>Lemon Squeezy:</strong> Our payment processor receives payment information 
            to process transactions on our behalf.
          </li>
          <li>
            <strong>Supabase:</strong> Our database and authentication provider stores your 
            account data securely.
          </li>
          <li>
            <strong>Vercel:</strong> Our hosting provider may have access to technical logs 
            for performance and security purposes.
          </li>
          <li>
            <strong>Legal Requirements:</strong> When required by law, court order, or 
            governmental authority.
          </li>
          <li>
            <strong>Protection of Rights:</strong> To protect our rights, privacy, safety, 
            or property, or that of our users or the public.
          </li>
          <li>
            <strong>Business Transfers:</strong> In connection with a merger, acquisition, or 
            sale of assets (you will be notified).
          </li>
        </ul>
        <p>
          All third-party service providers are bound by confidentiality agreements and are 
          only permitted to use your data to provide services to us.
        </p>
      </section>

      {/* Section 4 */}
      <section className="mb-10">
        <h2>4. Data Security</h2>
        <p>
          We implement industry-standard security measures to protect your personal information:
        </p>
        <ul>
          <li>All data is encrypted in transit using TLS/SSL</li>
          <li>Passwords are hashed using secure algorithms (bcrypt)</li>
          <li>We use Supabase&apos;s secure, SOC 2 compliant infrastructure</li>
          <li>Access to personal data is restricted to authorized personnel only</li>
          <li>Regular security reviews and updates</li>
        </ul>
        <p>
          However, no method of transmission over the Internet or electronic storage is 100% secure. 
          While we strive to protect your information, we cannot guarantee absolute security.
        </p>
      </section>

      {/* Section 5 */}
      <section className="mb-10">
        <h2>5. Data Retention</h2>
        <p>
          We retain your personal information for as long as your account is active or as needed 
          to provide you with the Service:
        </p>
        <ul>
          <li><strong>Account Data:</strong> Retained until you delete your account</li>
          <li><strong>User Content:</strong> Retained until you delete it or your account</li>
          <li><strong>Billing Records:</strong> Retained for 7 years for legal and tax purposes</li>
          <li><strong>Support Communications:</strong> Retained for 2 years</li>
          <li><strong>Anonymized Analytics:</strong> May be retained indefinitely</li>
        </ul>
        <p>
          After account deletion, we will delete or anonymize your personal data within 30 days, 
          except where retention is required by law.
        </p>
      </section>

      {/* Section 6 */}
      <section className="mb-10">
        <h2>6. Your Rights</h2>
        <p>Depending on your location, you may have the following rights:</p>
        <ul>
          <li><strong>Access:</strong> Request a copy of your personal data</li>
          <li><strong>Correction:</strong> Request correction of inaccurate data</li>
          <li><strong>Deletion:</strong> Request deletion of your personal data</li>
          <li><strong>Data Portability:</strong> Request your data in a machine-readable format</li>
          <li><strong>Objection:</strong> Object to certain processing of your data</li>
          <li><strong>Withdraw Consent:</strong> Withdraw consent where processing is based on consent</li>
        </ul>
        <p>
          To exercise these rights, please contact us at{' '}
          <a href="mailto:privacy@sidraos.com">privacy@sidraos.com</a>. We will respond within 30 days.
        </p>
      </section>

      {/* Section 7 */}
      <section className="mb-10">
        <h2>7. Cookies and Tracking</h2>
        <p>We use cookies and similar technologies to:</p>
        <ul>
          <li>
            <strong>Essential Cookies:</strong> Enable core functionality (authentication, 
            session management, preferences). These are strictly necessary and cannot be disabled.
          </li>
          <li>
            <strong>Analytics Cookies:</strong> Understand how users interact with the Service. 
            We may use privacy-focused analytics tools.
          </li>
          <li>
            <strong>Performance Cookies:</strong> Monitor and improve Service performance.
          </li>
        </ul>
        <p>
          You can control cookies through your browser settings. Note that disabling certain cookies 
          may affect the functionality of the Service.
        </p>
      </section>

      {/* Section 8 */}
      <section className="mb-10">
        <h2>8. International Data Transfers</h2>
        <p>
          Your data may be processed on servers located outside of Algeria, including in the 
          United States (Supabase, Vercel) and the European Union. We ensure that any 
          international transfers comply with applicable data protection laws and that appropriate 
          safeguards are in place.
        </p>
      </section>

      {/* Section 9 */}
      <section className="mb-10">
        <h2>9. Children&apos;s Privacy</h2>
        <p>
          The Service is not intended for children under 16 years of age. We do not knowingly 
          collect personal information from children. If you believe we have collected data from 
          a child, please contact us immediately at{' '}
          <a href="mailto:privacy@sidraos.com">privacy@sidraos.com</a>.
        </p>
      </section>

      {/* Section 10 */}
      <section className="mb-10">
        <h2>10. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We will notify you of any material 
          changes by posting the new policy on this page and updating the &quot;Last updated&quot; date. 
          For significant changes, we may also send you an email notification.
        </p>
        <p>
          We encourage you to review this policy periodically.
        </p>
      </section>

      {/* Contact Section */}
      <section className="mt-12 rounded-xl border border-neutral-200 bg-neutral-50 p-6 not-prose">
        <h3 className="text-lg font-semibold text-neutral-900">Contact Us</h3>
        <p className="mt-2 text-neutral-600">
          If you have any questions about this Privacy Policy or our data practices, please contact us:
        </p>
        <ul className="mt-4 space-y-2 text-neutral-600">
          <li>
            <strong>Email:</strong>{' '}
            <a href="mailto:privacy@sidraos.com" className="text-emerald-600 hover:underline">
              privacy@sidraos.com
            </a>
          </li>
          <li>
            <strong>Data Controller:</strong> {businessName} — Auto-Entrepreneur
          </li>
          <li>
            <strong>Location:</strong> {businessLocation}
          </li>
        </ul>
      </section>
    </article>
  );
}
