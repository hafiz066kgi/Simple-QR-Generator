const generateBtn = document.getElementById('generate-btn');
const downloadBtn = document.getElementById('download-btn');
const qrContainer = document.getElementById('qr-container');

let currentQRData = ''; // Store the current QR code data for high-res download

generateBtn.addEventListener('click', () => {
    const url = document.getElementById('url-input').value.trim();
    if (!url) {
        alert('Please enter a valid URL!');
        return;
    }

    // Store the current QR data for use in download
    currentQRData = url;

    // Clear previous QR code
    qrContainer.style.display = '';
    qrContainer.innerHTML = '';

    // Generate QR code using QRCode.js library (for display)
    new QRCode(qrContainer, {
        text: url,
        width: 250, // Display width
        height: 250 // Display height
    });

    // Display download button
    downloadBtn.style.display = 'inline-block';
});

downloadBtn.addEventListener('click', () => {
    if (!currentQRData) {
        alert('Please generate a QR code first!');
        return;
    }

    // Create a new canvas for high-resolution QR code
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = 1000; // High-resolution width
    tempCanvas.height = 1000; // High-resolution height

    const tempContext = tempCanvas.getContext('2d');

    // Generate the QR code manually on the canvas
    const qrCode = new QRCode(tempCanvas, {
        text: currentQRData,
        width: 1000, // High-resolution width
        height: 1000 // High-resolution height
    });

    // Delay to ensure rendering completes
    setTimeout(() => {
        const canvas = tempCanvas.querySelector('canvas');
        const image = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');

        const link = document.createElement('a');
        link.href = image;
        link.download = 'mh-qrcode.png';
        link.click();
    }, 200); // Adjust this delay if needed
});





const previewCard = document.getElementById('preview-card');
const previewUrl = document.getElementById('preview-url');

generateBtn.addEventListener('click', () => {
    const url = document.getElementById('url-input').value.trim();
    if (!url) {
        alert('Please enter a valid URL!');
        return;
    }

    // Show the preview card
    previewCard.style.display = 'block';
    previewUrl.textContent = url;

    // Store the current QR data
    currentQRData = url;

    // Generate the QR Code
    qrContainer.style.display = '';
    qrContainer.innerHTML = '';

    new QRCode(qrContainer, {
        text: url,
        width: 250,
        height: 250
    });

    // Display download button
    downloadBtn.style.display = 'inline-block';
});
