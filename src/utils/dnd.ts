// let draggableEl = null;

// function handleDragStart(e) {
//   this.style.opacity = "0.4";
//   draggableEl = this;
//   e.dataTransfer.effectAllowed = "move";
//   e.dataTransfer.setData("text/html", this.innerHTML);
// }

// function handleDragOver(e) {
//   if (e.preventDefault) {
//     e.preventDefault();
//   }

//   e.dataTransfer.dropEffect = "move";
//   return false;
// }

// function handleDragEnter(e) {
//   this.firstElementChild.classList.add("over");
// }

// function handleDragLeave(e) {
//   this.firstElementChild.classList.remove("over");
// }

// function handleDrop(e) {
//   if (e.stopPropagation) {
//     e.stopPropagation(); // stops the browser from redirecting.
//   }

//   if (draggableEl !== this) {
//     draggableEl.innerHTML = this.innerHTML;
//     this.innerHTML = e.dataTransfer.getData("text/html");
//   }

//   this.firstElementChild.classList.contains("completed") &&
//     (this.querySelector(".checkbox input").checked = true);

//   console.log(this.firstElementChild.dataset.order);

//   draggableEl.firstElementChild.classList.contains("completed") &&
//     (draggableEl.querySelector(".checkbox input").checked = true);

//   console.log(draggableEl.firstElementChild.dataset.order);

//   return false;
// }

// const draggableLists = container.querySelectorAll(".draggable-list");
// draggableLists.forEach((draggableList) => {
//   draggableList.addEventListener("dragstart", handleDragStart, false);
//   draggableList.addEventListener("dragenter", handleDragEnter, false);
//   draggableList.addEventListener("dragover", handleDragOver, false);
//   draggableList.addEventListener("dragleave", handleDragLeave, false);
//   draggableList.addEventListener("drop", handleDrop, false);
//   draggableList.addEventListener("dragend", handleDragEnd, false);
// });

// function handleDragEnd(e) {
//   this.style.opacity = "1";

//   draggableLists.forEach((draggableList) => {
//     draggableList.firstElementChild?.classList.remove("over");
//   });
// }
