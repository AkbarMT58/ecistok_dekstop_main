export default function formatDate(date) {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Agt",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const d = new Date(date);
  const curr_date = d.getDate();
  const curr_month = d.getMonth() + 1; //Months are zero based
  const curr_year = d.getFullYear();

  return curr_date + "-" + monthNames[curr_month] + "-" + curr_year;
}
