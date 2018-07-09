/*
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

(function(document) {
  'use strict';

  // Grab a reference to our auto-binding template
  // and give it some initial binding values
  // Learn more about auto-binding templates at http://goo.gl/Dx1u2g
  var app = document.querySelector('#app');

  //app.apiBaseUrl = 'http://localhost:8080';
  app.apiBaseUrl = 'https://bad-unicorn-service-test.appspot.com';
  app.gameContentUrl = 'https://test.badunicorngames.com/play/';

  app.displayInstalledToast = function() {
    document.querySelector('#caching-complete').show();
  };

  // Listen for template bound event to know when bindings
  // have resolved and content has been stamped to the page
  app.addEventListener('dom-change', function() {
    //console.log('Our app is ready to rock!');
  });

  // See https://github.com/Polymer/polymer/issues/1381
  window.addEventListener('WebComponentsReady', function() {
    // imports are loaded and elements have been registered
  });

  // Navigate to the selected level when the user selects a level from the dropdown.
  app.onLevelSelected = function(e) {
    var levelId = e.target.options[e.target.selectedIndex].value;
    page('/levels/' + levelId);
  };

  // Menu select events
  app.onMenuSelect = function(e, details) {
    // Fire deselectHandler
    if(app.menuSelectedId !== undefined && app.menuDeselectHandler[app.menuSelectedId] !== undefined) {
      app.menuDeselectHandler[app.menuSelectedId]();
    }

    // Fire selectHandler
    if(details.item.attributes.selectHandler !== undefined) {
      var handlerId = details.item.attributes.selectHandler.value;
      app.menuSelectedId = handlerId;
      if(handlerId !== undefined && app.menuSelectHandler[handlerId] !== undefined) {
        app.menuSelectHandler[handlerId]();
      }
    }

    // Close drawer after menu item is selected if drawerPanel is narrow
    var drawerPanel = document.querySelector('#paperDrawerPanel');
    if (drawerPanel.narrow) {
      drawerPanel.closeDrawer();
    }
  };

  app.menuSelectHandler = {};
  app.menuDeselectHandler = {};

  // Play page handlers
  app.menuSelectHandler.play = function() {
    var gameIframe = document.createElement('iframe');
    gameIframe.className = 'game-content';
    gameIframe.src = app.gameContentUrl;
    gameIframe.id = 'game_iframe';

    var section = document.getElementById('play_section');
    section.appendChild(gameIframe);
  };

  app.menuDeselectHandler.play = function() {
    var gameIframe = document.getElementById('game_iframe');
    if(gameIframe !== null && gameIframe.parentNode !== null) {
      gameIframe.parentNode.removeChild(gameIframe);
    }
  };

})(document);
