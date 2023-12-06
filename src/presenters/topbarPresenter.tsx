import { observer } from 'mobx-react-lite';
import TopbarView from '../views/topbarView';
import {Model} from '../interfaces';

interface Props {
    model: Model,
    pages: string[],
    settings: string[],
    loginUrl: string,
}


export default
observer (
        function Topbar(props: Props) {
        return <TopbarView pages={props.pages} settings={props.settings} loggedIn={!!props.model.user} loginUrl={props.loginUrl}/>;
    }
);