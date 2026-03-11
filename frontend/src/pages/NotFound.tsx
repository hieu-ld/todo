



const NotFound = () => {
    return (
        <>
            <div className="place-items-center text-center">
                <img 
                    src="404.png" 
                    alt="404"
                />

                <a href="/" className="inline-block p-6 rounded-2xl text-lg font-medium bg-(--bg-button) hover:bg-(--bg-button-hover) transition-colors duration-300 text-(--text) outline-0">
                    Quay về trang chủ
                </a>
            </div>
        </>
    );
};

export default NotFound;
