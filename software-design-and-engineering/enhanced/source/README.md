# CS465-SNHU

This is for the CS 465 course with SNHU



\# Travlr Getaways Full Stack Application



\## Architecture



This project used several types of frontend development. The customer-facing side started as an Express application using HTML, JavaScript, routing, controllers, and Handlebars templates. This worked well for public pages because the server could render the pages and send them to the browser. As the project grew, the admin side was built as an Angular single-page application. The SPA felt different because it allowed the administrator to move between views, load data, edit records, and update the page without relying on a full page reload every time.



The Express frontend and the Angular SPA both display travel data, but they do it in different ways. The Express side is more traditional because the server controls the route and renders the view. The Angular side is more interactive because components, routes, forms, and services handle much of the user interaction in the browser. This made the admin side a better fit for managing trips because it needed richer functionality like adding and editing records.



The backend used MongoDB because the trip data fits well as document-based data. Each trip can be stored as a JSON-style document with fields such as code, name, length, start date, resort, price, image, and description. MongoDB also worked well with the MEAN stack because the application used JavaScript-based tools throughout the project, including Node, Express, Angular, and MongoDB with Mongoose.





\## Functionality



JSON is different from JavaScript because JSON is a data format, while JavaScript is a programming language. JSON uses a structured text format to represent data, and it can be passed between the frontend and backend. In this project, JSON helped connect the different parts of the application because the Express API returned trip records as JSON, and the Angular SPA used that JSON data to display and update trips.



Refactoring was a major part of the full stack process. Early in the project, the site started closer to static HTML. Later, the code was reorganized into an MVC structure with routes, controllers, views, and models. The trip data was also moved from static content into JSON and then into MongoDB. The API was added so the application could retrieve, add, update, and delete trip records through endpoints instead of hardcoded pages.



The Angular SPA also improved functionality by using reusable UI components. For example, the trip card component made it possible to display each trip in the same layout without rewriting the same HTML over and over. This made the application easier to maintain because changes to the trip card layout could be made in one place and reused across the listing page.





\## Testing



Testing helped confirm that each layer of the application was working correctly. In a full stack application, methods such as GET, POST, PUT, and DELETE describe the type of request being made. Endpoints define where those requests are sent, such as `/api/trips` for the trip list or `/api/trips/:tripCode` for one specific trip. The frontend sends requests to these endpoints, the Express API processes them, and MongoDB stores or returns the data.



Postman was used to test the API endpoints directly before relying on the frontend. GET requests were used to confirm that trip data could be retrieved. POST requests were used to add new trips. PUT requests were used to update existing trips, and DELETE requests were tested to remove records. This helped separate backend testing from frontend testing because I could confirm the API worked before testing the Angular interface.



Adding security made testing more involved. After authentication was added, some endpoints could no longer be tested with a simple request. The admin user had to register or log in first, receive a JSON Web Token, and then send that token with protected requests. A PUT request without a token returned 401 Unauthorized, while the same request with a valid Bearer token returned 200 OK. This showed that the backend was protecting the admin functions instead of allowing anyone to change trip data.





\## Reflection



This course helped me understand how the different layers of a full stack application work together. Before this project, it was easier to think about frontend, backend, and database development as separate topics. Building the Travlr Getaways application made those pieces feel more connected because each part depended on the others. The frontend needed the API, the API needed the database, and the admin interface needed authentication before it could safely update data.



The course also helped me become more comfortable working with the MEAN stack. I gained experience with Node and Express routing, Handlebars templates, MongoDB and Mongoose models, RESTful API endpoints, Angular components and services, and JSON Web Token authentication. I also got more practice using GitHub, Postman, and the command line as part of a normal development workflow.



From a career standpoint, this project gave me a better understanding of how modern web applications are structured. Full stack development is valuable because it requires understanding both the user-facing side and the server-side logic behind it. The Module Eight article on JavaScript full stack development connected with this because it described how full stack JavaScript can be useful when the same language is used across multiple layers of an application. Even though each layer had its own purpose, the overall stack stayed connected through JavaScript, JSON, and shared application data.

The biggest skill I developed was understanding how to trace a feature through the entire application. For example, editing a trip involved the Angular form, the trip data service, an HTTP PUT request, the Express route, the controller, the Mongoose model, and the MongoDB record. Seeing that full path helped me understand what full stack development really means. I also learned that testing and security cannot be treated as afterthoughts, because the application only works correctly if the API returns the right data and protects the actions that should only be available to authorized users.





