import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

const Error = () => {
    const error = useRouteError() as Error;
    console.error(error);
    if (!isRouteErrorResponse(error)) {
        return null;
    }

    return (
        <div id='error-page'>
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    );
};

export default Error;