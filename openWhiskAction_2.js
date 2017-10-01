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
    
function main() {

    var conversation = new Watson.ConversationV1({
        username: 'params.WDC_USERNAME',
        password: 'params.WDC_PASSWORD',
        version_date: '2017-05-26'
    });
      
    const cloudant = Cloudant({
        account: 'params.CLOUDANT_ACCOUNT',
        password: 'params.CLOUDANT_PASSWORD'
    });
      
    var params = {
        workspace_id: 'params.WDC_WORKSPACEID',
        export: true
    };

    const versioning_db = cloudant.db.use('params.CLOUDANT_DBNAME');

    return new Promise(function(resolve, reject){
        conversation.getWorkspace(params, function(err, response) {
            if (err) return reject(err);
            else {
                var d = new Date();
                d.setHours(d.getHours() - 3);
                var horario = d.toISOString();
              
                response._id = params.WDC_PREFIX + horario;
                  
                versioning_db.insert(response, function (err, body, header) {
                    if (err) return reject(err);
                    return resolve({ "message": "Backup realizado com sucesso!" });
                 });
            }
        });
    });
}
