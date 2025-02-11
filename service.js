const compatibilityQuestions = require("./utils/compatibilityData");

const loveCalculator = (req, res) => {
    try {
        const { lover1, lover2 } = req;
        if (!lover1 || !lover2) {
            return res.status(400).json({ error: "Both names are required" });
        }

        const lovePercentage = Math.floor(
            (lover1.length + lover2.length + Math.random() * 100) % 100
        );
    
        let response = {}
        response.lover1Name = lover1,
        response.lover2Name = lover2,
        response.lovePercentage = lovePercentage,
        response.message = getLoveMessage(lovePercentage)
        
        return response;
    } catch (error) {
        throw error
    }
}

const fetchCompatibilityQuestions = (req,res) => {
    try {
        let response = {}
        response.data = compatibilityQuestions;
        return response
    } catch (error) {
        throw error
    }
}

const checkCompatibility = (req,res) => {
    try {
        const { answers1, answers2 } = req;
        console.log("------>",answers1, answers2);
        
        if (!answers1 || !answers2 || answers1.length !== answers2.length) {
            return res.status(400).json({ error: "Invalid answers provided" });
        }
        let matchCount = 0;
        answers1.forEach((answer, index) => {
            if (answer === answers2[index]) {
                matchCount++;
            }
        });
        const compatibilityScore = Math.floor((matchCount / answers1.length) * 100);
        let response = {}
        response.compatibilityScore = compatibilityScore,
        response.message = getLoveMessage(compatibilityScore)
        
        return response;
    } catch (error) {
        console.log(JSON.stringify({ file: 'service.js', line: 40, error: error}));
        throw error
    }
}

function getLoveMessage(percent) {
    if (percent > 80) return "A perfect match! ❤️";
    if (percent > 60) return "Great compatibility! 💕";
    if (percent > 40) return "You might need to work on it! 💛";
    return "Not a great match... but love is unpredictable! 💔";
}

module.exports = { loveCalculator, fetchCompatibilityQuestions, checkCompatibility }