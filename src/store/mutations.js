export default{
    Pushcpuinfo(state,payload){
        state.cpuydata.push(payload.usage);
        state.cpuxdata.push(payload.timestamp);
    },
}