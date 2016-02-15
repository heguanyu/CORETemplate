/**
 * Created by Guanyu on 6/3/2015.
 */

CORE.MortgageCalculation = Base.extend(
    {
        constructor: function(param) {
            var that = this;
            this.param = param;
            var spec = {
                cls: 'mortgageTable clear',
                cn: [
                    {
                        cls: 'mortgageCtrlContainer',
                        id: '_mortgageCtrlContainer'
                    },
                    {
                        cls: 'mortgageTableContainer',
                        id: '_mortgageTableContainer'
                    },
                ]
            };

            var dom = CORE.Dom.create(spec);

            this.theadRow = dom.querySelector('#_theadRow');
            this.tbody = dom.querySelector('#_tbody');
            var mortgageCtrlContainer = dom.querySelector('#_mortgageCtrlContainer');
            var mortgageTableContainer = dom.querySelector('#_mortgageTableContainer');

            this.mortgageCtrl = new CORE.MortgageCtrl(
                {
                    container: mortgageCtrlContainer
                }
            );
            this.mortgageTable = new CORE.MortgageTable(
                {
                    container: mortgageTableContainer
                }
            );

            this.mortgageCtrl.on(
                'calculate',
                function(param) {
                    var calculateResult = that.calculateEvenPrincipal(param);
                    that.mortgageTable.render(
                        calculateResult,
                        {
                            year: {
                                title: 'Year',
                            },
                            month: {
                                title: 'Month',
                            },
                            principal: {
                                title: 'Principal($)',
                                format: function(value) {
                                    return value.toFixed(2);
                                }
                            },
                            interest: {
                                title: 'Interest($)',
                                format: function(value) {
                                    return value.toFixed(2);
                                }
                            },
                            total: {
                                title: 'Total($)',
                                format: function(value) {
                                    return value.toFixed(2);
                                }
                            }
                        }
                    );
                }
            )

            this.param.container.appendChild(dom);
        },

        calculateEvenPrincipal: function(param) {
            var months = param.loanYear * 12;
            var result = [];
            var restPrincipal = param.loanAmount;
            var rate = param.loanRate / 1200.0;
            var monthlyPrincipal = param.loanAmount / months;
            var sums = {
                year: 'Total',
                principal: 0,
                interest: 0,
                total: 0
            }
            for (var i = 1; i <= months; i++) {
                var principal = monthlyPrincipal;
                var interest = restPrincipal * rate;
                result.push(
                    {
                        year: Math.floor(i/12),
                        month: i%12,
                        principal: principal,
                        interest: interest,
                        total: principal + interest
                    }
                );
                sums.principal += principal;
                sums.interest += interest;
                sums.total += principal + interest;
                restPrincipal -= principal;
            }
            result.unshift(sums);
            return result;
        },
        calculateEvenMonthly: function(param) {
            var months = param.loanYear * 12;
            var result = [];
            var restPrincipal = param.loanAmount;
            var rate = param.loanRate / 1200.0;
            var monthlyTotal = param.loanAmount * rate * Math.pow(1+rate, months) / (Math.pow(1+rate, months) -1);
            var sums = {
                year: 'Total',
                principal: 0,
                interest: 0,
                total: 0
            }
            for (var i = 1; i <= months; i++) {
                var interest = restPrincipal * rate;
                var principal = monthlyTotal - interest;
                result.push(
                    {
                        year: Math.floor(i/12),
                        month: i%12,
                        principal: principal,
                        interest: interest,
                        total: principal + interest
                    }
                );
                sums.principal += principal;
                sums.interest += interest;
                sums.total += principal + interest;
                restPrincipal -= principal;
            }
            result.unshift(sums);
            return result;
        }
    },
    {
        hasCss: false,
        dependancies: ["MortgageTable", "MortgageCtrl"]
    }
);