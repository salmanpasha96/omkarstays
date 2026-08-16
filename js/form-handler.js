document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.ajax-form').forEach((form) => {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      const resultBox = form.querySelector('.form-result');
      const submitButton = form.querySelector('button[type="submit"]');
      const formData = new FormData(form);

      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
      }

      try {
        const response = await fetch(form.action, {
          method: form.method || 'POST',
          body: formData,
        });

        const data = await response.json();

        if (resultBox) {
          resultBox.classList.remove('d-none');
          resultBox.classList.add(data.success ? 'alert' : 'alert alert-danger');
          resultBox.textContent = data.message || 'Submitted successfully.';
        }

        if (data.success) {
          form.reset();
        }
      } catch (error) {
        if (resultBox) {
          resultBox.classList.remove('d-none');
          resultBox.classList.add('alert', 'alert-danger');
          resultBox.textContent = 'Something went wrong. Please try again.';
        }
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = submitButton.dataset.originalText || submitButton.textContent;
        }
      }
    });
  });

  document.querySelectorAll('button[type="submit"]').forEach((button) => {
    button.dataset.originalText = button.textContent;
  });
});
