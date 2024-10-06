document.addEventListener("DOMContentLoaded", function () {
  const roles = [
    "Front end developer.",
    "Back end developer.",
    "UI/UX designer.",
    "Web developer.",
    "Software engineer.", // Add the default text to the roles array
  ];

  const animatedText = document.getElementById("animated-text");
  const prefix = "I'm a ";
  let currentIndex = 0;

  function typeText(text, callback) {
    let i = 0;
    animatedText.textContent = prefix; // Start with the static part
    animatedText.classList.add("glow"); // Add glow effect

    function typing() {
      if (i < text.length) {
        animatedText.textContent += text.charAt(i);

        i++;
        setTimeout(typing, 100); // Adjust typing speed here
      } else {
        setTimeout(() => {
          callback();
        }, 1000); // Show text for a moment before erasing (not needed for default text)
      }
    }

    typing();
  }

  function eraseText(callback) {
    let text = animatedText.textContent.substring(prefix.length); // Remove prefix for erasing
    let i = text.length;

    function erasing() {
      if (i > 0) {
        animatedText.textContent = prefix + text.substring(0, i - 1); // Retain prefix while erasing
        i--;
        setTimeout(erasing, 50); // Adjust erasing speed here
      } else {
        animatedText.classList.remove("glow"); // Remove glow effect after erasing
        callback();
      }
    }

    erasing();
  }

  function startAnimation() {
    if (currentIndex < roles.length) {
      typeText(roles[currentIndex], () => {
        if (currentIndex < roles.length - 1) {
          // Erase only if it's not the last role
          eraseText(() => {
            currentIndex++;
            startAnimation(); // Start the next role
          });
        } else {
          animatedText.classList.add("glow"); // Add glow effect to the final text
        }
      });
    }
  }

  // Start the animation
  startAnimation();
});

function sendMail() {
  let parms = {
    user_name: document.getElementById("user_name").value,
    user_email: document.getElementById("user_email").value,
    subject: document.getElementById("subject").value,
    message: document.getElementById("message").value,
  };

  emailjs
    .send("contact_service ", "contact_form", parms)
    .then(alert("Email Sent !!"));
}
