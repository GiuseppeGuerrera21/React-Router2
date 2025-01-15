// Challenge / Exercise

// BONUS: Add another (nested) layout route that adds the <EventNavigation> component above all /events... page components
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLoyout from "./pages/RootLoyout";
import EventsRoot from "./pages/EventsRoot";

import HomePage from "./pages/HomePage";
import EventPage from "./pages/EventsPage";
import EditEventPage from "./pages/EditEventPage";
import EventDetailPage from "./pages/EventDetailPage";
import NewEventPage from "./pages/NewEventPage";
// import NewEventPage from "./pages/ErrorPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLoyout />,
      // errorElement: <ErrorPage />,
      children: [
        { index: true, element: <HomePage /> },
        { path : "events", 
          element: <EventsRoot />, 
          children: [
          { index: true, element: <EventPage /> },
          {path: "new", element: <NewEventPage /> },
          { path: ":id", element: <EventDetailPage /> },
          { path: ":id/edit", element: <EditEventPage /> },
        ]},
      ]
    }
  ]);
  return (
    <RouterProvider router={router} />
  );
}

export default App;
