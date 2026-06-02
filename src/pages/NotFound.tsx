import Button from "../components/Button";

const NotFound : React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col gap-6 items-center justify-center text-center px-6">
            <div>
                <h1 className="text-8xl font-extrabold text-red-500">404</h1>
                <h2 className="text-2xl mt-4 font-semibold text-gray-800">Page Not Found!</h2>
                <p className="text-gray-500 mt-2 max-w-md">
                    The page you’re looking for doesn’t exist or has been moved.
                </p>
            </div>

            <div>
                <Button
                    to={'/'}
                    variant="danger"
                >
                    Go Back Home
                </Button>
            </div>
        </div>
    );
};

export default NotFound;
