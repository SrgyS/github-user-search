import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

import { ErrorBlock } from './ErrorBlock.styles';

const Error = () => {
    const error = useRouteError() as Error;

    if (!isRouteErrorResponse(error)) {
        return null;
    }

    return (
        <ErrorBlock>
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
        </ErrorBlock>
    );
};

export default Error;
