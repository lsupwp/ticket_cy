import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 space-y-6">
      <Link href="/scanner">
        <p className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
          Go to Scanner
        </p>
      </Link>
      <Link href="/attendees">
        <p className="px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition">
          View Attendees
        </p>
      </Link>
    </div>
  )
}
