# Omkar Stays — Premium Luxury Eco-Resort

This is a static, production-ready front-end template for a luxury eco-resort website. It uses HTML5, CSS3, JavaScript (ES6), Bootstrap 5, GSAP, AOS, SwiperJS and Font Awesome via CDN.

How to run
- Open the project in Visual Studio Code and run Live Server on `index.html`.
- Or simply open `index.html` in your browser.

Replace images and video
- Put images into `/images/` matching names in the templates, or update references in HTML.
- Place a drone video at `/videos/drone.mp4`. The hero supports both video or image slideshow.

Google Form integration (booking / contact)
- Each form has a `data-form-url` attribute. Replace the placeholder URL with your Google Form response URL (the `formResponse` endpoint) or your preferred form endpoint.
- The scripts will POST the form fields to that URL and open the submission in a new tab. To wire fields to Google Form inputs, adjust the input `name` attributes to use `entry.<id>` values from Google Forms.

Libraries (CDN)
- Bootstrap 5
- GSAP
- AOS
- SwiperJS
- Font Awesome

Notes
- Images are intentionally not included. Replace placeholders in `/images/`.
- The site is built to be accessible, responsive and performant with lazy-loading and optimized CSS.
