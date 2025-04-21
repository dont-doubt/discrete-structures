import Task2Form from '@/app/boolean-functions/2/client-page';
import MoveButtons from '@/components/move-buttons';

export const metadata = {
  title: 'Задание 2',
};

export default function Task2Page() {
  return (
    <>
      <Task2Form />
      <MoveButtons taskID={2} />
    </>
  )
}
