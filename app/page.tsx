"use client"

import { useState, useEffect } from "react"
import Search from "@/components/search"
import Certificate from "@/components/certificate"
import SocialShare from "@/components/social-share"
import { fetchAttendees } from "@/lib/utils"

export default function Home() {
  const [attendees, setAttendees] = useState([])
  const [selectedAttendee, setSelectedAttendee] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedEvent, setSelectedEvent] = useState("")

  useEffect(() => {
    const loadAttendees = async () => {
      try {
        const data = await fetchAttendees()
        setAttendees(data)
        const events = [...new Set(data.map((attendee) => attendee.event))]
        setSelectedEvent(events[0])
        setLoading(false)
      } catch (err) {
        setError("Failed to load attendees. Please try again later.")
        setLoading(false)
      }
    }

    loadAttendees()
  }, [])

  const filteredAttendees = attendees.filter((attendee) => attendee.event === selectedEvent)

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>
  if (error) return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">CNCG Dehradun E-Certificates</h1>
      <div className="mb-4">
        <label htmlFor="event-select" className="block mb-2">
          Select Event:
        </label>
        <select
          id="event-select"
          value={selectedEvent}
          onChange={(e) => setSelectedEvent(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        >
          {[...new Set(attendees.map((attendee) => attendee.event))].map((event) => (
            <option key={event} value={event}>
              {event}
            </option>
          ))}
        </select>
      </div>
      <Search attendees={filteredAttendees} onSelect={setSelectedAttendee} />
      {selectedAttendee && (
        <div className="mt-8">
          <Certificate attendee={selectedAttendee} />
          <SocialShare attendee={selectedAttendee} />
        </div>
      )}
    </main>
  )
}

