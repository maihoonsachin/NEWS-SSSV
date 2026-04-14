import React,{Component} from 'react'

export class NewsItem extends Component{
    render(){
        let {title, description,imageUrl,newsId} = this.props;
        return(
            <div className="my-3">
                <div className="card">
                    <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left: '90%',zIndex:'1'}}>
                            {this.props.source}
                    </span>
                    <img src={imageUrl}  className="card-img-top" alt="..." onError={(e) => {
                        e.target.onerror = null; // Prevents infinite loops if default image also fails
                            e.target.src = "https://ychef.files.bbci.co.uk/624x351/p0nbvgvn.jpg";
                        }}/> 
                    <div className="card-body">
                        
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}...</p>
                        <a href={newsId} target="blank" className="btn btn-sm btn-primary">Read More</a>
                        <p className="card-text"><small className="text-body-secondary">{`By ${(this.props.author)? this.props.author : 'Unknown'} on :${new Date(this.props.publishedAt).toGMTString()}`}</small></p>

                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem;

// "https://newsdata.io/api/1/latest? apikey=pub_a7f767420ef3414cbc11d5b4878069fe";
// https://newsapi.ai/api/v1/article/getArticles?apiKey=fce03cfa-0243-493d-bfbd-3b5416617913&keyword=technology&lang=eng&maxItems=10