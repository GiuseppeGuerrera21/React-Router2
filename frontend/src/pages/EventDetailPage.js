import EventItem from "../components/EventItem";
import { redirect, useRouteLoaderData } from "react-router-dom";
export default function EventDetailPage() {
    const data = useRouteLoaderData('event-detail');

    return <EventItem event={data.event} />;
}

export async function loader({ request, params }) {
    const id = params.id;

    const response = await fetch('http://localhost:8080/events/' + id);

    if (!response.ok) {
        throw new Response(
            JSON.stringify({ message: 'Could not fetch details for the selected event.' }),
            { status: 500 }
        );
    } else {
        return response;
    }
}

export async function action({ request, params }) {
    const id = params.id;
    const response = await fetch('http://localhost:8080/events/' + id, {
        method: request.method,
    });

    if (!response.ok) {
        throw new Response(
            JSON.stringify({ message: 'Could not fetch details for the selected event.' }),
            { status: 500 }
        );
    }
    return redirect('/events');
}