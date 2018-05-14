(function () {
    'use strict';
    angular.module('app')
        .config(function ($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'views/main.html', controller: 'MainCtrl', controllerAs: 'mainCtrl'
                })
                .when('/wallet', {
                    templateUrl: 'views/wallet.html', controller: 'WalletCtrl', controllerAs: 'walletCtrl'
                })
                .when('/exchange', {
                    templateUrl: 'views/exchange.html', controller: 'ExchangeCtrl', controllerAs: 'exchangeCtrl'
                })
                .when('/buy', {
                    templateUrl: 'views/buy.html', controller: 'ActionCtrl', controllerAs: 'actionCtrl'
                })
                .when('/sale', {
                    templateUrl: 'views/sale.html', controller: 'ActionCtrl', controllerAs: 'actionCtrl'
                })
                .otherwise({
                    redirectTo: '/'
                });
        });
})();

