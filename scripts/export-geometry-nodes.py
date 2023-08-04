import bpy, json, uuid, mathutils
from bpy import context
from pathlib import Path
from bpy_types import bpy_types

import builtins as __builtin__

# Custom functions to print logs to Blender and OS consoles
def console_print(*args, **kwargs):
    for a in context.screen.areas:
        if a.type == 'CONSOLE':
            c = {}
            c['area'] = a
            c['space_data'] = a.spaces.active
            c['region'] = a.regions[-1]
            c['window'] = context.window
            c['screen'] = context.screen
            s = " ".join([str(arg) for arg in args])
            for line in s.split("\n"):
                bpy.ops.console.scrollback_append(c, text=line)

def print(*args, **kwargs):
    """Console print() function."""

    console_print(*args, **kwargs) # to py consoles
    __builtin__.print(*args, **kwargs) # to system console
    
    
    
def convert_color_to_obj(color):
    color_obj = {}
    
    if hasattr(color, "r"):
        color_obj["r"] = color.r
    
    if hasattr(color, "g"):
        color_obj["g"] = color.g
    
    if hasattr(color, "b"):
        color_obj["b"] = color.b
    
    if hasattr(color, "a"):
        color_obj["a"] = color.a
    
    return color_obj

def convert_vector_to_obj(vector_value):
    vector_obj = {}
    
    if hasattr(vector_value, "x"):
        vector_obj["x"] = vector_value.x
    
    if hasattr(vector_value, "y"):
        vector_obj["y"] = vector_value.y
    
    if hasattr(vector_value, "z"):
        vector_obj["z"] = vector_value.z
    
    if hasattr(vector_value, "w"):
        vector_obj["w"] = vector_value.w
    
    return vector_obj

# Convert complex types into JSON compatible formats
def convert_complex_type_to_json_format(default_value):
    if isinstance(default_value, mathutils.Vector):
        return convert_vector_to_obj(default_value)

    if isinstance(default_value, float):
        return "{}".format(default_value)

    if isinstance(default_value, bpy_types.bpy_prop_array):
        socket_array = []
        for socket_value in default_value:
            socket_array.append("{}".format(socket_value))
        return socket_array

# SCRIPT BEGINS
# Get object somehow
# Get the active object
obj = bpy.context.object
    
#print("object", obj)
# print(dir(obj))

def handle_node_group(node_group):
    
    output_json = {
        "nodes": [],
        "links": [],
    }
    # Storage for all the node data we're exporting
    nodes_json = []
    
    # Loop through the nodes
    for node in node_group.nodes:
        #print("Node", node.keys())
        #print("Node props", dir(node))   
        node["uuid"] = str(uuid.uuid4())
        
        # Store any necessary node data
        node_output = {
            "uuid": node["uuid"],
            "type": node.type,
            "location": convert_vector_to_obj(node.location),
            "width": node.width,
            "width_hidden": node.width_hidden,
            "height": node.height,
            "dimensions": convert_vector_to_obj(node.dimensions),
            "name": node.name,
            "label": node.label,
            "inputs": [],
            "outputs": [],
            #"inputs": node.inputs,
            #"outputs": node.outputs,
            #"internal_links": node.internal_links,
            "parent": node.parent,
            "use_custom_color": node.use_custom_color,
            "color": convert_color_to_obj(node.color),
            "select": node.select,
            "show_options": node.show_options,
            "show_preview": node.show_preview,
            "hide": node.hide,
            "mute": node.mute,
        }
        
        # Loop through inputs and outputs and add those
        for input in node.inputs:
            # Store the input data
            input_data = {
                "description": input.description,
                "display_shape": input.display_shape,
                #"default_value": input.default_value,
                #"draw": input.draw,
                #"draw_color": input.draw_color,
                "enabled": input.enabled,
                "hide": input.hide,
                "hide_value": input.hide_value,
                "identifier": input.identifier,
                "is_linked": input.is_linked,
                "is_multi_input": input.is_multi_input,
                "is_output": input.is_output,
                "is_unavailable": input.is_unavailable,
                "label": input.label,
                "link_limit": input.link_limit,
                "name": input.name,
                "node": input.node["uuid"],
                #"rna_type": input.rna_type,
                "show_expanded": input.show_expanded,
                "type": input.type,
            }
            
            # Check if it has a default value - this is the user input node data
            if hasattr(input, "default_value"):
                print("input default_value", input.default_value)
                input_data["default_value"] = convert_complex_type_to_json_format(input.default_value)
            
            # Add data to node inputs
            node_output["inputs"].append(input_data)
            
            
        for output in node.outputs:
            print("[OUTPUT]:", dir(output))
            # Store the input data
            output_data = {
                "description": output.description,
                "display_shape": output.display_shape,
                #"default_value": output.default_value,
                #"draw": input.draw,
                #"draw_color": input.draw_color,
                "enabled": output.enabled,
                "hide": output.hide,
                "hide_value": output.hide_value,
                "identifier": output.identifier,
                "is_linked": output.is_linked,
                "is_multi_input": output.is_multi_input,
                "is_output": output.is_output,
                "is_unavailable": output.is_unavailable,
                "label": output.label,
                "link_limit": output.link_limit,
                "name": output.name,
                "node": output.node["uuid"],
                #"rna_type": input.rna_type,
                "show_expanded": output.show_expanded,
                "type": output.type,
            }
            
            # Check if it has a default value - this is the user input node data
            if hasattr(output, "default_value"):
                print("output default_value", output.default_value)
                output_data["default_value"] = convert_complex_type_to_json_format(output.default_value)
            
            # Add data to node inputs
            node_output["outputs"].append(output_data)
            
        #print("node_output", node_output)
        nodes_json.append(node_output)
        
    output_json["nodes"] = nodes_json
    
    # Loop through links
    for link in node_group.links:
        link_data = {
            "from_node": link.from_node["uuid"],
            "from_socket": {
                "type": link.from_socket.type,
                "node": link.from_socket.node["uuid"],
            },
            "to_node": link.to_node["uuid"],
            "to_socket": {
                "type": link.to_socket.type,
                "node": link.to_socket.node["uuid"],
            },
        }
        
        # Get any default data from input/outputs (e.g. 3D Vector “offset” in set position node)
        # FROM_SOCKET
        # We check if the default value exists (some slots don't have - like Geometry)
        if hasattr(link.from_socket, "default_value"):
            print("[FROM SOCKET] type:", type(link.from_socket.default_value))
            socket_value = convert_complex_type_to_json_format(link.from_socket.default_value)
            if socket_value:
                link_data["from_socket"]["default_value"] = socket_value
            
        # TO_SOCKET
        if hasattr(link.to_socket, "default_value"):
            print("[TO SOCKET] type:", type(link.to_socket.default_value))
            socket_value = convert_complex_type_to_json_format(link.to_socket.default_value)
            if socket_value:
                link_data["to_socket"]["default_value"] = socket_value
            
        output_json["links"].append(link_data)
        
    # Get path of current file
    file_index = 0
    blend_path = Path(bpy.context.blend_data.filepath)
    # Grab the file name
    blend_file_name = blend_path.with_suffix("").name;
    # The template for the final JSON filename
    name_template = "{}-nodes-{}"
    
    # Check if file exists - increment if so
    while blend_path.with_name(name_template.format(blend_file_name, file_index)).with_suffix(".json").exists():
        file_index += 1
        
    # Create a file name with a number appended (e.g. your-file-01)
    blend_versioned_name = name_template.format(blend_file_name, file_index)
    # Creates a JSON path using current filename + location
    json_path = blend_path.with_name(blend_versioned_name).with_suffix(".json")

    # Open the file and dump the JSON data to it
    # using "x" instead of "w" to error if the file already exists, though very unlikely due to line 29
    with open(json_path, "x") as f:
        json.dump(output_json, f)

# Walk through object's "modifiers"
modifier = None
for modifier in obj.modifiers:
    if modifier.type == "NODES":
        #print(modifier);
        #print("modifier props:", dir(modifier))
        handle_node_group(modifier.node_group)
        break
