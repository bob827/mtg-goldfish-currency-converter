// ==UserScript==
// @name         MTG Goldfish - USD to CAD converter
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  Tampermonkey script to convert USD prices to CAD prices on mtggoldfish.com
// @author       thewhite147
// @match        https://www.mtggoldfish.com/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
	
	// Hardcoded Canadian dollar value
	var CAD_VALUE = "1.33315";
	
	// List of price selectors (don't forget the comma at the end)
	var _selectors = 
		".portfolio-stats-paper .total-value,"+
		".portfolio-stats-paper .color-paper .index-price-header-price,"+
		".col-price,"+
		".increase,"+
		".decrease,"+
		".neutral,"+
		".deck-price-paper,"+
		"#tab-paper .deck-col-price,"+
		".paper .price-box-price,"+
		".btn-shop-price";
					
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
				$(this).html(value.toFixed(2) + "&nbsp;CAD");
			}
		});
		log("DONE!");
	}
	
	function doReplaces(value) {
        if(!value) return value;
		var replaceChars = "$+ ";
		
		for (var i = 0; i < replaceChars.length; i++) {
			value = value.replace(replaceChars[i], "");
		}
		
		return value;
	}
	
	function convertToCAD(value) {
		value = value * CAD_VALUE;
		value = round(value, 2);
		return value;
	}
    
    function round(value, decimals) {
        return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
    }
	
	function isNumeric(n) {
		return !isNaN(parseFloat(n)) && isFinite(n);	
	}
	
	function log(msg) {
		console.log("MTGGFCC => " + msg);
	}
})();