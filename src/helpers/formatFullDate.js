export default function formatFullDate(date) {
  const days = [
    'Minggu',
    'Senin',
    'Selasa',
    'Rabu',
    'Kamis',
    "Jum'at",
    'Sabtu',
  ];
  const month = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ];
  const twoDigits = (num) => String(num).padStart(2, '0');
  const d = new Date(date);
  const curr_day = days[d.getDay()];
  const curr_date = d.getDate();
  const curr_month = month[d.getMonth()];
  const curr_year = d.getFullYear();
  const curr_hour = d.getHours();
  const curr_minutes = d.getMinutes();

  return (
    curr_day +
    ', ' +
    curr_date +
    ' ' +
    curr_month +
    ' ' +
    curr_year +
    ' ' +
    twoDigits(curr_hour) +
    ':' +
    twoDigits(curr_minutes)
  );
}
