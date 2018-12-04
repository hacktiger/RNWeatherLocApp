import React from 'react';
import Firebase from './src/controller/Firebase';
declare class AppScreen extends React.Component {
    myFirebase: Firebase;
    constructor(props: any);
    componentDidMount(): void;
    render(): JSX.Element;
}
export default AppScreen;
