import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, ArrowRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-primary-light via-secondary-light to-primary-DEFAULT dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 text-gray-800 dark:text-gray-200 shadow-inner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-DEFAULT to-secondary-DEFAULT dark:from-primary-light dark:to-secondary-light">Notify</h3>
            <p className="text-sm">Discover and join amazing events happening around you.</p>
            <div className="flex space-x-4">
              <SocialIcon Icon={Facebook} href="https://facebook.com" label="Facebook" />
              <SocialIcon Icon={Twitter} href="https://twitter.com" label="Twitter" />
              <SocialIcon Icon={Instagram} href="https://instagram.com" label="Instagram" />
              <SocialIcon Icon={Linkedin} href="https://linkedin.com" label="LinkedIn" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-primary-DEFAULT dark:text-primary-light">Quick Links</h4>
            <ul className="space-y-2">
              <FooterLink href="/about" text="About Us" />
              <FooterLink href="/events" text="All Events" />
              <FooterLink href="/categories" text="Categories" />
              <FooterLink href="/contact" text="Contact Us" />
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-primary-DEFAULT dark:text-primary-light">Support</h4>
            <ul className="space-y-2">
              <FooterLink href="/faq" text="FAQ" />
              <FooterLink href="/privacy" text="Privacy Policy" />
              <FooterLink href="/terms" text="Terms of Service" />
              <FooterLink href="/help" text="Help Center" />
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-primary-DEFAULT dark:text-primary-light">Stay Updated</h4>
            <p className="text-sm mb-4">Subscribe to our newsletter for the latest events and offers.</p>
            <form className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow px-4 py-2 rounded-l-lg bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary-DEFAULT dark:focus:ring-primary-light"
              />
              <button
                type="submit"
                className="text-dark bg-gradient-to-r from-primary-DEFAULT to-secondary-DEFAULT hover:from-primary-dark hover:to-secondary-dark dark:from-primary-light dark:to-secondary-light dark:hover:from-primary-DEFAULT dark:hover:to-secondary-DEFAULT text-white dark:text-light px-4 py-2 rounded-r-lg transition duration-300 flex items-center"
              >
                <Mail className="w-5 h-5 mr-2 text-black dark:text-light" />
                <ArrowRight className="w-5 h-5 text-black dark:text-light" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-center text-sm">
            © {new Date().getFullYear()} Notify. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

const SocialIcon = ({ Icon, href, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-gray-600 dark:text-gray-400 hover:text-primary-DEFAULT dark:hover:text-primary-light transition duration-300 transform hover:scale-110"
    aria-label={label}
  >
    <Icon className="w-6 h-6" />
  </a>
);

const FooterLink = ({ href, text }) => (
  <li>
    <a
      href={href}
      className="text-sm hover:text-primary-DEFAULT dark:hover:text-primary-light transition duration-300 hover:translate-x-1 inline-block"
    >
      {text}
    </a>
  </li>
);

export default Footer;
