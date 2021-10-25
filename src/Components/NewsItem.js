import React from "react";

const NewsItem = (props) => {
  let { title, description, imgUrl, newsUrl, author, date, name } = props;
  return (
    <div>
      <div className="card">
        <img src={imgUrl} className="card-img-top" alt="..." />
        <div className="card-body">
          <span
            className="position-absolute top-0 translate-middle badge rounded-pill bg-danger"
            style={{ left: "91%", zIndex: "1" }}
          >
            {name}
          </span>
          <p className="card-text">
            <small className="text-muted">
              Author: {!author ? "unknown" : author}
            </small>
          </p>
          <h5 className="card-title">{title}...</h5>
          <p className="card-text">{description}...</p>
          <p className="card-text">
            <small className="text-muted">
              Published On: {new Date(date).toGMTString()}
            </small>
          </p>
          <a
            href={newsUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-sm btn-primary"
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
