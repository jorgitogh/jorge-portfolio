import { Link } from "react-router-dom";
import { config } from "../config";
import "./MyWorks.css";

const MyWorks = () => {
  return (
    <div className="myworks-page">
      <div className="myworks-header">
        <Link to="/" className="back-button" data-cursor="disable">
          {config.navigation.backHome}
        </Link>
        <h1>
          {config.sections.allWorksLead} <span>{config.sections.allWorksAccent}</span>
        </h1>
        <p>{config.sections.allWorksDescription}</p>
      </div>

      <div className="myworks-grid">
        {config.projects.map((project, index) => {
          const content = (
            <>
              <div className="myworks-card-number">0{index + 1}</div>
              <div className="myworks-card-image">
                <img src={project.image} alt={project.title} />
              </div>
              <div className="myworks-card-info">
                <h3>{project.title}</h3>
                <p className="myworks-card-category">{project.category}</p>
                <p className="myworks-card-description">{project.description}</p>
                <p className="myworks-card-tech">{project.technologies}</p>
              </div>
            </>
          );

          if (project.link) {
            return (
              <a
                className="myworks-card"
                key={project.id}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="disable"
              >
                {content}
              </a>
            );
          }

          return (
            <div className="myworks-card" key={project.id} data-cursor="disable">
              {content}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyWorks;
