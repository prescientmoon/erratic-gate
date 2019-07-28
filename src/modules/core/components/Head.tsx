import Helmet from 'react-helmet'
import React from 'react'

const title = 'Logic gate simulator'
const description = 'A logic gate simulator made for infoeducatie 2019'
const url = 'https://logic-gate-simulator.herokuapp.com/'
const thumbail = require('../../../assets/favicon.ico')

const Head = () => {
    return (
        <Helmet>
            <title>{title}r</title>

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

            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={`${url}${thumbail}`} />
            <meta property="og:url" content={url} />

            <meta
                name="Description"
                content="A logic gate simulator made for infoeducatie 2019"
            />

            <link rel="icon" href={require('../../../assets/favicon.ico')} />
        </Helmet>
    )
}

export default Head
