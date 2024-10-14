const init = () => fetch('/api/users')
    .then(res => res.json())
    .then(data => {
        const rootElement = document.querySelector('#root');
        rootElement.innerHTML = "";

        data.forEach(userObj => rootElement.insertAdjacentHTML("beforeend", `
            <div class="user" style="display: flex; gap: 10px">
            <h2>${userObj.id}</h2
            <h3>${userObj.name}</h3>
            <h4>${userObj.age}</h3>
            </div>
            `))

        rootElement.insertAdjacentHTML("beforeend", `
                <form>
                <input type="text" placeholder="name" name="user-name" />
                <input type="number" placeholder="age" name="user-age" />
                <button>submit</button>
                <button tpye="reset">reset</button>
                </form>
                `)

        const formElement = document.querySelector("form");
        formElement.addEventListener("submit", (event) => {
            event.preventDefault(); // adatokat nem teszi bele a címsorba és nem tölti újra

            const userName = document.querySelector('input[name="user-name"]').value;
            const userAge = document.querySelector('input[name="user-age]').value;

            const newData = {
                name: userName,
                age: userAge
            };

            fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newData)
            })
                .then(res => res.json())
                .then(resData => {

                    console.log(resData)

                    init();
                })
        });
    });

init();