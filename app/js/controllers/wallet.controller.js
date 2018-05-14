(function () {
    'use strict';

    function WalletCtrl(LocalStorageService, ExchangeRateService) {
        var ctrl = this;
        ctrl.currencies = ExchangeRateService.tableCurrency;

        function listCurrencies(currency) {
            return LocalStorageService.getWalletCurrency(currency);
        }

        ctrl.listCurrencies = listCurrencies;
    }

    angular.module('app').controller('WalletCtrl', ['LocalStorageService', 'ExchangeRateService', WalletCtrl]);
})();

