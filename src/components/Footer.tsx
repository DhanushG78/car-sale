import Link from "next/link";
import { Car, Globe, MessageSquare, Mail, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Car className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-text">
                Auto<span className="gradient-text">Bazaar</span>
              </span>
            </Link>
            <p className="text-sm text-text-muted leading-relaxed">
              Find your perfect used car from thousands of verified listings.
              Buy and sell with confidence.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-text uppercase tracking-wider">
              Quick Links
            </h4>
            <div className="flex flex-col gap-2">
              {[
                { href: "/marketplace", label: "Browse Cars" },
                { href: "/sell", label: "Sell Your Car" },
                { href: "/wishlist", label: "Wishlist" },
                { href: "/profile", label: "Profile" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-text-secondary hover:text-primary-hover transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-text uppercase tracking-wider">
              Categories
            </h4>
            <div className="flex flex-col gap-2">
              {["Sedan", "SUV", "Hatchback", "Coupe", "Electric"].map((c) => (
                <Link
                  key={c}
                  href={`/marketplace?category=${c.toLowerCase()}`}
                  className="text-sm text-text-secondary hover:text-primary-hover transition-colors"
                >
                  {c}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-text uppercase tracking-wider">
              Connect
            </h4>
            <div className="flex items-center gap-3">
              {[Globe, MessageSquare, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-xl bg-background border border-border flex items-center justify-center text-text-secondary hover:text-primary hover:border-primary/40 transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
            <p className="text-sm text-text-muted">
              support@autobazaar.com
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-muted">
            © 2025 AutoBazaar. All rights reserved.
          </p>
          <p className="flex items-center gap-1 text-xs text-text-muted">
            Made with <Heart className="w-3 h-3 text-danger fill-danger" /> for car enthusiasts
          </p>
        </div>
      </div>
    </footer>
  );
}
