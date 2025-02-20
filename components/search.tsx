"use client"

import { useState, ChangeEvent } from "react"

interface Attendee {
  id: string
  name: string
  event: string
  date: string
}

interface SearchProps {
  attendees: Attendee[]
  onSelect: (attendee: Attendee) => void
}

export default function Search({ attendees, onSelect }: SearchProps) {
  const [query, setQuery] = useState("")

  const filteredAttendees = attendees.filter((attendee) =>
    attendee.name.toLowerCase().includes(query.toLowerCase())
  )

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Search by name..."
        value={query}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded-md"
      />
      <ul>
        {filteredAttendees.map((attendee) => (
          <li
            key={attendee.id}
            onClick={() => onSelect(attendee)}
            className="cursor-pointer p-2 hover:bg-gray-100"
          >
            {attendee.name}
          </li>
        ))}
      </ul>
    </div>
  )
}
