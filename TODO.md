gi# Implementation Plan for Toy Tale App

## Steps to Complete:

1. **Fetch and Render Toys on Page Load**
   - In `src/index.js`, within DOMContentLoaded, after the existing form toggle code, add a fetch GET to `http://localhost:3000/toys`.
   - For each toy in the response, create a card div with: h2 (toy.name), img (src=toy.image, class="toy-avatar"), p (`${toy.likes} Likes`), button (class="like-btn", id=toy.id, text="Like ❤️").
   - Append each card to `#toy-collection`.
   - Set up event delegation on `#toy-collection` for clicks on `.like-btn` to handle likes dynamically.

2. **Handle Form Submission for Adding New Toy**
   - Add event listener to `.add-toy-form` for 'submit'.
   - Prevent default form submission.
   - Collect form data: name from input[name="name"], image from input[name="image"].
   - Create newToy object: {name, image, likes: 0}.
   - POST to `http://localhost:3000/toys` with headers: {"Content-Type": "application/json", "Accept": "application/json"}, body: JSON.stringify(newToy).
   - On success, render the new toy as a card in `#toy-collection` and reset the form inputs.

3. **Handle Like Button Clicks**
   - In the event delegation for `.like-btn` clicks:
     - Get toyId from event.target.id.
     - Fetch current toy: GET `http://localhost:3000/toys/${toyId}`.
     - Increment toy.likes.
     - PATCH to `http://localhost:3000/toys/${toyId}` with body: JSON.stringify({likes: toy.likes}), same headers.
     - On success, find the corresponding card's p tag and update text to `${toy.likes} Likes`.

4. **Testing and Verification**
   - Start json-server: `json-server --watch db.json` in the project directory.
   - Open index.html in browser.
   - Verify: Toys load and render as cards; form submits new toy and adds card; like button increments likes and updates DOM.
   - Run `npm test` to check any available tests.

Progress: None completed yet.
