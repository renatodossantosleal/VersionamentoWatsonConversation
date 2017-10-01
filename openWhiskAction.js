/**
  *
  * main() será executado ao clicar em "Run This Action".
  * 
  * @author     Renato dos Santos Leal
  * @company    IBM Brasil
  * @contact    https://www.linkedin.com/in/renatodossantosleal/
  * @github     https://github.com/renatodossantosleal
  *
  */
  
var Watson = require("watson-developer-cloud");
var Cloudant = require('cloudant');
  
var conversation = new Watson.ConversationV1({
    username: '{username}',
    password: '{password',
    version_date: '2017-05-26'
});
  
const cloudant = Cloudant({
    account: '{account}',
    password: '{cloudant_password}'
});
  
var params = {
    workspace_id: '{workspace_id}',
    export: true
};
  
const versioning_db = cloudant.db.use('teste_conversation');
  
function main() {
    return new Promise(function(resolve, reject){
        conversation.getWorkspace(params, function(err, response) {
            if (err) return reject(err);
            else {
                var d = new Date();
                d.setHours(d.getHours() - 3);
                var horario = d.toISOString();
            
                response._id = "{nome_chatbot}" + horario;
                
                versioning_db.insert(response, function (err, body, header) {
                    if (err) return reject(err);
                    return resolve({ "message": "Backup realizado com sucesso!" });
                });
            }
        });
    });
}
