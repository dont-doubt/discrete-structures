import Task1Form from "@/app/boolean-functions/1/client-page";
import MoveButtons from '@/components/move-buttons';

export const metadata = {
  title: 'Задание 1',
};

export default function Task1Page() {
  return (
    <>
      <Task1Form />
      <MoveButtons taskID={1} />
    </>
  )
}
