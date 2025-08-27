// src/components/Footer.tsx
import React from 'react'
import { Link } from 'react-router-dom'
import { FaDiscord, FaInstagram, FaYoutube} from 'react-icons/fa'

const Footer: React.FC = () => (
  <footer className="bg-gray-100 text-gray-700 pt-10 pb-6">
    <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">

      {/* Contact Us */}
      <div>
        <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
        <ul className="space-y-2 text-sm">
          <li>
            <a
              href="mailto:support@qatarairwaysvirtual.com"
              className="text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              support@qatarairwaysvirtual.com
            </a>
          </li>
          <li>
            <a
              href="mailto:founder@qatarairwaysvirtual.com"
              className="text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              founder@qatarairwaysvirtual.com
            </a>
          </li>
        </ul>
      </div>

      {/* Connect */}
      <div>
        <h4 className="text-lg font-semibold mb-4">Connect</h4>
        <div className="flex space-x-4 text-2xl">
          <a href="https://discord.com/invite/yKt53cWacV" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
            <FaDiscord />
          </a>
          <a href="https://www.instagram.com/qavirtual.pf" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
            <FaInstagram />
          </a>
          <a href="https://www.youtube.com/@qavirtualpf" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
            <FaYoutube />
          </a>
        </div>
      </div>

      {/* Bug Reports */}
      <div>
        <h4 className="text-lg font-semibold mb-4">Bug Reports</h4>
        <p className="text-sm">
          Found an issue? Please let us know:&nbsp;
          <a
            href="mailto:iceit@qatarairwaysvirtual.com"
            className="text-primary hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            iceit@qatarairwaysvirtual.com
          </a>
        </p>
      </div>

      {/* Legal */}
      <div>
        <h4 className="text-lg font-semibold mb-4">Legal</h4>
        <ul className="space-y-2 text-sm">
          <li>
            <Link to="/terms" className="hover:underline">
              Terms of Service
            </Link>
          </li>
          <li>
            <Link to="/privacy" className="hover:underline">
              Privacy Policy
            </Link>
          </li>
        </ul>
      </div>
    </div>

    {/* Bottom bar */}
    <div className="mt-8 border-t border-gray-200 pt-4 text-center text-xs text-gray-500">
      &copy; {new Date().getFullYear()} Qatar Airways Virtual. All rights reserved. Not affiliated with Qatar Airways C.S.C.
    </div>
  </footer>
)

export default Footer
