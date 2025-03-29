import Task11Form from '@/app/tasks/11/client-page';
import MoveButtons from '@/components/move-buttons';

export const metadata = {
  title: 'Задание 11',
};

export default function Task11Page() {
  return (
    <>
      <Task11Form />
      <MoveButtons id={11} />
    </>
  )
}
