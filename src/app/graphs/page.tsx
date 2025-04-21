import Link from "next/link";

export default function Graphs() {
  return (
    <div className="w-screen h-screen bg-zinc-900 flex flex-col items-center">
      <div className="flex flex-col items-center justify-center mt-200 gap-14">
        <h1 className="text-white font-bold text-7xl">Графы</h1>
        <p className="text-zinc-400 font-semibold text-xl font-family-grotesk">Здесь скоро что-то будет</p>
        <Link className="flex justify-center items-center rounded-xl transition-colors text-white font-bold bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 shadow-xl shadow-indigo-500/20 px-30 py-10" href="/">
          Вернуться назад
        </Link>
      </div>
    </div>
  )
}
