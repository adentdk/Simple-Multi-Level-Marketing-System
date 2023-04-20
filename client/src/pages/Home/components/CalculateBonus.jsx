export default function CalculateBonus({ onSubmit, onReset, totalBonuses = null }) {
  return (
    <figure className="border border-blue-900 p-4 rounded-md space-y-4">
      <figcaption className="uppercase font-medium">Perhitungan Bonus</figcaption>

      <form onSubmit={onSubmit} onReset={onReset} method="post" action="/api/v1/members" className="flex flex-wrap gap-4">
        <input
          className="w-full lg:w-1/3 h-10 rounded-lg px-4 outline-1 outline-blue-400 border-2"
          name="memberId"
          required
          placeholder="Member Id"
          min={1}
          type="number"
        />
        <select
          className="w-full lg:w-1/3 h-10 rounded-lg px-4 outline-1 outline-blue-400 border-2"
          defaultValue=""
          name="level"
        >
          <option value="">Semua Level</option>
          <option value="1">Level 1</option>
          <option value="2">Level 2</option>
        </select>
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
        {totalBonuses !== null && (
          <div className="w-full bg-green-100 p-4 rounded-md flex justify-between items-center">
            <div>
              Bonus member ini adalah: <span className="font-bold">$ {totalBonuses}</span>
            </div>

            <button className="text-white font-semibold bg-red-600 rounded-full w-8 h-8 flex justify-center items-center text-center" type="reset">&#x2715;</button>
          </div>
        )}
      </form>

    </figure>
  )
}