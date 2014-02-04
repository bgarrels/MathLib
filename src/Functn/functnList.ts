// These functions will be added to the functn prototype soon.
var functionList1 = {
/*
	divisors: function (x) {
		var divisors = x === 1 ? [] : [1],
				i, ii;
		for (i = 2, ii = x / 2; i <= ii; i++) {
			if (x % i === 0) {
				divisors.push(i);
			}
		}
		divisors.push(x);
		return new MathLib.Set(divisors);
	},
	factor: function (n) {
		var factors = [],
				i;
		n = Math.abs(n);
		while (n % 2 === 0) {
			n = n / 2;
			factors.push(2);
		}

		i = 3;
		while (n !== 1) {
			while (n % i === 0) {
				n = n / i;
				factors.push(i);
			}
			i += 2;
		}
		return new MathLib.Set(factors, true);
	},
	*/
	fallingFactorial: function (n, m, s) {
		var factorial = 1, j;
		s = s || 1;

		for (j = 0; j < m; j++) {
			factorial  *= (n - j * s);
		}
		return factorial;
	},
	fibonacci: function (n) {
		return Math.floor(Math.pow(MathLib.goldenRatio, n) / Math.sqrt(5));
	},
	random: Math.random,
	risingFactorial: function (n, m, s) {
		var factorial = 1, j;
		s = s || 1;

		for (j = 0; j < m; j++) {
			factorial  *= (n + j * s);
		}
		return factorial;
	},
	round: function (x) {
		// Some implementations have a bug where Math.round(-0) = +0 (instead of -0).
		if (x === 0) {
			return x;
		}
		return Math.round(x);
	},
	trunc: function (x, n) {
		return x.toFixed(n || 0);
	},
	toContentMathML: function (x, options : toContentMathMLOptions = {}) {
		var base = options.base || 10;
		
		if (MathLib.isNaN(x)) {
			if (options.strict) {
				return '<csymbol cd="nums1">NaN</csymbol>';
			}
			else {
				return '<notanumber/>';
			}
		}
		
		else if (!MathLib.isFinite(x)) {
			if (x === Infinity) {
				if (options.strict) {
					return '<csymbol cd="nums1">infinity</csymbol>';
				}
				else {
					return '<infinity/>';
				}
			}
			else {
				if (options.strict) {
					return '<apply><csymbol cd="arith1">times</csymbol><cn>-1</cn><csymbol cd="nums1">infinity</csymbol></apply>';
				}
				else {
					return '<apply><times/><cn>-1</cn><infinity/></apply>';
				}
			}
		}

		if (base === 10) {
			return '<cn type="double">' + MathLib.toString(x) + '</cn>';
		}
		
		if (options.strict) {
			return '<apply><csymbol cd="nums1">based_float</csymbol>'
				 			+ '<cn type="integer">' + base + '</cn>'
							+ '<cs>' + MathLib.toString(x, {base: base}) + '</cs>'
							+ '</apply>'
		}

		return '<cn type="real" base="' + base + '">' + MathLib.toString(x, {base: base}) + '</cn>';
	},
	toLaTeX: function (x, options : toPresentationOptions = {}) {
		var base = options.base || 10,
				str = MathLib.toString(x, {base: base, sign: options.sign});

		if (MathLib.isNaN(x)) {
			return '\\text{ NaN }';
		}
		else if (x === Infinity) {
			return '\\infty';
		}
		else if (x === -Infinity) {
			return '-\\infty';
		}

		if (options.baseSubscript) {
			str += '_{' + base + '}';
		}

		return str;
	},
	toMathML: function (x, options : toPresentationOptions = {}) {
		var str,
				base = options.base || 10;		

		if (options.sign) {
			str = MathLib.toString(Math.abs(x), {base: base});
		}
		else {				
			str = MathLib.toString(x, {base: base});
		}

		str = '<mn>' + str + '</mn>';

		if (MathLib.isNaN(x)) {
			return '<mi>NaN</mi>';
		}
		else if (x === Infinity) {
			return '<mi>&#x221e;</mi>';
		}
		else if (x === -Infinity) {
			return '<mrow><mo>-</mo><mi>&#x221e;</mi></mrow>';
		}

		if (options.baseSubscript) {
			str = '<msub>' + str + '<mn>' + base + '</mn></msub>';
		}

		if (options.sign) {
			if (x < 0) {
				str = '<mo>-</mo>' + str;
			}
			else {				
				str = '<mo>+</mo>' + str;
			}
		}

		return str;
	},
	toString: function (x, options : toPresentationOptions = {}) {
		var base = options.base || 10,
				str = Math.abs(x).toString(base);
				
		if (!MathLib.isFinite(x)) {
			return x.toString();
		}

		if (x < 0) {
			str = '-' + str;
		}
		else if (options.sign) {
			str = '+' + str;
		}

		if (options.baseSubscript) {
			if (base > 9) {
				str += '&#x208' + Math.floor(base / 10) + ';';
			}
			str += '&#x208' + (base % 10) + ';';
		}

		return str;
	}
};




var createFunction1 = function (f, name) {
	return function (x) {
		if (typeof x === 'number') {
			return f.apply(null, arguments);
		}
		else if (typeof x === 'function') {
			return function (y) {return f(x(y));};
		}
		else if (x.type === 'set') {
			return new MathLib.Set( x.map(f) );
		}
		else if (x.type === 'complex' || x.type === 'integer' || x.type === 'rational') {
			return x[name].apply(x, Array.prototype.slice.call(arguments, 1));
		}
		else if (Array.isArray(x)) {
			return x.map(f);
		}
		else {
			return x[name]();
		}
	};
};


// Add the functions to the MathLib object
for (func in functionList1) {
	if (functionList1.hasOwnProperty(func)) {

		cur = functionList1[func];
		Object.defineProperty(exports, func, {
			value: createFunction1(functionList1[func], func)
		});
	}
}








export var compare = function (a, b) {
	if (MathLib.type(a) !== MathLib.type(b)) {
		return MathLib.sign(MathLib.type(a).localeCompare(MathLib.type(b)));
	}
	else if (typeof a === 'number') {
		return MathLib.sign(a - b);
	}
	else if (typeof a === 'string') {
		return a.localeCompare(b);
	}
	return a.compare(b);
};


export var type = function (x) {
	if (x === null) {
		return 'null';
	}
	if (x === undefined) {
		return 'undefined';
	}
	return x.type ? x.type : (x.constructor.name || Object.prototype.toString.call(x).slice(8, -1)).toLowerCase();
};


export var is = function (obj, type) {
	var ucfirst = function (str) {
				return str.slice(0,1).toUpperCase() + str.slice(1);
			},
			// Trick Typescript to believe that global exists
			global = global,
			// Do the same for Node and window 
			window = window,
			glbl = {
				Object: Object,
				Function: Function,
				RegExp: RegExp,
				Array: Array
			}

	if (MathLib.type(obj) === type) {
		return true;
	}
	else if (['circle', 'complex', 'expression', 'functn', 'line', 'matrix', 'permutation', 'point',
			'polynomial', 'rational', 'screen', 'screen2d', 'screen3d', 'set', 'vector'].indexOf(type) !== -1) {
		return obj instanceof MathLib[ucfirst(type)];
	}
	else {
		// if (window) {
			return obj instanceof glbl[ucfirst(type)];
		// }
		// if (global) {
		// 	return obj instanceof global[ucfirst(type)];
		// }
	}
}


/**
 * Checks if MathML is supported by the browser.  
 * Code stolen from [Modernizr](http://www.modernizr.com/)
 *
 * @return {boolean}
 */
export var isMathMLSupported = function () : boolean {
	var hasMathML = false,
			ns, div, mfrac;
	// If document is undefined (e.g. in Node) we return false
	if (typeof document !== 'undefined' && document.createElementNS) {
		ns = 'http://www.w3.org/1998/Math/MathML';
		div = document.createElement('div');
		div.style.position = 'absolute';
		mfrac = div.appendChild(document.createElementNS(ns, 'math'))
								.appendChild(document.createElementNS(ns, 'mfrac'));
		mfrac.appendChild(document.createElementNS(ns, 'mi'))
				 .appendChild(document.createTextNode('xx'));
		mfrac.appendChild(document.createElementNS(ns, 'mi'))
				 .appendChild(document.createTextNode('yy'));
		document.body.appendChild(div);
		hasMathML = div.offsetHeight > div.offsetWidth;
		document.body.removeChild(div);
	}
	return hasMathML;
};


/**
 * ### MathLib.writeMathML()
 * Writes MathML to an element.
 *
 * @param {string} id The id of the element in which the MathML should be inserted.  
 * @param {string} math The MathML to be inserted.
 */
export var writeMathML = function (id : string, math : string) : void {
	var formula;
	document.getElementById(id).innerHTML = '<math>' + math + '</math>';
	if (typeof MathJax !== 'undefined') {
		formula = MathJax.Hub.getAllJax(id)[0];
		MathJax.Hub.Queue(['Typeset', MathJax.Hub, id]);
	}
}


/**
 * ### MathLib.loadMathJax()
 * Loads MathJax dynamically.
 *
 * @param {string} config Optional config options
 */
export var loadMathJax = function (config : string) : void {
	var script = <HTMLScriptElement>document.createElement('script');
	script.type = 'text/javascript';
	script.src  = 'http://cdn.mathjax.org/mathjax/latest/MathJax.js';

	config = config ||	'MathJax.Hub.Config({' +
												'config: ["MMLorHTML.js"],' +
												'jax: ["input/TeX", "input/MathML", "output/HTML-CSS", "output/NativeMML"],' +
												'extensions: ["tex2jax.js", "mml2jax.js", "MathMenu.js", "MathZoom.js"],' +
												'TeX: {' +
													'extensions: ["AMSmath.js", "AMSsymbols.js", "noErrors.js", "noUndefined.js"]' +
												'}' +
										 	'});';

	if ((<any>window).opera) {
		script.innerHTML = config;
	}
	else {
		script.text = config;
	}

	document.getElementsByTagName('head')[0].appendChild(script);
}