var coords = [];

function main() {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.scrollTop = 0;
    document.body.style.overflow = 'hidden';

    canvas.addEventListener("click", (e) => {
        var x = e.clientX, y = e.clientY;
        coords.push(x); coords.push(y);

        const delaunay = new Delaunator(coords);
        var triangles = delaunay.triangles
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'black';

        for (let i = 0; i < coords.length; i += 2){
            ctx.beginPath();
            ctx.arc(coords[i], coords[i + 1], 7, 0, 2* Math.PI, false);
            ctx.fill();
        }

        for (let i = 0; i < triangles.length; i += 3) {
            var a = triangles[i] * 2, b = triangles[i + 1] * 2, c = triangles[i + 2] * 2;
            
            ctx.beginPath();
            ctx.moveTo(coords[a], coords[a + 1]);
            ctx.lineTo(coords[b], coords[b + 1]);
            ctx.lineTo(coords[c], coords[c + 1]);
            ctx.lineTo(coords[a], coords[a + 1]);
            ctx.stroke();
        }
    })
}