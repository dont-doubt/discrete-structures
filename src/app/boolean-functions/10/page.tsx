import Task10Form from '@/app/boolean-functions/10/client-page';
import MoveButtons from '@/components/move-buttons';

export const metadata = {
  title: 'Задание 10',
};

export default function Task10Page() {
  return (
    <>
      <Task10Form />
      <MoveButtons taskID={10} />
    </>
  )
}
