import React from 'react'
import { useParams } from 'react-router'
import Feed from './../Feed/Feed';
import Head from '../Helper/Head';

const UserProfile = () => {

    const {user} = useParams();
    console.log(user);
    return (
        <section className="container mainSection">
            <Head title={user}></Head>
            <h1 className="title">{user}</h1>
            <Feed user={user}></Feed>
        </section>
    )
}

export default UserProfile