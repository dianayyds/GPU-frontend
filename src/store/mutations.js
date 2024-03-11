export default{
    Pushcpuinfo(state,payload){
    // payload的结构是：
    //   userUsage: 用户空间使用率,
    //   systemUsage: 系统空间使用率,
    //   idleUsage: CPU空闲率,
    // 将用户空间使用率推送到对应数组
    state.userUsages.push(payload.userUsage);
    // 将系统空间使用率推送到对应数组
    state.systemUsages.push(payload.systemUsage);
    // 将CPU空闲率推送到对应数组
    state.idleUsages.push(payload.idleUsage);
    // 将时间戳推送到对应数组
    state.cpuxdata.push(new Date().toLocaleTimeString());
    },
    Pushgpuinfo(state,payload){
    // payload的结构是：
    // {
    //   gpus: 所有gpu数据,
    // }
    for (let index = 0; index < payload.gpus.length; index++) {
        let gpu = payload.gpus[index];
        let gpuKey = `GPU ${index+1}`;
        if (!state.powerDraws[gpuKey]) {
            state.powerDraws[gpuKey] = []; // 如果键不存在，则初始化为空数组
        }
        if (!state.utilizations[gpuKey]) {
            state.utilizations[gpuKey] = []; // 如果键不存在，则初始化为空数组
        }
        if (!state.temperatures[gpuKey]) {
            state.temperatures[gpuKey] = []; // 如果键不存在，则初始化为空数组
        }
        state.powerDraws[gpuKey].push(gpu.powerDraw);
        state.utilizations[gpuKey].push(gpu.utilization);
        state.temperatures[gpuKey].push(gpu.temperature);
    }
    state.gpuxdata.push(new Date().toLocaleTimeString());
    },
    ResetStore(state){
        const initialState={
            ismonitoring:false,
            sshInitialized:false,
            cpuxdata:[],
            userUsages:[],
            systemUsages:[],
            idleUsages:[],
            isAdmin:false,
            gpuxdata:[],
            powerDraws:{},
            utilizations:{},
            temperatures:{},
          };
        Object.assign(state, initialState);
    },
}