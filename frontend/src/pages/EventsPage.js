import { Link } from "react-router-dom";

const EVENTS = [
    {
        id: 'e1',
        title: 'A Dummy Event',
    },
    {
        id: 'e2',
        title: 'A Second Dummy Event',
    },
    {
        id: 'e3',
        title: 'A Third Dummy Event',
    }
];
export default function EventPage() {

    return (
        <div>
            <h1>Events </h1>
            <ul>
                {EVENTS.map((event) => (
                    <li key={event.id}>
                        <Link to={event.id}>{event.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}