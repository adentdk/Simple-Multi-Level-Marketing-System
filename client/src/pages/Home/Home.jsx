import { useCallback, useEffect, useState } from "react"
import MemberTreeView from "./components/MemberTreeView";
import AddNewMember from "./components/AddNewMember";

function Home() {
  const [loading, setLoading] = useState(false);
  const [members, setMembers] = useState([]);

  const handleFetchMember = useCallback((parentId = null) => {
    setLoading(true);

    let params = {}

    if (parentId) {
      params.parentId = parentId;
    }

    params = new URLSearchParams(params).toString();

    fetch(`/api/v1/members?${params}`)
      .then(res => res.json())
      .then(res => {
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
      .then(res => res.json())
      .then(res => {
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

  useEffect(() => {
    handleFetchMember();
  }, [])

  return (
    <div className="container mx-auto py-10">
      <AddNewMember onSubmit={handleAddMember} />
      <MemberTreeView members={members} fetchMember={handleFetchMember} />
    </div>
  )
}

export default Home
