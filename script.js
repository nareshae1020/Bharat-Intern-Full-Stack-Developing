document.addEventListener("DOMContentLoaded", function () {
    const textButton = document.getElementById("add-text");
    const imageButton = document.getElementById("add-image");
    const videoButton = document.getElementById("add-video");
    const contentContainer = document.querySelector(".content");

    textButton.addEventListener("click", function () {
        const text = prompt("Enter the text you want to add:");
        if (text) {
            const textElement = document.createElement("p");
            textElement.textContent = text;
            contentContainer.appendChild(textElement);
        }
    });

    imageButton.addEventListener("click", function () {
        const imageUrl = prompt("Enter the URL of the image you want to add:");
        if (imageUrl) {
            const imageElement = document.createElement("img");
            imageElement.src = imageUrl;
            imageElement.style.maxWidth = "100%";
            imageElement.style.height = "auto";
            imageElement.style.width = "640px"; // Set a maximum width of 640 pixels
            imageElement.style.maxHeight = "480px"; // Set a maximum height of 480 pixels
            contentContainer.appendChild(imageElement);
        }
    });

    videoButton.addEventListener("click", function () {
        const videoUrl = prompt("Enter the URL of the video you want to add:");
        if (videoUrl) {
            const videoElement = document.createElement("iframe");
            videoElement.controls = true;
            videoElement.style.maxWidth = "100%";
            videoElement.style.height = "auto";
            videoElement.style.width = "640px"; // Set a maximum width of 640 pixels
            videoElement.style.maxHeight = "480px"; // Set a maximum height of 480 pixels
            videoElement.src = videoUrl;
            contentContainer.appendChild(videoElement);
        }
    });

    const imageUploadInput = document.getElementById("image-upload");
    const videoUploadInput = document.getElementById("video-upload");

    imageUploadInput.addEventListener("change", function () {
        const file = imageUploadInput.files[0];
        if (file) {
            const imageURL = URL.createObjectURL(file);
            const imageElement = document.createElement("img");
            imageElement.src = imageURL;
            imageElement.style.maxWidth = "100%";
            imageElement.style.height = "auto";
            imageElement.style.width = "640px"; // Set a maximum width of 640 pixels
            imageElement.style.maxHeight = "480px"; // Set a maximum width of 480 pixels
            contentContainer.appendChild(imageElement);
        }
    });

    videoUploadInput.addEventListener("change", function () {
        const file = videoUploadInput.files[0];
        if (file) {
            const videoURL = URL.createObjectURL(file);
            const videoElement = document.createElement("video");
            videoElement.controls = true;
            videoElement.style.maxWidth = "100%";
            videoElement.style.height = "auto";
            videoElement.style.width = "640px"; // Set a maximum width of 640 pixels
            videoElement.style.maxHeight = "480px"; // Set a maximum height of 480 pixels
            videoElement.src = videoURL;
            contentContainer.appendChild(videoElement);
        }
    });

    // Add drag-and-drop functionality
    contentContainer.addEventListener("dragover", function (e) {
        e.preventDefault();
    });

    contentContainer.addEventListener("drop", function (e) {
        e.preventDefault();
        const file = e.dataTransfer.files[0];

        if (file.type.startsWith("image/")) {
            const imageURL = URL.createObjectURL(file);
            const imageElement = document.createElement("img");
            imageElement.src = imageURL;
            imageElement.style.maxWidth = "100%";
            imageElement.style.height = "auto";
            imageElement.style.width = "640px"; // Set a maximum width of 640 pixels
            imageElement.style.maxHeight = "480px"; // Set a maximum width of 480 pixels
            contentContainer.appendChild(imageElement);
        } else if (file.type.startsWith("video/")) {
            const videoURL = URL.createObjectURL(file);
            const videoElement = document.createElement("video");
            videoElement.controls = true;
            videoElement.style.maxWidth = "100%";
            videoElement.style.height = "auto";
            videoElement.style.width = "640px"; // Set a maximum width of 640 pixels
            videoElement.style.maxHeight = "480px"; // Set a maximum height of 480 pixels
            videoElement.src = videoURL;
            contentContainer.appendChild(videoElement);
        }
    });
    const savePdfButton = document.getElementById("save-pdf");
    savePdfButton.addEventListener("click", function () {
        const contentContainer = document.querySelector(".content");

        // Create a configuration object for html2pdf
        const pdfOptions = {
            margin: 10,
            filename: "blog_content.pdf",
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
        };

        // Use html2pdf to generate the PDF
        html2pdf()
            .from(contentContainer)
            .set(pdfOptions)
            .outputPdf()
            .then(function (pdf) {
                // Create a blob from the PDF data
                const blob = new Blob([pdf], { type: "application/pdf" });

                // Create a URL for the blob
                const url = URL.createObjectURL(blob);

                // Create a link to download the PDF
                const downloadLink = document.createElement("a");
                downloadLink.href = url;
                downloadLink.download = "blog_content.pdf";
                downloadLink.style.display = "none";
                document.body.appendChild(downloadLink);
                downloadLink.click();

                // Clean up
                document.body.removeChild(downloadLink);
                URL.revokeObjectURL(url);
            })
            .catch(function (error) {
                console.error("Error generating PDF: ", error);
            });
    });
});
