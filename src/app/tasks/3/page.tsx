import Task3Form from '@/app/tasks/3/client-page';
import MoveButtons from '@/components/move-buttons';

export const metadata = {
  title: 'Задание 3',
};

export default function Task3Page() {
  return (
    <>
      <Task3Form />
      <MoveButtons id={3} />
    </>
  )
}
