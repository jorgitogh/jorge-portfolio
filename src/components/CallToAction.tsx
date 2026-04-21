import { Link } from "react-router-dom";
import { config } from "../config";
import "./styles/CallToAction.css";

const CallToAction = () => {
  return (
    <div className="cta-section">
      <div className="cta-buttons">
        <Link
          to={config.callToAction.playHref}
          className="cta-btn cta-btn-play"
          data-cursor="disable"
        >
          {config.callToAction.playLabel}
        </Link>

        <a
          href={config.callToAction.contactHref}
          target="_blank"
          rel="noopener noreferrer"
          className="cta-btn cta-btn-hire"
          data-cursor="disable"
        >
          {config.callToAction.contactLabel}
        </a>
      </div>
    </div>
  );
};

export default CallToAction;
