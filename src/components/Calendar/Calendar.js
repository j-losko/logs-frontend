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
        start: moment(new Date()).subtract(10, 'hours').toDate(),
        end: moment(new Date()).subtract(7, 'hours').toDate(),
        title: "Przykładowy log 1"
      },
      {
        start: moment(new Date()).subtract(9, 'hours').toDate(),
        end: moment(new Date()).subtract(6, 'hours').toDate(),
        title: "Przykładowy log 2"
      },
      {
        start: moment(new Date()).subtract(5, 'hours').toDate(),
        end: moment(new Date()).subtract(4, 'hours').toDate(),
        title: "Przykładowy log 3"
      }
    ]
  };

  onEventResize = (type, { event, start, end, allDay }) => {
    this.setState(state => {
      state.events[0].start = start;
      state.events[0].end = end;
      return { events: state.events };
    });
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
        onSelectEvent={() => console.log("event selected!")}
        onEventDrop={this.onEventDrop}
        onEventResize={this.onEventResize}
        onSelectEventSlot={() => console.log("event slot selected!")}
        scrollToTime={new Date()}
        resizable
        selectable
        style={{ height: '90vh', width: '40vw' }}
        formats = {{
          timeGutterFormat: 'HH:mm',
          dayHeaderFormat: 'DD.MM.YYYY'
        }}
      />
    );
  }
}
