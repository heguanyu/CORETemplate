/**
 * Created by Guanyu on 6/3/2015.
 */
CORE.MortgageTable = Base.extend(
    {
        constructor: function(param) {
            this.param = param;
            var spec = {
                cls: 'mortgageTable clear',
                cn: {
                    tag: 'table',
                    cn: [
                        {
                            tag: 'thead',
                            cn: {
                                tag: 'tr',
                                id: '_theadRow'
                            }
                        },
                        {
                            tag: 'tbody',
                            id: '_tbody'
                        }
                    ]
                }
            };

            var dom = CORE.Dom.create(spec);

            this.theadRow = dom.querySelector('#_theadRow');
            this.tbody = dom.querySelector('#_tbody');

            this.param.container.appendChild(dom);
        },

        render: function(data, fields) {
            CORE.Dom.clear(this.theadRow);
            CORE.Dom.clear(this.tbody);
            var that = this;
            _.each(
                fields,
                function(field) {
                    that.theadRow.appendChild(CORE.Dom.create(
                        {
                            tag: 'th',
                            cn: field.title || ""
                        }
                    ));
                }
            );

            _.each(data, function(values) {
                var tr = CORE.Dom.create({
                    tag: 'tr'
                })
                _.each(fields, function(field, id) {
                    var value = values[id];
                    if (field.format) {
                        value = field.format(value);
                    }
                    tr.appendChild(CORE.Dom.create(
                        {
                            tag: 'td',
                            cn: (!value && value != 0) ? "" : value.toString()
                        }
                    ))
                });
                that.tbody.appendChild(tr);
            });
        }
    },
    {
        hasCss: false
    }
);