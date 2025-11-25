// Date Formatting Utilities
const DateFormat = {
  dateOnly(date) {
    let newDate = new Date(date);
    newDate.setHours(0, 0, 0, 0);

    return newDate;
  }
}

module.exports = DateFormat;