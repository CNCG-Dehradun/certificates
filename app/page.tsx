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
        
        const uniqueEvents = [...new Set(data.map(attendee => attendee.event))]
        if (uniqueEvents.length === 0) {
          setError("No events found")
          return
        }
        
        setSelectedEvent(uniqueEvents[0])
      } catch (error) {
        setError(error.message || "Failed to load attendees")
      } finally {
        setLoading(false)
      }
    }

    loadAttendees()
  }, [])

  const filteredAttendees = attendees.filter(
    attendee => attendee.event === selectedEvent
  )

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-pulse">Loading certificates...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-red-500 gap-4">
        <p>{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-red-100 rounded-lg hover:bg-red-200"
        >
          Try Again
        </button>
      </div>
    )
  }

  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        CNCG Dehradun E-Certificates
      </h1>
      
      <div className="mb-8">
        <label htmlFor="event-select" className="block text-sm font-medium text-gray-700 mb-2">
          Select Event:
        </label>
        <select
          id="event-select"
          value={selectedEvent}
          onChange={(e) => setSelectedEvent(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        >
          {[...new Set(attendees.map(attendee => attendee.event))].map(event => (
            <option key={event} value={event}>
              {event}
            </option>
          ))}
        </select>
      </div>

      <Search attendees={filteredAttendees} onSelect={setSelectedAttendee} />

      {selectedAttendee && (
        <div className="mt-8 space-y-6">
          <Certificate attendee={selectedAttendee} />
          <SocialShare attendee={selectedAttendee} />
        </div>
      )}

      {!selectedAttendee && !loading && (
        <div className="text-center mt-8 text-gray-500">
          Search and select your name to view certificate
        </div>
      )}
    </main>
  )
}