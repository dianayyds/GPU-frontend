export default{
    Pushcpuinfo(state,payload){
        // payload的结构是：
    // {
    //   userUsage: 用户空间使用率,
    //   systemUsage: 系统空间使用率,
    //   idleUsage: CPU空闲率,
    //   timestamp: 当前时间戳
    // }
    // 将用户空间使用率推送到对应数组
    state.userUsages.push(payload.userUsage);
    // 将系统空间使用率推送到对应数组
    state.systemUsages.push(payload.systemUsage);
    // 将CPU空闲率推送到对应数组
    state.idleUsages.push(payload.idleUsage);
    // 将时间戳推送到对应数组
    state.cpuxdata.push(payload.timestamp);
    },
}