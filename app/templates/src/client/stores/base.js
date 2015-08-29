/**
 * Created by Shlomi on 02/08/2015.
 */

export default class BaseStore{

    constructor(){
        this.exportPublicMethods({
            setServerState: this.setServerState
        });
    }

    setServerState(state){
        this.state = state;
    }

}
