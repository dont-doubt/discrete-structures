import Task9Form from '@/app/tasks/9/client-page';
import MoveButtons from '@/components/move-buttons';

export const metadata = {
  title: 'Задание 9',
};

export default function Task9Page() {
  return (
    <>
      <Task9Form />
      <MoveButtons id={9} />
    </>
  )
}
