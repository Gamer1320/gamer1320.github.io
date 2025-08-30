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
              href="mailto:aircanadarougevirtual@gmail.com"
              className="text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              aircanadarougevirtual@gmail.com
            </a>
          </li>
          <li>
            <a
              href="mailto:kylar@pfallegiantair.online"
              className="text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              kylar@pfallegiantair.online
            </a>
          </li>
        </ul>
      </div>

      {/* Connect */}
      <div>
        <h4 className="text-lg font-semibold mb-4">Connect</h4>
        <div className="flex space-x-4 text-2xl">
          <a href="https://discord.gg/nxseHHfrRH" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
            <FaDiscord />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
            <FaInstagram />
          </a>
          <a href="https://www.youtube.com/@AirCanadaRougeVirtual-1312" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
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
            href="mailto:iceit@pfallegiantair.online"
            className="text-primary hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            iceit@pfallegiantair.online
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
      &copy; {new Date().getFullYear()} Air Canada Rouge Virtual. This is a virtual community and is not affiliated with Air Canada or Air Canada Rouge.

    </div>
  </footer>
)

export default Footer
