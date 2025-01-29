import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { useAtom } from 'jotai';
import { activeIdState, toDosState } from 'state/todo';
import styled from 'styled-components';
import ToDoGroup from 'components/todo/Group';
import ToDoItem from 'components/todo/Item';

const Wrapper = styled.div`
  display: flex;
  max-width: 680px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr);
`;

const ToDoPage = () => {
  const [datas, setDatas] = useAtom(toDosState);
  const [activeId, setActiveId] = useAtom(activeIdState);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;

    setActiveId(active.id as string);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    if (!active || !over) {
      return;
    }

    const activeGroupId = active.data.current?.sortable.containerId;
    const overGroupId = over.data.current?.sortable.containerId || over.id;

    if (activeGroupId !== overGroupId) {
      const activeGroup = datas.find((group) => group.id === activeGroupId);
      const overGroup = datas.find((group) => group.id === overGroupId);

      const overIndex = !!over.data.current
        ? over.data.current.sortable.index
        : (datas.find((group) => group.id === overGroupId)?.items || [])
            .length + 1;

      if (!!activeGroup && !!overGroup) {
        const activeItem = activeGroup.items.find(
          (item) => item.id === active.id
        );

        if (activeItem) {
          const newItems = [
            ...overGroup.items.slice(0, overIndex),
            activeItem,
            ...overGroup.items.slice(overIndex),
          ];

          setDatas(
            datas.map((group) => {
              return group.id === activeGroup.id
                ? {
                    ...group,
                    items: group.items.filter((item) => item.id !== active.id),
                  }
                : group.id === overGroup.id
                ? {
                    ...group,
                    items: newItems,
                  }
                : group;
            })
          );
        }
      }
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!active || !over) {
      setActiveId(null);

      return;
    }

    const activeGroupId = active.data.current?.sortable.containerId;
    const overGroupId = over.data.current?.sortable.containerId || over.id;

    const activeGroup = datas.find((group) => group.id === activeGroupId);
    const overGroup = datas.find((group) => group.id === overGroupId);

    if (!!activeGroup && !!overGroup) {
      const activeItem = activeGroup.items.find(
        (item) => item.id === active.id
      );

      if (!!activeItem) {
        const activeIndex = active.data.current?.sortable.index;
        const overIndex = !!over.data.current
          ? over.data.current.sortable.index
          : (datas.find((group) => group.id === overGroupId)?.items || [])
              .length + 1;

        if (activeGroup.id === overGroup.id) {
          if (activeIndex !== overIndex) {
            const updatedItems = arrayMove(
              activeGroup.items,
              activeIndex,
              overIndex
            );

            setDatas((prev) =>
              prev.map((group) =>
                group.id === activeGroup.id
                  ? { ...group, items: updatedItems }
                  : group
              )
            );
          }
        } else {
          const newItems = [
            ...overGroup.items.slice(0, overIndex),
            activeItem,
            ...overGroup.items.slice(overIndex),
          ];

          setDatas(
            datas.map((group) => {
              return group.id === activeGroup.id
                ? {
                    ...group,
                    items: group.items.filter((item) => item.id !== active.id),
                  }
                : group.id === overGroup.id
                ? {
                    ...group,
                    items: newItems,
                  }
                : group;
            })
          );
        }
      }
    }

    setActiveId(null);
  };

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <Wrapper>
        <Boards>
          {datas.map((data) => (
            <ToDoGroup
              key={data.id}
              id={data.id}
              title={data.title}
              items={data.items}
            />
          ))}
        </Boards>
      </Wrapper>

      <DragOverlay>
        {activeId ? (
          <ToDoItem id={activeId}>
            {
              datas
                .flatMap((group) => group.items)
                .find((item) => item.id === activeId)?.content
            }
          </ToDoItem>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default ToDoPage;
