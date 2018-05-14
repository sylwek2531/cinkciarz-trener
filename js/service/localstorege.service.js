(function () {
    'use strict';

    function LocalStorageService($localStorage, $timeout) {
        var ctrl = this;
        var notEnoughAmount = 'Nie posiadasz wystarczającej kwoty w portfelu by zrealizowac transakcję.';
        var success = 'Pieniądze zostały przypisane do portfela';
        function getWalletCurrency(type) {
            return $localStorage.wallet[type];
        }

        function buy(currency, value, rates) {

            if (value > parseFloat($localStorage.wallet.PLN)) {
                timeOutAlert(notEnoughAmount, 'alert-danger');

            } else {
                $localStorage.wallet[currency] += parseFloat((value / rates ).toFixed(2));
                $localStorage.wallet.PLN = parseFloat($localStorage.wallet.PLN - value).toFixed(2);
                timeOutAlert(success, 'alert-success');
            }
        }

        function sell(currency, value, rates) {
            var pln = parseFloat($localStorage.wallet.PLN);
            if (value > parseFloat($localStorage.wallet[currency])) {
                timeOutAlert(notEnoughAmount, 'alert-danger');
            } else {
                pln += (value * rates);
                $localStorage.wallet.PLN = pln.toFixed(2);
                $localStorage.wallet[currency] = parseFloat($localStorage.wallet[currency] - value).toFixed(2);
                timeOutAlert(success, 'alert-success');
            }
        }

        function timeOutAlert(action, classAlert) {

            var alert = angular.element(document.getElementsByClassName('alert'));
            var btnAccept = angular.element(document.getElementsByClassName('accept'));

            if (typeof classAlert === 'undefined') {
                classAlert = 'alert-danger'
            }
            $timeout(function () {

                alert.text('').toggleClass('hide').removeClass(classAlert);
                btnAccept.attr('disabled', false)
            }, 2500);
            return [alert.text(action).removeClass('hide').toggleClass(classAlert), btnAccept.attr('disabled', 'disabled')]
        }

        ctrl.getWalletCurrency = getWalletCurrency;
        ctrl.timeOutAlert = timeOutAlert;
        ctrl.buy = buy;
        ctrl.sell = sell;
    }

    angular.module('app').service('LocalStorageService', ['$localStorage', '$timeout', LocalStorageService]);
})();
