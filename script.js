document.getElementById('dataForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const imageFile = document.getElementById('image').files[0];

    const reader = new FileReader();

    reader.onload = function(event) {
        const img = new Image();
        img.src = event.target.result;

        img.onload = function() {
            const canvas = document.getElementById('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height + 80; // Extra space for text

            ctx.drawImage(img, 0, 80);

            // Adding name and email to the canvas
            ctx.font = "20px Arial";
            ctx.fillStyle = "black";
            ctx.fillText("Name: " + name, 10, 30);
            ctx.fillText("Email: " + email, 10, 60);

            // Enable the PDF button
            document.getElementById('generatePdf').disabled = false;
        }
    }

    reader.readAsDataURL(imageFile);
});

document.getElementById('generatePdf').addEventListener('click', function() {
    const { jsPDF } = window.jspdf;
    const canvas = document.getElementById('canvas');
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [canvas.width, canvas.height]
    });

    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
    pdf.save('data.pdf');
});