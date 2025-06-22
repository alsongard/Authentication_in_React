import { Link } from "react-router-dom"
export default function PageLost()
{
    return (
        <section>
            <p>No page with the given url Go back.</p>
            <Link to="/">Go Back</Link>
        </section>
    )
}