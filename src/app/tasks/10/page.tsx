import Task10Form from '@/app/tasks/10/client-page';
import MoveButtons from '@/components/move-buttons';

export const metadata = {
  title: 'Задание 10',
};

export default function Task10Page() {
  return (
    <>
      <Task10Form />
      <MoveButtons id={10} />
    </>
  )
}
