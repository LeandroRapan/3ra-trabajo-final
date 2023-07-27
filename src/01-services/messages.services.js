import MsgManagerMongoDb from "../00-daos/mongodb/messages.dao.js";
const msgDao = new MsgManagerMongoDb();

export const allMsgService = async()=>{
    try {
        const msgDocs = await msgDao.getAll();
        
        return msgDocs
    } catch (error) {
        console.log(error)
    }
}
export const createMsgService = async(msg)=>{
    try {
        const newMsg = await msgDao.createMsg(msg);
        if(!newMsg) throw new Error('no escribió nada')
        return newMsg
    } catch (error) {
        console.log(error)
    }
}
export const getMsgByIdService = async(id)=>{
    try {
        const msgDoc = await msgDao.getById(id)
        return msgDoc
    } catch (error) {
        console.log(error)
    }
}
export const updateMsgService = async(msg, id)=>{
    try {
        const msgUp = await msgDao.updateMsg(id, msg);
        return msgUp
    } catch (error) {
        console.log(error)
    }
}
export const deleteOneService = async(id)=>{
    try {
        const msgDelDocs = await msgDao.deleteOneService(id);
        return msgDelDocs
    } catch (error) {
        console.log(error)
    }
}
export const deleteAllService = async()=>{
    try {
        const deleted = await msgDao.deleteMsgs();
        return deleted
    } catch (error) {
        console.log(error)
    }
}