import { useCallback, useEffect, useState } from "react"
import MemberTreeView from "./components/MemberTreeView";
import AddNewMember from "./components/AddNewMember";
import CalculateBonus from "./components/CalculateBonus";
import MigrateMember from "./components/MigrateMember";

function Home() {
  const [loading, setLoading] = useState(false);
  const [members, setMembers] = useState([]);
  const [memberBonus, setMemberBonus] = useState(null);

  const handleFetchMember = useCallback((parentId = null, deep = null) => {
    setLoading(true);

    let query = {}

    if (parentId) {
      query.parentId = parentId;
    }

    if (deep) {
      query.deep = deep;
    }

    query = new URLSearchParams(query).toString();

    fetch(`/api/v1/members?${query}`)
      .then(res => {
        return res.json()
      })
      .then(res => {
        if (res.error) throw res;
        if (!parentId) {
          setMembers(res.data)
          return;
        }

        setMembers(prev => {
          const deep = (_members, children) => {
            let found = false;

            return _members.map(member => {
              if (found) return member;


              if (member.id === parentId) {
                found = true;
                return {
                  ...member,
                  fetched: true,
                  children,
                }
              }

              if (member.children?.length) {
                return {
                  ...member,
                  children: deep(member.children, children)
                }
              }

              return member;
            })
          }

          return deep(prev, res.data)
        })

      })
      .catch(e => {
        alert(e.message)
      })
      .finally(setLoading(false))
  }, [])

  const handleAddMember = useCallback(e => {
    e.preventDefault();

    setLoading(true)

    const formData = new FormData(e.target);
    formData.forEach((value, key, _formData) => {
      if (!value) _formData.delete(key);
    })
    const body = Object.fromEntries(formData)

    fetch('/api/v1/members', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body)
    })
      .then(res => {
        return res.json()
      })
      .then(res => {
        if (res.error) throw res;
        const newMember = res.data;

        if (!newMember.parentId) {
          setMembers(prev => {
            return [...prev, newMember];
          })
        } else {
          handleFetchMember(newMember.parentId)
        }
      })
      .catch(e => {
        alert(e.message)
      })
      .finally(setLoading(false))

  })

  const handleMigrateMember = useCallback(e => {
    e.preventDefault();

    setLoading(true)

    const formData = new FormData(e.target);
    formData.forEach((value, key, _formData) => {
      if (!value) _formData.delete(key);
    })
    const body = Object.fromEntries(formData)

    fetch(`/api/v1/members/${body.memberId}/migrate`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body)
    })
      .then(res => {
        return res.json()
      })
      .then(res => {
        if (res.error) throw res;
        handleFetchMember()
      })
      .catch(e => {
        alert(e.message)
      })
      .finally(setLoading(false))

  })

  const handleCalculateBonus = useCallback((e) => {
    e.preventDefault();

    setLoading(true)

    const formData = new FormData(e.target);
    formData.forEach((value, key, _formData) => {
      if (!value) _formData.delete(key);
    })
    const body = Object.fromEntries(formData)
    const query = new URLSearchParams(formData).toString()

    fetch(`/api/v1/members/${body.memberId}/bonuses?${query}`)
      .then(res => {
        return res.json()
      })
      .then(res => {
        if (res.error) throw res;
        setMemberBonus(res.data)
      })
      .catch(e => { alert(e.message); console.log(e) })
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    handleFetchMember(null, 1);
  }, [])

  return (
    <div className="container mx-auto py-10 space-y-8">
      <CalculateBonus onSubmit={handleCalculateBonus} onReset={() => setMemberBonus(null)} totalBonuses={memberBonus} />
      <AddNewMember onSubmit={handleAddMember} />
      <MigrateMember onSubmit={handleMigrateMember} />
      <MemberTreeView members={members} fetchMember={handleFetchMember} />
    </div>
  )
}

export default Home
