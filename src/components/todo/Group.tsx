import { memo } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import styled from 'styled-components';
import ToDoItem from './Item';

export interface IItem {
  id: string;
  content: string;
}

interface IToDoGroupProps {
  id: string;
  title: string;
  items: IItem[];
}

const Board = styled.div`
  padding: 20px 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;

  > h3 {
    color: #5c5c5c;
    font-size: 15px;
    font-weight: 700;
  }

  > ul {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    border-radius: 4px;
  }
`;

const ToDoGroup = memo(({ id, title, items }: IToDoGroupProps) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <SortableContext id={id} items={items}>
      <Board ref={setNodeRef}>
        <h3>{title}</h3>

        <ul>
          {items.map((item) => (
            <ToDoItem key={item.id} id={item.id}>
              {item.content}
            </ToDoItem>
          ))}
        </ul>
      </Board>
    </SortableContext>
  );
});

export default ToDoGroup;
