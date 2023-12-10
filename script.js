document.addEventListener('DOMContentLoaded', function (event) {
    var dataText = ["Developer"];

    function typeWriter(text, i, fnCallback) {
        if (i < (text.length)) {
            document.querySelector("#position").innerHTML = text.substring(0, i + 1) + '<span aria-hidden="true"></span>';

            setTimeout(function () {
                typeWriter(text, i + 1, fnCallback)
            }, 100);
        } else if (typeof fnCallback == 'function') {
            // call callback after timeout
            setTimeout(fnCallback, 700);
        }
    }

    function StartTextAnimation(i) {
        if (typeof dataText[i] == 'undefined') {
            setTimeout(function () {
                StartTextAnimation(0);
            }, 20000);
        }
        if (i < dataText[i].length) {
            typeWriter(dataText[i], 0, function () {
                StartTextAnimation(i + 1);
            });
        }
    }
    StartTextAnimation(0);
});

// light/dark toggle
document.addEventListener('DOMContentLoaded', function () {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    themeToggle.addEventListener('click', function () {
        // Toggle between light and dark themes
        // 
        var path;
        if(this.getAttribute("src") === "images/sun-light.svg")
            path = "images/half-moon.svg";
        else
            path = "images/sun-light.svg";
        this.setAttribute("src", path);
    // 
        body.classList.toggle('light');
        body.classList.toggle('dark');

        // Save the current theme preference to local storage
        const currentTheme = body.classList.contains('dark') ? 'dark' : 'light';
        localStorage.setItem('theme', currentTheme);
    });

    // Check for a previously saved theme preference in local storage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.add(savedTheme);
    } else {
        // Use the browser's preference as the default theme
        const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (userPrefersDark) {
            body.classList.add('dark');
        } else {
            body.classList.add('light');
        }
    }
});
