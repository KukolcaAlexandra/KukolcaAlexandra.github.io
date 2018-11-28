module.exports = function(source, map) {
  let obj = JSON.parse(source);
  console.log('my loader');
  console.log('source:');
  console.log(source);
  
  function eachRecursive(obj) {
    for (let key in obj) {
      if (typeof obj[key] === "object" && obj[key] !== null) {
        eachRecursive(obj[key]);
      }
      else {
        if(obj[key].search(/\d/g) !== -1) {
          if (obj instanceof Array) {
            obj.splice(key);
          } else {
            delete obj[key];
          }
        }
      }
    }
  }

  eachRecursive(obj);

  const json = JSON.stringify(obj);
  console.log('handled source');
  console.log(json);
  this.callback(
    null,
    json,
    map
  );
};
