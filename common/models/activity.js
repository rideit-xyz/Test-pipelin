'use strict';

module.exports = function(Activity) { 
    /***********************************
     * Enable-disable API exposed methods
     ************************************/    
    Activity.disableRemoteMethodByName("create", true);
    Activity.disableRemoteMethodByName("replaceOrCreate", false);
    Activity.disableRemoteMethodByName("patchOrCreate", false);
    Activity.disableRemoteMethodByName("exists", false);
    Activity.disableRemoteMethodByName("find", false);
    Activity.disableRemoteMethodByName("findById", false);
    Activity.disableRemoteMethodByName("findOne", false);
    Activity.disableRemoteMethodByName("deleteById", false);
    Activity.disableRemoteMethodByName("count", false);
    Activity.disableRemoteMethodByName("replaceById", false);
    Activity.disableRemoteMethodByName("prototype.patchAttributes", false);
    Activity.disableRemoteMethodByName("createChangeStream", false);
    Activity.disableRemoteMethodByName("updateAll", false);
    Activity.disableRemoteMethodByName("replaceOrCreate", false);
    Activity.disableRemoteMethodByName("upsertWithWhere", false);

    /***********************************
     * Extend methods
     ************************************/ 
    //import
    Activity.import=function(source, callback){
        var response='Imported from' + source;
        callback(null,response);
    }
    Activity.remoteMethod(
        'import', {
            http:{
                path:'/import',
                verb:'post'                
            },
            description:'Import activities from selected fitness application (only strava is supported right now)',
            accepts:{ arg:'source', type:'string', default:'strava'}
        }
    );    
};
