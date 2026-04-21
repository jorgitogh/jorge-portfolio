import { PropsWithChildren } from "react";
import "./styles/Landing.css";
import { config } from "../config";

const Landing = ({ children }: PropsWithChildren) => {
  const nameParts = config.developer.fullName.split(" ");
  const firstName = nameParts[0] || config.developer.name;
  const lastName = nameParts.slice(1).join(" ") || "";
  const [primaryRole, secondaryRole] = config.developer.roleLines;
  const roleArticle = /^[aeiou]/i.test(primaryRole ?? "") ? "An" : "A";

  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>{config.developer.greeting}</h2>
            <h1>
              {firstName.toUpperCase()}
              {" "}
              <br />
              {lastName && <span>{lastName.toUpperCase()}</span>}
            </h1>
          </div>
          <div className="landing-info">
            <h3>{roleArticle}</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">{primaryRole}</div>
            </h2>
            {secondaryRole && (
              <h2>
                <div className="landing-h2-info">{secondaryRole}</div>
              </h2>
            )}
          </div>
          <div className="mobile-photo">
            <img
              src={config.developer.photo.transparent}
              alt={config.developer.photo.alt}
            />
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
