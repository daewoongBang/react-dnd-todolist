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

const Container = styled.div`
  padding: 16px;
  background-color: #e6e6e6;
  border-radius: 5px;

  > h3 {
    font-size: 18px;
    font-weight: 600;
  }

  > ul {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    background-color: #c3c3c3;
    border-radius: 4px;
    padding: 8px;
  }
`;

const ToDoGroup = ({ id, title, items }: IToDoGroupProps) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <SortableContext id={id} items={items}>
      <Container>
        <h3>{title}</h3>

        <ul ref={setNodeRef}>
          {items.length > 0 ? (
            items.map((item) => (
              <ToDoItem key={item.id} id={item.id}>
                {item.content}
              </ToDoItem>
            ))
          ) : (
            <li>Drag Here</li>
          )}
        </ul>
      </Container>
    </SortableContext>
  );
};

export default ToDoGroup;
