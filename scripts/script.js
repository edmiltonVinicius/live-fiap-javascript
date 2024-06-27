
window.onload = function() {

  const form = document.getElementById('form');
  
  form.addEventListener('submit', function(event) {
    event.preventDefault();
    
    login();
  });
  
  async function login() {
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const buttonSubmit = document.getElementById('button-submit');
    const buttonText = document.querySelector('.button-text');
    const spinner = document.querySelector('.spinner');

    try {

      const emailValue = email.value.trim();
      const passwordValue = password.value.trim();
      
      email.disabled = true;
      password.disabled = true;
      buttonSubmit.disabled = true;

      spinner.classList.remove('hidden');
      buttonText.classList.add('hidden');

      if(emailValue === "" && passwordValue === "") {
        setError(email, "E-mail não pode ser vazio.");

        setError(password, "Senha não pode ser vazia.");

        throw new Error("E-mail e senha inválidos.");
      }

      if(emailValue === "") {
        setError(email, "E-mail não pode ser vazio.");

        throw new Error("E-mail é obrigatório.");
      } else {
        resetError(email);
      }

      if(passwordValue === "") {
        setError(password, "Senha não pode ser vazia.");

        throw new Error("Senha é obrigatória.");
      } else {
        resetError(password);
      }

      const response = await fetch("http://localhost:3000/login", {
        method: 'POST',
        body: JSON.stringify({
          email: emailValue,
          password: passwordValue
        }),
        headers: {
          "Content-Type": "application/json"
        }
      });

      if(!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      
      alert("Login realizado com sucesso!");

      window.location.href = "dashboard.html";

    } catch (error) {
      alert(error.message);
      
      email.disabled = false;
      password.disabled = false;
      buttonSubmit.disabled = false;

      spinner.classList.add("hidden");
      buttonText.classList.remove("hidden");
    }
  }

  function setError(element, message) {
    const formControl = element.parentElement;
    const span = formControl.querySelector('span');

    span.innerText = message;
    formControl.className = 'form-control error';
  }

  function resetError(element) {
    const formControl = element.parentElement;
    formControl.className = 'form-control';
  }
} 