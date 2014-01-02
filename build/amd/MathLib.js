/*!
 * MathLib JavaScript Library v0.6.1
 * http://mathlib.de/
 *
 * Copyright 2012, 2013 Alexander Zeilmann
 * Released under the MIT license
 * http://mathlib.de/en/license
 *
 * build date: 2013-12-29
 */


requirejs.config({
	paths: {
		meta: './meta',
		Expression: './Expression',
		Functn: './Functn',
		Screen: './Screen',
		Layer: './Layer',
		Canvas: './Canvas',
		SVG: './SVG',
		Screen2D: './Screen2D',
		Screen3D: './Screen3D',
		Vector: './Vector',
		Circle: './Circle',
		Complex: './Complex',
		Line: './Line',
		Matrix: './Matrix',
		Permutation: './Permutation',
		Conic: './Conic',
		Point: './Point',
		Polynomial: './Polynomial',
		Rational: './Rational',
		Set: './Set'
	}
})

define(['meta', 'Expression',  'Functn',  'Screen',  'Layer',  'Canvas',  'SVG', 
	'Screen2D', 'Screen3D',  'Vector',  'Circle',  'Complex',  'Line',  'Matrix', 
	'Permutation',  'Conic', 'Point',  'Polynomial',  'Rational',  'Set'], function (MathLib) {
	return MathLib;
})