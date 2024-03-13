// Lookup tables defining which choices are
// available for each config option

export var configOptionsLUT: Map<string, string[]> = new Map([
    ["mode", ["race_car", "sports_car", "spaceship", "bike"]],
    ["log_level", ["debug", "info", "warning"]],
]);
