import { format, isBefore, isSameDay, startOfDay } from "date-fns";
import { ptBR } from "date-fns/locale";

export const parseContactDate = (dateStr?: string | null): Date | null => {
  if (!dateStr) return null;

  const iso = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (iso) {
    const year = Number(iso[1]);
    const month = Number(iso[2]);
    const day = Number(iso[3]);
    const date = new Date(year, month - 1, day);
    return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day ? date : null;
  }

  const dmy = dateStr.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{2,4})$/);
  if (dmy) {
    const day = Number(dmy[1]);
    const month = Number(dmy[2]);
    let year = Number(dmy[3]);
    if (year < 100) year += 2000;
    const date = new Date(year, month - 1, day);
    return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day ? date : null;
  }

  return null;
};

export const isContactDueForAgenda = (dateStr?: string | null, targetDate = new Date(), includeOverdue = true) => {
  const scheduledDate = parseContactDate(dateStr);
  if (!scheduledDate) return false;

  const target = startOfDay(targetDate);
  const exactDate = startOfDay(scheduledDate);

  return (
    isSameDay(exactDate, target) ||
    (includeOverdue && isBefore(exactDate, target))
  );
};

export const isContactOverdue = (dateStr?: string | null, targetDate = new Date()) => {
  const scheduledDate = parseContactDate(dateStr);
  if (!scheduledDate) return false;
  return isBefore(startOfDay(scheduledDate), startOfDay(targetDate));
};

export const formatContactDate = (dateStr?: string | null, dateFormat = "dd/MM") => {
  const date = parseContactDate(dateStr);
  return date ? format(date, dateFormat, { locale: ptBR }) : "";
};