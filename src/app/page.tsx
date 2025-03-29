import { redirect } from 'next/navigation';

export default function PreviewPage() {
  redirect('/tasks/1');
}