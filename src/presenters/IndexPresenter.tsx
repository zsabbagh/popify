import { redirect } from 'react-router-dom';
import { Model } from '../interfaces';
import loginUrl from '../utils/spotifyAuthorization';
import { useState, useEffect } from 'react';
import IndexView from '../views/IndexView';

export default function Index(props: { model: Model }) {
    const userIsAuthenticated = props.model.hasAuthToken();
    // TODO: when authenticated
    return <IndexView userIsAuthenticated={userIsAuthenticated} />;
}