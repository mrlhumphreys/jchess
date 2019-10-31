export const compact = function(array) {
  return array.filter(function(e) {
    return typeof e !== 'undefined' && e !== null;
  });
};

export const exists = function(e) {
  return typeof e !== 'undefined' && e !== null;
};
