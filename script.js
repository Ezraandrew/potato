const cameraButton = document.getElementById('cameraButton');
const cameraStream = document.getElementById('cameraStream');
const capturedImageInput = document.getElementById('captured_image');

cameraButton.addEventListener('click', () => {
    if (cameraStream.hidden) {
        cameraStream.hidden = false;
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                cameraStream.srcObject = stream;
            });
    } else {
        cameraStream.hidden = true;
        const canvas = document.createElement('canvas');
        canvas.width = cameraStream.videoWidth;
        canvas.height = cameraStream.videoHeight;
        canvas.getContext('2d').drawImage(cameraStream, 0, 0);
        const dataUrl = canvas.toDataURL('image/png');
        capturedImageInput.value = dataUrl;
        cameraStream.srcObject.getTracks().forEach(track => track.stop());
    }
});
