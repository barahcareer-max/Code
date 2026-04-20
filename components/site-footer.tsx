import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-navy-900 text-navy-100 mt-16">
      <div className="container py-12 grid gap-10 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="grid h-8 w-8 place-items-center rounded-md bg-accent text-accent-foreground font-bold">
              CV
            </div>
            <span className="text-lg font-semibold text-white">Clearview Glazing</span>
          </div>
          <p className="text-sm text-navy-200">
            Family-run double glazing specialists serving the South East since 1998.
            10-year guarantee on all installations.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-white mb-3">Products</h4>
          <ul className="space-y-2 text-sm">
            <li><Link className="hover:text-accent" href="/windows">Windows</Link></li>
            <li><Link className="hover:text-accent" href="/doors">Doors</Link></li>
            <li><Link className="hover:text-accent" href="/conservatories">Conservatories</Link></li>
            <li><Link className="hover:text-accent" href="/gallery">Gallery</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-white mb-3">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><Link className="hover:text-accent" href="/about">About Us</Link></li>
            <li><Link className="hover:text-accent" href="/quote">Get a Quote</Link></li>
            <li><Link className="hover:text-accent" href="/contact">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-white mb-3">Get in touch</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> 0800 123 4567</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> hello@clearview.example</li>
            <li className="flex items-start gap-2">
              <MapPin className="h-4 w-4 mt-0.5" />
              Unit 4, Glasswright Park,<br />Maidstone, Kent ME16 0AA
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-navy-800">
        <div className="container py-4 text-xs text-navy-300 flex flex-col md:flex-row justify-between gap-2">
          <p>&copy; {year} Clearview Glazing Ltd. Registered in England No. 04567890.</p>
          <p>FENSA Registered &middot; CHAS Accredited &middot; TrustMark Approved</p>
        </div>
      </div>
    </footer>
  );
}
