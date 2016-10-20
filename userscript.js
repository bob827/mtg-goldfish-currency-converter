// ==UserScript==
// @name         MTG Goldfish - USD to CAD converter
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Tampermonkey script to convert USD prices to CAD prices on mtggoldfish.com
// @author       thewhite147
// @match        https://www.mtggoldfish.com/*
// @grant        none
// @require      https://code.jquery.com/jquery-3.1.1.min.js
// ==/UserScript==

(function () {
    'use strict';
	
	// Hardcoded Canadian dollar value
	var CAD_VALUE = "1.31845066";
	
	// List of price selectors (don't forget the comma at the end)
	var _selectors = ".total-value,"
					+ ".index-price-header-price,"
					+ ".col-price," 
					+ ".increase,"
					+ ".decrease,"
					+ ".deck-price-paper,"
					+ ".deck-col-price,"
					+ ".price-box-price,"
					+ ".btn-shop-price";
					
	// Let's do it!			
	doConvert();
					
	function doConvert() {
		log("GO!");
		var value;
		$(_selectors).each(function() {
			log("dans sélecteurs");
			value = $(this).html();
			value = doReplaces(value);
			
			if (isNumeric(value)) {
				value = convertToCAD(value);
				$(this).html(value + " CAD");
			}
		});
	}
	
	function doReplaces(value) {
		var replaceChars = "$";
		
		for (var i = 0; i < replaceChars.length; i++) {
			value = value.replace(replaceChars[i], "");
		}
		
		return value;		
	}
	
	function convertToCAD(value) {
		value = value * CAD_VALUE;
		value = Math.round(value * 100) / 100;
		return value;
	}
	
	function isNumeric(n) {
		return !isNaN(parseFloat(n)) && isFinite(n);	
	}
	
	function log(msg) {
		console.log("MTGGFCC => " + msg);
	}
})();