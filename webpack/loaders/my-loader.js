module.exports = function(source, map) {
  let obj = JSON.parse(source);
  console.log('source');
  console.log(source);
  console.log('obj');
  console.dir(obj);
  for (key in obj) {
    console.log(key);
    if(obj[key].search(/\d/g) !== -1){
      console.log('should delete');
      delete obj[key];
    }
  }
  console.log(obj);
  const json = JSON.stringify(obj);
  console.log(json);
  this.callback(
    null,
    json,//source.replace(/\d/g, ''),
    map
  );
};
