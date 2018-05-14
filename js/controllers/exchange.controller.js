(function ()
{
    'use strict';
    function ExchangeCtrl(ExchangeRateService)
    {
        var ctrl = this;
        ctrl.currencies = [];
        angular.forEach(ExchangeRateService.tableCurrency, function (value)
        {
            ExchangeRateService.getCurrency(value).then(function (data)
            {
                ctrl.currencies.push(data);
            });
        });
    }
    angular.module('app').controller('ExchangeCtrl', ['ExchangeRateService', ExchangeCtrl]);
})();
