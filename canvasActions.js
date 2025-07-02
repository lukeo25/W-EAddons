// canvasActions.js
const actions = [
    { name: 'Draw Red Circle', fn: () => {
        const canvas = document.querySelector('canvas');
        const ctx = canvas.getContext('2d');
        ctx.beginPath();
        ctx.arc(100, 100, 50, 0, Math.PI * 2);
        ctx.fillStyle = 'red';
        ctx.fill();
    }},
    { name: 'Clear Canvas', fn: () => {
        const canvas = document.querySelector('canvas');
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }}
];
export default actions;