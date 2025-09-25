let addToy = false;
.document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  // Fetch and render initial toys
  fetch('http://localhost:3000/toys')
    .then(response => response.json())
    .then(toys => {
      const toyCollection = document.querySelector("#toy-collection");
      toys.forEach(toy => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
          <h2>${toy.name}</h2>
          <img src="${toy.image}" class="toy-avatar" />
          <p>${toy.likes} Likes</p>
          <button class="like-btn" id="${toy.id}">Like ❤️</button>
        `;
        toyCollection.append(card);
      });
    });

  // Handle form submission for new toy
  const toyForm = document.querySelector(".add-toy-form");
  toyForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const nameInput = e.target.querySelector('input[name="name"]').value;
    const imageInput = e.target.querySelector('input[name="image"]').value;
    const newToy = {
      name: nameInput,
      image: imageInput,
      likes: 0
    };
    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(newToy)
    })
    .then(response => response.json())
    .then(toy => {
      const toyCollection = document.querySelector("#toy-collection");
      const card = document.createElement('div');
      card.classList.add('card');
      card.innerHTML = `
        <h2>${toy.name}</h2>
        <img src="${toy.image}" class="toy-avatar" />
        <p>${toy.likes} Likes</p>
        <button class="like-btn" id="${toy.id}">Like ❤️</button>
      `;
      toyCollection.append(card);
      e.target.reset();
    });
  });

  // Event delegation for like buttons
  const toyCollection = document.querySelector("#toy-collection");
  toyCollection.addEventListener("click", (e) => {
    if (e.target.classList.contains('like-btn')) {
      const toyId = parseInt(e.target.id);
      fetch(`http://localhost:3000/toys/${toyId}`)
        .then(response => response.json())
        .then(toy => {
          toy.likes += 1;
          fetch(`http://localhost:3000/toys/${toyId}`, {
            method: 'PATCH',
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify({
              likes: toy.likes
            })
          })
          .then(response => response.json())
          .then(updatedToy => {
            const likesP = e.target.previousElementSibling;
            likesP.textContent = `${updatedToy.likes} Likes`;
          });
        });
    }
  });
});
