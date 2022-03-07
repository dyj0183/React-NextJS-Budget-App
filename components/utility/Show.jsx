export default function Show({ show = true, children }) {
    return (
        <div style={{ display: show ? null : 'none', width: '100%' }}>
            { children }
        </div>
    )
}