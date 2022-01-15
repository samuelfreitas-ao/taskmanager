import React from 'react'; // importação comum em todos arquivo do react
import ReactDOM from 'react-dom'; //react-dom indica que está a ser utilizado na web

import MyRoutes from './routes';


// JSX (JavaScript XML): Sintaxe do XML dentro do js
function App() {

    return (
        <>
            <MyRoutes />
        </>
    );
}
ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('app')
);
