import { Form, useNavigate, useActionData, useNavigation, redirect  } from 'react-router-dom';
import classes from './EventForm.module.css';

function EventForm({ method, event }) {
  const navigate = useNavigate();
  const data = useActionData();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === 'submitting';

  function cancelHandler() {
    navigate('..');
  }

  return (
    <Form method={method} className={classes.form}>
      {data && data.errors && (
        <ul>
          {Object.values(data.errors).map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
      <p>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          required
          defaultValue={event ? event.title : ''}
        />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input 
        id="image" 
        type="url" 
        name="image" 
        required 
        defaultValue={event ? event.image : ''}
        />
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input 
        id="date" 
        type="date" 
        name="date" 
        required 
        defaultValue={event ? event.date : ''}
        />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea 
        id="description" 
        name="description" 
        rows="5" 
        required
        defaultValue={event ? event.description : ''}
        />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
          {isSubmitting ? 'Canceling...' : 'Cancel'}
        </button>
        <button disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Save'}</button>
      </div>
    </Form>
  );
}

export default EventForm;

export async function action({ request, params }) {
  const method = request.method;
  const data = await request.formData();

  const eventData = {
      title: data.get('title'),
      image: data.get('image'),
      date: data.get('date'),
      description: data.get('description'),
  };

  let url = 'http://localhost:8080/events';
  const id = params.id;
  
  if(method === 'PATCH') {
      url = 'http://localhost:8080/events/' + id;
  }

  const response = await fetch(url, {
      method: method,
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData),
  });

  if(response.status === 422) {
      return response;
  }

  if (!response.ok) {
  throw JSON.stringify({ message: 'Could not create event.' }, { status: 500 });
  }

  return redirect('/events');
}
