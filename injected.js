"use strict";
console.log("Schoology X Injected :)");
let extensionOn = localStorage.getItem("extensionOn");
if (extensionOn && extensionOn == "true") {
    let player;
    let timeString = "";
    document.head.innerHTML += `<html manifest="offline_book.manifest">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />

`;
    let asignmentLabel;
    let ready = 0;
    let baseUrl = "https://schoology.shschools.org";
    let allowedURLs = [
        baseUrl + "/home",
        baseUrl + "/home/",
        baseUrl + "/",
        baseUrl,
        baseUrl + "/home/recent-activity",
    ];
    let userHasViewedRecentUpdate = [];
    let readMessageStorage = localStorage.getItem("readMessage");
    let displayedAll = false;
    if (readMessageStorage) {
        userHasViewedRecentUpdate = JSON.parse(readMessageStorage);
    }
    function isBackgroundDark(hexColor) {
        let r = parseInt(hexColor.slice(1, 3), 16);
        let g = parseInt(hexColor.slice(3, 5), 16);
        let b = parseInt(hexColor.slice(5, 7), 16);
        const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        return luminance < 128;
    }
    let calenderIncrementDay = 0;
    let classOrder = [
        "", // 1
        "", // 2
        "", // 3
        "", // 4
        "", // 5
        "", // 6
        "", // 7
        "End",
    ];
    const weekdays = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    let courses;
    function refreshCourses() {
        courses = [
            // Day 1
            { name: classOrder[0], day: 1, time: { hour: 8, min: 25 } }, // 1
            { name: classOrder[1], day: 1, time: { hour: 10, min: 0 } }, // 2
            { name: classOrder[2], day: 1, time: { hour: 11, min: 10 } }, // 3
            { name: classOrder[3], day: 1, time: { hour: 13, min: 0 } }, // 4
            { name: classOrder[4], day: 1, time: { hour: 14, min: 15 } }, // 5
            { name: "End", day: 1, time: { hour: 15, min: 15 } }, // 5
            // Day 2
            { name: classOrder[5], day: 2, time: { hour: 8, min: 25 } }, // 6
            { name: classOrder[6], day: 2, time: { hour: 10, min: 30 } }, // 7
            { name: classOrder[0], day: 2, time: { hour: 12, min: 20 } }, // 1
            { name: classOrder[1], day: 2, time: { hour: 13, min: 30 } }, // 2
            { name: "End", day: 2, time: { hour: 15, min: 15 } }, // 5
            // Day 3
            { name: classOrder[2], day: 3, time: { hour: 9, min: 25 } }, // 3
            { name: classOrder[3], day: 3, time: { hour: 10, min: 35 } }, // 4
            { name: classOrder[4], day: 3, time: { hour: 12, min: 25 } }, // 5
            { name: classOrder[5], day: 3, time: { hour: 13, min: 40 } }, // 6
            { name: "End", day: 3, time: { hour: 15, min: 15 } }, // 5
            // Day 4
            { name: classOrder[6], day: 4, time: { hour: 8, min: 25 } }, // 7
            { name: classOrder[0], day: 4, time: { hour: 10, min: 0 } }, // 1
            { name: classOrder[1], day: 4, time: { hour: 11, min: 10 } }, // 2
            { name: classOrder[2], day: 4, time: { hour: 13, min: 0 } }, // 3
            { name: "End", day: 4, time: { hour: 15, min: 15 } }, // 5
            // Day 5
            { name: classOrder[3], day: 5, time: { hour: 8, min: 25 } }, // 4
            { name: classOrder[4], day: 5, time: { hour: 10, min: 0 } }, // 5
            { name: classOrder[5], day: 5, time: { hour: 13, min: 0 } }, // 6
            { name: classOrder[6], day: 5, time: { hour: 14, min: 15 } }, // 7
            { name: "End", day: 5, time: { hour: 15, min: 15 } }, // 5
        ];
    }
    refreshCourses();
    let deleteCompleteAsignments = null;
    function createBessyGradeButton() {
        let buttonTemplateClone = document.getElementsByClassName("_24avl _3Rh90 _349XD")[1];
        let buttonIcon = document.createElement("button");
        buttonIcon.className = "volunteerBtn";
        buttonIcon.innerHTML = `<span class="material-symbols-outlined">
check_circle
</span>`;
        buttonIcon.addEventListener("click", function () {
            window.open("https://www.bessy.io/");
        });
        buttonTemplateClone.before(buttonIcon);
    }
    function createMobileServeButton() {
        let buttonTemplateClone = document.getElementsByClassName("_24avl _3Rh90 _349XD")[1];
        let buttonIcon = document.createElement("button");
        buttonIcon.className = "volunteerBtn";
        buttonIcon.innerHTML = `<span class="material-symbols-outlined">
volunteer_activism
</span>`;
        buttonIcon.addEventListener("click", function () {
            window.open("https://app.mobileserve.com/app/#/");
        });
        buttonTemplateClone.before(buttonIcon);
    }
    function createStudyButton() {
        let buttonTemplateClone = document.getElementsByClassName("_24avl _3Rh90 _349XD")[1];
        let buttonIcon = document.createElement("button");
        buttonIcon.className = "volunteerBtn";
        buttonIcon.innerHTML = `<span class="material-symbols-outlined">
timer
</span>`;
        buttonIcon.addEventListener("click", function () {
            window.open("/study");
        });
        buttonTemplateClone.before(buttonIcon);
    }
    function createFinalsButton() {
        let buttonTemplateClone = document.getElementsByClassName("_24avl _3Rh90 _349XD")[1];
        let buttonIcon = document.createElement("button");
        buttonIcon.className = "volunteerBtn";
        buttonIcon.innerHTML = `<span class="material-symbols-outlined">
quiz
</span>`;
        buttonIcon.addEventListener("click", function () {
            window.open("https://docs.google.com/document/d/1aqPHdn3H4eJIAbdcV0mmNt_Cvq5QdRkjNUS4BkBnllI/edit?tab=t.0#heading=h.sis00qkqayq6");
        });
        buttonTemplateClone.before(buttonIcon);
    }
    createFinalsButton();
    createStudyButton();
    createBessyGradeButton();
    // createMobileServeButton();
    function adjustButtonHoverBrightness(hexColor, percent) {
        percent = Math.max(-100, Math.min(100, percent));
        let r = parseInt(hexColor.slice(1, 3), 16);
        let g = parseInt(hexColor.slice(3, 5), 16);
        let b = parseInt(hexColor.slice(5, 7), 16);
        let adjustmentFactor = Math.round((percent / 100) * 255);
        r = Math.min(255, Math.max(0, r + adjustmentFactor));
        g = Math.min(255, Math.max(0, g + adjustmentFactor));
        b = Math.min(255, Math.max(0, b + adjustmentFactor));
        let newHex = "#" +
            ("0" + r.toString(16)).slice(-2) +
            ("0" + g.toString(16)).slice(-2) +
            ("0" + b.toString(16)).slice(-2);
        return newHex;
    }
    // function getCurrentClass(
    //     day: Day,
    //     currentHour: number,
    //     currentMinute: number
    // ): string | null {
    //     let currentClass: Period | null = null;
    //     // Find the current class by iterating through the list
    //     for (const period of courses) {
    //         if (period.day === day) {
    //             // Compare the period's time with the current time
    //             if (
    //                 period.time.hour < currentHour ||
    //                 (period.time.hour === currentHour &&
    //                     period.time.min - 5 <= currentMinute)
    //             ) {
    //                 currentClass = period;
    //             }
    //         }
    //     }
    //     // Return the name of the class if found, otherwise return null
    //     return currentClass ? currentClass.name : null;
    // }
    let headerColor = "#ffffff";
    let headerHoverColor = adjustButtonHoverBrightness(headerColor, -20); // Lighten by 20%
    // let originalColor = "#0677bb";
    // let hoverColor = adjustBrightness(originalColor, 20); // Lighten by 20%
    window.addEventListener("colorChange", function (e) {
        // Cast the event to CustomEvent
        const customEvent = e;
        if (customEvent.detail &&
            typeof customEvent.detail.value !== "undefined") {
            const deleteAsignValue = customEvent.detail.value; // Access the value from the event detail
            headerColor = deleteAsignValue;
            localStorage.setItem("color", headerColor);
            if (isBackgroundDark(headerColor)) {
                headerHoverColor = adjustButtonHoverBrightness(headerColor, 10); // Lighten by 20%
            }
            else {
                headerHoverColor = adjustButtonHoverBrightness(headerColor, -10); // Lighten by 20%
            }
            //lightenhere
            changeHeaderColor();
        }
        else {
            console.error("No value found in event detail");
        }
    });
    if (localStorage.getItem("color")) {
        headerColor = localStorage.getItem("color");
        if (isBackgroundDark(headerColor)) {
            headerHoverColor = adjustButtonHoverBrightness(headerColor, 10); // Lighten by 20%
        }
        else {
            headerHoverColor = adjustButtonHoverBrightness(headerColor, -10); // Lighten by 20%
        }
    }
    window.addEventListener("resize", changeHeaderColor);
    function changeHeaderColor() {
        function hasHeaderAncestor(element) {
            while (element.parentElement) {
                element = element.parentElement;
                if (element.tagName.toLowerCase() === "header") {
                    return true;
                }
            }
            return false;
        }
        let headerLinkElements = document.getElementsByTagName("a");
        let headerButtonElements = document.getElementsByTagName("button");
        const headerBackground = document.getElementsByClassName("_1tpub _3mp5E _24W2g util-justify-content-space-between-3euFK")[0];
        headerBackground.style.backgroundColor = headerColor;
        document.getElementsByClassName("_1Z0RM Header-bottom-border-2ZE-7 _3v0y7 _349XD")[0].style.backgroundColor = headerColor;
        document.getElementsByClassName("_1Z0RM Header-bottom-border-2ZE-7 _3v0y7 _349XD")[0].style.borderTop = `3px solid ${headerColor}`;
        let IMGParent = document.getElementsByClassName("util-height-six-3PHnk util-width-auto-1-HYR util-max-width-sixteen-3-tkk fjQuT _1tpub _2JX1Q")[0];
        let headerIconIds = [
            "icon-search-v2-3US0j",
            "icon-app-grid-v2-xZFWs",
            "icon-calendar-v2-16S3z",
            "icon-mail-v2-2Mxyq",
            "icon-bell-v2-3oo-G",
        ];
        for (let i = 0; i < headerIconIds.length; i++) {
            let icon = document.getElementById(headerIconIds[i]);
            let path = icon.firstElementChild;
            if (isBackgroundDark(headerColor)) {
                path.setAttribute("fill", "#ffffff");
            }
            else {
                path.setAttribute("fill", "#333333");
            }
        }
        const SHSHeaderImage = IMGParent.firstElementChild;
        SHSHeaderImage.src =
            "https://i.ibb.co/YpdfP2k/logo-removebg-preview-2.png"; // Replace this with the direct URL of the image
        for (let i = 0; i < headerLinkElements.length; i++) {
            if (hasHeaderAncestor(headerLinkElements[i])) {
                if (headerLinkElements[i].title !== "Home" &&
                    headerLinkElements[i].innerHTML !== "My Courses" &&
                    headerLinkElements[i].role !== "menuitem") {
                    if (headerLinkElements[i] !== null) {
                        if (isBackgroundDark(headerColor)) {
                            headerLinkElements[i].style.color =
                                "#ffffff";
                        }
                        else {
                            headerLinkElements[i].style.color =
                                "#333333";
                        }
                    }
                    headerLinkElements[i].style.backgroundColor = headerColor;
                    headerLinkElements[i].style.borderRadius = "10px";
                    headerLinkElements[i].addEventListener("mouseover", function () {
                        headerLinkElements[i].style.backgroundColor =
                            headerHoverColor;
                    });
                    headerLinkElements[i].addEventListener("mouseleave", function () {
                        headerLinkElements[i].style.backgroundColor =
                            headerColor;
                    });
                }
            }
        }
        for (let i = 0; i < headerButtonElements.length; i++) {
            if (hasHeaderAncestor(headerButtonElements[i])) {
                headerButtonElements[i].style.backgroundColor = headerColor;
                if (headerButtonElements[i]
                    .firstElementChild !== null) {
                    if (isBackgroundDark(headerColor)) {
                        headerButtonElements[i]
                            .firstElementChild.style.color = "#ffffff";
                        headerButtonElements[i].style.color =
                            "#ffffff";
                        let gradebtn = document.getElementsByClassName("_13cCs _2M5aC _24avl _3ghFm _3LeCL _31GLY _9GDcm util-height-six-3PHnk util-pds-icon-default-2kZM7 _1Z0RM _1wP6w _2qcpH xjR5v util-v2-header-background-color-22JtI _1Z0RM fjQuT uQOmx")[2];
                        gradebtn.style.color = "#ffffff";
                    }
                    else {
                        headerButtonElements[i]
                            .firstElementChild.style.color = "#333333";
                        headerButtonElements[i].style.color =
                            "#333333";
                        let gradebtn = document.getElementsByClassName("_13cCs _2M5aC _24avl _3ghFm _3LeCL _31GLY _9GDcm util-height-six-3PHnk util-pds-icon-default-2kZM7 _1Z0RM _1wP6w _2qcpH xjR5v util-v2-header-background-color-22JtI _1Z0RM fjQuT uQOmx")[2];
                        gradebtn.style.color = "#333333";
                    }
                }
                headerButtonElements[i].style.borderRadius = "10px";
                headerButtonElements[i].addEventListener("mouseover", function () {
                    headerButtonElements[i].style.backgroundColor =
                        headerHoverColor;
                });
                headerButtonElements[i].addEventListener("mouseleave", function () {
                    headerButtonElements[i].style.backgroundColor =
                        headerColor;
                });
            }
        }
    }
    function waitForElement(className, callback) {
        let element = document.querySelector(className);
        if (element) {
            callback(element);
            return;
        }
        const observer = new MutationObserver((mutationsList, observer) => {
            for (let mutation of mutationsList) {
                if (mutation.type === "childList") {
                    let element = document.querySelector(className);
                    if (element) {
                        callback(element);
                        observer.disconnect();
                        break;
                    }
                }
            }
        });
        observer.observe(document.body, { childList: true, subtree: true });
    }
    changeHeaderColor();
    let courseOpenDebounce = true;
    function changeCourseStyles() {
        setInterval(function () {
            if (courseOpenDebounce) {
                courseOpenDebounce = false;
                waitForElement(".Card-card-data-17m6S", function () {
                    var _a, _b;
                    const courseCards = document.getElementsByClassName("Card-card-data-17m6S");
                    const courseImages = document.getElementsByClassName(" _2q19q Card-card-image-uV6Bu");
                    // let ongoingClass = getClass();
                    for (let i = 0; i < Math.max(courseCards.length, 7); i++) {
                        const selectedCourseCard = courseCards[i];
                        let courseName = (_b = (_a = selectedCourseCard.firstElementChild) === null || _a === void 0 ? void 0 : _a.firstElementChild) === null || _b === void 0 ? void 0 : _b.innerHTML;
                        if (courseName) {
                            classOrder[i] = courseName;
                        }
                        selectedCourseCard.style.borderRadius =
                            "0  0 15px 15px";
                        let courseCardImage = courseImages[i];
                        courseCardImage.style.borderRadius = " 15px 15px 0 0";
                        const div = selectedCourseCard.parentElement;
                        div.parentElement.style.borderRadius =
                            "15px";
                        const div2 = selectedCourseCard.parentElement;
                        if (div2) {
                            courseCardImage.style.borderColor = "blue";
                            selectedCourseCard.style.borderColor = "blue";
                            div2.style.borderRadius = "15px";
                        }
                    }
                    localStorage.setItem("schedule", JSON.stringify(classOrder));
                    courseOpenDebounce = true;
                });
            }
        }, 100);
    }
    changeCourseStyles();
    let checkboxStates = {};
    if (allowedURLs.includes(window.location.href) ||
        window.location.href.includes("course-dashboard")) {
        let waitForHomePageInterval = setInterval(function () {
            if (document.getElementsByClassName("submissions-title")[0] !==
                undefined &&
                document.getElementsByClassName("submissions-title")[1] !==
                    undefined) {
                clearInterval(waitForHomePageInterval);
                setTimeout(function () {
                    var _a, _b, _c;
                    ready = 1;
                    drawCheckboxes();
                    let p = document.createElement("p");
                    p.innerHTML = "";
                    p.id = "progress";
                    (_a = document.getElementById("todo")) === null || _a === void 0 ? void 0 : _a.appendChild(p);
                    let div = document.createElement("div");
                    div.id = "myProgress";
                    (_b = document.getElementById("todo")) === null || _b === void 0 ? void 0 : _b.appendChild(div);
                    let div2 = document.createElement("div");
                    div2.id = "myProgressFrame";
                    (_c = document.getElementById("todo")) === null || _c === void 0 ? void 0 : _c.appendChild(div2);
                    updateProgressBarState();
                }, 0);
            }
        }, 10);
    }
    // async function createScheduleDiv() {
    //     if (allowedURLs.includes(window.location.href)) {
    //         refreshCourses();
    //         const div = document.createElement("div");
    //         const divstyle = div.style;
    //         divstyle.width = "100px";
    //         div.id = "calender";
    //         divstyle.zIndex = "0";
    //         divstyle.height = "350px";
    //         divstyle.backgroundColor = "#ffffff";
    //         divstyle.position = "absolute";
    //         div.className = "todo todo-wrapper";
    //         divstyle.top = "12.5rem";
    //         divstyle.left = "2%";
    //         divstyle.padding = "15px";
    //         divstyle.textAlign = "";
    //         divstyle.fontSize = "12px";
    //         divstyle.fontFamily = "Roboto";
    //         let now = new Date();
    //         now.setDate(now.getDate() + calenderIncrementDay);
    //         const day = now.getDay();
    //         const date = now.getDate();
    //         const month = now.getMonth();
    //         div.innerHTML = `<svg style="position:Relative; left:40px" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#434343"><path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z"/></svg><h2 style="position:Relative; left:10px">Schedule</h2>${
    //             weekdays[day]
    //         } ${month + 1}/${date}`;
    //         div.innerHTML +=
    //             '<div style="width:`24px`;height:`24px`;background-color:`grey`;position: absolute;top:5px; left:105px" onclick="next(1)" onmouseover="calenderArrowHovered(1)" onmouseleave="calenderArrowUnhovered(1)"><svg  id="arrow1" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#434343"><path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z"/></svg></div>';
    //         div.innerHTML +=
    //             '<div   style="width:`24px`;height:`24px`;background-color:`grey`;position: absolute;top:5px; left:5px" onclick="next(-1)" onmouseover="calenderArrowHovered(2)" onmouseleave="calenderArrowUnhovered(2)"><svg id="arrow2" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#434343"><path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z"/></svg></div>';
    //         div.innerHTML += `<hr style="border-top: 1px solid #bbb;" class="solid"></br>`;
    //         let periodCount = 0;
    //         let save2 = localStorage.getItem("saveState2");
    //         if (save2 !== null) {
    //             if (JSON.parse(save2)) {
    //                 save2 = JSON.parse(save2);
    //                 localStorage.setItem("saveState2", JSON.stringify(save2));
    //             }
    //         }
    //         let save3 = localStorage.getItem("schedule");
    //         if (save3 !== null) {
    //             classOrder = JSON.parse(save3);
    //             refreshCourses();
    //         }
    //         if (classOrder[0] !== "" || classOrder == null) {
    //             if (now.getDay() == 6 || now.getDay() == 0) {
    //                 div.innerHTML +=
    //                     " <h3 style='text-align:left'>Weekend! No Classes.<h3>";
    //             } else {
    //                 let element = document.getElementById("calender");
    //                 element?.parentNode?.removeChild(element);
    //                 for (const period of courses) {
    //                     if (period.day === day) {
    //                         if (period.name !== "End") {
    //                             periodCount += 1;
    //                             let startTime = "";
    //                             if (period.time.hour > 12) {
    //                                 startTime =
    //                                     period.time.hour -
    //                                     12 +
    //                                     ":" +
    //                                     period.time.min;
    //                                 if (period.time.min == 0) {
    //                                     startTime =
    //                                         period.time.hour -
    //                                         12 +
    //                                         ":" +
    //                                         period.time.min +
    //                                         "0";
    //                                 }
    //                             } else {
    //                                 startTime =
    //                                     period.time.hour + ":" + period.time.min;
    //                                 if (period.time.min == 0) {
    //                                     startTime =
    //                                         period.time.hour +
    //                                         ":" +
    //                                         period.time.min +
    //                                         "0";
    //                                 }
    //                             }
    //                             let endTime = "";
    //                             if (period.time.hour + 1 > 12) {
    //                                 endTime =
    //                                     period.time.hour +
    //                                     1 -
    //                                     12 +
    //                                     ":" +
    //                                     period.time.min;
    //                                 if (period.time.min == 0) {
    //                                     endTime =
    //                                         period.time.hour +
    //                                         1 -
    //                                         12 +
    //                                         ":" +
    //                                         period.time.min +
    //                                         "0";
    //                                 }
    //                             } else {
    //                                 endTime =
    //                                     period.time.hour +
    //                                     1 +
    //                                     ":" +
    //                                     period.time.min;
    //                                 if (period.time.min == 0) {
    //                                     endTime =
    //                                         period.time.hour +
    //                                         1 +
    //                                         ":" +
    //                                         period.time.min +
    //                                         "0";
    //                                 }
    //                             }
    //                         }
    //                     }
    //                 }
    //                 divstyle.boxShadow = "0 1px 3px 0 rgba(0,0,0,.15)";
    //             }
    //         } else {
    //             div.innerHTML +=
    //                 " <h3 style='text-align:left'>Schedule not saved, open course menu to load. Make sure your courses are ordered in the order you have them!<h3>";
    //         }
    //         const container = document.getElementById("body");
    //         if (container) {
    //             container.appendChild(div);
    //         }
    //     }
    // }
    // createScheduleDiv();
    function updateProgressBarState() {
        let progressFraction = document.getElementById("progress");
        if (progressFraction) {
            let checkboxElements = document.getElementsByClassName("progressCheck");
            let checks = 0;
            for (let i = 0; i < checkboxElements.length; i++) {
                let selectedCheckboxElement = checkboxElements[i];
                if (selectedCheckboxElement.checked == true) {
                    checks += 1;
                }
            }
            let progressBarDiv = document.getElementById("myProgress");
            let progressIsZero = false;
            if (progressBarDiv) {
                let targetProgressBarWidth = (checks / checkboxElements.length) * 200;
                if (targetProgressBarWidth == 0) {
                    progressIsZero = true;
                }
                else {
                    progressIsZero = false;
                }
                let currentProgressBarWidth = Number(progressBarDiv.style.width.slice(0, progressBarDiv.style.width.length - 2));
                let incrementIncrease = true;
                if (currentProgressBarWidth < targetProgressBarWidth) {
                    incrementIncrease = true;
                }
                else {
                    incrementIncrease = false;
                }
                let id = setInterval(frame, 8);
                function frame() {
                    if (incrementIncrease &&
                        currentProgressBarWidth >= targetProgressBarWidth) {
                        currentProgressBarWidth = 0;
                        clearInterval(id);
                    }
                    else if (incrementIncrease == false &&
                        currentProgressBarWidth <= targetProgressBarWidth) {
                        currentProgressBarWidth = 0;
                        clearInterval(id);
                    }
                    else {
                        if (incrementIncrease) {
                            currentProgressBarWidth++;
                        }
                        else {
                            currentProgressBarWidth--;
                        }
                        if (progressBarDiv) {
                            progressBarDiv.style.width =
                                currentProgressBarWidth + "px";
                            if (progressIsZero) {
                                targetProgressBarWidth = 20;
                                progressBarDiv.innerHTML = "0%";
                            }
                            else {
                                progressBarDiv.innerHTML = `${String(Math.round((currentProgressBarWidth - 20) / 2) + 10)}%`;
                            }
                            progressBarDiv.style.backgroundColor = `rgb(${255 / 2 -
                                (Math.round(currentProgressBarWidth / 2) *
                                    2.25) /
                                    1}, ${(Math.round(currentProgressBarWidth / 2) *
                                2.25) /
                                1.2},${(Math.round(currentProgressBarWidth / 2) *
                                2.25) /
                                2} )`;
                        }
                    }
                }
            }
            progressFraction.innerHTML = `${checks}/${checkboxElements.length}`;
        }
    }
    let upcomingEventsDiv = document.getElementById("upcoming-events");
    if (upcomingEventsDiv) {
        upcomingEventsDiv.style.display = "none";
    }
    function drawCheckboxes() {
        waitForElement(".upcoming-event.upcoming-event-block.course-event", function () {
            var _a, _b, _c, _d, _e, _f, _g;
            let progressCheck = document.getElementsByClassName("progressCheck");
            Array.from(progressCheck).forEach((element) => {
                element.remove();
            });
            // let progressCheckLabel =
            //     document.getElementsByClassName("progressCheckLabel");
            // // Convert the HTMLCollection to an array and iterate over it
            // Array.from(progressCheckLabel).forEach((element) => {
            //     element.remove();
            // });
            let showMoreButtonInAsignments = false;
            let upcomingCourseEvents = document.getElementsByClassName("upcoming-event upcoming-event-block course-event");
            for (let j = 0; j < upcomingCourseEvents.length; j++) {
                if (upcomingCourseEvents[j].className.includes("hidden-important")) {
                    let hiddenAsignmentCheckElement = upcomingCourseEvents[j].getElementsByTagName("img")[0];
                    if (hiddenAsignmentCheckElement == undefined) {
                        showMoreButtonInAsignments = true;
                    }
                }
            }
            if (showMoreButtonInAsignments) {
                if (document.getElementById("todo") !== undefined) {
                    let asignmentListDiv = document.getElementById("todo");
                    if (displayedAll == false) {
                        asignmentListDiv.innerHTML += `<li class="s-edge-feed-more-link last dropdowndiv" style="display: block;"><a id="dropdownMore" class="active sExtlink-processed sEdgeMore-processed">more</a></li>`;
                        displayedAll = true;
                    }
                    else {
                        asignmentListDiv.innerHTML += `<li class="s-edge-feed-more-link last dropdowndiv" style="display: block;" ><a
                 class="active sExtlink-processed sEdgeMore-processed">Less</a></li>`;
                        displayedAll = false;
                    }
                    //dropdownthing
                    (_a = document
                        .getElementById("dropdownMore")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
                        var _a;
                        if (document.getElementById("dropdownMore")) {
                            (_a = document
                                .getElementById("dropdownMore")) === null || _a === void 0 ? void 0 : _a.remove();
                        }
                        const loadingImage = document.createElement("img");
                        loadingImage.id = "ajaxloader";
                        loadingImage.className = "dropdowndiv2";
                        loadingImage.src =
                            "https://schoology.shschools.org/sites/all/themes/schoology_theme/images/ajax-loader.gif";
                        asignmentListDiv.appendChild(loadingImage);
                        setTimeout(() => {
                            var _a, _b, _c;
                            (_a = document
                                .getElementById("ajaxloader")) === null || _a === void 0 ? void 0 : _a.remove();
                            let upcoming = document.getElementsByClassName("upcoming-event upcoming-event-block course-event");
                            if (document.getElementById("dropdown")) {
                                (_b = document
                                    .getElementById("dropdown")) === null || _b === void 0 ? void 0 : _b.remove();
                            }
                            for (let j = 0; j < upcoming.length; j++) {
                                if (upcoming[j].className.includes("hidden-important")) {
                                    let hiddenAsignmentCheckElement = upcoming[j].getElementsByTagName("img")[0];
                                    if (hiddenAsignmentCheckElement ==
                                        undefined) {
                                        let newHiddenElementClass = upcoming[j].className.replace("hidden-important", "");
                                        (_c = upcoming[j].previousElementSibling) === null || _c === void 0 ? void 0 : _c.className.replace("hidden", "");
                                        upcoming[j].className =
                                            newHiddenElementClass;
                                    }
                                }
                            }
                            drawCheckboxes();
                            updateProgressBarState();
                        }, 300);
                    });
                }
            }
            upcomingCourseEvents = document.getElementsByClassName("upcoming-event upcoming-event-block course-event");
            for (let j = 0; j < upcomingCourseEvents.length; j++) {
                if (upcomingCourseEvents[j].className.includes("hidden-important") == false) {
                    let checkbox = document.createElement("input");
                    checkbox.className = "progressCheck";
                    checkbox.type = "checkbox";
                    let checkboxState = localStorage.getItem("saveState");
                    upcomingCourseEvents[j].appendChild(checkbox);
                    let asignmentLabelList = (_d = (_c = (_b = checkbox.parentElement) === null || _b === void 0 ? void 0 : _b.firstElementChild) === null || _c === void 0 ? void 0 : _c.firstElementChild) === null || _d === void 0 ? void 0 : _d.children[1].children;
                    if (asignmentLabelList) {
                        for (let i = 0; i < asignmentLabelList.length; i++) {
                            asignmentLabel =
                                (_g = (_f = (_e = asignmentLabelList[i].parentElement) === null || _e === void 0 ? void 0 : _e.parentElement) === null || _f === void 0 ? void 0 : _f.parentElement) === null || _g === void 0 ? void 0 : _g.parentElement;
                            if (asignmentLabelList[i].className ==
                                "sExtlink-processed") {
                                let selectedAsignmentLabel = asignmentLabelList[i];
                                let labelText = selectedAsignmentLabel.innerText.toLowerCase();
                                if ((labelText.includes("quiz") ||
                                    labelText.includes(" test") ||
                                    labelText.includes("minor") ||
                                    labelText.includes("c4u") ||
                                    labelText.includes("cfu") ||
                                    labelText.includes("final") ||
                                    labelText.includes("experience") ||
                                    labelText.includes("major")) &&
                                    labelText.includes("hw") == false) {
                                    checkbox.style.accentColor = "green";
                                    selectedAsignmentLabel.style.color =
                                        "red";
                                }
                                if (checkboxState !== null) {
                                    checkboxStates =
                                        JSON.parse(checkboxState);
                                    if (checkboxStates[selectedAsignmentLabel.innerText] == true) {
                                        checkbox.checked = true;
                                        asignmentLabelList[i].innerHTML = `<s>${selectedAsignmentLabel.innerText}</s>`;
                                        asignmentLabel.style.opacity =
                                            "0.8";
                                    }
                                    else {
                                        checkbox.checked = false;
                                        asignmentLabel.style.opacity = "1";
                                        asignmentLabelList[i].innerHTML = `${asignmentLabelList[i].innerHTML.replace(/<\/?s>/g, "")}`;
                                    }
                                }
                            }
                        }
                    }
                    let dateHeadersList = document.getElementsByClassName("date-header");
                    Array.from(dateHeadersList).forEach((dateHeader) => {
                        var _a;
                        if (((_a = dateHeader.nextElementSibling) === null || _a === void 0 ? void 0 : _a.classList.contains("hidden-important")) == false) {
                            dateHeader.className =
                                dateHeader.className.replace("hidden", "");
                        }
                        let textLabel = dateHeader.firstElementChild;
                        let dateHeaderText = dateHeader
                            .innerText;
                        dateHeaderText = titleCase(dateHeaderText);
                        dateHeader.innerHTML =
                            `<p>` + dateHeaderText + `</p>`;
                        textLabel =
                            dateHeader.firstElementChild;
                        textLabel.className = "h4s";
                    });
                    checkbox.addEventListener("click", function () {
                        var _a, _b, _c, _d, _e, _f;
                        let asignmentDivList = (_c = (_b = (_a = checkbox.parentElement) === null || _a === void 0 ? void 0 : _a.firstElementChild) === null || _b === void 0 ? void 0 : _b.firstElementChild) === null || _c === void 0 ? void 0 : _c.children[1].children;
                        if (asignmentDivList) {
                            updateProgressBarState();
                            for (let i = 0; i < asignmentDivList.length; i++) {
                                if (asignmentDivList[i].className ==
                                    "sExtlink-processed") {
                                    let asignmentNameElement = asignmentDivList[i];
                                    let asignmentDiv = (_f = (_e = (_d = asignmentNameElement.parentElement) === null || _d === void 0 ? void 0 : _d.parentElement) === null || _e === void 0 ? void 0 : _e.parentElement) === null || _f === void 0 ? void 0 : _f.parentElement;
                                    if (checkbox.checked) {
                                        checkboxStates[asignmentNameElement.innerText] = true;
                                        localStorage.setItem("saveState", JSON.stringify(checkboxStates));
                                        asignmentDivList[i].innerHTML = `<s>${asignmentNameElement.innerText}</s>`;
                                        asignmentDiv.style.opacity = "0.8";
                                    }
                                    else {
                                        asignmentDiv.style.opacity = "1";
                                        asignmentDivList[i].innerHTML = `${asignmentDivList[i].innerHTML.replace(/<\/?s>/g, "")}`;
                                        checkboxStates[asignmentNameElement.innerText] = false;
                                        localStorage.setItem("saveState", JSON.stringify(checkboxStates));
                                    }
                                }
                            }
                        }
                    });
                }
            }
        });
    }
    function displayGrades() {
        var _a;
        if (window.location.href ==
            "https://schoology.shschools.org/grades/grades") {
            let gradebookCourses = document.getElementsByClassName("gradebook-course-grades");
            for (let i = 0; i < gradebookCourses.length; i++) {
                let selectedCourse = gradebookCourses[i];
                selectedCourse.style.display = "block";
                let parent = document.getElementsByClassName("course-grade-value")[i];
                let grade = ((_a = parent.firstChild) === null || _a === void 0 ? void 0 : _a.firstChild)
                    .innerHTML;
                let gradebookCourseDiv = document.getElementsByClassName("gradebook-course-title")[i];
                gradebookCourseDiv.innerHTML += `  <span style="color:green; font-size:20px;">(${grade})<span>`;
            }
            for (let i = 0; i < gradebookCourses.length; i++) {
                let selectedCourse = gradebookCourses[i];
                selectedCourse.style.display = "none";
            }
        }
    }
    displayGrades();
    function notePage() {
        var _a, _b;
        if (window.location.href == "https://schoology.shschools.org/study") {
            let pageTitle = document.getElementsByTagName("title")[0];
            pageTitle.innerText = "Notes | Schoology";
            let savedNotes = localStorage.getItem("textSave");
            (_a = document.getElementById("content-wrapper")) === null || _a === void 0 ? void 0 : _a.remove();
            let textArea = document.createElement("textarea");
            let noteContainer = document.createElement("div");
            noteContainer.id = "notecontainer";
            textArea.className = "textAreaNote";
            textArea.id = "textarea";
            let notesHeader = document.createElement("div");
            notesHeader.className = "divheader";
            notesHeader.id = "divheader1";
            if (savedNotes) {
                textArea.value = savedNotes;
            }
            notesHeader.innerHTML = "Notes";
            noteContainer.appendChild(notesHeader);
            noteContainer.appendChild(textArea);
            let notesVisible = true;
            notesHeader.addEventListener("click", function () {
                if (notesVisible) {
                    notesVisible = false;
                    textArea.style.transition = "all 0.2s";
                    textArea.style.borderStyle = "none";
                    setTimeout(() => {
                        textArea.style.opacity = "0";
                        textArea.style.padding = "0px";
                    }, 200);
                    textArea.style.height = "0px";
                }
                else {
                    notesVisible = true;
                    textArea.style.opacity = "1";
                    textArea.style.transition = "all 0.2s";
                    textArea.style.borderStyle = "solid";
                    textArea.style.padding = "15px";
                    textArea.style.height = "500px";
                }
            });
            (_b = document.getElementById("body")) === null || _b === void 0 ? void 0 : _b.appendChild(noteContainer);
            textArea.addEventListener("input", function () {
                if (textArea) {
                    localStorage.setItem("textSave", textArea.value);
                }
            });
        }
    }
    // notePage();
    function createStudyPage() {
        var _a, _b, _c, _d;
        if (window.location.href == "https://schoology.shschools.org/study") {
            let lastBlurTime = 0; // To store the timestamp when the window is blurred
            let todoList = [];
            todoList = localStorage.getItem("todo");
            todoList = JSON.parse(todoList);
            if (todoList == null) {
                todoList = [];
            }
            window.addEventListener("blur", leave);
            window.addEventListener("focus", returned);
            window.addEventListener("beforeunload", leave);
            window.addEventListener("load", returned);
            let awaytimeout;
            function leave() {
                lastBlurTime = Math.round(new Date().getTime() / 1000);
                localStorage.setItem("lastBlurTime", JSON.stringify(lastBlurTime));
                clearInterval(countdown);
                awaytimeout = setInterval(() => {
                    let title = document.getElementsByTagName("title")[0];
                    title.innerText = `(${timeString.substring(0, timeString.length - 1)}) Study Session | Schoology`;
                }, 1000);
            }
            function returned() {
                if (awaytimeout) {
                    clearInterval(awaytimeout);
                }
                let savedLastBlurTime = localStorage.getItem("lastBlurTime");
                if (savedLastBlurTime) {
                    lastBlurTime = JSON.parse(savedLastBlurTime);
                    if (lastBlurTime > 0 && timerIsOn) {
                        const currentTime = Math.round(new Date().getTime() / 1000);
                        const secondsElapsed = currentTime - lastBlurTime;
                        timeLeft -= secondsElapsed;
                        lastBlurTime = 0;
                        if (timeLeft >= 0) {
                            toggleTimerState();
                        }
                        else {
                            timeLeft = 0;
                            localStorage.setItem("timeLeft", "0");
                            setTextLabel();
                        }
                    }
                }
            }
            let asignmentcontainer = document.createElement("div");
            let options = [];
            let optionTags = [];
            const tags = [
                ["religion"],
                ["math", "geo"],
                ["history"],
                ["health"],
                ["biology"],
                ["spanish"],
                ["english"],
            ];
            asignmentcontainer.id = "asignmentcontainer";
            document.body.appendChild(asignmentcontainer);
            function getCurrentAsignments() {
                fetch("https://schoology.shschools.org/home/upcoming_submissions_ajax")
                    .then((response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json(); // Assuming the response is JSON
                })
                    .then((data) => {
                    let asignmentContainer = document.getElementById("asignmentcontainer");
                    asignmentContainer.innerHTML += data.html;
                    let asignments = document.getElementsByClassName("event-title");
                    Array.from(asignments).forEach((asignment) => {
                        var _a;
                        let asignmentName = asignment.firstElementChild;
                        let asignmentTag = (_a = asignment.lastElementChild) === null || _a === void 0 ? void 0 : _a.lastElementChild;
                        options.push(asignmentName.innerText);
                        optionTags.push(asignmentTag.innerText);
                    });
                    asignmentcontainer.remove();
                })
                    .catch((error) => {
                    console.error("Error fetching data:", error);
                    return error;
                });
            }
            //FINISH LABELING VARIABLES BELOW
            getCurrentAsignments();
            let pageTitle = document.getElementsByTagName("title")[0];
            pageTitle.innerText = "Study Session | Schoology";
            (_a = document.getElementById("content-wrapper")) === null || _a === void 0 ? void 0 : _a.remove();
            (_b = document.getElementById("site-navigation-footer")) === null || _b === void 0 ? void 0 : _b.remove();
            (_c = document.getElementById("main-content-wrapper")) === null || _c === void 0 ? void 0 : _c.remove();
            let wrapper = document.getElementById("wrapper");
            let container = document.createElement("div");
            (_d = document.getElementById("wrapper")) === null || _d === void 0 ? void 0 : _d.before(container);
            if (wrapper) {
                wrapper.className = "";
            }
            document.body.style.backgroundImage = `url("https://flocus.com/minimalist-pomodoro-timer/8e6ce4c67a9bf6bf67d0.jpg")`;
            let todoHeader = document.createElement("p");
            todoHeader.className = "todolabel";
            todoHeader.innerHTML = "Todo List:";
            let startTimerButton = document.createElement("button");
            startTimerButton.className = "hugeBtn";
            startTimerButton.innerHTML = "Study";
            let resetButton = document.createElement("button");
            resetButton.className = "hugeBtn";
            resetButton.id = "resetButton";
            resetButton.innerHTML = "Reset";
            let timerText = document.createElement("h1");
            timerText.className = "timerText";
            timerText.innerHTML = "0:00";
            container.appendChild(todoHeader);
            container.appendChild(startTimerButton);
            container.appendChild(resetButton);
            container.appendChild(timerText);
            function updateList() {
                let todoListDiv = document.getElementsByClassName("containerDiv")[0];
                if (todoListDiv) {
                    todoListDiv.remove();
                }
                todoListDiv = document.createElement("div");
                todoListDiv.className = "containerDiv";
                let todoListItemCount = -1;
                startTimerButton.before(todoListDiv);
                todoListDiv.appendChild(buttonRow);
                // todoListDiv.appendChild(clearBtn);
                todoList.forEach((item) => {
                    todoListItemCount++;
                    const [itemName, values] = item;
                    let todoItemDiv = document.createElement("div");
                    todoItemDiv.className = "listDiv";
                    let todoItemName = document.createElement("p");
                    todoItemName.className = "textLabel";
                    todoItemName.innerHTML = itemName;
                    todoItemName.contentEditable = "true";
                    todoItemName.id = "txtlabel" + String(todoListItemCount);
                    let todoItemCheckBox = document.createElement("input");
                    todoItemCheckBox.type = "checkbox";
                    todoItemCheckBox.checked = values;
                    todoItemCheckBox.className = "checkboxItem";
                    todoItemCheckBox.id =
                        "checkbox" + String(todoListItemCount);
                    let todoItemRemove = document.createElement("button");
                    todoItemRemove.className = "deletebn";
                    todoItemRemove.id = "deletebn" + String(todoListItemCount);
                    todoItemRemove.innerHTML = "X";
                    todoItemDiv.style.marginTop = "0px";
                    todoItemCheckBox.style.marginTop = "0px";
                    buttonRow.before(todoItemDiv);
                    todoItemDiv.appendChild(todoItemName);
                    todoItemDiv.appendChild(todoItemCheckBox);
                    todoItemDiv.appendChild(todoItemRemove);
                    let todoOptions = document.createElement("section");
                    todoItemName.addEventListener("input", () => {
                        const query = todoItemName.innerText.toLowerCase();
                        todoOptions.innerHTML = "";
                        let filteredOptions = [];
                        for (let i = 0; i < options.length; i++) {
                            let option = options[i].toLowerCase() +
                                optionTags[i].toLowerCase();
                            if (option.includes(query)) {
                                filteredOptions.push(options[i]);
                            }
                        }
                        if (filteredOptions.length > 0) {
                            todoOptions.classList.remove("hidden");
                            filteredOptions.forEach((option) => {
                                let dropdownOptionDiv = document.createElement("div");
                                dropdownOptionDiv.classList.add("selectoptions");
                                dropdownOptionDiv.textContent = option;
                                todoOptions.appendChild(dropdownOptionDiv);
                                dropdownOptionDiv.addEventListener("click", () => {
                                    var _a;
                                    todoItemName.innerText = option;
                                    todoOptions.classList.add("hidden");
                                    let todoListItemIndex = todoItemName.id;
                                    todoListItemIndex = String(todoListItemIndex).slice(8, todoListItemIndex.length);
                                    todoList[Number(todoListItemIndex)] = [
                                        (_a = document.getElementById("txtlabel" + todoListItemIndex)) === null || _a === void 0 ? void 0 : _a.innerText,
                                        document.getElementById("checkbox" +
                                            todoListItemIndex).checked,
                                    ];
                                    localStorage.setItem("todo", JSON.stringify(todoList));
                                });
                            });
                        }
                        else {
                            todoOptions.classList.add("hidden"); // Hide dropdown if no matches
                        }
                    });
                    todoItemDiv.after(todoOptions);
                    todoItemRemove.addEventListener("click", function () {
                        let todoListItemIndex = this.id;
                        todoListItemIndex = String(todoListItemIndex).slice(8, todoListItemIndex.length);
                        todoList.splice(Number(todoListItemIndex), 1); // 2nd parameter means remove one item only
                        localStorage.setItem("todo", JSON.stringify(todoList));
                        let parent = this.parentElement;
                        parent.style.transition = "all 0.5s";
                        parent.style.left = "500px";
                        parent.style.opacity = "0";
                        setTimeout(() => {
                            updateList();
                        }, 500);
                    });
                    function saveUpdatedList() {
                        var _a;
                        let todoListItemIndex = this.id;
                        todoListItemIndex = String(todoListItemIndex).slice(8, todoListItemIndex.length);
                        todoList[Number(todoListItemIndex)] = [
                            (_a = document.getElementById("txtlabel" + todoListItemIndex)) === null || _a === void 0 ? void 0 : _a.innerText,
                            document.getElementById("checkbox" + todoListItemIndex).checked,
                        ];
                        localStorage.setItem("todo", JSON.stringify(todoList));
                    }
                    todoItemName.addEventListener("input", saveUpdatedList);
                    todoItemCheckBox.addEventListener("input", saveUpdatedList);
                });
            }
            document.head.innerHTML += `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=add" />`;
            let createNewBtn = document.createElement("button");
            createNewBtn.className = "createNewBtn";
            let clearBtn = document.createElement("button");
            clearBtn.className = "createNewBtn";
            clearBtn.id = "clearListBtn";
            clearBtn.innerHTML = "Clear All";
            clearBtn.style.backgroundColor = "rgb(223 160 160)";
            createNewBtn.innerHTML = `<span id="plusIcon" class="material-symbols-outlined">
add
</span><span> Create new Item</span>`;
            let buttonRow = document.createElement("div");
            buttonRow.className = "button-row"; // For styling
            buttonRow.appendChild(createNewBtn);
            buttonRow.appendChild(clearBtn);
            let selectedSound = 1;
            let soundsButton = document.createElement("button");
            soundsButton.className = "soundButton";
            soundsButton.innerHTML = "Music";
            container.appendChild(soundsButton);
            let ytContainer = document.createElement("div");
            document.body.appendChild(ytContainer);
            let iframe = document.createElement("iframe");
            iframe.width = "100";
            iframe.height = "100";
            iframe.style.display = "block"; // Hide iframe, it will play in the background
            iframe.src =
                "https://www.youtube.com/embed/Rm2vkXRFJ-s?autoplay=1&start=48&controls=0&modestbranding=1&rel=0&showinfo=0";
            soundsButton.addEventListener("click", function () {
                if (selectedSound == 1) {
                    selectedSound = 0;
                    iframe.src =
                        "https://www.youtube.com/embed/WPni755-Krg?autoplay=1&start=48&controls=0&modestbranding=1&rel=0&showinfo=0";
                }
                else {
                    iframe.src =
                        "https://www.youtube.com/embed/Rm2vkXRFJ-s?autoplay=1&start=48&controls=0&modestbranding=1&rel=0&showinfo=0";
                    selectedSound = 1;
                }
            });
            document.body.appendChild(iframe);
            container.appendChild(buttonRow);
            clearBtn.addEventListener("click", function () {
                todoList = [];
                localStorage.setItem("todo", JSON.stringify(todoList));
                updateList();
            });
            let header = document.getElementById("header");
            header.style.transition = "all 0.2s";
            header.style.opacity = "0";
            document.addEventListener("mousemove", function (event) {
                let mouseY = event.clientY; // Get the vertical mouse position (Y-axis)
                // Define a threshold for "near the top" (e.g., 50px from the top)
                if (mouseY < 50) {
                    header.style.opacity = "1";
                }
                else {
                    header.style.opacity = "0";
                }
            });
            createNewBtn.addEventListener("click", function () {
                todoList.push(["New Item", false]);
                localStorage.setItem("todo", JSON.stringify(todoList));
                updateList();
            });
            let timerIsOn = false;
            let timeLeft = 1500;
            let countdown = null;
            let isOnStorage = localStorage.getItem("timerIsOn");
            let timeLeftStorage = localStorage.getItem("timeLeft");
            if (isOnStorage && timeLeftStorage) {
                timerIsOn = JSON.parse(isOnStorage);
                timeLeft = JSON.parse(timeLeftStorage);
                toggleTimerState();
            }
            setTextLabel();
            function setTextLabel() {
                if (String(Math.floor(timeLeft % 60)).length == 1) {
                    timeString = `${Math.floor(timeLeft / 60)}:0${Math.floor(timeLeft % 60)} `;
                }
                else {
                    timeString = `${Math.floor(timeLeft / 60)}:${Math.floor(timeLeft % 60)} `;
                }
                timerText.innerHTML = timeString;
                let title = document.getElementsByTagName("title")[0];
                title.innerText = `(${timeString.substring(0, timeString.length - 1)}) Study Session | Schoology`;
            }
            function toggleTimerState() {
                if (timerIsOn) {
                    startTimerButton.innerHTML = "Pause";
                    if (player) {
                        player.pauseVideo(); // Pause the video
                    }
                    else {
                        console.log("no player");
                    }
                }
                else {
                    startTimerButton.innerHTML = "Study";
                    if (player) {
                        player.playVideo(); // Play the video
                    }
                    else {
                        console.log("no player");
                    }
                }
                localStorage.setItem("timerIsOn", JSON.stringify(timerIsOn));
                if (countdown !== null) {
                    clearInterval(countdown);
                }
                if (timerIsOn) {
                    countdown = setInterval(() => {
                        timeLeft -= 0.1;
                        localStorage.setItem("timeLeft", JSON.stringify(timeLeft));
                        setTextLabel();
                        if (timeLeft <= 0) {
                            timerText.innerHTML = "0:00";
                            timerIsOn = false;
                            timeLeft = 1500;
                            toggleTimerState();
                            return;
                        }
                    }, 100);
                }
                else {
                    if (countdown !== null) {
                        clearInterval(countdown);
                    }
                }
            }
            updateList();
            resetButton.addEventListener("click", function () {
                timeLeft = 1500;
                localStorage.setItem("timeLeft", JSON.stringify(timeLeft));
                timerIsOn = false;
                toggleTimerState();
                setTextLabel();
            });
            startTimerButton.addEventListener("click", function () {
                if (timerIsOn) {
                    timerIsOn = false;
                    startTimerButton.innerHTML = "Study";
                }
                else {
                    timerIsOn = true;
                    startTimerButton.innerHTML = "Pause";
                }
                toggleTimerState();
            });
        }
    }
    createStudyPage();
    let recentlyCompletedButton = document.getElementsByClassName("refresh-button")[0];
    if (recentlyCompletedButton) {
        recentlyCompletedButton.click();
    }
    setTimeout(() => {
        var _a, _b;
        let RecentCompletelist = document.getElementsByClassName("recently-completed-event");
        let popupIndex = 0;
        for (let i = 0; i < RecentCompletelist.length; i++) {
            let elm = RecentCompletelist[i];
            let storedOldGrade = localStorage.getItem("oldGrade");
            let oldGrade = [];
            if (storedOldGrade) {
                oldGrade = JSON.parse(storedOldGrade);
            }
            else {
                oldGrade = [];
            }
            let hasGradeInputted = (_a = RecentCompletelist[i].getElementsByTagName("span")[5]
                .firstElementChild) === null || _a === void 0 ? void 0 : _a.innerHTML;
            if (oldGrade.includes(elm.innerText) == false &&
                hasGradeInputted !== "—") {
                let asignmentURL = (_b = RecentCompletelist[i].firstElementChild) === null || _b === void 0 ? void 0 : _b.getElementsByTagName("span")[1].getElementsByTagName("a")[0];
                asignmentURL = asignmentURL;
                oldGrade.push(elm.innerText);
                localStorage.setItem("oldGrade", JSON.stringify(oldGrade));
                let grade = null;
                let asignmentIframe = document.createElement("iframe");
                document.body.appendChild(asignmentIframe);
                //
                //
                asignmentIframe.src = asignmentURL.href;
                asignmentIframe.onload = () => {
                    if (asignmentIframe.contentDocument) {
                        console.log("loaded");
                        if (!asignmentURL.href.includes("launch")) {
                            grade =
                                asignmentIframe.contentDocument.getElementsByClassName("grading-grade")[0];
                            if (grade !== undefined) {
                                grade = grade.innerText;
                                asignmentIframe.remove();
                                grade = grade.replace("Grade:", "").trim();
                                let message = `You got <span style="color:blue">${grade}</span> on <a style="color:#074a92" href=${asignmentURL.href}>${asignmentURL.innerText}</a>`;
                                let popupBanner = document.createElement("div");
                                popupBanner.id = "popupBanner";
                                popupBanner.innerHTML = message;
                                popupBanner.style.top = `${20 + popupIndex * 100}px`;
                                popupIndex += 1;
                                document.body.appendChild(popupBanner);
                                setTimeout(() => {
                                    popupBanner.style.right = "20px";
                                }, 100);
                                setTimeout(() => {
                                    popupBanner.style.right = "-300px";
                                }, 7000);
                            }
                            else {
                                let src = asignmentIframe.src.replace("assignment", "assignments");
                                asignmentIframe.src = src + "/mydocument";
                                asignmentIframe.onload = () => {
                                    let content = asignmentIframe.contentDocument;
                                    if (content) {
                                        setTimeout(() => {
                                            grade =
                                                content.getElementsByClassName("document-header-aside-graded-grade-3903705135")[0];
                                            if (grade !== null) {
                                                grade = grade.innerText;
                                                asignmentIframe.remove();
                                                grade = grade
                                                    .replace("Grade:", "")
                                                    .trim();
                                                let message = `You got <span style="color:blue">${grade}</span> on <a style="color:#074a92" href=${asignmentURL.href}>${asignmentURL.innerText}</a>`;
                                                let popupBanner = document.createElement("div");
                                                popupBanner.id = "popupBanner";
                                                popupBanner.innerHTML = message;
                                                popupBanner.style.top = `${20 + popupIndex * 100}px`;
                                                popupIndex += 1;
                                                document.body.appendChild(popupBanner);
                                                setTimeout(() => {
                                                    popupBanner.style.right =
                                                        "20px";
                                                }, 100);
                                                setTimeout(() => {
                                                    popupBanner.style.right =
                                                        "-300px";
                                                }, 7000);
                                            }
                                        }, 2000);
                                    }
                                };
                            }
                            // } else if (asignmentURL.href.includes("launch")) {
                            //     if (asignmentIframe.contentDocument) {
                            //         console.log("check");
                            //         console.log(asignmentIframe.contentDocument);
                            //         let edPuzzleFrame =
                            //             asignmentIframe.contentDocument.getElementsByClassName(
                            //                 "external-tool-iframe"
                            //             )[0] as HTMLIFrameElement;
                            //         console.log(edPuzzleFrame);
                            //         edPuzzleFrame.onload = () => {
                            //             let waitForLoad = setInterval(() => {
                            //                 if (edPuzzleFrame.contentDocument) {
                            //                     grade =
                            //                         edPuzzleFrame.contentDocument.getElementsByClassName(
                            //                             "hrKVwmEKoE zD3HCBbYl5"
                            //                         )[0] as HTMLIFrameElement;
                            //                     grade = grade.innerText;
                            //                     clearInterval(waitForLoad);
                            //                     asignmentIframe.remove();
                            //                     grade = grade
                            //                         .replace("Grade:", "")
                            //                         .trim();
                            //                     let message = `You got <span style="color:blue">${grade}</span> on <a style="color:#074a92" href=${asignmentURL.href}>${asignmentURL.innerText}</a>`;
                            //                     let popupBanner =
                            //                         document.createElement("div");
                            //                     popupBanner.id = "popupBanner";
                            //                     popupBanner.innerHTML = message;
                            //                     popupBanner.style.top = `${
                            //                         20 + popupIndex * 100
                            //                     }px`;
                            //                     popupIndex += 1;
                            //                     document.body.appendChild(popupBanner);
                            //                     setTimeout(() => {
                            //                         popupBanner.style.right = "20px";
                            //                     }, 100);
                            //                     setTimeout(() => {
                            //                         popupBanner.style.right = "-300px";
                            //                     }, 7000);
                            //                     return;
                            //                 }
                            //             }, 1000);
                            //         };
                            //     }
                        }
                    }
                };
            }
        }
    }, 2000);
    const waitForFrameLoad = setInterval(function () {
        let update = document.getElementsByClassName("update-body s-rte")[0];
        if (update) {
            clearInterval(waitForFrameLoad);
            if (localStorage.getItem("oldUpdate") !== update.innerText) {
                localStorage.setItem("oldUpdate", update.innerText);
                let div = document.getElementsByClassName("s-edge-type-update-post sUpdate-processed")[0];
                div.style.borderColor = "#42c5f9";
                div.style.borderWidth = "5px";
                div.style.borderStyle = "solid";
                div.style.borderRadius = "10px";
            }
        }
    }, 10);
    function titleCase(str) {
        let splitStr = str.toLowerCase().split(" ");
        for (var i = 0; i < splitStr.length; i++) {
            splitStr[i] =
                splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        return splitStr.join(" ");
    }
    function getPreviousAnswers() {
        let questionContainer = document.getElementsByClassName("lrn_response_wrapper");
        let multipleChoiceContainers = document.getElementsByClassName("lrn_mcqgroup lrn_mcqgroup-horizontal");
        alert();
        let indexOfAnswer = 0;
        Array.from(multipleChoiceContainers).forEach((questionContainer) => {
            Array.from(questionContainer.children).forEach((answer) => {
                if (answer.classList.contains("lrn_selected")) {
                    console.log(answer.innerText);
                }
                indexOfAnswer += 1;
            });
        });
    }
}
console.log(extensionOn);
let clicked = false;
document.addEventListener("keydown", function (event) {
    if (event.key.toLowerCase() === "e" &&
        event.shiftKey &&
        (event.metaKey || event.ctrlKey) && // metaKey = ⌘ on Mac, ctrlKey for fallback
        !clicked) {
        clicked = true;
        let extensionOn = localStorage.getItem("extensionOn");
        console.log(extensionOn);
        if (extensionOn && extensionOn == "true") {
            console.log("now false");
            localStorage.setItem("extensionOn", "false");
        }
        else {
            console.log("now true");
            localStorage.setItem("extensionOn", "true");
        }
        location.reload();
    }
});
// Convert HTMLCollection to an array
// setTimeout(() => {
//     (
//         document.getElementsByClassName(
//             "_1tpub zJU7e _2gJbx _3lLLU _3hM4e"
//         )[9] as HTMLDivElement
//     ).click();
//     setTimeout(() => {
//         getPreviousAnswers();
//     }, 1000);
// }, 2000);
// ©2025 William Chou. All rights reserved.
