webpackJsonp([3,4],{

/***/ 39:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var template = (function () {
return {

};
}());

function renderMainFragment ( root, component ) {
	var a = createElement( 'a' );
	a.href = "/promotions";
	a.className = "button outline accent";
	
	appendNode( createText( "Check out our current promotion!" ), a );

	return {
		mount: function ( target, anchor ) {
			insertNode( a, target, anchor );
		},
		
		update: noop,
		
		teardown: function ( detach ) {
			if ( detach ) {
				detachNode( a );
			}
		}
	};
}

function SvelteComponent ( options ) {
	options = options || {};
	
	this._state = options.data || {};

	this._observers = {
		pre: Object.create( null ),
		post: Object.create( null )
	};

	this._handlers = Object.create( null );

	this._root = options._root;
	this._yield = options._yield;

	this._fragment = renderMainFragment( this._state, this );
	if ( options.target ) this._fragment.mount( options.target, null );
}

SvelteComponent.prototype.get = function get( key ) {
 	return key ? this._state[ key ] : this._state;
 };

SvelteComponent.prototype.fire = function fire( eventName, data ) {
 	var handlers = eventName in this._handlers && this._handlers[ eventName ].slice();
 	if ( !handlers ) return;
 
 	for ( var i = 0; i < handlers.length; i += 1 ) {
 		handlers[i].call( this, data );
 	}
 };

SvelteComponent.prototype.observe = function observe( key, callback, options ) {
 	var group = ( options && options.defer ) ? this._observers.pre : this._observers.post;
 
 	( group[ key ] || ( group[ key ] = [] ) ).push( callback );
 
 	if ( !options || options.init !== false ) {
 		callback.__calling = true;
 		callback.call( this, this._state[ key ] );
 		callback.__calling = false;
 	}
 
 	return {
 		cancel: function () {
 			var index = group[ key ].indexOf( callback );
 			if ( ~index ) group[ key ].splice( index, 1 );
 		}
 	};
 };

SvelteComponent.prototype.on = function on( eventName, handler ) {
 	var handlers = this._handlers[ eventName ] || ( this._handlers[ eventName ] = [] );
 	handlers.push( handler );
 
 	return {
 		cancel: function () {
 			var index = handlers.indexOf( handler );
 			if ( ~index ) handlers.splice( index, 1 );
 		}
 	};
 };

SvelteComponent.prototype.set = function set ( newState ) {
	var oldState = this._state;
	this._state = Object.assign( {}, oldState, newState );
	
	dispatchObservers( this, this._observers.pre, newState, oldState );
	if ( this._fragment ) this._fragment.update( newState, this._state );
	dispatchObservers( this, this._observers.post, newState, oldState );
};

SvelteComponent.prototype.teardown = function teardown ( detach ) {
	this.fire( 'teardown' );

	this._fragment.teardown( detach !== false );
	this._fragment = null;

	this._state = {};
};

function dispatchObservers( component, group, newState, oldState ) {
	for ( var key in group ) {
		if ( !( key in newState ) ) continue;

		var newValue = newState[ key ];
		var oldValue = oldState[ key ];

		if ( newValue === oldValue && typeof newValue !== 'object' ) continue;

		var callbacks = group[ key ];
		if ( !callbacks ) continue;

		for ( var i = 0; i < callbacks.length; i += 1 ) {
			var callback = callbacks[i];
			if ( callback.__calling ) continue;

			callback.__calling = true;
			callback.call( component, newValue, oldValue );
			callback.__calling = false;
		}
	}
}

function createElement( name ) {
	return document.createElement( name );
}

function detachNode( node ) {
	node.parentNode.removeChild( node );
}

function insertNode( node, target, anchor ) {
	target.insertBefore( node, anchor );
}

function appendNode( node, target ) {
	target.appendChild( node );
}

function createText( data ) {
	return document.createTextNode( data );
}

function noop() {}

/* harmony default export */ __webpack_exports__["a"] = SvelteComponent;

/***/ }),

/***/ 76:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_firebase_app__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_firebase_app__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_firebase_database__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_firebase_database___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_firebase_database__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__svelte_components_CallToActionButton_html__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__svelte_components_PromotionList_html__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__constants_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_js__ = __webpack_require__(6);









__WEBPACK_IMPORTED_MODULE_0_firebase_app__["initializeApp"](__WEBPACK_IMPORTED_MODULE_4__constants_js__["a" /* FIREBASE_CONFIG */]);
__WEBPACK_IMPORTED_MODULE_0_firebase_app__["database"]().ref('/promotions').orderByChild('startDate').endAt(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__utils_js__["a" /* isoDateString */])(new Date())).once('value').then(function (snapshot) {
	var promotions = snapshot.val();
	var validPromotions = promotions.filter(__WEBPACK_IMPORTED_MODULE_5__utils_js__["b" /* promotionIsValid */]);

	if (validPromotions.length > 0) {
		createComponents(validPromotions);
	}
});

function createComponents(promotions) {
	var heroButtonContainer = document.querySelector('.hero-button');
	while (heroButtonContainer.firstChild) {
		heroButtonContainer.removeChild(heroButtonContainer.firstChild);
	}new __WEBPACK_IMPORTED_MODULE_2__svelte_components_CallToActionButton_html__["a" /* default */]({
		target: heroButtonContainer
	});

	var promotionsContainer = document.querySelector('#promotions');

	new __WEBPACK_IMPORTED_MODULE_3__svelte_components_PromotionList_html__["a" /* default */]({
		target: promotionsContainer,
		data: {
			promotions: promotions
		}
	});
}

/***/ }),

/***/ 78:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var template = (function () {
return {
	data(){
		return {
			promotions: []
		}
	}
};
}());

let addedCss = false;
function addCss () {
	var style = createElement( 'style' );
	style.textContent = "\n\t@import url('https://fonts.googleapis.com/css?family=Lato:300|Oswald');\n\n\t.promotion-list-container {\n\t\tpadding: 2em;\n\t\toverflow-x: auto;\n\t}\n\n\t.promotion-list[svelte-3888157496], [svelte-3888157496] .promotion-list {\n\t\tdisplay: flex;\n\t\tjustify-content: center;\n\t\talign-items: center;\n\t}\n\n\t.promotion[svelte-3888157496], [svelte-3888157496] .promotion {\n\t\tdisplay: block;\n\t\tborder-radius: 5px;\n\t\tbox-shadow: 0 2px 5px 2px rgba(0, 0, 0, 0.25);\n\t\tmargin: 1em;\n\t\tpadding: 2em;\n\t\tbackground-size: cover;\n\t\tbackground-position: center;\n\t\tcolor: white;\n\t\ttext-decoration: none;\n\t\topacity: 0.9;\n\t}\n\n\t.promotion[svelte-3888157496]:hover, [svelte-3888157496] .promotion:hover {\n\t\ttransform: scale(1.01);\n\t\tbox-shadow: 0 2px 5px 3px rgba(0, 0, 0, 0.25);\n\t\tcolor: white;\n\t\ttext-decoration: none;\n\t}\n\n\t.title[svelte-3888157496], [svelte-3888157496] .title {\n\t\tfont-size: 1.6em;\n\t\tfont-family: 'Oswald', sans-serif;\n\t}\n\n\t.desc[svelte-3888157496], [svelte-3888157496] .desc {\n\t\tfont-family: 'Lato', sans-serif;\n\t\tfont-weight: 300;\n\t}\n";
	appendNode( style, document.head );

	addedCss = true;
}

function renderMainFragment ( root, component ) {
	var div = createElement( 'div' );
	setAttribute( div, 'svelte-3888157496', '' );
	div.className = "promotion-list-container";
	
	var h2 = createElement( 'h2' );
	setAttribute( h2, 'svelte-3888157496', '' );
	
	appendNode( h2, div );
	appendNode( createText( "Current Promotions" ), h2 );
	appendNode( createText( "\n\t" ), div );
	
	var div1 = createElement( 'div' );
	setAttribute( div1, 'svelte-3888157496', '' );
	div1.className = "promotion-list";
	
	appendNode( div1, div );
	var eachBlock_anchor = createComment();
	appendNode( eachBlock_anchor, div1 );
	var eachBlock_value = root.promotions;
	var eachBlock_iterations = [];
	
	for ( var i = 0; i < eachBlock_value.length; i += 1 ) {
		eachBlock_iterations[i] = renderEachBlock( root, eachBlock_value, eachBlock_value[i], i, component );
		eachBlock_iterations[i].mount( eachBlock_anchor.parentNode, eachBlock_anchor );
	}

	return {
		mount: function ( target, anchor ) {
			insertNode( div, target, anchor );
		},
		
		update: function ( changed, root ) {
			var eachBlock_value = root.promotions;
			
			for ( var i = 0; i < eachBlock_value.length; i += 1 ) {
				if ( !eachBlock_iterations[i] ) {
					eachBlock_iterations[i] = renderEachBlock( root, eachBlock_value, eachBlock_value[i], i, component );
					eachBlock_iterations[i].mount( eachBlock_anchor.parentNode, eachBlock_anchor );
				} else {
					eachBlock_iterations[i].update( changed, root, eachBlock_value, eachBlock_value[i], i );
				}
			}
			
			teardownEach( eachBlock_iterations, true, eachBlock_value.length );
			
			eachBlock_iterations.length = eachBlock_value.length;
		},
		
		teardown: function ( detach ) {
			teardownEach( eachBlock_iterations, false );
			
			if ( detach ) {
				detachNode( div );
			}
		}
	};
}

function renderEachBlock ( root, eachBlock_value, promotion, promotion__index, component ) {
	var a = createElement( 'a' );
	setAttribute( a, 'svelte-3888157496', '' );
	a.href = "/promotions";
	a.className = "promotion";
	a.style.cssText = "background-image: url(" + ( promotion.image ) + ");";
	
	var span = createElement( 'span' );
	setAttribute( span, 'svelte-3888157496', '' );
	span.className = "title";
	
	appendNode( span, a );
	var text = createText( promotion.title );
	appendNode( text, span );
	appendNode( createText( "\n\t\t\t" ), a );
	
	var p = createElement( 'p' );
	setAttribute( p, 'svelte-3888157496', '' );
	p.className = "desc";
	
	appendNode( p, a );
	var text2 = createText( promotion.desc );
	appendNode( text2, p );

	return {
		mount: function ( target, anchor ) {
			insertNode( a, target, anchor );
		},
		
		update: function ( changed, root, eachBlock_value, promotion, promotion__index ) {
			a.style.cssText = "background-image: url(" + ( promotion.image ) + ");";
			
			text.data = promotion.title;
			
			text2.data = promotion.desc;
		},
		
		teardown: function ( detach ) {
			if ( detach ) {
				detachNode( a );
			}
		}
	};
}

function SvelteComponent ( options ) {
	options = options || {};
	
	this._state = Object.assign( template.data(), options.data );

	this._observers = {
		pre: Object.create( null ),
		post: Object.create( null )
	};

	this._handlers = Object.create( null );

	this._root = options._root;
	this._yield = options._yield;

	if ( !addedCss ) addCss();
	
	this._fragment = renderMainFragment( this._state, this );
	if ( options.target ) this._fragment.mount( options.target, null );
}

SvelteComponent.prototype.get = function get( key ) {
 	return key ? this._state[ key ] : this._state;
 };

SvelteComponent.prototype.fire = function fire( eventName, data ) {
 	var handlers = eventName in this._handlers && this._handlers[ eventName ].slice();
 	if ( !handlers ) return;
 
 	for ( var i = 0; i < handlers.length; i += 1 ) {
 		handlers[i].call( this, data );
 	}
 };

SvelteComponent.prototype.observe = function observe( key, callback, options ) {
 	var group = ( options && options.defer ) ? this._observers.pre : this._observers.post;
 
 	( group[ key ] || ( group[ key ] = [] ) ).push( callback );
 
 	if ( !options || options.init !== false ) {
 		callback.__calling = true;
 		callback.call( this, this._state[ key ] );
 		callback.__calling = false;
 	}
 
 	return {
 		cancel: function () {
 			var index = group[ key ].indexOf( callback );
 			if ( ~index ) group[ key ].splice( index, 1 );
 		}
 	};
 };

SvelteComponent.prototype.on = function on( eventName, handler ) {
 	var handlers = this._handlers[ eventName ] || ( this._handlers[ eventName ] = [] );
 	handlers.push( handler );
 
 	return {
 		cancel: function () {
 			var index = handlers.indexOf( handler );
 			if ( ~index ) handlers.splice( index, 1 );
 		}
 	};
 };

SvelteComponent.prototype.set = function set ( newState ) {
	var oldState = this._state;
	this._state = Object.assign( {}, oldState, newState );
	
	dispatchObservers( this, this._observers.pre, newState, oldState );
	if ( this._fragment ) this._fragment.update( newState, this._state );
	dispatchObservers( this, this._observers.post, newState, oldState );
};

SvelteComponent.prototype.teardown = function teardown ( detach ) {
	this.fire( 'teardown' );

	this._fragment.teardown( detach !== false );
	this._fragment = null;

	this._state = {};
};

function dispatchObservers( component, group, newState, oldState ) {
	for ( var key in group ) {
		if ( !( key in newState ) ) continue;

		var newValue = newState[ key ];
		var oldValue = oldState[ key ];

		if ( newValue === oldValue && typeof newValue !== 'object' ) continue;

		var callbacks = group[ key ];
		if ( !callbacks ) continue;

		for ( var i = 0; i < callbacks.length; i += 1 ) {
			var callback = callbacks[i];
			if ( callback.__calling ) continue;

			callback.__calling = true;
			callback.call( component, newValue, oldValue );
			callback.__calling = false;
		}
	}
}

function createElement( name ) {
	return document.createElement( name );
}

function setAttribute( node, attribute, value ) {
	node.setAttribute ( attribute, value );
}

function detachNode( node ) {
	node.parentNode.removeChild( node );
}

function insertNode( node, target, anchor ) {
	target.insertBefore( node, anchor );
}

function appendNode( node, target ) {
	target.appendChild( node );
}

function createText( data ) {
	return document.createTextNode( data );
}

function createComment() {
	return document.createComment( '' );
}

function teardownEach( iterations, detach, start ) {
	for ( var i = ( start || 0 ); i < iterations.length; i += 1 ) {
		iterations[i].teardown( detach );
	}
}

/* harmony default export */ __webpack_exports__["a"] = SvelteComponent;

/***/ })

},[76]);
//# sourceMappingURL=promotions-homepage.js.map