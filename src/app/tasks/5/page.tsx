import Task5Form from '@/app/tasks/5/client-page';
import MoveButtons from '@/components/move-buttons';

export const metadata = {
  title: 'Задание 5',
};

export default function Task5Page() {
  return (
    <>
      <Task5Form />
      <MoveButtons id={5} />
    </>
  )
}
