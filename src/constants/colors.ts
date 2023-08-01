export type NODE_INPUT_TYPES = 'BOOLEAN' | 'GEOMETRY' | 'VECTOR' | 'CUSTOM' | 'INT' | 'VALUE' | 'OBJECT' | 'RGBA'

// The sockets on nodes. Colors depend on input type.
// (aka "markers" for "edges" in react-flow)
export const SOCKET_COLORS: Record<NODE_INPUT_TYPES, string> = {
    'BOOLEAN': '#C19DCA',
    'GEOMETRY': "#00D6A3",
    'CUSTOM': "#333333",
    'INT': "#598C5C",
    'OBJECT': "#ED9E5C",
    'VECTOR': "#6363C7",
    'RGBA': "#C7C729",
    'VALUE': '#A1A1A1',
}
