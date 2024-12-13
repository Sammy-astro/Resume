document.addEventListener("DOMContentLoaded", function () {
  const roles = [
    "Front end developer.",
    "Back end developer.",
    "UI/UX designer.",
    "Web developer.",
    "Software engineer.",
  ];

  const animatedText = document.getElementById("animated-text");
  const prefix = "I'm a ";
  let currentIndex = 0;
  let ballsInterval;
  let ballsContainer = document.querySelector(".falling-balls");

  function typeText(text, callback) {
    let i = 0;
    animatedText.textContent = prefix;
    animatedText.classList.add("glow");

    function typing() {
      if (i < text.length) {
        animatedText.textContent += text.charAt(i);
        i++;
        setTimeout(typing, 100);
      } else {
        setTimeout(() => {
          callback();
        }, 1000);
      }
    }

    typing();
  }

  function eraseText(callback) {
    let text = animatedText.textContent.substring(prefix.length);
    let i = text.length;

    function erasing() {
      if (i > 0) {
        animatedText.textContent = prefix + text.substring(0, i - 1);
        i--;
        setTimeout(erasing, 50);
      } else {
        animatedText.classList.remove("glow");
        callback();
      }
    }

    erasing();
  }

  function createBalls() {
    const ball = document.createElement("div");
    ball.classList.add("ball");

    const size = Math.random() * 6 + 2;
    const startPos = Math.random() * window.innerWidth;

    ball.style.width = `${size}px`;
    ball.style.height = `${size}px`;
    ball.style.left = `${startPos}px`;
    ball.style.animationDuration = `${Math.random() * 4 + 3}s`;

    ballsContainer.appendChild(ball);

    ball.addEventListener("animationend", () => {
      ball.remove();
    });
  }

  function stopBallsAnimation() {
    clearInterval(ballsInterval);
    // Remove the balls container entirely
    if (ballsContainer) {
      ballsContainer.remove();
    }
  }

  // Start balls animation
  ballsInterval = setInterval(createBalls, 300);

  function startAnimation() {
    if (currentIndex < roles.length) {
      typeText(roles[currentIndex], () => {
        if (currentIndex < roles.length - 1) {
          eraseText(() => {
            currentIndex++;
            startAnimation();
          });
        } else {
          // Stop and remove all balls when text animation is complete
          stopBallsAnimation();
          animatedText.classList.add("glow");
        }
      });
    }
  }

  startAnimation();

  // Contact panel functionality
  const contactLinks = document.querySelectorAll('a[href="#contact"]');
  const contactSection = document.getElementById("contact");
  const overlay = document.querySelector(".overlay");
  const closeButton = document.querySelector(".close-contact");

  function openContact() {
    contactSection.classList.add("active");
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeContact() {
    contactSection.classList.remove("active");
    overlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  contactLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      openContact();
    });
  });

  closeButton.addEventListener("click", closeContact);
  overlay.addEventListener("click", closeContact);

  // Update your existing email form submission
  const contactForm = document.getElementById("contact-form");
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    let parms = {
      user_name: document.getElementById("user_name").value,
      user_email: document.getElementById("user_email").value,
      subject: document.getElementById("subject").value,
      message: document.getElementById("message").value,
    };

    emailjs
      .send("contact_service", "contact_form", parms)
      .then(() => {
        alert("Email Sent !!");
        contactForm.reset();
        closeContact();
      })
      .catch((error) => {
        console.log("FAILED...", error);
        alert("Failed to send message. Please try again.");
      });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.1, // Triggers when 10% of the section is visible
    }
  );

  const servicesSection = document.querySelector("#services");
  if (servicesSection) {
    observer.observe(servicesSection);
  }

  const educationSection = document.querySelector('#education');
  if (educationSection) {
    observer.observe(educationSection);
  }

  const navLinks = document.querySelectorAll('.nav-links a');
  
  function setActiveSection() {
    // Get all sections
    const sections = document.querySelectorAll('section');
    
    // Find which section is currently most visible in the viewport
    let maxVisibleSection = null;
    let maxVisibleHeight = 0;
    
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      const visibleHeight = Math.min(rect.bottom, window.innerHeight) - 
                          Math.max(rect.top, 0);
      
      if (visibleHeight > maxVisibleHeight) {
        maxVisibleHeight = visibleHeight;
        maxVisibleSection = section;
      }
    });
    
    if (maxVisibleSection) {
      // Remove active class from all links
      navLinks.forEach(link => link.classList.remove('active'));
      
      // Add active class to the link corresponding to the most visible section
      const activeLink = document.querySelector(`.nav-links a[href="#${maxVisibleSection.id}"]`);
      if (activeLink) {
        activeLink.classList.add('active');
      }
    }
  }

  // Update active section on scroll
  window.addEventListener('scroll', setActiveSection);
  
  // Set initial active section
  setActiveSection();

  // Handle click events
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Remove active class from all links
      navLinks.forEach(l => l.classList.remove('active'));
      
      // Add active class to clicked link
      this.classList.add('active');
    });
  });
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
