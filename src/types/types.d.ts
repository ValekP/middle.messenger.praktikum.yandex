declare global {
    export type Indexed<T = any> = {
        [key in string]: T
    }

    export type TProps = Record<string, any>

    export type TPathname = string
}

export {}
