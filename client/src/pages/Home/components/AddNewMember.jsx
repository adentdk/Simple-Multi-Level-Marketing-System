export default function AddNewMember({ onSubmit }) {
  return (
    <div className="mb-10">
      <figure>
        <figcaption className="uppercase">tambah member baru</figcaption>

        <form onSubmit={onSubmit} method="post" action="/api/v1/members" className="flex flex-wrap gap-4">
          <input
            className="w-full lg:w-1/3 h-10 rounded-lg px-4 outline-1 outline-blue-400 border-2"
            name="name"
            required
            placeholder="Member name"
            autoCapitalize="off"
            autoComplete="off"
            type="text"
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
        </form>
      </figure>
    </div>
  )
}