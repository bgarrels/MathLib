// ### Polynomial.prototype.differentiate()
// Differentiates the polynomial
//
// *@param {number}* [n] the number of times to differentiate the polynomial.  
// *@returns {polynomial}*
differentiate(n = 1) : Polynomial {
	var temparr = [],
		i;

	if (n === 0) {
		return this;
	}

	for (i = 0; i <= this.deg - n; i++) {
		temparr[i] = MathLib.times(this[i + n], MathLib.fallingFactorial(i + n, n));
	}
	return new MathLib.Polynomial(temparr);
}