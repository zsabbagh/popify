import { observer } from 'mobx-react-lite';
import TopbarView from '../views/topbarView';
import UserModel from '../interfaces';

export default
observer (
        function Topbar(props : {pages: string[], settings: string[], loginUrl: string, model: UserModel}) {
        return <TopbarView pages={props.pages} settings={props.settings} loggedIn={props.model.loggedIn} loginUrl={props.loginUrl}/>;
    }
);