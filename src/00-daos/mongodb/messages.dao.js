import { messagesModel } from "./models/messages.model.js";

export default class MsgManagerMongoDb{
    
    async createMsg(obj){
        const msg = await messagesModel.create(obj);
         return msg;
        } catch (error) {
            console.log(error);
        }
    

    

    async getAll(){
        try {
           
            const msgs = await messagesModel.find({})
            
             
            
            return msgs;
            
        }
         catch (error) {
          console.log(error);  
        }
    
    }
    async getById(id) {
        try {
            const msgId = await productsModel.find(id)
        } catch (error) {
            console.log(error)
        }
       
       
      }

      async updateMsg(msg, id){
        try {
           await messagesModel.updateOne({_id:id}, msg)
           return msg
        } catch (error) {
            console.log(error);
        }
    }

      async deleteMsg(id){
        const msgsFile = await this.getAll()
        if(msgsFile.length > 0) {
            const newArray = msgsFile.filter(m=>m.id!== id) 
            await fs.promises.writeFile(this.path, JSON.stringify(newArray))
        } else {
            throw new Error(`Msg not found`)
        }
      }

      async deleteMsgs(){
        await messagesModel.deleteMany();
        return 'clear'
      }
}