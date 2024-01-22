import request from '../utils/request.js'
export function sign_in(params){
    return request({
        url:'/sign_in',
        method:'get',
        params
    })
}

export function sign_up(params){
    return request({
        url:'/sign_up',
        method:'get',
        params
    })
}

export function parse_token(params){
    return request({
        url:'/parse_jwt',
        method:'get',
        params
    })
}

export function cpu_info(params){
    return request({
        url:'/cpu_info',
        method:'get',
        params
    })
}
