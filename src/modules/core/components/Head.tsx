import Helmet from 'react-helmet'
import React from 'react'

const Head = () => {
    return (
        <Helmet>
            <title>Logic gate simulator</title>

            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
            />
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/icon?family=Material+Icons"
            />
            <meta
                name="viewport"
                content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
            />

            <link
                href="https://fonts.googleapis.com/css?family=Righteous&display=swap"
                rel="stylesheet"
            />

            <link rel="icon" href={require('../../../assets/favicon.ico')} />
        </Helmet>
    )
}

export default Head
