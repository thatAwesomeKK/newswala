import React, {useEffect, useState} from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const updateNews = async ()=>{
    props.setProgress(10)
    setLoading(true)
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    setLoading(false)
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    props.setProgress(100)
  }

  // const handlePreviousClick = async () => {
  //   await this.setState({
  //     page: page - 1,
  //   });
  //   this.updateNews();
  // };

  // const handleNextClick = async () => {
  //   if (
  //     page + 1 >
  //     Math.ceil(totalResults / props.pageSize)
  //   ) {
  //   } else {
  //     await this.setState({
  //       page: page + 1,
  //     });
  //     this.updateNews();
  //   }
  // };

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - NewsWala`;
    updateNews()
  }, [])

  const fetchMoreData = async () => {
    await setPage(page + 1)
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();

    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
  }

    return (
      <>
        <h1 className="text-center my-3">Top Headlines!</h1>
        {loading && <Spinner />}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
        >
          <div className="container my-3">
            <div className="row">
              {articles.map((element) => {
                if (element.urlToImage === null) {
                  return console.log("null");
                } else {
                  return (
                    <div className="col-md-4" key={element.url}>
                      <NewsItem
                        title={element.title ? element.title.slice(0, 40) : ""}
                        description={
                          element.description
                            ? element.description.slice(0, 93)
                            : ""
                        }
                        imgUrl={element.urlToImage}
                        newsUrl={element.url}
                        author={element.author}
                        date={element.publishedAt}
                        name={element.source.name}
                      />
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
}

News.defaultProps = {
  country: "in",
  pageSize: 6,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};


export default News;
