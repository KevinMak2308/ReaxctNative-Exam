import { Event } from "../../entities/Event";
import { User } from "../../entities/User"

export const FETCH_EVENTS = 'FETCH_EVENTS';
export const ADD_EVENT = 'ADD_EVENTS';
export const USER_PARTICIPATING = 'USER_PARTICIPATING';

export const fetchEvents = () => {
    return async (dispatch: any) => {
        const response = await fetch(
            'https://k-osexamreact-default-rtdb.europe-west1.firebasedatabase.app/events.json', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        );

        if (!response.ok) {
            console.log("Failed Response")
        } else {
            const data = await response.json()
            let events: Event[] = [];
            let participating = []
            for (const key in data) {
                const eventObject = data[key];
                events.push(new Event(eventObject.title, eventObject.description, eventObject.participating, key))

            

                for (const key2 in data[key].participating) {
                    let participatingInAsingleEvent = data[key].participating[key2]
                     participating.push(participatingInAsingleEvent)

                     const participatingUser = new User(data.email, '', '');

                     //while(data[key].participating[key2] == )
                }

                //søg efter om den burger der er logged in findes i participating array

                //hvis brugeren findes, fjern going knappen for det enkelte event.
                //if(user.email == participating[key2]email)
                

            }

            
            
            console.log("Our Event here: ", events);
            dispatch({ type: FETCH_EVENTS, payload: events })

            console.log("det her userevents", participating);

        }
  




    }
}


export const addEvent = (event: Event) => {
    return async (dispatch: any) => {

        const response = await fetch(
            'https://k-osexamreact-default-rtdb.europe-west1.firebasedatabase.app/events.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                event
            )
        });

        if (!response.ok) {
            console.log("Unable to add a new Event");
        } else {
            const data = await response.json();
            console.log("Our fetched data: ", data);
            event.id = data.name

            dispatch({ type: ADD_EVENT, payload: event });
        }
    }
}

export const userParticipating = (email: string, id: string) => {
    return async (dispatch: any) => {

        const response = await fetch(
            'https://k-osexamreact-default-rtdb.europe-west1.firebasedatabase.app/events/' + id + '/participating.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({

                email: email

            })
        });

        if (!response.ok) {
            console.log("Something went wrong. You cannot participate this event");
        } else {
            const data = await response.json();
            console.log("Our fetched data: ", data);

            const participatingUser = new User(data.email, '', '');

            dispatch({ type: USER_PARTICIPATING, payload: participatingUser });
        }
    }
}
