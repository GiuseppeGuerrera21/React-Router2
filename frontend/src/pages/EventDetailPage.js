import { Link, useParams } from "react-router-dom";

export default function EventDetailPage() {

    const params = useParams();

    return (
        <div>
            <h1>Event Detail</h1>
            <h2>{params.id}</h2>
            <Link to=".." relative="path">Back</Link>
        </div>
    );
}