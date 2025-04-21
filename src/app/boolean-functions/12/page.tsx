import Task12Form from '@/app/boolean-functions/12/client-page';
import MoveButtons from '@/components/move-buttons';

export const metadata = {
  title: 'Задание 12',
};

export default function Task12Page() {
  return (
    <>
      <Task12Form />
      <MoveButtons taskID={12} />
    </>
  )
}
