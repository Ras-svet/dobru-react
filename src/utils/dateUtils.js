export function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate();
  const monthIndex = date.getMonth();
  
  const monthNames = [
    "января", "февраля", "марта",
    "апреля", "мая", "июня", "июля",
    "августа", "сентября", "октября",
    "ноября", "декабря"
  ];

  return `${day} ${monthNames[monthIndex]}`;
}