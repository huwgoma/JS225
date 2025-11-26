// Utilities
const Utilities = {
  dateOnly(date) {
    let newDate = new Date(date);
    newDate.setHours(0, 0, 0, 0);

    return newDate;
  },

  toFixNum(number, decimalPlaces) {
    return Number(number.toFixed(decimalPlaces));
  }
}

module.exports = Utilities;