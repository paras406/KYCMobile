import Service from './Service';
import HttpUtil from './HttpUtil';

class AuthenticateService extends Service {

    constructor(){
        super('AuthenticationService', {});
        this.data = this.__data;
        if(this.getJwt()){
            HttpUtil.init({
                Authorization: `bearer ${this.getJwt()}`,
            });   
        }
    }

    isAuthenticated = () => {
        return this.getJwt() ? true : false; 
    }

    getJwt  = () => {
        return  this.data ? this.data.token : '';
    }

    getId = () => {
        return  this.data?.user ? this.data.user.id : '';
    }

    storeUserInfo = (data) => {
      this.data = data?.login;
    }
}

const authenticateServiceInstance = new AuthenticateService();

export default authenticateServiceInstance;