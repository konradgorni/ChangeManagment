import { IEvents } from '../typesManagerBoard';
import { getObjectToSend } from './getObjectToSend';

export const enumerateWidth = ({
  year,
  month,
  date,
  events,
}: {
  year: string;
  month: string;
  date: string;
  events: IEvents[];
}) => {
  const element = document.querySelector<HTMLElement>('.rbc-events-container');
  const elChildren = document.querySelectorAll<HTMLElement>('.rbc-event');
  const timeSlot = document.querySelector<HTMLElement>('.rbc-day-slot');
  const count = events.filter((el: IEvents) => {
    const obj = getObjectToSend(el.start);
    if (obj) {
      if (obj.year === year) {
        if (obj.month === month) {
          if (obj.date === date) {
            return true;
          }
        }
      }
    }
    return false;
  });
  if (element) {
    if (elChildren) {
      element.style.minWidth = `${count.length * 200}px`;
      if (timeSlot) {
        timeSlot.style.minWidth = `${count.length * 200}px`;
      }
    }
  }
};
