const loadingAnimationEl = document.getElementsByClassName("loading-animation")[0];

function displayLoadingAnimation() {
    loadingAnimationEl.style.opacity = 1;
}

function hideLoadingAnimation() {
    loadingAnimationEl.style.opacity = 0;
    loadingAnimationEl.addEventListener("transitionend", () => {
        loadingAnimationEl.style.display = "none";
    });
}

