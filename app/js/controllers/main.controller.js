(function ()
{
    'use strict';
    function MainCtrl($localStorage)
    {
        $localStorage.$default({
            wallet: {PLN: 0, USD: 0, GBP: 0, EUR: 0, CHF: 0}
        });
        var ctrl = this;
        function acceptValue()
        {
            if ($localStorage.wallet) {
                $localStorage.wallet = {PLN: ctrl.startValue, USD: 0, GBP: 0, EUR: 0, CHF: 0};
                window.alert('Twoje pieniądze zostały przypisane do portfela.');
            }
        }
        ctrl.acceptValue = acceptValue;
    }
    angular.module('app').controller('MainCtrl', ['$localStorage', MainCtrl]);
})();

