import React from "react";

// export class NewsItem extends Component {
//   render() {

const NewsItem = (props) => {

    let { title, description, imageUrl, newsUrl, author, date, source } = props;
    // console.log(title)
    return (
      <div className="my-3">
        <div className="card">
            <div style={{display: 'flex', right:0, justifyContent: 'flex-end', position: 'absolute' }}>
                <span className="badge rounded-pill bg-danger">
                      {source}
                      <span className="visually-hidden">unread messages</span>
                    </span>
            </div>
          <img
            src={
              !imageUrl
                ? "https://images.cointelegraph.com/cdn-cgi/image/format=auto,onerror=redirect,quality=90,width=1200/https://s3.cointelegraph.com/uploads/2022-12/95e229ae-f04d-4523-98c3-89086a62808f.jpg"
                : imageUrl
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>{" "}
            <p className="card-text">{description}</p>
            <p className="card-text">
              <small className="text-muted">
                By {author ? author : "Unknown"} on{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>
            <a
              href={newsUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-sm btn-primary"
            >
              Read more
            </a>
          </div>
        </div>
      </div>
    );
  // }
}

export default NewsItem;
