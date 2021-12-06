import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import moment from 'moment';


function CalendarList()
{
    const [events, setEvents] = useState([]);

    const fetchData = async () => {
        try {
            const response = await fetch('https://customerrest.herokuapp.com/gettrainings');
            const data = await response.json();
            let content = data;
            content.map(x => x.fullname = x.customer.firstname + " " + x.customer.lastname)
            
            let events = [];
            content.forEach(x => {
                let title = x.activity +" / "+x.customer.firstname + " " + x.customer.lastname;
                let start = moment(x.date).format();
                let end = moment(x.date).add(x.duration,"minutes").format();

                events.push({title : title,start:start,end:end})
            });
            console.log(events);
            setEvents(events);
        }
        catch (error) {
            console.error(error);
        }
    }
    React.useEffect(_ => fetchData(), []);


    return (
    <>
    <h1>Calendar</h1>
    <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin  ]}
        initialView="dayGridMonth"
        themeSystem='standard'
        height={"auto"}
        headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,dayGridDay,listWeek'
          }}
          events={{events}}
      />
    </>)
}

export default CalendarList;