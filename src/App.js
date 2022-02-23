// import logo from './logo.svg';
import { useState, useEffect, useCallback } from 'react'
import { BiCalendar } from 'react-icons/bi'
import Search from './components/Search'
import AddAppointment from './components/AddAppointment'
import AppointmentInfo from './components/AppointmentInfo'
// import './App.css';

function App() {
  const [appointmentList, setAppointmentList] = useState([])
  const [query, setQuery] = useState('')
  const [sortBy, setSortBy] = useState('petName')
  const [orderBy, setOrderBy] = useState('asc')

  const searched = appointmentList.filter(x => {
    return (
      x.petName.toLowerCase().includes(query.toLowerCase()) ||
      x.ownerName.toLowerCase().includes(query.toLowerCase()) ||
      x.aptNotes.toLowerCase().includes(query.toLowerCase())

    )
  }).sort((a, b) => {
    // ascending or descending
    let order = orderBy === 'asc' ? 1 : -1
    return (
      // a and b are items in the arr, compare them
      a[sortBy].toLowerCase() < b[sortBy].toLowerCase() ?
        // when a < b, return -1, otherwise return 1
        // according to syntaxt of sort()
        /*
          function compare(a, b) {
            if (a should be before b) {
              return -1;
            }
            if (b should be before a) {
              return 1;
            }
            // a must be equal to b
            return 0;
          }
        */
        -1 * order : 1 * order
    )
  })
  const fetchData = useCallback(() => {
    fetch('./data.json')
      .then(res => res.json())
      .then(setAppointmentList)
  }, [])
  useEffect(() => {
    fetchData()
  }, [fetchData])
  return (
    <div className="container mx-auto mt-3 font-thin">
      <h1 className="text-5xl mb-3">Hello <BiCalendar className="inline-block text-red-400 align-top" /></h1>
      <AddAppointment lastId={appointmentList.length} addAppointment={appointment => setAppointmentList([...appointmentList, appointment])} />
      <Search onQueryChange={
        val => setQuery(val)
      } query={query} setOrderBy={setOrderBy}
        orderBy={orderBy}
        onOrderByChange={mySort => setOrderBy(mySort)}
        sortBy={sortBy}
        onSortByChange={mySort => setSortBy(mySort)} />
      <ul className="divide-y divide-gray-200">
        {searched.map(appointment => (
          <AppointmentInfo key={appointment.id} appointment={appointment}
            onDelete={
              // id is from child component
              id => setAppointmentList(appointmentList.filter(x => x.id !== id))
            } />
        ))}
      </ul>
    </div>
  );
}

export default App;
