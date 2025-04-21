import Task4Form from '@/app/boolean-functions/4/client-page';
import MoveButtons from '@/components/move-buttons';

export const metadata = {
  title: 'Задание 4',
};

export default function Task4Page() {
  return (
    <>
      <Task4Form />
      <MoveButtons taskID={4} />
    </>
  )
}
