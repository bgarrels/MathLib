// ### Polynomial.prototype.toFunctn()
// Converts the polynomial to a functn
//
// *@returns {functn}*
MathLib.extendPrototype('polynomial', 'toFunctn', function () {
  var str = '', i, ii;
  for (i=0, ii=this.deg; i<=ii; i++) {
    if (!MathLib.isZero(this[i])) {
      if(i === 0) {
        str += MathLib.toString(this[i]);
      }
      else {
        str += MathLib.toString(this[i], true);
      }

      if (i > 1) {
        str += '* Math.pow(x,' + MathLib.toString(i) + ')';
      }
      else if (i === 1) {
        str += '*x';
      }
    }
  }

  return MathLib.functn(new Function('x', 'return ' + str), {contentMathMLString: this.toContentMathMLString(true)});
});