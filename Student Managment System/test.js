function generateUniqueId() {
    const now = new Date();
    const year = now.getFullYear().toString().slice(-2); // Get the last two digits of the year
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Add 1 to the month since it's zero-based and pad with '0' if needed
    const day = String(now.getDate()).padStart(2, '0'); // Pad with '0' if needed
    const hours = String(now.getHours()).padStart(2, '0'); // Pad with '0' if needed
    const seconds = String(now.getSeconds()).padStart(2, '0'); // Pad with '0' if needed
    const uniqueId = `${year}${month}${day}${hours}${seconds}`;
    return uniqueId;
}
const id = generateUniqueId();
console.log(id); // Example output: "2310145345" (if generated on October 14, 2023, at 15:45:45)
export {};
// let id=(Math.random()*100000)
// console.log(id)
