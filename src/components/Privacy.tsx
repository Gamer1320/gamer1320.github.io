// src/pages/Privacy.tsx
import React from 'react'
import { Link } from 'react-router-dom'

const Privacy: React.FC = () => (
    <main className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
        <p className="mb-6 text-gray-700">
            Last updated: {new Date().toLocaleDateString()}
        </p>

        <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">1. Information We Collect</h2>
            <p className="mb-2 text-gray-700">
                We only collect the information necessary to authenticate you via Discord:
            </p>
            <ul className="list-disc list-inside mb-2 text-gray-700">
                <li>Your Discord user ID</li>
                <li>Your Discord Username (e.g., iceit)</li>
                <li>Your Discord avatar hash</li>
            </ul>
            <p className="text-gray-700">
                No other personal data—such as messages, friends list, or server memberships—is stored or accessed by our application.
            </p>
        </section>

        <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">2. How We Use Your Data</h2>
            <p className="text-gray-700 mb-2">
                We use your Discord authentication only to:
            </p>
            <ul className="list-disc list-inside mb-2 text-gray-700">
                <li>Verify your identity when you log in.</li>
                <li>Display your username, avatar, and roles within our virtual airline.</li>
            </ul>
            <p className="text-gray-700">
                We do not use your data for any marketing, analytics, or other secondary purposes.
            </p>
        </section>

        <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">3. Data Sharing and Disclosure</h2>
            <p className="text-gray-700">
                We do <strong>not</strong> share, sell, rent, or trade your Discord information with any third parties. Your data is stored securely and is only used for authentication within this site.
            </p>
        </section>

        <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">4. Data Security</h2>
            <p className="mb-2 text-gray-700">
                We take reasonable measures to protect your data from unauthorized access or disclosure.  However, no method of transmission or storage is 100% secure. By using this site, you acknowledge that we cannot guarantee absolute security.
            </p>
        </section>

        <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">5. Data Retention</h2>
            <p className="text-gray-700">
                We retain your Discord authentication data only as long as necessary to provide the service. If you log out, your session data is deleted. If you have concerns about your data or would like your data deleted, please <Link to="/privacy#contact" className="text-primary hover:underline">contact us</Link>.
            </p>
        </section>

        <section id="changes" className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">6. Changes to This Policy</h2>
            <p className="text-gray-700">
                We may update this Privacy Policy at any time. Any changes will be posted here with a “Last updated” date. Your continued use of the site after changes constitute your acceptance of the revised policy.
            </p>
        </section>

        <section id="contact" className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">7. Contact Us</h2>
            <p className="text-gray-700">
                If you have questions about this policy or your data, please reach out to us at{' '}
                <a href="mailto:privacy@qatarairwaysvirtual.com" className="text-primary hover:underline">
                    privacy@qatarairwaysvirtual.com
                </a>.
            </p>
        </section>

        <div className="mt-8 text-center">
            <Link to="/" className="text-primary hover:underline">
                Back to Home
            </Link>
        </div>
    </main>
)

export default Privacy
