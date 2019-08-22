import { DragEvent } from 'react';

import { FloorType } from 'data/Map';

// Type
type TypeData = {
  kind: 'type', type: FloorType
}

export type DropData = TypeData

// Utils
export function isDropData(data: any): data is DropData {
  if ('kind' in data) {
    switch (data.kind) {
      case 'type':
        return 'type' in data;
    }
  }

  return false;
}

export function handleDrag(data: DropData) {
  return (event: DragEvent) => { event.dataTransfer.setData('application/json', JSON.stringify(data)); }
}

export function handleAllowDrop(editing: boolean) {
  return (event: DragEvent) => {
    //if (!editing) return;

    // check data
    const data = JSON.parse(event.dataTransfer.getData('application/json'));
    if (isDropData(data)) event.preventDefault();
  }
}

export function handleDrop(cb: (data: DropData) => void) {
  return (event: DragEvent) => {
    event.preventDefault();

    const data = JSON.parse(event.dataTransfer.getData('application/json'));
    if (isDropData(data)) cb(data);
  }
}