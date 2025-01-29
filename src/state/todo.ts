import { atom } from 'jotai';

interface IItem {
  id: string;
  content: string;
}

interface IToDos {
  id: string;
  title: string;
  items: IItem[];
}

export const toDosState = atom<IToDos[]>([
  {
    id: 'group-1',
    title: 'To Do',
    items: [
      { id: 'item-1', content: 'Task 1' },
      { id: 'item-2', content: 'Task 2' },
      { id: 'item-3', content: 'Task 3' },
      { id: 'item-4', content: 'Task 4' },
      { id: 'item-5', content: 'Task 5' },
    ],
  },
  {
    id: 'group-2',
    title: 'In Progress',
    items: [
      { id: 'item-6', content: 'Task 6' },
      { id: 'item-7', content: 'Task 7' },
      { id: 'item-8', content: 'Task 8' },
      { id: 'item-9', content: 'Task 9' },
      { id: 'item-10', content: 'Task 10' },
    ],
  },
  {
    id: 'group-3',
    title: 'Done',
    items: [],
  },
]);

export const activeIdState = atom<string | null>(null);
