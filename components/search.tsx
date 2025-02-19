"use client"

import { useState } from "react"

export default function Search({ attendees, onSelect }) {
  const [query, setQuery] = useState("")

  const filteredAttendees = attendees.filter((attendee) =>
    attendee.name.toLowerCase().includes(query.toLowerCase())
  )

  const handleSelect = (attendee) => {
    onSelect(attendee)
    setQuery("") 
  }

  return (
    <div className="mb-8 w-full max-w-lg mx-auto">
      <input
        type="text"
        placeholder="Search your name..."
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {query && (
        <ul className="mt-2 border border-gray-300 rounded-lg max-h-60 overflow-y-auto bg-white shadow-md">
          {filteredAttendees.map((attendee) => (
            <li
              key={attendee.id}
              className="p-3 hover:bg-gray-100 cursor-pointer text-sm sm:text-base"
              onClick={() => handleSelect(attendee)}
            >
              {attendee.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}