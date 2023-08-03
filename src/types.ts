import { NODE_INPUT_TYPES } from "./constants/colors";

export type NodeColorRGB = {
    r: number,
    g: number,
    b: number,
}

type Vector2D = {
    x: number;
    y: number;
}

type Vector3D = Vector2D & {
    z: number;
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
    "default_value": string | string[] | Vector2D | Vector3D,
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

type GeometryNode = {
      uuid: string;
      type: string;
      location: Vector2D;
      width: number;
      width_hidden: number;
      height: number;
      dimensions: Vector2D;
      name: string;
      label: string;
      inputs: GeometryNodeInput[];
      outputs: GeometryNodeInput[];
      parent: null;
      use_custom_color: boolean;
      color: NodeColorRGB;
      select: boolean;
      show_options: boolean;
      show_preview: boolean;
      hide: boolean;
      mute: boolean;
}

export type GeometryNodeLinkSocket = {
    type: NODE_INPUT_TYPES
    node: string;
}

export type GeometryNodeLink = {
    from_node:string;
    from_socket: GeometryNodeLinkSocket;
    to_node:string;
    to_socket: GeometryNodeLinkSocket;
}

export type GeometryNodeFile = {
    nodes: GeometryNode[],
    links: GeometryNodeLink[]
}