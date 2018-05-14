(function () {
    'use strict';

    function ActionCtrl(LocalStorageService, ExchangeRateService) {
        var ctrl = this;
        ctrl.listCurrencies = ExchangeRateService.tableCurrency;
        ctrl.chosenCureency = true;

        function selectChange(currency) {
            ExchangeRateService.getCurrency(currency).then(function (response) {
                ctrl.response = response;
                ctrl.chosenCureency = false;
            });
        }

        function changeInput(arg) {
            var rates = ctrl.response.data.rates[0].bid.toFixed(2);

            if (arg === 'buy') {
                ctrl.spanBuy = (ctrl.value / rates).toFixed(2);
            } else {
                ctrl.spanSale = (ctrl.value * rates).toFixed(2);
            }
        }

        function accept(serviceAction) {
            var value = ctrl.value;
            if (ctrl.response === undefined || ctrl.response === null) {
                return LocalStorageService.timeOutAlert('Nie wybrano waluty');
            }
            if (value === null || value === 0 || value === undefined) {
                return LocalStorageService.timeOutAlert('Nie wpisano kwoty');
            } else {
                var currency = ctrl.response.data.code;
                var rates = ctrl.response.data.rates[0].bid.toFixed(2);
                if (serviceAction === 'buy') {
                    LocalStorageService.buy(currency, value, rates);
                } else {
                    LocalStorageService.sell(currency, value, rates);
                }

            }
        }

        ctrl.changeInput = changeInput;
        ctrl.selectChange = selectChange;
        ctrl.accept = accept;
    }

    angular.module('app').controller('ActionCtrl', ['LocalStorageService', 'ExchangeRateService', ActionCtrl]);

})();