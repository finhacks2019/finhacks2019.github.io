App = {
  web3Provider: null,
  contracts: {},

  init: async function () {
    return await App.initWeb3();
  },

  initWeb3: async function () {
    // Modern dapp browsers...
    if (window.ethereum) {
      App.web3Provider = window.ethereum;
      try {
        // Request account access
        await window.ethereum.enable();
      } catch (error) {
        // User denied account access...
        console.error("User denied account access")
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = window.web3.currentProvider;
    }
    // If no injected web3 instance is detected, fall back to Ganache
    else {
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    }
    web3 = new Web3(App.web3Provider);

    return App.initContract();
  },

  initContract: function () {
    $.getJSON('Certificate.json', function (data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract
      var CertificateArtifact = data;
      App.contracts.Certificate = TruffleContract(CertificateArtifact);

      // Set the provider for our contract
      App.contracts.Certificate.setProvider(App.web3Provider);


      // Use our contract to retrieve and mark the adopted pets
      return App.displayWinners();
    });

    return App.bindEvents();
  },

  bindEvents: function () {
    $(document).on('click', '.btn-save', App.handleSetCertificate);
  },

  displayWinners: function () {
    App.contracts.Certificate.deployed().then(function (instance) {
      certificateInstance = instance;
      var link = "";

      if (web3.currentProvider.networkVersion == 1) {
        link = "https://etherscan.io/address/" + certificateInstance.address;
      } else if (web3.currentProvider.networkVersion == 3) {
        link = "https://ropsten.etherscan.io/address/" + certificateInstance.address;
      } else if (web3.currentProvider.networkVersion == 4) {
        link = "https://rinkeby.etherscan.io/address/" + certificateInstance.address;
      } else if (web3.currentProvider.networkVersion == 5) {
        link = "https://ropsten.etherscan.io/address/" + certificateInstance.address;
      } else if (web3.currentProvider.networkVersion == 42) {
        link = "https://kovan.etherscan.io/address/" + certificateInstance.address;
      }
      console.log(certificateInstance.address);
      $('#link-explorer').attr("href", link);
      $('#txcontract').text(certificateInstance.address);
      $('.alert-contract').toggleClass('d-none');

      return certificateInstance.getCertificate.call('is-1');
    }).then(function (winner) {
      if (winner) {
        $('#is-1').toggleClass('d-none');
        $('#is-1').text(winner);
      } else {
        $('#is-1-cp').toggleClass('d-none');
      }
      return certificateInstance.getCertificate.call('is-2');
    }).then(function (winner) {
      if (winner) {
        $('#is-2').toggleClass('d-none');
        $('#is-2').text(winner);
      } else {
        $('#is-2-cp').toggleClass('d-none');
      }
      return certificateInstance.getCertificate.call('is-3');
    }).then(function (winner) {
      if (winner) {
        $('#is-3').toggleClass('d-none');
        $('#is-3').text(winner);
      } else {
        $('#is-3-cp').toggleClass('d-none');
      }
      return certificateInstance.getCertificate.call('fi-1');
    }).then(function (winner) {
      if (winner) {
        $('#fi-1').toggleClass('d-none');
        $('#fi-1').text(winner);
      } else {
        $('#fi-1-cp').toggleClass('d-none');
      }
      return certificateInstance.getCertificate.call('fi-2');
    }).then(function (winner) {
      if (winner) {
        $('#fi-2').toggleClass('d-none');
        $('#fi-2').text(winner);
      } else {
        $('#fi-2-cp').toggleClass('d-none');
      }
      return certificateInstance.getCertificate.call('fi-3');
    }).then(function (winner) {
      if (winner) {
        $('#fi-3').toggleClass('d-none');
        $('#fi-3').text(winner);
      } else {
        $('#fi-3-cp').toggleClass('d-none');
      }
      return certificateInstance.getCertificate.call('im-1');
    }).then(function (winner) {
      if (winner) {
        $('#im-1').toggleClass('d-none');
        $('#im-1').text(winner);
      } else {
        $('#im-1-cp').toggleClass('d-none');
      }
      return certificateInstance.getCertificate.call('im-2');
    }).then(function (winner) {
      if (winner) {
        $('#im-2').toggleClass('d-none');
        $('#im-2').text(winner);
      } else {
        $('#im-2-cp').toggleClass('d-none');
      }
      return certificateInstance.getCertificate.call('im-3');
    }).then(function (winner) {
      if (winner) {
        $('#im-3').toggleClass('d-none');
        $('#im-3').text(winner);
      } else {
        $('#im-3-cp').toggleClass('d-none');
      }
      return certificateInstance.getCertificate.call('ac-1');
    }).then(function (winner) {
      if (winner) {
        $('#ac-1').toggleClass('d-none');
        $('#ac-1').text(winner);
      } else {
        $('#ac-1-cp').toggleClass('d-none');
      }
      return certificateInstance.getCertificate.call('sc-1');
    }).then(function (winner) {
      if (winner) {
        $('#sc-1').toggleClass('d-none');
        $('#sc-1').text(winner);
      } else {
        $('#sc-1-cp').toggleClass('d-none');
      }
    }).catch(function (err) {
      console.log(err.message);
      $('#link-explorer').addClass('disabled');
      $('.alert-nocontract').toggleClass('d-none');
    })
  },

  handleSetCertificate: function (event) {
    event.preventDefault();
    var certificateId = $(event.target).data('id');
    var awardee = $(event.target).parent().prev().val();

    if (awardee) {
      var certificateInstance;
      web3.eth.getAccounts(function (error, accounts) {
        if (error) {
          console.log(error);
        }

        var account = accounts[0];

        App.contracts.Certificate.deployed().then(function (instance) {
          certificateInstance = instance;

          return certificateInstance.setCertificate(certificateId, awardee, {
            from: account
          });
        }).then(function (result) {
          window.location.reload();
        }).catch(function (err) {
          console.log(err.message);
        });
      });
    }
  }

};

$(function () {
  $(window).load(function () {
    App.init();
  });
});