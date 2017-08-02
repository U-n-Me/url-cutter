
var low = require('lowdb');
var uuid = require('uuid');

var db = low('.data/db.json', { storage: require('lowdb/lib/storages/file-async') });
db.defaults({'id': 0, 'urls': []}).write();

function putURL(url){
  const id = db.get('id').value() + 1;
  db.set('id', id).write();
  var val = {'id': id, 'url': url};
  db.get('urls').push(val).write();
  return val.id;
}

function getURL(id){
  console.log(id);
  var val = db.get('urls').value()[id-1];
  if(val == undefined)
    return '__err__';
  return val.url;
}


exports.putURL = putURL;
exports.getURL = getURL;