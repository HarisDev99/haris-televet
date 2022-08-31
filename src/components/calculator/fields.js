export const fields = [
    {
        start: 83000,
        format: {
            to: value => {
                const thousands = value / 1000
                return `${Math.round( thousands )}k`
            },
            from: value => value
        },
        pipsFormat: {
            to: value => {
                return `${value / 1000}k`
            },
            from: value => value
        },
        range: {
            'min': [ 50000, 1000 ],
            '50%': [ 100000, 1000 ],
            'max': [ 200000, 1000 ]
        },
        prefix: `$`,
        decimalScale: 0
    }, {
        start: 3,
        range: {
            'min': [ 1, 1 ],
            '50%': [ 10, 1 ],
            'max': [ 20, 1 ]
        },
        format: {
            to: value => {
                return Math.round(value)
            },
            from: value => value
        },
        decimalScale: 0
    }, {
        start: 3.5,
        range: {
            'min': [ 0, 0.1 ],
            '50%': [ 2.5, 0.1 ],
            'max': [ 5, 0.1 ]
        },
        format: {
            to: value => `${value}%`,
            from: value => value
        },
        pipsFormat: {
            to: value => `${value}%`,
            from: value => value
        },
        suffix: `%`,
        decimalScale: 1
    }, {
        start: 2.5,
        range: {
            'min': [ 0, 0.1 ],
            '50%': [ 2.5, 0.1 ],
            'max': [ 5, 0.1 ]
        },
        format: {
            to: value => `${value}%`,
            from: value => value
        },
        pipsFormat: {
            to: value => `${value}%`,
            from: value => value
        },
        suffix: `%`,
        decimalScale: 1
    },
]

export const defaultState = Object.assign( {}, fields.map(({ start }) => start) )