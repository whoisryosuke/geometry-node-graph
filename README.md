# Geometry Node Graph

Preview Geometry Nodes on web using React

## Getting Started

1. Clone this project: `git clone https://github.com/whoisryosuke/geometry-node-graph.git`
1. Install dependencies: `yarn`
1. Start the dev server: `yarn dev`

Open the app in your web browser, you should see a node graph.

## Previewing your nodes

This app works by using JSON files with geometry node data exported from Blender using a custom plugin (TBD). But I included the WIP script below, it should work to export some basic graphs (haven't tested stuff like custom nodes, groups, etc).

1. Go to the Scripting tab in Blender (or change one of the windows to scripting)
2. Create a new script (click the "New" button on top of window)
3. Paste the following script inside:

```python
import bpy, json, uuid
from bpy import context
from pathlib import Path

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

            # Add data to node inputs
            node_output["inputs"].append(input_data)


        for output in node.outputs:
            # Store the input data
            output_data = {
                "description": output.description,
                "display_shape": output.display_shape,
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

            # Add data to node inputs
            node_output["outputs"].append(output_data)

        #print("node_output", node_output)
        nodes_json.append(node_output)

    output_json["nodes"] = nodes_json

    # Loop through links
    print("links", node_group.links)
    print("links props", dir(node_group.links))
    for link in node_group.links:
        print("link", link)
        print("link props", dir(link))
        print("link from_node", link.from_node)
        print("link from_socket", link.from_socket)
        print("link from_socket", dir(link.from_socket))
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

```

4. Run the script.
5. Look inside the folder where your file is saved, you should a JSON file
6. Copy and paste that JSON file into the `src/data/` folder of this app.
7. Open up the `src/App.tsx` and swap your JSON filename for the one imported in there.
8. Hard refresh the browser/app to see changes.

## How it works

This app uses react-flow to display the node graph. It provides a lot of nice stuff out of the box, like the zooming and panning.

The nodes are generated from a JSON file that is exported from Blender using a custom Python script. It basically reads the geometry node data and creates a JSON file with the data.

> Interested in learning more? [Check out my blog](https://whoisryosuke.com/blog), where I break down how this works.
