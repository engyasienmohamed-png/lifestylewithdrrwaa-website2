
document.addEventListener("DOMContentLoaded", function () {
    const tallyForm = document.getElementById("tally-form");
    const selectedServiceText = document.getElementById("selected-service-text");
    const selectedPlan = document.getElementById("selected-plan");
    const selectedPlanName = document.getElementById("selected-plan-name");
    const confirmButton = document.getElementById("confirm-button");
    const successMessage = document.getElementById("success-message");
    const serviceCards = document.querySelectorAll(".service-card");
    const currentYear = document.getElementById("current-year");

    const tallyBaseUrl = "https://tally.so/embed/rjxNaL";
    const tallyParameters =
        "?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1";

    let chosenService = "";

    // Update the footer year
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    // Select a service and move to registration
    function selectService(service) {
        chosenService = service;

        if (selectedServiceText) {
            selectedServiceText.textContent =
                "You selected: " + service + ". Complete the form below to get started.";
        }

        if (selectedPlan && selectedPlanName) {
            selectedPlanName.textContent = service;
            selectedPlan.hidden = false;
        }

        // Pass the selected service to Tally as a URL parameter.
        // Add a hidden field named "service" in Tally to capture it.
        if (tallyForm) {
            const formUrl = new URL(tallyBaseUrl);
            formUrl.searchParams.set("alignLeft", "1");
            formUrl.searchParams.set("hideTitle", "1");
            formUrl.searchParams.set("transparentBackground", "1");
            formUrl.searchParams.set("dynamicHeight", "1");
            formUrl.searchParams.set("service", service);

            tallyForm.src = formUrl.toString();
        }

        if (successMessage) {
            successMessage.hidden = true;
        }

        // Scroll to the registration section
        const registrationSection = document.getElementById("registration");

        if (registrationSection) {
            registrationSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    }

    // Attach click behavior to all six service buttons
    serviceCards.forEach(function (card) {
        card.addEventListener("click", function () {
            const service = card.dataset.service;

            if (service) {
                selectService(service);
            }
        });
    });

    // Confirmation message
    if (confirmButton) {
        confirmButton.addEventListener("click", function () {
            if (!chosenService) {
                alert("Please choose a nutrition plan first.");
                document.getElementById("services").scrollIntoView({
                    behavior: "smooth"
                });
                return;
            }

            const confirmed = window.confirm(
                "Have you completed and submitted the registration form?"
            );

            if (!confirmed) {
                return;
            }

            if (successMessage) {
                successMessage.hidden = false;

                successMessage.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });
            }
        });
    }
});
