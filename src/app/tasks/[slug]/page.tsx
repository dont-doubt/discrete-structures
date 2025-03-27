import Link from "next/link";
import { notFound } from "next/navigation";

function Task({id}: {id: number}) {
  return (
    <div className="prose prose-invert prose-zinc">
      <h1>Задание {id}</h1>
      <h2>Задание {id}</h2>
      <p>Аываываыа</p>
    </div>
  )
}

export default async function TaskPage({params}: {params: Promise<{slug: string}>}) {
  const { slug } = await params;
  const id = parseInt(slug);
  if (!id || id < 1 || id > 12) notFound();
  return <Task id={id} />
}
