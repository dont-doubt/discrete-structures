import Task11Form from '@/app/boolean-functions/11/client-page';
import MoveButtons from '@/components/move-buttons';

export const metadata = {
  title: 'Задание 11',
};

export default function Task11Page() {
  return (
    <>
      <Task11Form />
      <MoveButtons taskID={11} />
    </>
  )
}
