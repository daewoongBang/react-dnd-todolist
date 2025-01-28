import { DndContext, DragEndEvent } from '@dnd-kit/core';
import ToDoGroup from 'components/todo/Group';
import { useState } from 'react';
import styled from 'styled-components';

const initialData = [
  {
    id: 'group-1',
    title: 'To Do',
    items: [
      { id: 'item-1', content: 'Task 1' },
      { id: 'item-2', content: 'Task 2' },
    ],
  },
  {
    id: 'group-2',
    title: 'In Progress',
    items: [
      { id: 'item-3', content: 'Task 3' },
      { id: 'item-4', content: 'Task 4' },
    ],
  },
  {
    id: 'group-3',
    title: 'Done',
    items: [],
  },
];

const Container = styled.div`
  display: flex;
  padding: 16px;
  gap: 16px;
`;

const ToDoPage = () => {
  const [datas] = useState(initialData);

  const handleDragEnd = (event: DragEndEvent) => {};

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <Container>
        {datas.map((data) => (
          <ToDoGroup key={data.id} title={data.title} />
        ))}
      </Container>
    </DndContext>
  );
};

export default ToDoPage;
