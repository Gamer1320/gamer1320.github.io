// src/pages/TermsPage.tsx
import React from 'react'
import { Link } from 'react-router-dom'

const TermsPage: React.FC = () => (
    <div className="max-w-3xl mx-auto py-12 px-4 space-y-6">
        <h1 className="text-3xl font-bold">Terms of Service</h1>

        {/* Basic ToS */}
        <p>
            Welcome to Allegiant Air Virtual. By accessing or using our website, you agree to be
            bound by these Terms of Service.
        </p>

        <h2 className="text-2xl font-semibold">1. Use of Site</h2>
        <p>
            You may use the site for lawful purposes only. You agree not to misuse or interfere
            with the security of the website.
        </p>

        <h2 className="text-2xl font-semibold">2. Intellectual Property</h2>
        <p>
            All content, logos, graphics, and software on this site are the property of
            Allegiant Air Virtual or its licensors and are protected by copyright laws.
        </p>

        <h2 className="text-2xl font-semibold">3. Limitation of Liability</h2>
        <p>
            We are not liable for any indirect, incidental, or consequential damages arising
            from your use of the site.
        </p>

        <h2 className="text-2xl font-semibold">4. Modifications</h2>
        <p>
            We reserve the right to modify these terms at any time. Continued use of the site
            constitutes acceptance of the updated terms.
        </p>

        <h2 className="text-2xl font-semibold">5. Contact</h2>
        <p>
            If you have any questions about these terms, please{' '}
            <Link to="/contact" className="text-primary hover:underline">
                contact us
            </Link>.
        </p>

        {/* Discord ToS & Community Guidelines */}
        <h1 className="text-3xl font-bold mt-12">Discord & Community Rules</h1>
        <p>
            As a member of our Discord server, you must also comply with:
        </p>
        <ul className="list-disc list-inside space-y-1">
            <li>
                <a
                    href="https://discord.com/terms"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                >
                    Discord’s Terms of Service
                </a>
            </li>
            <li>
                <a
                    href="https://discord.com/guidelines"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                >
                    Discord’s Community Guidelines
                </a>
            </li>
            <li>All QA Virtual Airline policies, SOPs, and operational standards.</li>
        </ul>

        {/* Your custom community rules */}
        <h2 className="text-2xl font-semibold mt-8">Community Rules</h2>
        <ol className="list-decimal list-inside space-y-4">
            <li>
                <strong>🗣️ Respectful Communication</strong><br />
                Professionalism is key—on the ground and in the air. Be respectful, polite, and
                constructive in all interactions. Harassment, hate speech, discrimination, or
                bullying will not be tolerated under any circumstances.
            </li>
            <li>
                <strong>🚫 No Spam or Disruptions</strong><br />
                Keep our channels clear for relevant and meaningful conversation. Do not spam
                messages, commands, or pings. Avoid flooding text or voice channels with off‑topic
                or repetitive content.
            </li>
            <li>
                <strong>🔐 Respect Member Privacy</strong><br />
                Do not share personal information (yours or others’) such as names, addresses,
                phone numbers, or emails. Do not request such information from other members.
            </li>
            <li>
                <strong>📘 Adhere to Policies</strong><br />
                You are expected to comply with Discord’s TOS/Guidelines and all ACRV policies.
            </li>
            <li>
                <strong>📰 Airline Advertisements</strong><br />
                You may share airline promotions only in the designated <code className="font-mono bg-gray-100 px-1 rounded">#public-ads</code>{' '}
                channel. Posting ads elsewhere may result in a warning.
            </li>
            <li>
                <strong>🗯️ Swearing</strong><br />
                Light‑hearted swearing is permitted. Excessive or disruptive swearing will earn a
                warning; hateful/discriminatory language will lead to immediate removal.
            </li>
            <li>
                <strong>⚠️ Accountability & Consequences</strong><br />
                Violations may result in a warning, mute/suspension, or removal from the server,
                depending on severity.
            </li>
            <li>
                <strong>🛠️ Reporting Issues</strong><br />
                To report inappropriate behavior or get help, open a ticket in{' '}
                <code className="font-mono bg-gray-100 px-1 rounded">#support</code> or contact <a href="Mailto:support@aircanadarougevirtual.com" target="_blank" className="text-primary hover:underline">support@aircanadarougevirtual.com</a>.
            </li>
        </ol>

        <p className="mt-8">
            Thank you for helping us maintain a professional, engaging, and inclusive community.
            Let’s take our virtual airline to new heights—together!
        </p>
        <div className="mt-8 text-center">
            <Link to="/" className="text-primary hover:underline">
                Back to Home
            </Link>
        </div>
    </div>

)

export default TermsPage
