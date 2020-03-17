import React from "react";
import Link from 'next/link';

const Home = () => (
    <div>
        <div>
            <Link href="/fileupload"><a>File upload</a></Link></div>
        <div>
            <Link href="/textpost"><a>Text post</a></Link></div>
    </div>

);

export default Home;
