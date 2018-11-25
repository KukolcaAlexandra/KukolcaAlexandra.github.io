module.exports = function(source, map) {
  this.callback(
    null,
    source.replace(/\d/g, ''),
    map
  );
};
