import Task6Form from '@/app/tasks/6/client-page';
import MoveButtons from '@/components/move-buttons';

export const metadata = {
  title: 'Задание 6',
};

export default function Task6Page() {
  return (
    <>
      <Task6Form />
      <MoveButtons id={6} />
    </>
  )
}
