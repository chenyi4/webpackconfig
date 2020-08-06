import jsonAPI from './json-api';

class Auth {
    login(account){
        jsonAPI.authConf = {
            url: '/login', 
            account
        }

        return jsonAPI.authorize();
    }
    
    logout(){
        jsonAPI.clearAuthInfo();
    }
}

export default new Auth();