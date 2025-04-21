import Task3Form from '@/app/boolean-functions/3/client-page';
import MoveButtons from '@/components/move-buttons';

export const metadata = {
  title: 'Задание 3',
};

export default function Task3Page() {
  return (
    <>
      <Task3Form />
      <MoveButtons taskID={3} />
    </>
  )
}
