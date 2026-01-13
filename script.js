const eventStart = new Date("2024-10-12T13:00:00+09:00");
const eventEnd = new Date("2024-10-12T16:30:00+09:00");

const countdownEl = document.getElementById("countdown");
const calendarButton = document.getElementById("calendarButton");

const pad = (value) => String(value).padStart(2, "0");

const formatCountdown = (diffMs) => {
  if (diffMs <= 0) {
    return "まもなく開始";
  }

  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${days}日 ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
};

const updateCountdown = () => {
  const now = new Date();
  const diff = eventStart.getTime() - now.getTime();
  countdownEl.textContent = formatCountdown(diff);
};

const formatICSDate = (date) =>
  date
    .toISOString()
    .replace(/[-:]/g, "")
    .split(".")[0] + "Z";

const downloadCalendar = () => {
  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Company AI Study Meetup//JP",
    "BEGIN:VEVENT",
    `DTSTART:${formatICSDate(eventStart)}`,
    `DTEND:${formatICSDate(eventEnd)}`,
    "SUMMARY:社内AI勉強会",
    "DESCRIPTION:最新のAIトレンドを学び、実務に活かすヒントを共有します。",
    "LOCATION:本社 3F イノベーションラウンジ + オンライン配信",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\n");

  const blob = new Blob([icsContent], { type: "text/calendar" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "ai-study-meetup.ics";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

updateCountdown();
setInterval(updateCountdown, 1000);
calendarButton.addEventListener("click", downloadCalendar);
