import loading from './loading.gif'

const Spinner = () =>{
    return(
        <div className="container my-3 text-center ">
            <img className="my-3"   src={loading} alt="loading"/> 
        </div>
    )
}

export default Spinner;