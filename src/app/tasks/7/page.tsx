import Task7Form from '@/app/tasks/7/client-page';
import MoveButtons from '@/components/move-buttons';

export const metadata = {
  title: 'Задание 7',
};

export default function Task7Page() {
  return (
    <>
      <Task7Form />
      <MoveButtons id={7} />
    </>
  )
}
