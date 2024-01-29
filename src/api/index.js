import request from '../utils/request.js'
export function sign_in(params){
    return request({
        url:'/sign_in',
        method:'post',
        params
    })
}

export function sign_up(params){
    return request({
        url:'/sign_up',
        method:'post',
        params
    })
}

export function parse_token(params){
    return request({
        url:'/parse_jwt',
        method:'post',
        params
    })
}

export function cpu_info(){
    return request({
        url:'/cpu_info',
        method:'get',
    })
}

export function init_database(params){
    return request({
        url:'/init_database',
        method:'post',
        params
    })
}
