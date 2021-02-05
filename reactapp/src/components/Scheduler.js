import React from "react"
import axios from "axios"
import Modal from "react-bootstrap/Modal"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"
// import { createEventId } from "./event-utils"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "./main.css"
import "bootstrap/dist/css/bootstrap.min.css"

toast.configure()

export default class Scheduler extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      data: [],
      isLoading: true,
      newData: [],
      openModal: false,
      postData: {
        order_name: "",
        client: "",
        order_quantity: 0,
        start_date: "",
        end_date: "",
      },
    }
  }

  componentDidMount() {
    axios
      .get("http://localhost:8000/api/Order")
      .then((res) =>
        this.setState({
          data: res.data,
        })
      )
      .then(this.handleData)
  }

  handleData = () => {
    let newData = this.state.data.map((event) => {
      let events = {
        id: event.id,
        title: event.client + "/" + event.order_name,
        start: event.start_date + "T12:00:00", // OVISNO DALI JE UKLJUCUJUCI DAN ILI NE
        end: event.end_date + "T12:00:00",
      }
      return events
    })
    console.log("newData", newData)
    this.setState({
      newData: newData,
      isLoading: false,
    })
  }

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  submitHandler = (e) => {
    e.preventDefault()
    let data = {
      order_name: this.state.order_name,
      client: this.state.client,
      order_quantity: this.state.order_quantity,
      start_date: this.state.start_date,
      end_date: this.state.end_date,
    }
    axios
      .post("http://localhost:8000/api/Order", data)
      .then((res) => {
        toast.success("Uspješno dodano")
        console.log(res)
        this.handleClose()
      })
      .catch((err) => {
        toast.error("Došlo je do pogreške")
        console.log(err)
      })

    // window.location.reload()
  }

  render() {
    const {
      order_name,
      client,
      order_quantity,
      start_date,
      end_date,
    } = this.state
    if (this.state.isLoading) {
      return <h1>Loading...</h1>
    } else {
      return (
        <div className="demo-app">
          <Modal show={this.state.openModal} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add Event</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group>
                  <Form.Label>Order name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter order name"
                    name="order_name"
                    value={order_name}
                    onChange={this.changeHandler}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Client</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter client name"
                    name="client"
                    value={client}
                    onChange={this.changeHandler}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Order Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter order Quantity"
                    name="order_quantity"
                    value={order_quantity}
                    onChange={this.changeHandler}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Start Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="start_date"
                    value={start_date}
                    onChange={this.changeHandler}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>End Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="end_date"
                    value={end_date}
                    onChange={this.changeHandler}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={this.submitHandler}>
                Add event
              </Button>
            </Modal.Footer>
          </Modal>
          <div className="demo-app-main">
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              // headerToolbar={{
              //     left: "prev,next today",
              //     center: "title",
              //     right: "dayGridMonth,timeGridWeek,timeGridDay",
              //   }}
              initialView="dayGridMonth"
              editable={true}
              selectable={true}
              selectMirror={true}
              dayMaxEvents={true}
              //   initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
              events={this.state.newData}
              select={this.handleDateSelect}
              //   eventContent={renderEventContent} // custom render function
              eventClick={this.handleEventClick}
              // eventRemove={this.handleDelete}
              //   eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
              /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}
            */
            />
          </div>
        </div>
      )
    }
  }

  handleDateSelect = () => {
    this.setState({
      openModal: true,
    })
  }

  handleClose = () => {
    this.setState({
      openModal: false,
    })
  }

  //   handleDateSelect = (selectInfo) => {
  //     let title = prompt("Please enter a new title for your event")
  //     // let startDate = prompt("Please enter a new startDate for your event")
  //     // let endDate = prompt("Please enter a new endDate for your event")

  //     let calendarApi = selectInfo.view.calendar

  //     calendarApi.unselect() // clear date selection

  //     if (title) {
  //       calendarApi.addEvent({
  //         id: createEventId(),
  //         title,
  //         start: selectInfo.startStr,
  //         end: selectInfo.endStr,
  //         allDay: selectInfo.allDay,
  //       })
  //     }
  //   }

  handleEventClick = (clickInfo) => {
    console.log("INFOtitle", clickInfo.event._def.title)
    console.log("INFOdateStart", clickInfo.event._instance.range.start)
    console.log("INFOdateEnd", clickInfo.event._instance.range.end)

    let deleteEvent = this.state.newData.find(
      (event) => event.title === clickInfo.event._def.title
    )

    console.log("deleteEvent", deleteEvent)
  }

  //   handleEvents = (events) => {
  //     this.setState({
  //       currentEvents: events,
  //     })
  //   }
  // }

  // function renderEventContent(eventInfo) {
  //   return (
  //     <>
  //       <b>{eventInfo.timeText}</b>
  //       <i>{eventInfo.event.title}</i>
  //     </>
  //   )
}