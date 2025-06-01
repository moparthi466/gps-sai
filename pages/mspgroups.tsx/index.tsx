import { useEffect, useState } from 'react'

type MspGroup = {
  id: number
  name: string
}

export default function MspGroupsPage() {
  const [groups, setGroups] = useState<MspGroup[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/msp-groups')
      .then((res) => res.json())
      .then((data) => {
        setGroups(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <div style={{ padding: '2rem' }}>
      <h1>MSP Groups</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <select>
          {groups.map((group) => (
            <option key={group.id} value={group.id}>
              {group.name}
            </option>
          ))}
        </select>
      )}
    </div>
  )
}
