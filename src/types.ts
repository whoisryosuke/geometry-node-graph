export type NodeColorRGB = {
    r: number,
    g: number,
    b: number,
}

export type GeometryNodeData = {
    label: string,
    width: number,
    height: number,
    inputs: GeometryNodeInput[],
    outputs: GeometryNodeInput[],
    color: NodeColorRGB,
    selected: boolean,
    hide: boolean,
    use_custom_color: boolean,
};

export type GeometryNodeInput = {
    "description": string,
    // Maybe hard-code some types?
    "display_shape": string,
    "enabled": boolean,
    "hide": boolean,
    "hide_value": boolean,
    "identifier": string,
    "is_linked": boolean,
    "is_multi_input": boolean,
    "is_output": boolean,
    "is_unavailable": boolean,
    "label": string,
    "link_limit": number,
    "name": string,
    "node": string,
    "show_expanded": boolean,
    // Maybe hard-code some types?
    "type": string
}