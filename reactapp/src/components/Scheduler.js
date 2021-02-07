import React from "react"
import axios from "axios"
import Modal from "react-bootstrap/Modal"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import listPlugin from "@fullcalendar/list"
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
      isFiltered: false,
    }
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData = () => {
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
        title: event.client + "/" + event.order_name + "/" + event.machine_name,
        start: event.start_date, // OVISNO DALI JE UKLJUCUJUCI DAN ILI NE
        end: event.end_date,
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
      machine_name: this.state.machine_name,
    }
    axios
      .post("http://localhost:8000/api/Order", data)
      .then((res) => {
        toast.success("Uspješno dodano")
        console.log(res)
        this.handleClose()
        this.fetchData()
      })
      .catch((err) => {
        toast.error("Došlo je do pogreške")
        console.log(err)
      })
  }

  getUniqueListBy = (arr, key) => {
    return [...new Map(arr.map((item) => [item[key], item])).values()]
  }

  handleClient = (e) => {
    let data = []
    let filteredByClient = []

    if (this.state.isFiltered) {
      data = this.state.newData
      console.log("data", data)
      for (let i = 0; i < data.length; i++) {
        if (data[i].client === e.target.value) {
          filteredByClient.push(data[i])
        }
      }
    } else {
      data = this.state.data
      console.log("data", data)
      for (let i = 0; i < data.length; i++) {
        if (data[i].client === e.target.value) {
          filteredByClient.push(data[i])
        }
      }
      filteredByClient = filteredByClient.map((event) => {
        let events = {
          id: event.id,
          title:
            event.client + "/" + event.order_name + "/" + event.machine_name,
          start: event.start_date, // OVISNO DALI JE UKLJUCUJUCI DAN ILI NE
          end: event.end_date,
          client: event.client,
          order_name: event.order_name,
          machine_name: event.machine_name,
        }
        return events
      })
    }
    console.log("filteredByClient", filteredByClient)

    this.setState({
      newData: filteredByClient,
      isFiltered: true,
    })
  }
  handleOrder = (e) => {
    let data = []
    let filteredByOrder = []

    if (this.state.isFiltered) {
      data = this.state.newData
      console.log("data", data)
      for (let i = 0; i < data.length; i++) {
        if (data[i].order_name === e.target.value) {
          filteredByOrder.push(data[i])
        }
      }
    } else {
      data = this.state.data

      console.log("data", data)
      for (let i = 0; i < data.length; i++) {
        if (data[i].order_name === e.target.value) {
          filteredByOrder.push(data[i])
        }
      }
      filteredByOrder = filteredByOrder.map((event) => {
        let events = {
          id: event.id,
          title:
            event.client + "/" + event.order_name + "/" + event.machine_name,
          start: event.start_date, // OVISNO DALI JE UKLJUCUJUCI DAN ILI NE
          end: event.end_date,
        }
        return events
      })
    }

    console.log("filteredByOrder", filteredByOrder)

    this.setState({
      newData: filteredByOrder,
      isFiltered: true,
    })
  }
  handleMachine = (e) => {
    let data = []
    let filteredByMachine = []

    if (this.state.isFiltered) {
      data = this.state.newData
      console.log("data", data)
      for (let i = 0; i < data.length; i++) {
        if (data[i].machine_name === e.target.value) {
          filteredByMachine.push(data[i])
        }
      }
    } else {
      data = this.state.data
      console.log("data", data)
      for (let i = 0; i < data.length; i++) {
        if (data[i].machine_name === e.target.value) {
          filteredByMachine.push(data[i])
        }
      }
      filteredByMachine = filteredByMachine.map((event) => {
        let events = {
          id: event.id,
          title:
            event.client + "/" + event.order_name + "/" + event.machine_name,
          start: event.start_date, // OVISNO DALI JE UKLJUCUJUCI DAN ILI NE
          end: event.end_date,
        }
        return events
      })
    }
    console.log("filteredByMachine", filteredByMachine)

    this.setState({
      newData: filteredByMachine,
      isFiltered: true,
    })
  }

  handleRemoveFilter = () => {
    window.location.reload()
    console.log("object", this.state)
  }

  render() {
    const {
      order_name,
      client,
      order_quantity,
      start_date,
      end_date,
      machine_name,
      data,
    } = this.state
    console.log("state", this.state)

    const uniqueClientData = this.getUniqueListBy(data, "client")
    const uniqueOrdertData = this.getUniqueListBy(data, "order_name")
    const uniqueMachineData = this.getUniqueListBy(data, "machine_name")

    if (this.state.isLoading) {
      return <h1>Loading...</h1>
    } else {
      return (
        <div className="demo-app">
          <div className="demo-app-sidebar">
            <div className="demo-app-sidebar-section">
              <h2>Filter</h2>
              <Form.Group className="demo-app-sidebar-section-client">
                <Form.Label>Sort by client:</Form.Label>
                <Form.Control
                  size="sm"
                  as="select"
                  onChange={this.handleClient}
                >
                  <option>Select...</option>
                  {uniqueClientData.map((list) => (
                    <option key={list.id} value={list.client}>
                      {list.client}
                    </option>
                  ))}{" "}
                </Form.Control>
              </Form.Group>
              <Form.Group className="demo-app-sidebar-section-order">
                <Form.Label>Sort by order:</Form.Label>
                <Form.Control size="sm" as="select" onChange={this.handleOrder}>
                  <option>Select...</option>
                  {uniqueOrdertData.map((list) => (
                    <option key={list.id} value={list.order_name}>
                      {list.order_name}
                    </option>
                  ))}{" "}
                </Form.Control>
              </Form.Group>
              <Form.Group className="demo-app-sidebar-section-machine">
                <Form.Label>Sort by machine:</Form.Label>
                <Form.Control
                  size="sm"
                  as="select"
                  onChange={this.handleMachine}
                >
                  <option>Select...</option>
                  {uniqueMachineData.map((list) => (
                    <option key={list.id} value={list.machine_name}>
                      {list.machine_name}
                    </option>
                  ))}{" "}
                </Form.Control>
              </Form.Group>
              <Button variant="danger" onClick={this.handleRemoveFilter}>
                Remove filter
              </Button>
            </div>
          </div>{" "}
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
                  <Form.Label>Machine name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Machine name"
                    name="machine_name"
                    value={machine_name}
                    onChange={this.changeHandler}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Start Date</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    name="start_date"
                    value={start_date}
                    onChange={this.changeHandler}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>End Date</Form.Label>
                  <Form.Control
                    type="datetime-local"
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
              plugins={[
                dayGridPlugin,
                timeGridPlugin,
                interactionPlugin,
                listPlugin,
              ]}
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,listWeek",
              }}
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
