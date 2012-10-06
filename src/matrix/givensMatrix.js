// ### Matrix.givensMatrix()
// This function returns a givens matrix
//
// *@param {number}* The size of the matrix.  
// *@param {number}* The first row/column.  
// *@param {number}* The second row/column.  
// *@param {number}* The angle (in radians).  
// *@returns {matrix}*
MathLib.extend('matrix', 'givensMatrix', function (n, i, k, phi) {
  var givens = MathLib.matrix.identity(n);
  givens[k][k] = givens[i][i]=Math.cos(phi);
  givens[i][k] = Math.sin(phi);
  givens[k][i] = -givens[i][k];
  return givens;
});