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
  const onDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id.toString());
  };
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = elements.findIndex((el) => el.id === active.id);
      const newIndex = elements.findIndex((el) => el.id === over.id);
      handleReorderElements(oldIndex, newIndex);
    }
    setActiveId("");
  };
  const isActive = (id: string) => {
    return activeId === id;
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
        <SortableElementContext.Provider value={{ isActive }}>
          {children}
        </SortableElementContext.Provider>
      </SortableContext>
    </DndContext>
  );
}

export function useSortableElement() {
  const ctx = useContext(SortableElementContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
}
