import React, { Component } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';

const messages = {
  allDay: 'dzień',
  previous: 'poprzedni',
  next: 'następny',
  today: 'dzisiaj',
  month: 'miesiąc',
  week: 'tydzień',
  day: 'dzień',
  date: 'data',
  time: 'czas',
  event: 'zdarzenie', // Or anything you want
  showMore: total => `+ ${total} elementów`
};

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

export default class CalendarComponent extends Component {
  state = {
    events: [
      {
        start: moment(new Date()).add(7, 'hours').toDate(),
        end: moment(new Date()).add(10, 'hours').toDate(),
        title: "Przykładowy log 1",
        id: 1,
        allDay: false,
      },
      {
        start: moment(new Date()).add(6, 'hours').toDate(),
        end: moment(new Date()).add(9, 'hours').toDate(),
        title: "Przykładowy log 2",
        id: 2,
        allDay: false,
      },
      {
        start: moment(new Date()).add(4, 'hours').toDate(),
        end: moment(new Date()).add(5, 'hours').toDate(),
        title: "Przykładowy log 3",
        id: 3,
        allDay: false,
      }
    ]
  };

  onEventResize = ({ start, end, event, resourceId }) => {
    console.log(start, end, event, resourceId);
    // this.setState(state => {
    //   state.events[0].start = start;
    //   state.events[0].end = end;
    //   return { events: state.events };
    // });

    //https://stackoverflow.com/questions/50734092/react-bigcalendar-drag-and-drop-example-not-working
  };

  onEventDrop = ({ event, start, end, allDay }) => {
    console.log(start);
  };

  render() {
    return (
      <DnDCalendar
        defaultDate={new Date()}
        views={['day']}
        defaultView="day"
        messages={messages}
        events={this.state.events}
        localizer={localizer}
        onSelectEvent={(e) => console.log("event selected!", e)}
        onEventDrop={this.onEventDrop}
        onEventResize={this.onEventResize}
        onSelectEventSlot={() => console.log("event slot selected!")}
        scrollToTime={new Date()}
        resizable
        selectable
        style={{ height: '90vh', width: '40vw' }}
        formats={{
          timeGutterFormat: 'HH:mm',
          dayHeaderFormat: 'DD.MM.YYYY'
        }}
      />
    );
  }
}
