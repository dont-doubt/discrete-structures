import Task8Form from '@/app/tasks/8/client-page';
import MoveButtons from '@/components/move-buttons';

export const metadata = {
  title: 'Задание 8',
};

export default function Task8Page() {
  return (
    <>
      <Task8Form />
      <MoveButtons id={8} />
    </>
  )
}
