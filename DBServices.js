var low = require('lowdb');
var uuid = require('uuid');

var db = low('data/db.json', { storage: require('lowdb/lib/storages/file-async') });
db.defaults({"id": 0, "urls": []}).write();

function putURL(url){
  const id = db.get("id").value() + 1;
  db.set("id", id).write();
  db.get("urls").push({id: id, 'url': url}).write();
  return id;
}

function getURL(id){
  var val = db.get("urls").value();
  return val;
}

exports.putURL = putURL;
exports.getURL = getURL;