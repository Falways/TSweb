import axios,{ AxiosRequestConfig,AxiosInstance } from 'axios';
import store from '@/store/store';

const postRequest = function (url:string, params:object) {
    let instance:AxiosInstance = axios.create({
        baseURL: '',
        timeout: 1000*60*5,
        headers: { 'Authorization': store.state.token ,'Content-Type': 'application/json'}
    });
    return new Promise((resolve, reject) => {
        instance.post(url, params).then(success => {
            resolve(success.data)
        }).catch(err => {
            reject(err.response.data.message)
        })
    })
}

const postRequestJson = function (url:string, params:object) {
    let instance:AxiosInstance = axios.create({
        baseURL: '',
        timeout: 1000*60*5,
        headers: { 'Authorization': store.state.token ,'Content-Type': 'application/json'}
    });
    return new Promise((resolve, reject) => {
        instance.post(url, params).then(success => {
            resolve(success.data)
        }).catch(err => {
            reject(err.response.data.message)
        })
    })
}

const putRequest = function (url:string, params:object) {
    let instance:AxiosInstance = axios.create({
        baseURL: '',
        timeout: 1000*60*5,
        headers: { 'Authorization': store.state.token ,'Content-Type': 'application/json'}
    });
    return new Promise((resolve, reject) => {
        instance.put(url, params).then(success => {
            resolve(success.data)
        }).catch(err => {
            reject(err.response.data.message)
        })
    })
}

const deleteRequest = function (url:string, params:object) {
    let instance:AxiosInstance = axios.create({
        baseURL: '',
        timeout: 1000*60*5,
        headers: { 'Authorization': store.state.token ,'Content-Type': 'application/json'}
    });

    return new Promise((resolve, reject) => {
        instance.delete(url, { params: params }).then(success => {
            resolve(success.data)
        }).catch(err => {
            reject(err.response.data.message)
        })
    })
}

const getRequest = function (url:string, params:object) {
    let instance:AxiosInstance = axios.create({
        baseURL: '',
        timeout: 1000*60*5,
        headers: { 'Authorization': store.state.token ,'Content-Type': 'application/json'}
    });
    console.log('params: '+JSON.stringify(params))
    return new Promise((resolve, reject) => {
        instance.get(url, { params: params }).then(success => {
            resolve(success.data)
        }).catch(err => {
            console.log(err)
            reject(err.response.data.message)
        })
    })
}

const getExcelRequest = function (url:string, params:object) {
    let instance:AxiosInstance = axios.create({
        baseURL: '',
        timeout: 1000*60*5,
        headers: { 'Authorization': store.state.token ,'Content-Type': 'application/json'},
        responseType: 'blob'
    });
    return new Promise((resolve, reject) => {
        if (params) {

        }
        instance.get(url, { params: params }).then(success => {
            resolve(success)
        }).catch(err => {
            reject(err.response.data.message)
        })
    })
}

export const API = {
    getExcelRequest,
    getRequest,
    deleteRequest,
    putRequest,
    postRequestJson,
    postRequest
}
