import React, { Component } from 'react'
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export class News extends Component {

    static defaultProps = {
        country: 'us',
        pageSize: 8,
        category: 'general'
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

    constructor(props) {
        super(props);
        // console.log ("Hello I am a constructor from News component");
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
        document.title = `${this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)} - News-SSSV`;
    }

    async updateNews() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=62bc2cd225ec4699a93063f1e648a062&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        });

    }

    async componentDidMount() {
        this.updateNews();
    }

    handlePrevChange = async () => {
        this.setState({ page: this.state.page - 1 });
        this.updateNews();
    }

    handleNextChange = async () => {
        this.setState({ page: this.state.page + 1 });
        this.updateNews();
    }



    render() {
        // console.log("Hello I am a render from News component");
        return (
            <div className="container my-3 ">
                <h1 className="text-center" style={{ margin: "35px 0" }}>NEWS-SSSV - Top  
                    {" " +this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1) + " Headlines"}
                </h1>
                {this.state.loading && <Spinner />}
                <div className="row" >
                    {!this.state.loading && this.state.articles.map((element) => {
                        return <div className="col-md-4" key={element.url}>
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

                <div className="container my-3  d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevChange}>&larr; Previous</button>
                    <button disabled={this.state.page >= Math.ceil(this.state.totalResults / this.props.pageSize)}
                        type="button" className="btn btn-dark"
                        onClick={this.handleNextChange}>Next &rarr;</button>

                </div>
            </div>
        )
    }
}

export default News;