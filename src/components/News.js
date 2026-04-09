import React , {Component} from 'react'
import NewsItem from './NewsItem';

export class News extends Component{

    constructor(){
        super();
        // console.log ("Hello I am a constructor from News component");
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
    }

    async componentDidMount(){
        // console.log ("Hello I am a componentDidMount from News component");
        let url = "https://newsapi.org/v2/top-headlines?country=us&in&apiKey=62bc2cd225ec4699a93063f1e648a062&page=1";
        let data = await fetch(url);
        let parsedData = await data.json();
        // console.log(parsedData); 

        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults
        });
    }

    handlePrevChange = async() => {
        console.log("Previous");
        let url = `https://newsapi.org/v2/top-headlines?country=us&in&apiKey=62bc2cd225ec4699a93063f1e648a062&page=${this.state.page - 1}&pageSize=20`;
        let data = await fetch(url);
        let parsedData = await data.json();
       
        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles
        })

    }

    handleNextChange = async() => {
        console.log("Next");

        if(this.state.page  < Math.ceil(this.state.totalResults/20)){
            let url = `https://newsapi.org/v2/top-headlines?country=us&in&apiKey=62bc2cd225ec4699a93063f1e648a062&page=${this.state.page + 1}&pageSize=20`;
            let data = await fetch(url);
            let parsedData = await data.json();
        
            this.setState({
                page: this.state.page + 1,
                articles: parsedData.articles
            })
        }
    }



    render(){
        // console.log("Hello I am a render from News component");
        return(
            <div className="container my-3 "> 
                <h2>NEWS-SSSV - Top Headlines</h2>
                
                <div className="row" >
                    {this.state.articles.map((element) => {
                        return <div className="col-md-4" key={element.url}>
                        <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""}
                         imageUrl={element.urlToImage ? element.urlToImage : "https://ychef.files.bbci.co.uk/624x351/p0nbvgvn.jpg"}
                          newsId={element.url} />
                        </div> 
                    })}
                </div>

                <div className = "container my-3  d-flex justify-content-between"> 
                    <button disabled = {this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevChange}>&larr; Previous</button>
                    <button  type="button" className="btn btn-dark" onClick={this.handleNextChange}>Next &rarr;</button>

                </div>
            </div>
        )
    }
}

export default News;