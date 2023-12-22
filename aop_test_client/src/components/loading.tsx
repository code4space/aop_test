import '@/assets/css/loading.css'

const LoadingUI = () => {
    return (
        <div id="loading" data-testid="loading">
            <div className="spinner">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <p>Loading ...</p>
        </div>
    )
}

export default LoadingUI