import axios from 'axios';
import _ from 'lodash';

class JsonAPI {
    static  _authHeader;

    constructor(){
        this._axios = axios.create({
            method: 'post',
            header: {
                'Content-Type': 'application/json;charset=UTF-8'
            },
            responseType: 'json',
            timeout: 10000
        });
    }

    set authConf(conf){
        this._authConf = conf;
    }

    authorize(){
        if(!this._authConf){
            throw new Error('No authorization conf.');
        }
        var {url, account} = this._authConf;
        return this._request(url, account).then(
            data => {
                if(data.result && data.result.token){
                    this._authHeader = {
                        Authorization: 'Bearer' + data.result.token
                    };
                    return true;
                }
                return false;
            }
        );
    }
    clearAuthInfo(){
        this._authHeader = null;
    }

    requestWithAuth(url, args, conf){
        if(!this._authHeader){
            return Promise.resolve(null);
        }

        if(!conf.header){
            conf.headers = {};
        }

        _.assign(conf.headers, this._authHeader);
        return new Promise((resolve, reject) => {
            this._request(url, args, conf)
                .then(resolve)
                .catch(err => {
                    var data = err.response.data;
                    if(data && data.code === 401003){
                        this.authorize().then(
                            successful => {
                                if(successful) {
                                    _.assign(conf.headers, this.authHeader);
                                    return this._request(url, args, conf);
                                }

                                return null;
                        })
                        .then(resolve)
                        .catch(reject);
                    }
                    else {
                        reject(err);
                    }
                })
        });
    }

    _request(url, args, conf){
        return this._axios.post(url, { args }, conf)
            .then(res => {
                return res.data;
        });
    }
};

export default new JsonAPI();

//动态组件 广播数据