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

export function users_info(params){
    return request({
        url:'/users_info',
        method:'get',
        params
    })
}

export function delete_user(params){
    return request({
        url:'/delete_user',
        method:'post',
        params
    })
}


export function user_info_byname(params){
    return request({
        url:'/user_info_byname',
        method:'get',
        params
    })
}

export function base_info(params){
    return request({
        url:'/base_info',
        method:'get',
        params
    })
}


export function gpu_info(params){
    return request({
        url:'/gpu_info',
        method:'get',
        params
    })
}


export function detailed_gpu_info(params){
    return request({
        url:'/detailed_gpu_info',
        method:'get',
        params
    })
}

export function ssh_connect(params){
    return request({
        url:'/ssh_connect',
        method:'post',
        params
    })
}

