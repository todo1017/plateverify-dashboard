import React from "react";

const TopCard =({ title, desc, value, color })=> {
  return (
    <div className="jr-card jr-card-full">
      <div className={`jr-fillchart bg-${color} jr-overlay-fillchart`}>
        <div className="jr-fillchart-content">
          <div className="card-title mb-4">
            {title}
          </div>
          <h2 className="mb-2 jr-fs-xl jr-font-weight-medium">
            {value}
          </h2>
          <p className="mb-0 jr-fs-sm">
            {desc}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TopCard;