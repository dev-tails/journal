const root = document.createElement("div");
root.id = "root";

const dateInput = document.createElement("input");
dateInput.type = "date";

dateInput.addEventListener("change", (e) => {
  dateKey = e.currentTarget.value;
  handleDateChanged();
});

root.append(dateInput);

const textarea = document.createElement("textarea");
textarea.autofocus = true;

let currentDate = null;
let dateKey = null;

function setDate(date) {
  const offset = date.getTimezoneOffset();
  currentDate = new Date(date.getTime() - offset * 60 * 1000);
  dateKey = currentDate.toISOString().split("T")[0];
  handleDateChanged();
}

setDate(new Date());

function handleDateChanged() {
  dateInput.value = dateKey;
  const initialValue = localStorage.getItem(dateKey);
  if (initialValue) {
    textarea.value = initialValue;
  } else {
    textarea.value = "";
  }
}

function addDays(numDays) {
  setDate(new Date(currentDate.getTime() + numDays * 1000 * 60 * 60 * 24));
}

let timeoutId = null;

textarea.addEventListener("input", (e) => {
  if (!timeoutId) {
    timeoutId = setTimeout(() => {
      localStorage.setItem(dateKey, textarea.value);

      timeoutId = null;
    }, 500);
  }
});

root.append(textarea);

document.body.append(root);

document.addEventListener("keydown", (e) => {
  if (e.metaKey) {
    if (e.key === "ArrowLeft") {
      addDays(-1);
    } else if (e.key === "ArrowRight") {
      addDays(1);
    }
  }
});
