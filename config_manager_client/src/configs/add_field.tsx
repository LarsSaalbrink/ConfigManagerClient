export const field_options = [
    {
        tooltip: {
            text: "<div onclick=\"console.log('TEST')\" class='injected_html'><b>Type</b></div>",
            children: [],
        },
    },
    {
        tooltip: {
            text: "True/False",
            children: [
                {
                    tooltip: {
                        text: "<div class='injected_html'>Name <input type=text style='width:50px'><button>Ok</button></div>",
                        children: [],
                    },
                },
            ],
        },
    },
    {
        tooltip: {
            text: "Numeric",
            children: [
                {
                    tooltip: {
                        text: "<div class='injected_html'>Name <input type=number style='width:50px'><button>Ok</button></div>",
                        children: [],
                    },
                },
            ],
        },
    },
    {
        tooltip: {
            text: "Selection",
            children: [
                {
                    tooltip: {
                        text: "<div class='injected_html'>Name:a,b,c <input type=text style='width:50px'><button>Ok</button><br/></div>",
                        children: [],
                    },
                },
            ],
        },
    },
];
