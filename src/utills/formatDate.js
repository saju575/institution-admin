import moment from "moment-timezone";

export function formatDate(utcTimestamp) {
  const localTimeZone = "Asia/Dhaka";
  // Convert the timestamp to your local time
  const localTimestamp = moment(utcTimestamp).tz(localTimeZone);

  // Format the date as "DD, MMM" and the year as "YYYY"
  const formattedDate = localTimestamp.format("DD, MMM");
  const year = localTimestamp.format("YYYY");

  return { date: formattedDate, year };
}
