"use client"

import { useRef } from "react"
import html2canvas from "html2canvas"
import { jsPDF } from "jspdf"

export default function Certificate({ attendee }) {
  const certificateRef = useRef(null)

  const downloadCertificate = async () => {
    const certificateElement = certificateRef.current
    const canvas = await html2canvas(certificateElement, { scale: 2 })
    const imgData = canvas.toDataURL("image/png")
    const pdf = new jsPDF("l", "mm", [297, 210])
    pdf.addImage(imgData, "PNG", 0, 0, 297, 210)
    pdf.save(`${attendee.name}_certificate.pdf`)
  }

  return (
    <div className="mb-8 flex flex-col items-center px-4">
      <div
        ref={certificateRef}
        className="w-full max-w-[800px] p-4 sm:p-6 border-2 border-gray-200 rounded-xl bg-white shadow-lg text-center"
      >
        <div className="flex flex-col items-center space-y-4">
          <img
            src="/ CNCG Dehradun Logo.png"
            alt="CNCG Dehradun Logo"
            className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24"
          />
          <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-gray-800">
            Certificate of Participation
          </h2>
        </div>
        
        <div className="my-6 sm:my-8 space-y-4">
          <p className="text-sm sm:text-base text-gray-600">This is to certify that</p>
          <h3 className="text-2xl sm:text-4xl md:text-5xl font-bold text-blue-800">
            {attendee.name}
          </h3>
          <p className="text-sm sm:text-base text-gray-600">has successfully attended</p>
          <p className="text-lg sm:text-2xl md:text-3xl font-semibold text-gray-900">
            {attendee.event}
          </p>
          <p className="text-sm sm:text-base text-gray-600 mt-2">on {attendee.date}</p>
        </div>

        <p className="text-sm sm:text-base text-gray-600 mt-6">
          Organized by <span className="font-semibold text-blue-800">CNCG Dehradun</span>
        </p>
      </div>

      <button
        onClick={downloadCertificate}
        className="mt-6 bg-blue-600 text-white px-8 py-3 rounded-xl text-base sm:text-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
      >
        Download Certificate
      </button>
    </div>
  )
}