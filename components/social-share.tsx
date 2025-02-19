"use client"

export default function SocialShare({ attendee }) {
  const shareText = `I successfully attended ${attendee.event} on ${attendee.date}! 🎉`
  const shareUrl = "https://cncg-dehradun.vercel.app"

  const socialLinks = [
    {
      name: "LinkedIn",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}&summary=${encodeURIComponent(shareText)}`,
      icon: "👔",
      color: "bg-blue-600"
    },
    {
      name: "Twitter",
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      icon: "🐦",
      color: "bg-blue-400"
    }
  ]

  return (
    <div className="mt-6 w-full max-w-2xl px-4">
      <div className="bg-gray-50 p-4 sm:p-6 rounded-xl">
        <p className="text-center text-lg sm:text-xl font-medium text-gray-800 mb-4">
          🎉 Share your achievement
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`${link.color} text-white flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm sm:text-base hover:opacity-90 transition-opacity`}
            >
              <span>{link.icon}</span>
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}