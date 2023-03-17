App = {
  web3Provider: null,
  contracts: {},

  init: async function() {
    
  },

  initWeb3: async function() {
    
    return App.initContract();
  },

  initContract: function() {
    /*
     * Replace me...
     */

    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.btn-adopt', App.handleAdopt);
  },

  markAdopted: function() {
    
  }
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
