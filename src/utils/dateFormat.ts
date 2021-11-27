const isToday = (dateEvent: string) => {
  const today = new Date();
  const dateEventFormatted = new Date(dateEvent);
  
  return today.getDate() === dateEventFormatted.getDate() && 
    today.getMonth() === dateEventFormatted.getMonth() && 
    today.getFullYear() === dateEventFormatted.getFullYear();
};

const isBefore = (dateEvent: string) => {
  const today = new Date();
  const dateEventFormatted = new Date(dateEvent);
  
  return today.getDate() > dateEventFormatted.getDate() && 
    today.getMonth() >= dateEventFormatted.getMonth() && 
    today.getFullYear() >= dateEventFormatted.getFullYear();
};

export {
  isToday,
  isBefore,
}