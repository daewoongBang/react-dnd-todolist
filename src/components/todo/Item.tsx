import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface IToDoItemProps {
  id: string;
  children: React.ReactNode;
}

const ToDoItem = ({ id, children }: IToDoItemProps) => {
  const { attributes, listeners, transform, transition, setNodeRef } =
    useSortable({ id });

  return (
    <li
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        cursor: 'grab',
        listStyle: 'none',
        padding: '8px',
        backgroundColor: '#ffffff',
        borderRadius: '4px',
        border: '1px solid #cccccc',
      }}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
    >
      {children && children}
    </li>
  );
};

export default ToDoItem;
