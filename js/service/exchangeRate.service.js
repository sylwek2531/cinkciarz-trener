(function ()
{
    'use strict';
        function ExchangeRateService($http)
        {
           var ctrl = this;
            ctrl.tableCurrency = ['USD', 'CHF', 'EUR', 'GBP'];
             ctrl.getCurrency = function (currency)
            {
                return $http.get('https://api.nbp.pl/api/exchangerates/rates/c/' + currency + '/?format=json');
                // z powodu zwracania cały czas błédu 404 zakomentowałem kod
                // return $http.get('https://api.nbp.pl/api/exchangerates/rates/c/' + currency + '/today/?format=json');

            };
        }
    angular.module('app').service('ExchangeRateService', ['$http', ExchangeRateService]);
})();
