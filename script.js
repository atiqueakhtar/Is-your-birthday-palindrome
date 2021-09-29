const dateInputRef = document.querySelector("#date-input");
const showBtnRef = document.querySelector("#submit-btn");
const resultRef = document.querySelector("#output-container");

showBtnRef.addEventListener("click", () => {
  var bdayStr = dateInputRef.value;

  if (bdayStr !== "") {
    var listOfDate = bdayStr.split("-");

    var date = {
      day: Number(listOfDate[2]),
      month: Number(listOfDate[1]),
      year: Number(listOfDate[0]),
    };

    var isPalindrome = checkPalindromeForAllDateFormats(date);

    if (isPalindrome) {
      showMessage("Hurray!! Your birthday is a palindrome🎉🎉");
    } else {
      var [ctr, nextDate] = getNextPalindromeDate(date);

      showMessage(
        `Sorry, You missed it by ${ctr} days. The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}`
      );
    }
  } else {
    showMessage("Please select your birth date");
  }
});

const showMessage = (msg) => {
  resultRef.style.display = "block";
  resultRef.innerText = msg;
};

const reverseStr = (str) => {
  var listOfChars = str.split("");
  var reverseListOfChars = listOfChars.reverse();
  var reversedStr = reverseListOfChars.join("");
  return reversedStr;
};

const isPalindrome = (str) => {
  var reverse = reverseStr(str);
  return str === reverse;
};

const convertDateToStr = (date) => {
  var dateStr = { day: "", month: "", year: "" };

  if (date.day < 10) {
    dateStr.day = "0" + date.day;
  } else {
    dateStr.day = date.day.toString();
  }

  if (date.month < 10) {
    dateStr.month = "0" + date.month;
  } else {
    dateStr.month = date.month.toString();
  }

  dateStr.year = date.year.toString();
  return dateStr;
};

const getAllDateFormats = (date) => {
  var dateStr = convertDateToStr(date);

  var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
  var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
  var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
  var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
  var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
  var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
};

const checkPalindromeForAllDateFormats = (date) => {
  var listOfPalindromes = getAllDateFormats(date);

  var flag = false;

  for (var i = 0; i < listOfPalindromes.length; i++) {
    if (isPalindrome(listOfPalindromes[i])) {
      flag = true;
      break;
    }
  }

  return flag;
};

const isLeapYear = (year) => {
  if (year % 400 === 0) {
    return true;
  }
  if (year % 100 === 0) {
    return false;
  }
  if (year % 4 === 0) {
    return true;
  }
  return false;
};

const getNextDate = (date) => {
  var day = date.day + 1; // increment the day  => 32
  var month = date.month;
  var year = date.year;

  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // 0 - 11

  // check for february
  if (month === 2) {
    // check for leap year
    if (isLeapYear(year)) {
      // 2020 => true
      if (day > 29) {
        // false
        day = 1;
        month++; // increment the month
      }
    } else {
      if (day > 28) {
        day = 1;
        month++; // increment the month
      }
    }
  }
  // check for other months
  else {
    //  check if the day exceeds the max days in month
    if (day > daysInMonth[month - 1]) {
      day = 1;
      month++; // increment the month
    }
  }

  // increment the year if month is greater than 12
  if (month > 12) {
    month = 1;
    year++;
  }

  return {
    day: day,
    month: month,
    year: year,
  };
};

const getNextPalindromeDate = (date) => {
  var ctr = 0;
  var nextDate = getNextDate(date);

  while (1) {
    ctr++;
    var isPalindrome = checkPalindromeForAllDateFormats(nextDate);
    if (isPalindrome) {
      break;
    }
    nextDate = getNextDate(nextDate);
  }
  return [ctr, nextDate];
};