// Detta är koden för admin så att man kan ladda upp bilder
document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("myfile");
    const preview = document.getElementById("imagePreview");

    if (input && preview) {
        input.addEventListener("input", () => {
            const url = input.value.trim();

            if (url) {
                preview.innerHTML = `<img src="${url}" alt="Bildförhandsvisning" style="max-width: 100%; max-height: 300px;">`;
            } else {
                preview.innerHTML = "";
            }
        });
    }
});




