'use client'

interface Lead {
  id: string
  name: string
  phone: string
  event_date: string | null
  message: string | null
  created_at: string
}

interface LeadsTableProps {
  leads: Lead[]
}

export default function LeadsTable({ leads }: LeadsTableProps) {
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  if (leads.length === 0) {
    return (
      <div className="bg-[#F5E6D3] border-2 border-[#6A0F16] rounded-lg p-8 text-center">
        <p className="text-gray-600">No leads yet.</p>
      </div>
    )
  }

  return (
    <div className="bg-[#F5E6D3] border-2 border-[#6A0F16] rounded-lg overflow-hidden shadow-lg">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#6A0F16] text-[#F5E6D3]">
            <tr>
              <th className="px-6 py-4 text-left font-playfair font-semibold">Name</th>
              <th className="px-6 py-4 text-left font-playfair font-semibold">Phone</th>
              <th className="px-6 py-4 text-left font-playfair font-semibold">Event Date</th>
              <th className="px-6 py-4 text-left font-playfair font-semibold">Message</th>
              <th className="px-6 py-4 text-left font-playfair font-semibold">Submitted</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#6A0F16] divide-opacity-20">
            {leads.map((lead) => (
              <tr key={lead.id} className="hover:bg-[#F5E6D3] hover:bg-opacity-50">
                <td className="px-6 py-4 text-gray-900 font-semibold">{lead.name}</td>
                <td className="px-6 py-4 text-gray-700">
                  <a href={`tel:${lead.phone}`} className="hover:text-[#6A0F16]">
                    {lead.phone}
                  </a>
                </td>
                <td className="px-6 py-4 text-gray-700">{formatDate(lead.event_date)}</td>
                <td className="px-6 py-4 text-gray-700 max-w-md truncate">
                  {lead.message || 'No message'}
                </td>
                <td className="px-6 py-4 text-gray-700 text-sm">
                  {formatDate(lead.created_at)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

