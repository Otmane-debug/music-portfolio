export default function PrivacyPage() {
  return (
    <div className="space-y-10 py-14">
      <div className="space-y-3">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
          Legal
        </p>
        <h1 className="max-w-xl font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
          Privacy Policy
        </h1>
        <p className="text-sm text-foreground-dim">Last updated: September 26, 2026</p>
      </div>

      <div className="max-w-2xl space-y-8 text-sm leading-relaxed text-foreground-dim">
        <p>
          Sailor VIII Music (&quot;we&quot;, &quot;us&quot;) is operated from France. This
          policy explains what personal data we collect through
          music.sailor-viii.com (the &quot;Site&quot;), why we collect it, who we
          share it with, and the rights you have under the EU/French General
          Data Protection Regulation (GDPR) and, where applicable, the Swiss
          Federal Act on Data Protection (FADP).
        </p>

        <section className="space-y-3">
          <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-foreground">
            1. Data we collect
          </h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <span className="text-foreground">Account data</span> — email
              address, and password (stored encrypted) or Google account
              identifier if you sign in with Google.
            </li>
            <li>
              <span className="text-foreground">Order data</span> — for
              digital track purchases: which tracks you bought. For shop
              (merch) orders: product, size, quantity, price, and the
              shipping address, name, and email you enter at checkout.
            </li>
            <li>
              <span className="text-foreground">Payment data</span> — we
              never see or store your card details. Payments are processed
              entirely by Stripe (see below).
            </li>
            <li>
              <span className="text-foreground">Technical data</span> — a
              session cookie set by our authentication provider (Supabase)
              to keep you signed in. We do not use advertising or analytics
              cookies, and we do not track you across other websites.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-foreground">
            2. Why we process your data
          </h2>
          <p>We use your data only to:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>create and manage your account and let you sign in;</li>
            <li>
              process payments and deliver what you bought — unlock a track
              download, or print and ship a physical order;
            </li>
            <li>send you transactional emails about your orders (confirmed,
              in production, shipped, delivered) and account-related emails
              (sign-up confirmation, sign-in link, password reset);</li>
            <li>
              detect and prevent fraud, and comply with our legal and
              accounting obligations.
            </li>
          </ul>
          <p>
            The legal basis for this processing is the performance of a
            contract with you (creating your account, fulfilling an order)
            and, for fraud prevention and legal compliance, our legitimate
            interest or a legal obligation. We do not send marketing emails
            and do not process your data for any purpose beyond what is
            described here.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-foreground">
            3. Who we share it with
          </h2>
          <p>
            We use a small number of service providers (&quot;processors&quot;) to
            run the Site. Each only receives the data it needs to do its
            job:
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <span className="text-foreground">Stripe</span> (payment
              processing) — receives your payment details directly; we
              never see your card number.
            </li>
            <li>
              <span className="text-foreground">Gelato</span> (print-on-demand
              production and shipping) — receives your name, shipping
              address, and email for merch orders only, so they can print
              and ship your order.
            </li>
            <li>
              <span className="text-foreground">Supabase</span> (database and
              authentication) — stores your account and order records.
            </li>
            <li>
              <span className="text-foreground">Resend</span> (transactional
              email) — sends the order and account emails described above.
            </li>
            <li>
              <span className="text-foreground">Google</span> — only if you
              choose &quot;Continue with Google&quot; to sign in.
            </li>
          </ul>
          <p>
            We never sell your personal data, and we don&apos;t share it with
            anyone for their own marketing purposes.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-foreground">
            4. Where merch orders ship
          </h2>
          <p>
            Physical products are printed and shipped from France to France,
            Belgium, Switzerland, Luxembourg, and Monaco. Some of our service
            providers above may process data on servers located outside the
            EU/Switzerland; where that happens, they do so under recognized
            safeguards such as the EU Standard Contractual Clauses.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-foreground">
            5. How long we keep it
          </h2>
          <p>
            We keep account and order data for as long as your account is
            active, plus any additional period required by French
            accounting and tax law (generally up to 10 years for invoicing
            records). If you delete your account, we delete or anonymize
            data that we are not legally required to retain.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-foreground">
            6. Your rights
          </h2>
          <p>Under the GDPR, you have the right to:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>access the personal data we hold about you;</li>
            <li>ask us to correct inaccurate data;</li>
            <li>ask us to delete your data (&quot;right to be forgotten&quot;);</li>
            <li>ask us to restrict or object to certain processing;</li>
            <li>receive your data in a portable format.</li>
          </ul>
          <p>
            To exercise any of these rights, contact us at{" "}
            <a
              href="mailto:viiisailor82@gmail.com"
              className="text-accent underline hover:opacity-80"
            >
              viiisailor82@gmail.com
            </a>
            . If you&apos;re not satisfied with our response, you have the
            right to lodge a complaint with the French data protection
            authority (
            <a
              href="https://www.cnil.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline hover:opacity-80"
            >
              CNIL
            </a>
            ), or your local supervisory authority.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-foreground">
            7. Children
          </h2>
          <p>
            The Site is not directed at children, and we do not knowingly
            collect data from anyone under 16.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-foreground">
            8. Changes to this policy
          </h2>
          <p>
            We may update this policy from time to time; the date at the top
            of this page reflects the latest revision.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-foreground">
            9. Contact
          </h2>
          <p>
            Questions about this policy or your data? Email{" "}
            <a
              href="mailto:viiisailor82@gmail.com"
              className="text-accent underline hover:opacity-80"
            >
              viiisailor82@gmail.com
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
