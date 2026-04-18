import React,{useEffect,useState} from 'react'
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {

    const[articles,setArticles] = useState([]);
    const[loading,setLoading] = useState(false);
    const[page,setPage] = useState(1);
    const[totalResults,setTotalResults] = useState(0);

    // document.title = `${props.category.charAt(0).toUpperCase() + props.category.slice(1)} - News-SSSV`;

    const updateNews = async () => {
        // props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
      
        let data = await fetch(url);
        props.setProgress(50);
        let parsedData = await data.json();
        props.setProgress(70);

        setArticles(parsedData.articles || []);
        setTotalResults(parsedData.totalResults || 0);
        setLoading(false);

        props.setProgress(100);

    }

    useEffect(() => {
        updateNews();
        document.title = `${props.category.charAt(0).toUpperCase() + props.category.slice(1)} - News-SSSV`;

    },[]);

    const fetchMoreData = async () => {
        
        let nextPage = page + 1;
        
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${nextPage}&pageSize=${props.pageSize}`;
       
        let data = await fetch(url);
        let parsedData = await data.json();
        if(!parsedData.articles || parsedData.articles.length === 0){
            setTotalResults(articles.length);
            setLoading(false);
            return;
        }
        setPage(nextPage); 
        setArticles(articles.concat(parsedData.articles || []));
        setTotalResults(parsedData.totalResults || 0);
        setLoading(false);
    };



        // console.log("Hello I am a render from News component");
        return (
            <>
                <h1 className="text-center" style={{ margin: "35px 0" ,marginTop: "90px"}}>NEWS-SSSV - Top
                    {" " + props.category.charAt(0).toUpperCase() + props.category.slice(1) + " Headlines"}
                </h1>
                {loading && <Spinner />}
                <InfiniteScroll
                    dataLength={articles ?  articles.length : 0}
                    next={fetchMoreData}
                    hasMore={articles.length < totalResults}
                    loader={<Spinner />}>


                    <div className="container">

                    <div className="row" >
                        {articles.map((element,index) => {
                            return <div className="col-md-4" key={`${element.url}-${index}`}>
                                <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""}
                                    imageUrl={element.urlToImage ? element.urlToImage : "https://ychef.files.bbci.co.uk/624x351/p0nbvgvn.jpg"}
                                    newsId={element.url}
                                    publishedAt={element.publishedAt}
                                    author={element.author}
                                    source={element.source.name}
                                />
                            </div>
                        })}
                    </div>
                    </div> 
                </InfiniteScroll>
            </>
        )
}

News.defaultProps = {
    country: 'us',
    pageSize: 8,
    category: 'general'
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}


export default News;
