import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

// export class News extends Component {
const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  let capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // constructor(props) {
  //   super(props);
  //
  // }

  const updateNews = async ()=>{
    props.setProgress(0);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    // this.setState({
    //   loading: true,
    // });
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parseData = await data.json();
    props.setProgress(60);
    setArticles(parseData.articles);
    setTotalResults(parseData.totalResults);
    setLoading(false);
    // this.setState({
    //   articles: parseData.articles,
    //   totalResults: parseData.totalResults,
    //   loading: false,
    // });
    props.setProgress(100);
  }

  useEffect(()=>{
    document.title = `${capitalizeFirstLetter(
        props.category
    )} - InfoNews`;
    updateNews();
  }, [])

  // async componentDidMount() {
  // }

  // const handleNextClick = async () => {
  //   // this.setState({
  //   //   page: this.state.page + 1,
  //   // });
  //   setPage(page+1);
  //   updateNews();
  // };
  //
  // const handlePreviousClick = async () => {
  //   // this.setState({
  //   //   page: this.state.page - 1,
  //   // });
  //   setPage(page-1);
  //   updateNews();
  // };

  const fetchMoreData = async () => {
    // this.setState({ page: this.state.page + 1 });
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page+1);
    let data = await fetch(url);
    let parseData = await data.json();
    // this.setState({
    //   articles: this.state.articles.concat(parseData.articles),
    //   totalResults: parseData.totalResults,
    // });
    setArticles(articles.concat(parseData.articles));
    setTotalResults(parseData.totalResults);
  };

  // render() {
    return (
      <>
        <h2 className="text-center" style={{ margin: "35px", marginTop: "90px" }}>
          InfoNews - Top {capitalizeFirstLetter(props.category)}{" "}
          Headlines
        </h2>
        {/*{this.state.loading &&<Spinner />}*/}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={
            <h6>
              <Spinner />
            </h6>
          }
          >
          <div className="container">
            <div className="row">
              {articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewsItem
                      title={element.title ? element.title : ""}
                      description={
                        element.description ? element.description : ""
                      }
                      imageUrl={element.urlToImage}
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}> &larr; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}
      </>
    );
  // }
}

News.defaultProps = {
  country: "in",
  pageSize: 8,
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
