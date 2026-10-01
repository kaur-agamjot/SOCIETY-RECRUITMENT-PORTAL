const societiesData = [
  {
    id: "gdg",
    name: "GDG NSUT",
    category: "Technical",
    tagline: "Connecting student developers to Google technologies.",
    logo: "",
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
    logo: "",
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
    logo: "",
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
    logo: "",
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
    logo: "",
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
    logo: "",
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

document.addEventListener("DOMContentLoaded", function () {
    let currentCategory = "All";

    const dashboard = document.getElementById("dashboard-container");
    const searchInput = document.getElementById("search-input");
    const filterBtns = document.querySelectorAll(".filter-btn");
    const emptyState = document.getElementById("empty-state");

    const themeBtn = document.getElementById("theme-btn");
    const quizBtn = document.getElementById("quiz-btn");

    const detailModal = document.getElementById("detail-modal");
    const closeDetail = document.getElementById("close-detail");
    const detailBody = document.getElementById("detail-body");

    const quizModal = document.getElementById("quiz-modal");
    const closeQuiz = document.getElementById("close-quiz");
    const quizOptions = document.querySelectorAll(".quiz-option");
    const quizResult = document.getElementById("quiz-result");

    const confirmModal = document.getElementById("confirm-modal");
    const closeConfirm = document.getElementById("close-confirm");
    const confirmDetails = document.getElementById("confirm-details");

    const appForm = document.getElementById("app-form");
    const nameInput = document.getElementById("user-name");
    const yearInput = document.getElementById("user-year");
    const branchInput = document.getElementById("user-branch");
    const societySelect = document.getElementById("target-society");
    const roleSelect = document.getElementById("target-role");
    const whyInput = document.getElementById("user-why");

    function getBadgeClass(cat) {
        if (cat === "Technical") return "badge-technical";
        if (cat === "Cultural") return "badge-cultural";
        if (cat === "Sports") return "badge-sports";
        if (cat === "Literary") return "badge-literary";
        return "";
    }

    function renderSocieties(list) {
        if (!dashboard) return;
        dashboard.innerHTML = "";
        
        if (!list || list.length === 0) {
            emptyState.classList.remove("hidden");
            return;
        }
        emptyState.classList.add("hidden");

        for (let i = 0; i < list.length; i++) {
            let item = list[i];
            let card = document.createElement("div");
            card.className = "society-card";
            
            let badgeClass = getBadgeClass(item.category);

            card.innerHTML = `
                <div>
                    <div class="card-top">
                        <span class="logo-icon">${item.logo}</span>
                        <h3>${item.name}</h3>
                    </div>
                    <span class="category-badge ${badgeClass}">${item.category}</span>
                    <p>${item.tagline}</p>
                </div>
                <button class="card-btn">View Details</button>
            `;

            let btn = card.querySelector(".card-btn");
            btn.addEventListener("click", function() {
                openDetails(item.id);
            });

            dashboard.appendChild(card);
        }
    }

    function filterData() {
        let text = searchInput.value.toLowerCase();
        let filtered = [];

        for (let i = 0; i < societiesData.length; i++) {
            let item = societiesData[i];
            let matchCat = (currentCategory === "All" || item.category === currentCategory);
            let matchText = item.name.toLowerCase().includes(text) || item.tagline.toLowerCase().includes(text);

            if (matchCat && matchText) {
                filtered.push(item);
            }
        }

        renderSocieties(filtered);
    }

    for (let i = 0; i < filterBtns.length; i++) {
        filterBtns[i].addEventListener("click", function() {
            for (let j = 0; j < filterBtns.length; j++) {
                filterBtns[j].classList.remove("active");
            }
            this.classList.add("active");
            currentCategory = this.getAttribute("data-category");
            filterData();
        });
    }

    if (searchInput) {
        searchInput.addEventListener("input", filterData);
    }

    function populateSocietyDropdown() {
        if (!societySelect) return;
        societySelect.innerHTML = '<option value="">Select Society</option>';
        for (let i = 0; i < societiesData.length; i++) {
            let opt = document.createElement("option");
            opt.value = societiesData[i].id;
            opt.textContent = societiesData[i].name;
            societySelect.appendChild(opt);
        }
    }

    function updateRolesDropdown(socId) {
        if (!roleSelect) return;
        roleSelect.innerHTML = '<option value="">Select Role</option>';
        let found = null;
        for (let i = 0; i < societiesData.length; i++) {
            if (societiesData[i].id === socId) {
                found = societiesData[i];
                break;
            }
        }

        if (found) {
            for (let j = 0; j < found.openRoles.length; j++) {
                let opt = document.createElement("option");
                opt.value = found.openRoles[j];
                opt.textContent = found.openRoles[j];
                roleSelect.appendChild(opt);
            }
        }
    }

    if (societySelect) {
        societySelect.addEventListener("change", function() {
            updateRolesDropdown(this.value);
        });
    }

    function openDetails(id) {
        let item = null;
        for (let i = 0; i < societiesData.length; i++) {
            if (societiesData[i].id === id) {
                item = societiesData[i];
                break;
            }
        }

        if (!item) return;

        let critHtml = "";
        for (let i = 0; i < item.criteria.length; i++) {
            critHtml += `<li>${item.criteria[i]}</li>`;
        }

        let rolesHtml = "";
        for (let i = 0; i < item.openRoles.length; i++) {
            rolesHtml += `<span class="role-tag">${item.openRoles[i]}</span>`;
        }

        detailBody.innerHTML = `
            <div class="card-top">
                <span class="logo-icon">${item.logo}</span>
                <h2>${item.name}</h2>
            </div>
            <span class="category-badge ${getBadgeClass(item.category)}">${item.category}</span>
            <p style="margin-top:10px; margin-bottom:15px;">${item.description}</p>
            
            <div class="modal-section">
                <h4>Recruitment Criteria</h4>
                <ul style="padding-left:20px;">${critHtml}</ul>
            </div>
            
            <div class="modal-section">
                <h4>Open Roles</h4>
                <div>${rolesHtml}</div>
            </div>

            <button class="submit-btn" id="apply-direct-btn" style="margin-top:15px;">Apply For This Society</button>
        `;

        document.getElementById("apply-direct-btn").addEventListener("click", function() {
            applyDirect(item.id);
        });

        detailModal.classList.remove("hidden");
    }

    function applyDirect(id) {
        detailModal.classList.add("hidden");
        societySelect.value = id;
        updateRolesDropdown(id);
        document.getElementById("apply-section").scrollIntoView({ behavior: "smooth" });
    }

    if (closeDetail) {
        closeDetail.addEventListener("click", function() {
            detailModal.classList.add("hidden");
        });
    }

    if (themeBtn) {
        themeBtn.addEventListener("click", function() {
            document.body.classList.toggle("dark-theme");
            if (document.body.classList.contains("dark-theme")) {
                themeBtn.textContent = "Light Mode";
            } else {
                themeBtn.textContent = "Dark Mode";
            }
        });
    }

    if (quizBtn) {
        quizBtn.addEventListener("click", function() {
            quizResult.classList.add("hidden");
            quizModal.classList.remove("hidden");
        });
    }

    if (closeQuiz) {
        closeQuiz.addEventListener("click", function() {
            quizModal.classList.add("hidden");
        });
    }

    for (let i = 0; i < quizOptions.length; i++) {
        quizOptions[i].addEventListener("click", function() {
            let cat = this.getAttribute("data-cat");
            let matches = [];
            for (let j = 0; j < societiesData.length; j++) {
                if (societiesData[j].category === cat) {
                    matches.push(societiesData[j]);
                }
            }
            if (matches.length > 0) {
                let topMatch = matches[0];
                quizResult.innerHTML = `
                    <strong>Recommendation:</strong> ${topMatch.name}<br>
                    <p style="font-size:13px; margin-top:5px;">${topMatch.tagline}</p>
                    <button class="alt-btn" id="quiz-check-btn" style="margin-top:8px; width:100%;">Check ${topMatch.name}</button>
                `;
                
                document.getElementById("quiz-check-btn").addEventListener("click", function() {
                    quizModal.classList.add("hidden");
                    openDetails(topMatch.id);
                });

                quizResult.classList.remove("hidden");
            }
        });
    }

    if (closeConfirm) {
        closeConfirm.addEventListener("click", function() {
            confirmModal.classList.add("hidden");
        });
    }

    window.addEventListener("click", function(e) {
        if (e.target === detailModal) detailModal.classList.add("hidden");
        if (e.target === quizModal) quizModal.classList.add("hidden");
        if (e.target === confirmModal) confirmModal.classList.add("hidden");
    });

    if (appForm) {
        appForm.addEventListener("submit", function(e) {
            e.preventDefault();

            let isValid = true;

            let nameVal = nameInput.value.trim();
            let yearVal = yearInput.value;
            let branchVal = branchInput.value.trim();
            let socVal = societySelect.value;
            let roleVal = roleSelect.value;
            let whyVal = whyInput.value.trim();

            document.getElementById("name-error").textContent = "";
            document.getElementById("year-error").textContent = "";
            document.getElementById("branch-error").textContent = "";
            document.getElementById("society-error").textContent = "";
            document.getElementById("role-error").textContent = "";
            document.getElementById("why-error").textContent = "";

            nameInput.classList.remove("invalid");
            yearInput.classList.remove("invalid");
            branchInput.classList.remove("invalid");
            societySelect.classList.remove("invalid");
            roleSelect.classList.remove("invalid");
            whyInput.classList.remove("invalid");

            if (nameVal.length < 3) {
                document.getElementById("name-error").textContent = "Name must be at least 3 characters.";
                nameInput.classList.add("invalid");
                isValid = false;
            }

            if (yearVal === "") {
                document.getElementById("year-error").textContent = "Please select your year.";
                yearInput.classList.add("invalid");
                isValid = false;
            }

            if (branchVal === "") {
                document.getElementById("branch-error").textContent = "Please enter your branch code.";
                branchInput.classList.add("invalid");
                isValid = false;
            }

            if (socVal === "") {
                document.getElementById("society-error").textContent = "Please select a target society.";
                societySelect.classList.add("invalid");
                isValid = false;
            }

            if (roleVal === "") {
                document.getElementById("role-error").textContent = "Please select a target role.";
                roleSelect.classList.add("invalid");
                isValid = false;
            }

            if (whyVal.length < 15) {
                document.getElementById("why-error").textContent = "Please write at least 15 characters.";
                whyInput.classList.add("invalid");
                isValid = false;
            }

            if (isValid) {
                let socName = "";
                for (let i = 0; i < societiesData.length; i++) {
                    if (societiesData[i].id === socVal) {
                        socName = societiesData[i].name;
                        break;
                    }
                }

                let payload = {
                    name: nameVal,
                    year: yearVal,
                    branch: branchVal,
                    society: socName,
                    role: roleVal,
                    reason: whyVal
                };

                console.log("Application Submitted:", payload);

                confirmDetails.innerHTML = `
                    <p style="margin-top:10px;"><strong>Name:</strong> ${payload.name}</p>
                    <p><strong>Society:</strong> ${payload.society}</p>
                    <p><strong>Role:</strong> ${payload.role}</p>
                    <p><strong>Branch & Year:</strong> ${payload.branch} (${payload.year})</p>
                `;

                appForm.reset();
                roleSelect.innerHTML = '<option value="">Select Role</option>';
                confirmModal.classList.remove("hidden");
            }
        });
    }

    populateSocietyDropdown();
    renderSocieties(societiesData);
});