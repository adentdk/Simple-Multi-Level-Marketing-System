export default function MigrateMember({ onSubmit }) {
  return (
    <figure className="border border-blue-900 p-4 rounded-md space-y-4">
      <figcaption className="uppercase font-medium">migrasi member / pindah member</figcaption>

      <form onSubmit={onSubmit} method="post" action="/api/v1/members" className="flex flex-wrap gap-4">
        <input
          className="w-full lg:w-1/3 h-10 rounded-lg px-4 outline-1 outline-blue-400 border-2"
          name="memberId"
          required
          placeholder="Member ID"
          min={1}
          type="number"
        />
        <input
          className="w-full lg:w-1/3 h-10 rounded-lg px-4 outline-1 outline-blue-400 border-2"
          name="parentId"
          placeholder="Parent ID"
          min={1}
          type="number"
        />
        <button
          className={'w-full lg:w-fit h-10 py-px px-8 rounded-full uppercase text-sm text-white font-semibold bg-blue-600'}
          type="submit">
          submit
        </button>
        <button
          className={'w-full lg:w-fit h-10 py-px px-8 rounded-full uppercase text-sm text-white font-semibold bg-red-600'}
          type="reset">
          reset
        </button>
      </form>
    </figure>
  )
}