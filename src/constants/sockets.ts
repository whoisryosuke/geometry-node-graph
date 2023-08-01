export type SOCKET_TYPES = 'CIRCLE' |
'DIAMOND' |
'DIAMOND_DOT'

const DIAMOND_BASE_STYLES = {
        borderRadius:0,
        transform: "rotate(45deg) translate(-2px, -2px)",
    }

export const SOCKET_STYLES: Record<SOCKET_TYPES, any> = {
    'CIRCLE': {},
    'DIAMOND': DIAMOND_BASE_STYLES,
    'DIAMOND_DOT': {
        ...DIAMOND_BASE_STYLES,
    }
}