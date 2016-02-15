/**
 * Created by Guanyu on 2/12/2016.
 */
CORE.MortgageCtrl = Base.extend(
    {
        constructor: function(param) {
            var that = this;

            this.param = param;
            var spec = {
                cls: 'mortgageCtrl clear',
                cn: {
                    tag: 'table',
                    cn: [
                        {
                            tag: 'input',
                            type: 'text',
                            id: '_loanAmount',
                            value: param.loanAmount || 560000,
                            placeholder: 'Loan Amount'
                        },
                        {
                            tag: 'input',
                            type: 'text',
                            id: '_loanYear',
                            value: param.loanAmount || 30,
                            placeholder: 'Loan Year'
                        },
                        {
                            tag: 'input',
                            type: 'text',
                            id: '_loanRate',
                            value: param.loanRate || 3.125,
                            placeholder: 'Loan Rate(%)'
                        },
                        {
                            tag: 'input',
                            type: 'button',
                            id: '_submit',
                            value: 'Calculate'
                        },
                    ]
                }
            };

            var dom = CORE.Dom.create(spec);

            this.loanAmount = dom.querySelector('#_loanAmount');
            this.loanYear = dom.querySelector('#_loanYear');
            this.loanRate = dom.querySelector('#_loanRate');
            this.submit = dom.querySelector('#_submit');

            $(this.submit).on(
                'click',
                function() {
                    that.calculate();
                }
            )
            this.param.container.appendChild(dom);
        },

        calculate: function() {
            this.fireEvent("calculate", {
                loanAmount: this.loanAmount.value,
                loanYear: this.loanYear.value,
                loanRate: this.loanRate.value,
            });
        }
    },
    {
        hasCss: false
    }
);