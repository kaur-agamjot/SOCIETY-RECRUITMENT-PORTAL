let mySocieties = [
    {
        id: "gdg",
        name: "GDG NSUT",
        category: "Technical",
        tagline: "Connecting student developers to Google technologies.",
        logo: "[TECH]",
        description: "GDG NSUT is a student-led community focused on building software skills, hosting hackathons, and learning about modern web and mobile development technologies.",
        criteria: [
            "Interest in programming or technology",
            "Willingness to learn and collaborate",
            "Available for weekly team meetups"
        ],
        openRoles: [
            "Frontend Developer",
            "Backend Developer",
            "UI/UX Designer",
            "Event Coordinator"
        ]
    },
    {
        id: "devcomm",
        name: "DevComm",
        category: "Technical",
        tagline: "The official software engineering society of NSUT.",
        logo: "[DEV]",
        description: "DevComm works on open source projects, core engineering frameworks, and competitive programming events across the campus.",
        criteria: [
            "Basic understanding of any programming language",
            "Good problem solving skills",
            "Active involvement in team projects"
        ],
        openRoles: [
            "Web Developer",
            "App Developer",
            "Competitive Programming Mentor"
        ]
    },
    {
        id: "ashwamedh",
        name: "Ashwamedh",
        category: "Cultural",
        tagline: "Premier dramatics society specializing in street and stage plays.",
        logo: "[DRAMA]",
        description: "Ashwamedh is the dramatics society of NSUT, bringing social issues and creative stories to life through street plays and stage performances.",
        criteria: [
            "Passionate about acting or scriptwriting",
            "Good vocal clarity and confidence",
            "Commitment to evening rehearsals"
        ],
        openRoles: [
            "Street Play Actor",
            "Stage Actor",
            "Script Writer",
            "Production Manager"
        ]
    },
    {
        id: "crescendo",
        name: "Crescendo",
        category: "Cultural",
        tagline: "The musical heartbeat of the campus.",
        logo: "[MUSIC]",
        description: "Crescendo brings vocalists, instrumentalists, and music producers together to perform at college fests and national competitions.",
        criteria: [
            "Vocal or instrumental ability",
            "Basic ear training or rhythm sense",
            "Dedication to group practice sessions"
        ],
        openRoles: [
            "Vocalist",
            "Guitarist/Keyboardist",
            "Drummer",
            "Sound Engineer"
        ]
    },
    {
        id: "sports-cell",
        name: "NSUT Sports Cell",
        category: "Sports",
        tagline: "Fostering athletic resilience and hosting campus sports tournaments.",
        logo: "[SPORTS]",
        description: "NSUT Sports Cell organizes intra-college tournaments, manages sports equipment, and prepares campus teams for inter-college events.",
        criteria: [
            "Active interest in any sport",
            "Physical fitness and sportsmanship",
            "Ability to organize sports matches"
        ],
        openRoles: [
            "Event Manager",
            "Team Captain",
            "Logistics Coordinator"
        ]
    },
    {
        id: "crosslinks",
        name: "Crosslinks DebSoc",
        category: "Literary",
        tagline: "Refining public speaking, critical discourse, and debating.",
        logo: "[DEBATE]",
        description: "Crosslinks is the official literary and debating society, hosting conventional debates, Model UNs, and creative writing workshops.",
        criteria: [
            "Strong command over English or Hindi speech",
            "Interest in current affairs and debate formats",
            "Active participation in discussions"
        ],
        openRoles: [
            "Debater",
            "Model UN Delegate",
            "Content Writer",
            "PR Manager"
        ]
    }
];

window.onload = function () {
    let currentCategory = "All";

    let mainBox = document.getElementById("dashboard-container");
    let searchBox = document.getElementById("search-input");
    let categoryBtns = document.querySelectorAll(".filter-btn");
    let emptyMessage = document.getElementById("empty-state");

    let toggleTheme = document.getElementById("theme-btn");
    let openQuiz = document.getElementById("quiz-btn");

    let infoModal = document.getElementById("detail-modal");
    let closeInfo = document.getElementById("close-detail");
    let infoContent = document.getElementById("detail-body");

    let quizPopup = document.getElementById("quiz-modal");
    let closeQuizPopup = document.getElementById("close-quiz");
    let quizChoices = document.querySelectorAll(".quiz-option");
    let quizAnswerBox = document.getElementById("quiz-result");

    let successModal = document.getElementById("confirm-modal");
    let closeSuccess = document.getElementById("close-confirm");
    let successDetails = document.getElementById("confirm-details");

    let mainForm = document.getElementById("app-form");
    let nameField = document.getElementById("user-name");
    let yearField = document.getElementById("user-year");
    let branchField = document.getElementById("user-branch");
    let societyDropdown = document.getElementById("target-society");
    let roleDropdown = document.getElementById("target-role");
    let reasonField = document.getElementById("user-why");

    function pickBadge(cat) {
        if (cat === "Technical") return "badge-technical";
        if (cat === "Cultural") return "badge-cultural";
        if (cat === "Sports") return "badge-sports";
        if (cat === "Literary") return "badge-literary";
        return "";
    }

    function showCards(list) {
        if (!mainBox) return;
        mainBox.innerHTML = "";

        if (!list || list.length === 0) {
            emptyMessage.classList.remove("hidden");
            return;
        }
        emptyMessage.classList.add("hidden");

        for (let i = 0; i < list.length; i++) {
            let item = list[i];
            let newCard = document.createElement("div");
            newCard.className = "society-card";

            let tagClass = pickBadge(item.category);

            newCard.innerHTML = `
                <div>
                    <div class="card-top">
                        <span class="logo-icon">${item.logo}</span>
                        <h3>${item.name}</h3>
                    </div>
                    <span class="category-badge ${tagClass}">${item.category}</span>
                    <p>${item.tagline}</p>
                </div>
                <button class="card-btn">View Details</button>
            `;

            let cardButton = newCard.querySelector(".card-btn");
            cardButton.onclick = function () {
                openCardDetails(item.id);
            };

            mainBox.appendChild(newCard);
        }
    }

    function applyFilters() {
        let text = searchBox.value.toLowerCase();
        let results = [];

        for (let i = 0; i < mySocieties.length; i++) {
            let item = mySocieties[i];
            let checkCat = (currentCategory === "All" || item.category === currentCategory);
            let checkText = item.name.toLowerCase().includes(text) || item.tagline.toLowerCase().includes(text);

            if (checkCat && checkText) {
                results.push(item);
            }
        }

        showCards(results);
    }

    for (let i = 0; i < categoryBtns.length; i++) {
        categoryBtns[i].onclick = function () {
            for (let j = 0; j < categoryBtns.length; j++) {
                categoryBtns[j].classList.remove("active");
            }
            this.classList.add("active");
            currentCategory = this.getAttribute("data-category");
            applyFilters();
        };
    }

    if (searchBox) {
        searchBox.oninput = applyFilters;
    }

    function loadSocietiesIntoSelect() {
        if (!societyDropdown) return;
        societyDropdown.innerHTML = '<option value="">Select Society</option>';
        for (let i = 0; i < mySocieties.length; i++) {
            let optionElement = document.createElement("option");
            optionElement.value = mySocieties[i].id;
            optionElement.textContent = mySocieties[i].name;
            societyDropdown.appendChild(optionElement);
        }
    }

    function loadRolesForSociety(selectedId) {
        if (!roleDropdown) return;
        roleDropdown.innerHTML = '<option value="">Select Role</option>';
        let chosenSociety = null;

        for (let i = 0; i < mySocieties.length; i++) {
            if (mySocieties[i].id === selectedId) {
                chosenSociety = mySocieties[i];
                break;
            }
        }

        if (chosenSociety) {
            for (let j = 0; j < chosenSociety.openRoles.length; j++) {
                let roleOption = document.createElement("option");
                roleOption.value = chosenSociety.openRoles[j];
                roleOption.textContent = chosenSociety.openRoles[j];
                roleDropdown.appendChild(roleOption);
            }
        }
    }

    if (societyDropdown) {
        societyDropdown.onchange = function () {
            loadRolesForSociety(this.value);
        };
    }

    function openCardDetails(id) {
        let item = null;
        for (let i = 0; i < mySocieties.length; i++) {
            if (mySocieties[i].id === id) {
                item = mySocieties[i];
                break;
            }
        }

        if (!item) return;

        let reqs = "";
        for (let i = 0; i < item.criteria.length; i++) {
            reqs += `<li>${item.criteria[i]}</li>`;
        }

        let rolesList = "";
        for (let i = 0; i < item.openRoles.length; i++) {
            rolesList += `<span class="role-tag">${item.openRoles[i]}</span>`;
        }

        infoContent.innerHTML = `
            <div class="card-top">
                <span class="logo-icon">${item.logo}</span>
                <h2>${item.name}</h2>
            </div>
            <span class="category-badge ${pickBadge(item.category)}">${item.category}</span>
            <p style="margin-top:10px; margin-bottom:15px;">${item.description}</p>
            
            <div class="modal-section">
                <h4>Recruitment Criteria</h4>
                <ul style="padding-left:20px;">${reqs}</ul>
            </div>
            
            <div class="modal-section">
                <h4>Open Roles</h4>
                <div>${rolesList}</div>
            </div>

            <button class="submit-btn" id="direct-apply" style="margin-top:15px;">Apply For This Society</button>
        `;

        document.getElementById("direct-apply").onclick = function () {
            infoModal.classList.add("hidden");
            societyDropdown.value = item.id;
            loadRolesForSociety(item.id);
            document.getElementById("apply-section").scrollIntoView({ behavior: "smooth" });
        };

        infoModal.classList.remove("hidden");
    }

    if (closeInfo) {
        closeInfo.onclick = function () {
            infoModal.classList.add("hidden");
        };
    }

    if (toggleTheme) {
        toggleTheme.onclick = function () {
            document.body.classList.toggle("dark-theme");
            if (document.body.classList.contains("dark-theme")) {
                toggleTheme.textContent = "Light Mode";
            } else {
                toggleTheme.textContent = "Dark Mode";
            }
        };
    }

    if (openQuiz) {
        openQuiz.onclick = function () {
            quizAnswerBox.classList.add("hidden");
            quizPopup.classList.remove("hidden");
        };
    }

    if (closeQuizPopup) {
        closeQuizPopup.onclick = function () {
            quizPopup.classList.add("hidden");
        };
    }

    for (let i = 0; i < quizChoices.length; i++) {
        quizChoices[i].onclick = function () {
            let categoryType = this.getAttribute("data-cat");
            let listMatches = [];

            for (let j = 0; j < mySocieties.length; j++) {
                if (mySocieties[j].category === categoryType) {
                    listMatches.push(mySocieties[j]);
                }
            }

            if (listMatches.length > 0) {
                let firstMatch = listMatches[0];
                quizAnswerBox.innerHTML = `
                    <strong>Recommendation:</strong> ${firstMatch.name}<br>
                    <p style="font-size:13px; margin-top:5px;">${firstMatch.tagline}</p>
                    <button class="alt-btn" id="quiz-btn-go" style="margin-top:8px; width:100%;">Check ${firstMatch.name}</button>
                `;

                document.getElementById("quiz-btn-go").onclick = function () {
                    quizPopup.classList.add("hidden");
                    openCardDetails(firstMatch.id);
                };

                quizAnswerBox.classList.remove("hidden");
            }
        };
    }

    if (closeSuccess) {
        closeSuccess.onclick = function () {
            successModal.classList.add("hidden");
        };
    }

    window.onclick = function (e) {
        if (e.target === infoModal) infoModal.classList.add("hidden");
        if (e.target === quizPopup) quizPopup.classList.add("hidden");
        if (e.target === successModal) successModal.classList.add("hidden");
    };

    if (mainForm) {
        mainForm.onsubmit = function (e) {
            e.preventDefault();

            let valid = true;

            let nameVal = nameField.value.trim();
            let yearVal = yearField.value;
            let branchVal = branchField.value.trim();
            let socVal = societyDropdown.value;
            let roleVal = roleDropdown.value;
            let whyVal = reasonField.value.trim();

            document.getElementById("name-error").textContent = "";
            document.getElementById("year-error").textContent = "";
            document.getElementById("branch-error").textContent = "";
            document.getElementById("society-error").textContent = "";
            document.getElementById("role-error").textContent = "";
            document.getElementById("why-error").textContent = "";

            nameField.classList.remove("invalid");
            yearField.classList.remove("invalid");
            branchField.classList.remove("invalid");
            societyDropdown.classList.remove("invalid");
            roleDropdown.classList.remove("invalid");
            reasonField.classList.remove("invalid");

            if (nameVal.length < 3) {
                document.getElementById("name-error").textContent = "Name must be at least 3 characters.";
                nameField.classList.add("invalid");
                valid = false;
            }

            if (yearVal === "") {
                document.getElementById("year-error").textContent = "Please select your year.";
                yearField.classList.add("invalid");
                valid = false;
            }

            if (branchVal === "") {
                document.getElementById("branch-error").textContent = "Please enter your branch code.";
                branchField.classList.add("invalid");
                valid = false;
            }

            if (socVal === "") {
                document.getElementById("society-error").textContent = "Please select a target society.";
                societyDropdown.classList.add("invalid");
                valid = false;
            }

            if (roleVal === "") {
                document.getElementById("role-error").textContent = "Please select a target role.";
                roleDropdown.classList.add("invalid");
                valid = false;
            }

            if (whyVal.length < 15) {
                document.getElementById("why-error").textContent = "Please write at least 15 characters.";
                reasonField.classList.add("invalid");
                valid = false;
            }

            if (valid) {
                let chosenName = "";
                for (let i = 0; i < mySocieties.length; i++) {
                    if (mySocieties[i].id === socVal) {
                        chosenName = mySocieties[i].name;
                        break;
                    }
                }

                successDetails.innerHTML = `
                    <p style="margin-top:10px;"><strong>Name:</strong> ${nameVal}</p>
                    <p><strong>Society:</strong> ${chosenName}</p>
                    <p><strong>Role:</strong> ${roleVal}</p>
                    <p><strong>Branch and Year:</strong> ${branchVal} (${yearVal})</p>
                `;

                mainForm.reset();
                roleDropdown.innerHTML = '<option value="">Select Role</option>';
                successModal.classList.remove("hidden");
            }
        };
    }

    loadSocietiesIntoSelect();
    showCards(mySocieties);
};