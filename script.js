const token = "";//use your API key

const inputTxt = document.getElementById("input");
const image = document.getElementById("image");
const button = document.getElementById("btn");

async function query(inputText) {
    if (!inputText.trim()) {
        throw new Error('Please enter a prompt');
    }

    const formData = new FormData();
    formData.append('prompt', inputText);

    const response = await fetch('https://clipdrop-api.co/text-to-image/v1', {
        method: 'POST',
        headers: {
            'x-api-key': token, // Make sure 'token' is defined
        },
        body: formData
    });

    if (!response.ok) {
        throw new Error('Image generation failed');
    }

    return await response.blob();
}

button.addEventListener("click", async function () {
    try {
        // Show loading state
        image.src = "loading.gif";
        image.height = 640;
        image.width = 1200;

        // Get the input value and call query
        const response = await query(inputTxt.value); // Note: using .value

        // Display the result
        const objectURL = URL.createObjectURL(response);
        image.onload = () => URL.revokeObjectURL(objectURL); // Clean up memory
        image.src = objectURL;
    } catch (error) {
        console.error('Error:', error);
        image.src = "error.png"; // Show error state
        alert(error.message);
    }
});