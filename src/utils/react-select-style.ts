export const darkSelectEditStyles = {
    control: (base: any) => ({
        ...base,
        backgroundColor: '#262626',
        borderColor: '#525252',
        color: '#fff',
        minHeight: '40px',
        '&:hover': { borderColor: '#a3a3a3' },
    }),
    menu: (base: any) => ({
        ...base,
        backgroundColor: '#1a1a1a',
        border: '1px solid #404040',
    }),
    option: (base: any, state: any) => ({
        ...base,
        backgroundColor: state.isFocused ? '#dc2626' : 'transparent',
        color: '#e5e5e5',
        '&:active': { backgroundColor: '#b91c1c' },
    }),
    multiValue: (base: any) => ({
        ...base,
        backgroundColor: '#dc2626',
        borderRadius: '4px',
    }),
    multiValueLabel: (base: any) => ({
        ...base,
        color: '#fff',
        fontSize: '12px',
        fontWeight: 600,
    }),
    multiValueRemove: (base: any) => ({
        ...base,
        color: '#fca5a5',
        '&:hover': { backgroundColor: '#b91c1c', color: '#fff' },
    }),
    placeholder: (base: any) => ({ ...base, color: '#737373' }),
    input: (base: any) => ({ ...base, color: '#fff' }),
}

export const darkSelectGenreStyle = {
    control: (base: any) => ({
        ...base,
        backgroundColor: '#262626',
        borderColor: '#525252',
        color: '#fff',
        minHeight: '40px',
        '&:hover': { borderColor: '#a3a3a3' },
    }),
    menu: (base: any) => ({
        ...base,
        backgroundColor: '#1a1a1a',
        border: '1px solid #404040',
    }),
    option: (base: any, state: any) => ({
        ...base,
        backgroundColor: state.isFocused ? '#dc2626' : 'transparent',
        color: '#e5e5e5',
        '&:active': { backgroundColor: '#b91c1c' },
    }),
    singleValue: (base: any) => ({ ...base, color: '#e5e5e5' }),
    placeholder: (base: any) => ({ ...base, color: '#737373' }),
    input: (base: any) => ({ ...base, color: '#fff' }),
}