import { useCallback, useEffect, useMemo, useState } from "react"

function Home() {
  const [loading, setLoading] = useState(false);
  const [members, setMembers] = useState([]);

  const handleFetchMember = useCallback((parentId = null) => {
    setLoading(true);

    fetch('/api/v1/members')
    .then(res => res.json())
    .then(res => {
      setMembers(res.data)
    })
    .finally(setLoading(false))
  }, [])

  useEffect(() => {
    handleFetchMember();
  }, [])

  const memberTreeComponents = useMemo(() => {
    const mapMember = (_members) => {
      return _members.map((member, index) => {
        return (
          <li key={member.id}>
            <code>{member.name}</code>
            {member.children?.length && (
              <ul>
                {mapMember(member.children)}
              </ul>
              )}
          </li>
        )
      })
    }

    return mapMember(members)

  }, [members]);

  return (
    <div className="App">
      <ul class="tree">
        <li><code>ADMIN</code>
          <ul>
            {memberTreeComponents}
          </ul>
        </li>
      </ul>
    </div>
  )
}

export default Home
