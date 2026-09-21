import { Link } from "@tanstack/react-router";
import { Landmark, ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-card">
      <div className="container-page grid gap-8 py-10 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Landmark className="h-4 w-4" />
            </span>
            <span className="font-display text-lg font-semibold">CivicSeva</span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            A unified navigator that helps citizens discover the right government service without
            knowing the department or exact service name.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Citizen Services</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/services" className="hover:text-foreground">All Services</Link></li>
            <li><Link to="/assistant" className="hover:text-foreground">AI Assistant</Link></li>
            <li><Link to="/centers" className="hover:text-foreground">Find Service Centre</Link></li>
            <li><Link to="/track" className="hover:text-foreground">Track Application</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Official Sources</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><a href="https://services.india.gov.in/" className="hover:text-foreground" target="_blank" rel="noreferrer">National Services Portal</a></li>
            <li><a href="https://uidai.gov.in/" className="hover:text-foreground" target="_blank" rel="noreferrer">UIDAI</a></li>
            <li><a href="https://crsorgi.gov.in/" className="hover:text-foreground" target="_blank" rel="noreferrer">Civil Registration System</a></li>
            <li><a href="https://nsap.nic.in/" className="hover:text-foreground" target="_blank" rel="noreferrer">NSAP Pensions</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Trust &amp; Transparency</h3>
          <p className="mt-3 flex items-start gap-2 text-sm text-muted-foreground">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
            CivicSeva does not collect documents or payments. Applications are always completed on
            the official government portal.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">Helpline: 1800-000-CIVIC (toll free)</p>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-page flex flex-col gap-1 py-4 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            Demonstration prototype. Service details are sample data for illustration and must be
            confirmed with the official source.
          </p>
          <p>Accessibility · Privacy Policy · Terms of Use</p>
        </div>
      </div>
    </footer>
  );
}
