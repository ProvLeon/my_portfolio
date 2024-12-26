// utils/dates.ts
export function isChristmasSeason(): boolean {
  const today = new Date();
  const month = today.getMonth();
  const day = today.getDate();

  // December 24th to January 10th
  return (month === 11 && day >= 24) || (month === 0 && day <= 10);
}

export function isEasterSeason(): boolean {
  // This is a simplified version. You might want to use a proper Easter date calculator
  const today = new Date();
  const easterDate = getEasterDate(today.getFullYear());
  const daysDiff = Math.abs(today.getTime() - easterDate.getTime()) /
    (1000 * 60 * 60 * 24);

  return daysDiff <= 7; // Week before and after Easter
}

export function isRamadanSeason(): boolean {
  // This is a simplified version. You might want to use a proper Islamic calendar calculator
  const today = new Date();
  const ramadanDates = getRamadanDates(today.getFullYear());
  const startDate = new Date(ramadanDates.start);
  const endDate = new Date(ramadanDates.end);

  return today >= startDate && today <= endDate;
}

// Helper function to calculate Easter date (Meeus/Jones/Butcher algorithm)
function getEasterDate(year: number): Date {
  // Implementation of Easter date calculation
  // You can use existing libraries like date-fns or moment.js for this
  return new Date(); // Placeholder
}

// Helper function to get Ramadan dates
function getRamadanDates(year: number): { start: string; end: string } {
  // Implementation to get Ramadan dates
  // You can use existing libraries like hijri-date for this
  return {
    start: "",
    end: "",
  }; // Placeholder
}
