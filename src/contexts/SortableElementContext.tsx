"use client";

import React, { createContext, useContext, useState } from "react";
import {
  DndContext,
  closestCenter,
  DragEndEvent,
  DragStartEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

interface SortableElementContextType {
  isActive: (id: string) => boolean;
  isClicked: (id: string) => boolean;
  clickedId: string;
}

const SortableElementContext = createContext<
  SortableElementContextType | undefined
>(undefined);

export function SortableElementProvider({
  children,
  elements,
  handleReorderElements,
}: {
  children: React.ReactNode;
  elements: { id: string }[];
  handleReorderElements: (oldIndex: number, newIndex: number) => void;
}) {
  const [activeId, setActiveId] = useState<string>("");
  const [clickedId, setClickedId] = useState<string>("");

  const onDragStart = (event: DragStartEvent) => {
    setClickedId("");
    setActiveId(event.active.id.toString());
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over, delta } = event;
    const totalDistance = Math.sqrt(delta.x * delta.x + delta.y * delta.y);

    // 클릭으로 판단되는 경우 (드래그 거리가 5px 미만)
    if (totalDistance < 5) {
      setClickedId(active.id.toString());
    } else if (over && active.id !== over.id) {
      // 드래그로 판단되는 경우
      const oldIndex = elements.findIndex((el) => el.id === active.id);
      const newIndex = elements.findIndex((el) => el.id === over.id);
      handleReorderElements(oldIndex, newIndex);
    }
    setActiveId("");
  };

  const isActive = (id: string) => {
    return activeId === id;
  };

  const isClicked = (id: string) => {
    return clickedId === id;
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      onDragStart={onDragStart}
    >
      <SortableContext
        items={elements.map((el) => el.id)}
        strategy={verticalListSortingStrategy}
      >
        <SortableElementContext.Provider
          value={{ isActive, isClicked, clickedId }}
        >
          {children}
        </SortableElementContext.Provider>
      </SortableContext>
    </DndContext>
  );
}

export function useSortableElement() {
  const ctx = useContext(SortableElementContext);
  if (!ctx)
    throw new Error(
      "useSortableElement must be inside SortableElementProvider"
    );
  return ctx;
}
