import { Link } from "react-router-dom";
import { ChevronUp, Compass } from "lucide-react";

export function CinematicFooter() {
  return <footer className="grain-footer">
    <div className="grain-footer-top">
      <div>
        <Link to="/" className="grain-brand"><Compass size={24} strokeWidth={1.6} /><span>GRAIN</span></Link>
        <p>Spatial evidence for a connected region.<br />Agrifood systems, climate policy, and Asia-Pacific economies.</p>
      </div>
      <nav className="grain-footer-links" aria-label="Footer navigation">
        <Link to="/clustering">5-Cluster map</Link><Link to="/spasial">Spatial econometrics</Link>
        <Link to="/simulator">Policy simulator</Link><Link to="/forecasting">Methane forecasts</Link>
        <Link to="/metodologi">Methodology documentation</Link>
      </nav>
    </div>
    <div className="grain-footer-bottom">
      <span>© 2026 TEAM IRIS · RASIO 10.0</span>
      <div><Link to="/clustering">Open workspace</Link><button type="button" className="icon-button" aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" })}><ChevronUp size={19} /></button></div>
    </div>
  </footer>;
}
export default CinematicFooter;
