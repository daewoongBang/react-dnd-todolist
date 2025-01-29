import { memo } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import styled from 'styled-components';

interface IToDoItemProps {
  id: string;
  children: React.ReactNode;
}

const Card = styled.li`
  padding: 10px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.cardColor};
  list-style: none;
  cursor: grab;
`;

const ToDoItem = memo(({ id, children }: IToDoItemProps) => {
  const {
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
    setNodeRef,
  } = useSortable({ id });

  return (
    <Card
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        border: `1px ${isDragging ? 'dashed' : 'solid'} #c5c5c5`,
        opacity: isDragging ? 0.5 : 1,
      }}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
    >
      {children && children}
    </Card>
  );
});

export default ToDoItem;
