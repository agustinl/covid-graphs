import React from 'react';
import Head from 'next/head';

const Layout = props => {
    return (
        <>
            <Head>
                <title>Product Hunt Firebase y Next.js</title>
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
            </Head>

            <main>
                {props.children}
            </main>
        </>
    );
}
 
export default Layout;