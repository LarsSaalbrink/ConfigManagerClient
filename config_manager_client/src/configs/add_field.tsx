export const field_options = [
    {
        tooltip: {
            text: "<div class='injected_html'><b>Type</b></div>",
            children: [],
        },
    },
    {
        tooltip: {
            text: "True/False",
            children: [
                {
                    tooltip: {
                        text: "<div class='injected_html'>Name <input type=text id='bool_in' style='width:50px'><button onclick='Add_field_window(\"boolean\",document.getElementById(\"bool_in\").value)'>Ok</button></div>",
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
                        text: "<div class='injected_html'>Name <input type=text id='num_in' style='width:50px'><button onclick='Add_field_window(\"numeric\",document.getElementById(\"num_in\").value)'>Ok</button></div>",
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
                        text: "<div class='injected_html'>Name:a,b,c <input type=text id='selec_in' style='width:50px'><button onclick='Add_field_window(\"selection\",document.getElementById(\"selec_in\").value)'>Ok</button></div>",
                        children: [],
                    },
                },
            ],
        },
    },
];

const Add_field_window = (type: string, input: string) => {
    // Parse input
    if (!input.includes(":")) {
        input = input + ":";
    }
    const name_and_data = input.split(":");
    const split_data = name_and_data[1].split(",");

    (window as any).add_field(
        (window as any).current_device,
        type,
        name_and_data[0],
        split_data
    );
};
(window as any).Add_field_window = Add_field_window; // Expose function to raw JS functions above
