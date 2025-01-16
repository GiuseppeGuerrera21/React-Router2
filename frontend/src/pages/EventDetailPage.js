import EventItem from "../components/EventItem";
import EventsList from "../components/EventsList";
import { Await, redirect, useRouteLoaderData } from "react-router-dom";
import { Suspense } from "react";
export default function EventDetailPage() {
    const { event, events } = useRouteLoaderData('event-detail');

    return (
        <>
            <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
                <Await resolve={event}>
                    {(loadedEvent) => <EventItem event={loadedEvent} />}
                </Await>
            </Suspense>
            <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
                <Await resolve={events}>
                    {(loadedEvents) => <EventsList events={loadedEvents} />}
                </Await>
            </Suspense>
        </>
    )
}

export async function loadEvents() {
    const response = await fetch("http://localhost:8080/events");

    if (!response.ok) {
        throw new Response(JSON.stringify({ message: "Could not fetch events." }), {
            status: 500,
        });
    } else {
        const resData = await response.json();
        return resData.events;
    }
}

export async function loadEvent(id) {
    const response = await fetch("http://localhost:8080/events/" + id);

    if (!response.ok) {
        throw new Response(
            JSON.stringify({
                message: "Could not fetch details for selected event.",
            }),
            {
                status: 500,
            }
        );
    } else {
        const resData = await response.json();
        return resData.event;
    }
}

export async function loader({ request, params }) {
    const id = params.eventId;

    return {
        event: await loadEvent(id),
        events: loadEvents()
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