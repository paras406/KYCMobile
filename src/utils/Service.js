class Service {
    constructor(serviceName, data) {
        this.__serviceName = serviceName;
        this.__data = this.getCachedData() || data;
    }

    set data(data) {
        localStorage.setItem(this.__serviceName, JSON.stringify(data));
        this.__data = data;
    }

    getCachedData(){
        if(localStorage.getItem(this.__serviceName)){
            return JSON.parse(localStorage.getItem(this.__serviceName));
        }
        return null;
    }

    get data() {
        return this.__data;
    }

    clear() {
        localStorage.removeItem(this.__serviceName);
        this.__data = null;
    }
}

export default Service;