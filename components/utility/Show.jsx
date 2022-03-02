export default function Show({ show = true, children }) {
    return (
        <div style={{ display: show ? null : 'none' }}>
            { children }
        </div>
    )
}